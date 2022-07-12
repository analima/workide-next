import { useCallback, useEffect, useRef, useState } from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useRouter } from 'next/router';
import { Spacer } from '../../../../components/Spacer';

import Layout from '../../Layout';
import { Button, FiltroTelaCheia } from './style';
import Content from './style';
import NenhumProjeto from '../NenhumProjeto';
import Projeto from '../Projeto';
import { useCaptarProjetoFornecedor } from '../../../../hooks/captarProjetoFornecedor';
import { Paginacao } from '../../../../components/Paginacao';
import { Titulo } from '../../../../components/Titulo';
import { ToggleSwitch } from '../../../../components/Form/ToggleSwitch';
import Filtro from '../Filtro';
import Ordenacao from '../Ordenacao';
import { SearchInput } from '../../../../components/Form/SearchInput';
import { useAuth } from '../../../../contexts/auth';
import { IPessoa } from '../../../../interfaces/IPessoa';

const CaptarProjetoContent: React.FC = () => {
  const projetosRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  let { user } = useAuth();
  const history = useHistory();
  const router = useRouter();
  if (!user) {
    user = {} as IPessoa;
  }
  const {
    control,
    watch,
    handleSubmit,
    paginaExclusivo,
    proximaPaginaExclusivo,
    paginaAnteriorExclusivo,
    pagina,
    setPagina,
    proximaPagina,
    paginaAnterior,
    totalPaginas,
    totalPaginasExclusivo,
    projetos,
    projetosFavoritos,
    obterProjetos,
    obterProjetosExclusivos,
    obterProjetosFavoritos,
    projetosExclusivos,
    loadingProjetos,
    setSizeFilter,
    sizeFilter,
  } = useCaptarProjetoFornecedor();

  const favorito = watch('favorito');
  const toggleVolutarios = watch('toggle_volutarios');
  const [filtroEnviado, setFiltroEnviado] = useState(false);
  const scrollProjetos = useCallback(() => {
    if (projetosRef?.current && !loadingProjetos) {
      window.scrollTo(0, projetosRef.current.offsetTop);
    }
  }, [projetosRef, loadingProjetos]);

  const scrollProjetosExclusivos = useCallback(() => {
    if (contentRef?.current && !loadingProjetos) {
      window.scrollTo(0, contentRef.current.offsetTop);
    }
  }, [contentRef, loadingProjetos]);

  const handleProximaPagina = useCallback(() => {
    proximaPagina();
    scrollProjetos();
  }, [scrollProjetos, proximaPagina]);

  const handlePaginaAnterior = useCallback(() => {
    paginaAnterior();
    scrollProjetos();
  }, [scrollProjetos, paginaAnterior]);

  const handleProximaPaginaExclusivo = useCallback(() => {
    proximaPaginaExclusivo();
    scrollProjetosExclusivos();
  }, [proximaPaginaExclusivo, scrollProjetosExclusivos]);

  const handlePaginaAnteriorExclusivo = useCallback(() => {
    paginaAnteriorExclusivo();
    scrollProjetosExclusivos();
  }, [paginaAnteriorExclusivo, scrollProjetosExclusivos]);

  const onSubmit = useCallback(() => {
    obterProjetos();
    setPagina(1);
  }, [obterProjetos, setPagina]);

  useEffect(() => {
    obterProjetos();
    obterProjetosFavoritos();
    obterProjetosExclusivos();

    // eslint-disable-next-line
  }, [
    obterProjetos,
    obterProjetosExclusivos,
    obterProjetosFavoritos,
    toggleVolutarios,
  ]);

  function goHome() {
    router.back();
  }

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 991) setSizeFilter('small');
    if (window.innerWidth > 991) setSizeFilter('large');
  }, [setSizeFilter]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Content ref={contentRef}>
      <Layout
        titulo={
          user.id_pessoa && !!projetosExclusivos.length
            ? 'Oportunidades enviadas para você'
            : ''
        }
        hinddenOportunidades={true}
      >
        {!!projetosExclusivos.length && <Spacer size={32} />}

        {user.id_pessoa && (
          <Row>
            <Col lg={12}>
              {!!projetosExclusivos.length && !loadingProjetos && (
                <Row>
                  {projetosExclusivos.map((projetoExclusivo, index) => (
                    <Col key={index} lg={12} className="mb-3">
                      <Projeto projeto={projetoExclusivo} tipo="exclusivo" />
                    </Col>
                  ))}

                  <Col lg={12} className="mt-3">
                    <Paginacao
                      pagina={paginaExclusivo}
                      proxima={handleProximaPaginaExclusivo}
                      anterior={handlePaginaAnteriorExclusivo}
                      totalPaginas={totalPaginasExclusivo}
                    />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        )}

        <Titulo titulo="Encontre uma oportunidade" />

        <Spacer size={32} />

        <Row>
          <Col lg={sizeFilter === 'large' ? 4 : 1} className="mb-4">
            <FiltroTelaCheia>
              <Filtro
                filtroEnviado={filtroEnviado}
                setFiltroEnviado={setFiltroEnviado}
              />
            </FiltroTelaCheia>
          </Col>

          <Col ref={projetosRef} lg={sizeFilter === 'large' ? 8 : 11}>
            {!favorito && (
              <>
                <Row>
                  <Col lg={12}>
                    <SearchInput
                      name="pesquisa"
                      control={control}
                      placeholder="Pesquisar por palavra-chave"
                      onClick={handleSubmit(onSubmit)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={12}>
                    <ToggleSwitch
                      name="toggle_volutarios"
                      control={control}
                      label="Ver apenas projetos para voluntários"
                    />
                  </Col>
                </Row>
              </>
            )}

            <Row>
              <Col lg={12}>
                <span>Publicado em:</span>
                <Ordenacao />
              </Col>
            </Row>

            <Spacer size={16} />

            <Row>
              <Col lg={12}>
                {!!projetos.length && !favorito && !loadingProjetos && (
                  <Row>
                    {projetos.map((projeto, index) => (
                      <Col key={index} lg={12} className="mb-3">
                        <Projeto
                          tipo="normal"
                          projeto={projeto}
                          totalFavoritos={projetosFavoritos.length}
                        />
                      </Col>
                    ))}

                    <Col lg={12} className="mt-3">
                      <Paginacao
                        pagina={pagina}
                        proxima={handleProximaPagina}
                        anterior={handlePaginaAnterior}
                        totalPaginas={totalPaginas}
                      />
                    </Col>
                  </Row>
                )}
                {favorito && !!projetosFavoritos.length && (
                  <Row>
                    {projetosFavoritos.map((projeto, index) => (
                      <Col key={index} lg={12} className="mb-3">
                        <Projeto tipo="normal" projeto={projeto} />
                      </Col>
                    ))}
                  </Row>
                )}
                {((!favorito && !projetos.length && !loadingProjetos) ||
                  (favorito && !projetosFavoritos.length)) && (
                  <NenhumProjeto tipo="normal" />
                )}
                {loadingProjetos && <p>Carregando...</p>}
              </Col>
            </Row>
          </Col>
        </Row>

        <Spacer size={60} />

        <Row>
          <Col lg={12} className="d-flex justify-content-end">
            <Button onClick={() => goHome()}>VOLTAR</Button>
          </Col>
        </Row>
      </Layout>
    </Content>
  );
};

export default CaptarProjetoContent;
