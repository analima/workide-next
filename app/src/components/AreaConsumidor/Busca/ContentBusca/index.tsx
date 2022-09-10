import { useCallback, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Spacer } from '../../../Spacer';
import Layout from '../../Layout';
import Filtro from '../Filtro';
import Fornecedor from '../Resultado/Fornecedor';
import Oferta from '../Resultado/Oferta';
import {
  Button,
  ContainerHeader,
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
    sizeFilter,
    setSizeFilter,
    atualizaBusca,
    allFilters,
    limparFiltros,
    causas,
    setTerm,
    setFilter,
    filter,
  } = useBuscaFornecedorOferta();

  let { user } = useAuth();
  if (!user) {
    user = {} as IPessoa;
  }
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
    <Layout
      titulo="Buscando Soluções"
      activeMenu={activeMenu}
      maisSolucoesIsNotVisible={true}
    >
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
              <div>
                <label className="label-busca">Quero buscar por:</label>
                <ToggleSwitch
                  labelLeft="Profissionais"
                  label="Oferta"
                  change={() => {
                    setOfertaFiltro(!ofertaFiltro);
                    limparFiltros();
                  }}
                  checked={ofertaFiltro}
                />
              </div>

              <ContainerHeader>
                <p>Não encontrou o que procurava ?</p>
                <Button
                  onClick={() => {
                    if (!user.id_pessoa) {
                      history.push('/cadastro-basico');
                      return;
                    }
                    if (
                      user.percentageRegisterConsumer &&
                      user.percentageRegisterConsumer < 66
                    ) {
                      handleShowAvatarCadastroIncompleto();
                      return;
                    }

                    handleRedirect('geral');
                  }}
                >
                  PUBLIQUE UM NOVO PROJETO
                </Button>
              </ContainerHeader>
            </ContentFilterHeader>
          </Col>
        </Row>

        <br />
        <Row>
          <Col lg={sizeFilter === 'large' ? 4 : 1}>
            <Filtro />
          </Col>

          <Col lg={sizeFilter === 'large' ? 8 : 11}>
            <Col lg={12} className="mb-4">
              <SearchInput
                placeholder="Pesquise por uma solução"
                onChange={value => handleSearch}
                value={filter}
              />
              <Spacer size={8} />

              {!ofertaFiltro && (
                <ToggleSwitch
                  label="Ver apenas profissionais voluntários"
                  change={handleChangeVolunteers}
                  checked={volunteers}
                />
              )}

              <Col lg={12}>
                <ContentFilter>
                  <p>Filtros aplicados: </p>
                  <ButtonClear onClick={() => limparFiltros()}>
                    LIMPAR FILTROS
                  </ButtonClear>
                </ContentFilter>
                <FiltrosAplicados>
                  {!!causas && (
                    <>
                      {causas.map((filtro: any) => (
                        <Label key={filtro.id}>{filtro.causasSociais}</Label>
                      ))}
                    </>
                  )}

                  {!!allFilters.categorias && (
                    <>
                      {allFilters.categorias.map((filtro: any) => (
                        <Label key={filtro}>{filtro}</Label>
                      ))}
                    </>
                  )}

                  {!!allFilters.niveis_experiencia && (
                    <>
                      {allFilters.niveis_experiencia.map((filtro: any) => (
                        <Label key={filtro}>{filtro}</Label>
                      ))}
                    </>
                  )}

                  {allFilters.avaliacao_fornecedor && (
                    <Label> Nota: {allFilters.avaliacao_fornecedor}</Label>
                  )}

                  {!!allFilters.subareas && (
                    <>
                      {allFilters.subareas.map((filtro: any) => (
                        <Label key={filtro}>{filtro}</Label>
                      ))}
                    </>
                  )}

                  {!!allFilters.habilidades && (
                    <>
                      {allFilters.habilidades.map((filtro: any) => (
                        <Label key={filtro}>{filtro}</Label>
                      ))}
                    </>
                  )}

                  {!!allFilters.habilidades_tecnicas && (
                    <>
                      {allFilters.habilidades_tecnicas.map((filtro: any) => (
                        <Label key={filtro}>{filtro}</Label>
                      ))}
                    </>
                  )}

                  {!!allFilters.prazo && (
                    <Label>Prazo: {allFilters.prazo} dias</Label>
                  )}

                  {!!allFilters.preco_minimo && (
                    <Label>
                      Preço mínimo:{' '}
                      {formatarValor(Number(allFilters.preco_minimo))}
                    </Label>
                  )}

                  {!!allFilters.preco_maximo && (
                    <Label>
                      Preço máximo:{' '}
                      {formatarValor(Number(allFilters.preco_maximo))}
                    </Label>
                  )}
                </FiltrosAplicados>
              </Col>
            </Col>
            {ofertaFiltro ? <Oferta /> : <Fornecedor />}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
