import { useCallback, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Spacer } from '../../../Spacer';
import Layout from '../../Layout';
import Fornecedor from '../Resultado/Fornecedor';
import Oferta from '../Resultado/Oferta';
import {
  ContentFilterHeader,
  ContentFilter,
  Label,
  ButtonClear,
  FiltrosAplicados,
} from './style';
import Content from './style';
import { useHistory } from 'react-router';
import { useAuth } from '../../../../contexts/auth';
import { AvatarCadastroIncompleto } from '../../../AvatarCadastroIncompleto';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { ToggleSwitch } from '../../../ToggleSwitch';
import { SearchInput } from '../../../SearchInput';
import { useBuscaFornecedorOferta } from '../../../../hooks/buscaConsumidor';
import { formatarValor } from '../../../../utils/CurrencyFormat';
import { IPessoa } from 'src/interfaces/IPessoa';
import { InformationUser } from 'src/components/InformationUser';
import NovoFiltro from '../NovoFiltro';

type Cases = {
  titulo: string;
  problema: string;
  solucao: string;
  resultado: string;
  setor: string;
};

export type ItemsService = {
  idServico: number;
  idUsuario: number;
  score: number;
  nome: string;
  descricao: string;
  dhUltimaAlteracao: string;
  entregaveis: Array<string>;
  requisitos: Array<string>;
  casesSucesso: Array<Cases>;
  prazoMinimo: number;
  prazoMaximo: number;
  precoMinimo: number;
  precoMaximo: number;
  preco: number;
  selected?: true;
  id?: number;
  urlArquivo: string;
};

export type ServiceProps = {
  total: number;
  inTimeout: boolean;
  maxScore: number;
  itens: Array<ItemsService>;
};

export default function ContentBusca() {
  const history = useHistory();

  const {
    volunteers,
    ofertaFiltro,
    setOfertaFiltro,
    showAvatarCadastroIncompleto,
    handleShowAvatarCadastroIncompleto,
    handleChangeVolunteers,
    handleSearch,
    setSizeFilter,
    atualizaBusca,
    allFilters,
    limparFiltros,
    setTerm,
    setFilter,
    filter,
  } = useBuscaFornecedorOferta();

  const { user } = useAuth();

  const activeMenu = true;

  useEffect(() => {
    const { search } = window.location;
    if (search == '') return;
    const formataBusca = search?.split('filter');
    const buscaFormatada = formataBusca[1]?.split('=')[1];
    setFilter(decodeURI(buscaFormatada));
    setTerm(decodeURI(buscaFormatada));
  }, [setFilter, setTerm]);

  const handleRedirect = (type: string) => {
    if (type === 'geral') {
      history.push('/consumidor/projetos/geral');
    } else if (type === 'exclusivo') {
      history.push('/consumidor/projetos/exclusivo');
    }
  };

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/busca');
  }, []);

  useEffect(() => {
    atualizaBusca();
  }, [atualizaBusca]);

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 991) setSizeFilter('small');
    if (window.innerWidth > 991) setSizeFilter('large');
  }, [setSizeFilter]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Layout titulo="" activeMenu={activeMenu} maisSolucoesIsNotVisible={true}>
      {user.id_pessoa && <InformationUser page="busca" />}
      <Helmet>
        <title>Gyan - Buscando soluções</title>
      </Helmet>
      <AvatarCadastroIncompleto
        mostrar={showAvatarCadastroIncompleto}
        esconderAvatar={handleShowAvatarCadastroIncompleto}
        porcentagem={
          user.percentageRegisterConsumer ? user.percentageRegisterConsumer : 33
        }
        isConsumer={true}
      />
      <Spacer size={24} />

      <Content>
        <Row>
          <Col lg={12} className="d-flex align-items-center">
            <ContentFilterHeader>
              <label className="label-busca">Estou em busca de:</label>

              <div className="content-filters">
                <div className="filter-check">
                  <div className="check">
                    <label htmlFor="profissionais">Profissionais</label>
                    <input
                      type="checkbox"
                      name="profissionais"
                      id="profissionais"
                      checked={!ofertaFiltro}
                      onChange={() => {
                        setOfertaFiltro(!ofertaFiltro);
                        limparFiltros();
                      }}
                    />
                  </div>
                  <div className="check">
                    <label htmlFor="ofertas">Ofertas</label>
                    <input
                      type="checkbox"
                      name="ofertas"
                      id="ofertas"
                      checked={ofertaFiltro}
                      onChange={() => {
                        setOfertaFiltro(!ofertaFiltro);
                        limparFiltros();
                      }}
                    />
                  </div>
                  <div className="check">
                    <label htmlFor="vol">Voluntários</label>
                    <input
                      type="checkbox"
                      name="vol"
                      id="vol"
                      checked={volunteers}
                      onChange={handleChangeVolunteers}
                      disabled={ofertaFiltro}
                    />
                  </div>
                </div>
                <div className="search">
                  <SearchInput
                    placeholder="Pesquise por area ou profissional"
                    onChangeValue={handleSearch}
                    value={filter}
                    className="input"
                  />
                </div>
              </div>

              <NovoFiltro />
            </ContentFilterHeader>
          </Col>
        </Row>

        <br />
        <Row>
          {allFilters?.subareas?.length > 0 && (
            <Col lg={12} className="mb-4">
              <ContentFilter>
                <p>Filtros aplicados: </p>
                <ButtonClear onClick={() => limparFiltros()}>
                  LIMPAR FILTROS
                </ButtonClear>
              </ContentFilter>
              <FiltrosAplicados>
                {allFilters.subareas.map((filtro: any) => (
                  <Label key={filtro}>{filtro}</Label>
                ))}
              </FiltrosAplicados>
            </Col>
          )}
          <Col lg={12}>{ofertaFiltro ? <Oferta /> : <Fornecedor />}</Col>
        </Row>
      </Content>
    </Layout>
  );
}
