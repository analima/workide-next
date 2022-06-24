import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { SearchInput } from '../../../components/SearchInput';
import Layout from '../Layout';
import Projetos from './Projetos';
import Propostas from './Propostas';
import {
  ContainerFiltro,
  ContainerTipoFiltro,
  Filtros,
  GhostButton,
  TipoFiltro,
} from './style';
import Content from './style';
import { hotjar } from 'react-hotjar';

export default function MeusProjetos() {
  const [tipoFiltro, setTipoFiltro] = useState('projetos');
  const [pesquisa, setPesquisa] = useState('');
  const history = useHistory();

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/fornecedor/meus-projetos');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Gyan - Veja os seus projetos e propostas</title>
      </Helmet>
      <Layout titulo="Meus projetos">
        <ContainerTipoFiltro>
          <TipoFiltro
            onClick={() => setTipoFiltro('projetos')}
            checked={tipoFiltro === 'projetos'}
          >
            <label htmlFor="projetos">Projetos</label>
            <input
              id="projetos"
              type="checkbox"
              name="projetos"
              checked={tipoFiltro === 'projetos'}
              value="projetos"
            />
          </TipoFiltro>

          <TipoFiltro
            onClick={() => setTipoFiltro('propostas')}
            checked={tipoFiltro === 'propostas'}
          >
            <label htmlFor="propostas">Propostas</label>
            <input
              id="propostas"
              type="checkbox"
              name="propostas"
              checked={tipoFiltro === 'propostas'}
              value="propostas"
            />
          </TipoFiltro>
        </ContainerTipoFiltro>

        <ContainerFiltro>
          <Filtros>
            <Row>
              <Col lg={8}>
                <SearchInput
                  name="preco-inicial"
                  placeholder="Pesquisar por palavra-chave"
                  onChange={value => setPesquisa(value)}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={8} className="my-2">
                <span>Exibir os que estão:</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                {tipoFiltro === 'projetos' ? (
                  <Projetos
                    pesquisaNome={pesquisa.length ? pesquisa : undefined}
                  />
                ) : (
                  <Propostas />
                )}
              </Col>
            </Row>
          </Filtros>
        </ContainerFiltro>

        <Row className="mt-5">
          <Col lg={12} className="d-flex justify-content-end">
            <GhostButton onClick={() => history.goBack()}>VOLTAR</GhostButton>
          </Col>
        </Row>
      </Layout>
    </Content>
  );
}
