import { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { Spacer } from '../../../../components/Spacer';

import Layout from '../../Layout';
import {
  Button,
  ContentFilterHeader,
  Label,
  ContentFilter,
  FiltrosAplicados,
} from './style';
import Content from './style';
import NenhumProjeto from '../NenhumProjeto';
import Projeto from '../Projeto';
import { useCaptarProjetoFornecedor } from '../../../../hooks/captarProjetoFornecedor';
import { Paginacao } from '../../../../components/Paginacao';
import { Titulo } from '../../../../components/Titulo';
import Ordenacao from '../Ordenacao';
import { SearchInput } from '../../../../components/Form/SearchInput';
import { useAuth } from '../../../../contexts/auth';
import NovoFiltro from '../NovoFiltro';
import { InputCheck } from 'src/components/Form/InputCheck';
import { Spinner } from 'src/components/Spinner';

interface IProps {
  versao?: string;
}

export default function CaptarProjetoContent({ versao }: IProps) {
  const projetosRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const router = useRouter();
  const { query } = router;

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
    limparFiltros,
    setValue,
  } = useCaptarProjetoFornecedor();

  const [favorito, setFavorito] = useState(false);
  const toggleVolutarios = watch('toggle_volutarios');
  const subareas = watch('subareas');

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

  useEffect(() => {
    if (query.filter) setValue('pesquisa', query.filter);
  }, [query.filter, setValue]);

  return (
    <Content ref={contentRef}>
      <Layout
        versao={versao}
        titulo={
          user.id_pessoa && !!projetosExclusivos.length
            ? 'Oportunidades enviadas para você'
            : ''
        }
        hinddenOportunidades={true}
      >
        {!!projetosExclusivos.length && <Spacer size={32} />}

        {user?.id_pessoa && (
          <Row>
            <Col lg={12}>
              {projetosExclusivos.length > 0 && (
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
          <Col lg={12} className="mb-2">
            <ContentFilterHeader>
              <label className="label-busca">Estou em busca de:</label>

              <div className="content-filters">
                <div className="check">
                  <label htmlFor="voluntariado">Voluntariado</label>
                  <InputCheck
                    id="voluntariado"
                    name="toggle_volutarios"
                    control={control}
                    label=""
                  />
                </div>
                <div className="search">
                  <SearchInput
                    name="pesquisa"
                    control={control}
                    placeholder="Pesquisar por palavra-chave"
                    onClick={handleSubmit(onSubmit)}
                    className="input-search"
                  />
                </div>
              </div>

              <NovoFiltro />

              <div className="filter-footer">
                <Ordenacao setFavorito={setFavorito} favorito={favorito} />
              </div>
            </ContentFilterHeader>
          </Col>

          <Col lg={12} className="mb-2">
            <ContentFilter>
              <p>Filtros aplicados: </p>
              <Button
                onClick={() => {
                  limparFiltros();
                }}
              >
                LIMPAR FILTROS
              </Button>
            </ContentFilter>
            <FiltrosAplicados>
              {subareas?.length > 0 && (
                <>
                  {subareas?.map((subarea: any) => (
                    <Label key={subarea.id}>{subarea}</Label>
                  ))}
                </>
              )}
            </FiltrosAplicados>
          </Col>

          <Col ref={projetosRef} lg={12}>
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
                {loadingProjetos && (
                  <Col className="mb-4 mt-4 d-flex align-items-center justify-content-center">
                    <Spinner size="32px" type="info" />
                  </Col>
                )}
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
}
