import { Col, Container, Row } from 'react-bootstrap';
import { Titulo } from '../../../../components/Titulo';
import { Scroll, CreatedProjects } from './style';
import Content from './style';
import { AZUL, LARANJA } from '../../../../styles/variaveis';
import { Card } from '../../../../components/Card';
import { Spacer } from '../../../../components/Spacer';
import { useCallback, useEffect, useState } from 'react';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { CardProjectDuplicate } from '../../../../components/CardProjectDuplicate';

export default function ProjetosCriados({ idPessoa }: { idPessoa?: number }) {
  const [projetoPublicado, setProjetoPublicado] = useState<any>([]);
  const [projects, setProjects] = useState(0);
  const [concludedProjects, setConcludedProjects] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (idPessoa) {
        const {
          data: { values: projects },
        } = await oportunidades_api.get(
          `/projetos/consumidor/${idPessoa}?order=dataHoraUltimaAtualizacao=desc`,
        );
        setProjetoPublicado(projects);
      } else {
        const {
          data: { values: projects },
        } = await oportunidades_api.get(
          `/projetos?order=dataHoraUltimaAtualizacao=desc`,
        );
        setProjetoPublicado(projects);
      }
    };
    load();
  }, [idPessoa]);

  useEffect(() => {
    const load = async () => {
      const { data } = await oportunidades_api.get(
        `/projetos/count?idPessoaConsumidor=${idPessoa}`,
      );
      setProjects(data);
      const { data: concludedProjectsCount } = await oportunidades_api.get(
        `projetos/count?idPessoaConsumidor=${idPessoa}&propostaAceita=true`,
      );
      setConcludedProjects(concludedProjectsCount);
    };
    load();
  }, [idPessoa]);

  const handleCausas = useCallback(async (id: number) => {}, []);

  return (
    <Content>
      <Card>
        <Container>
          <Row className="d-flex align-items-center">
            <Col lg={8}>
              <Titulo titulo="Projetos Criados" cor={AZUL} />
            </Col>
            <Col lg={4}>
              <CreatedProjects>
                Orçamentos solicitados <strong>{projects}</strong> x{' '}
                <strong>{concludedProjects}</strong> Orçamentos fechados
              </CreatedProjects>
            </Col>
          </Row>

          <Spacer size={42} />

          <Row>
            <Col lg={12}>
              {projetoPublicado.length > 0 ? (
                <Scroll className="container vitrine-projetos">
                  {projetoPublicado.map((projeto: any, index: any) => (
                    <CardProjectDuplicate
                      key={projeto.id}
                      nameProject={projeto.nome}
                      hours={projeto.dataHoraCriacao}
                      text={projeto.descricao}
                      arraySubArea={projeto.subareas}
                      id_project={projeto.id}
                      status={projeto.status}
                      img={projeto.fornecedoresSelecionados.map(
                        (i: any) => i.arquivo.url,
                      )}
                      handleClick={() => {
                        handleCausas(projeto.id);
                      }}
                    />
                  ))}
                </Scroll>
              ) : (
                <>
                  <Spacer size={40} />
                  <Titulo
                    titulo="Esse perfil não publicou nenhum projeto ainda"
                    cor={LARANJA}
                    tamanho={18}
                  />
                  <Spacer size={32} />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Card>
    </Content>
  );
}
