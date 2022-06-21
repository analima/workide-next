import { useState, useEffect, ChangeEvent } from 'react';
import { Col, Container, Form, FormCheck, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import Image from 'next/image'
import { Accordion } from '../../../../components/Accordion';
import { AccordionItem } from '../../../../components/Accordion/AccordionItem';
import { Spacer } from '../../../../components/Spacer';
import { TituloForm } from '../../../../components/TituloForm';
import {
  ErrorMessages,
  getValidationErrors,
} from '../../../../utils/ValidationError';
import { Input } from '../../../../components/Input';
import { TextArea } from '../../../../components/TextArea';

import { FaPlus } from 'react-icons/fa';
import DeleteButton from '../../../../assets/coolicon.svg';
import { Content } from './style';
import { useCallback } from 'react';
import { LabelCheck } from '../../../../components/LabelCheck';
import { InputTag } from '../../../../components/Form/InputTag';
import { Select } from '../../../../components/Select';
import {
  IArea,
  ICategoriaEspecialidade,
  ICertificacao,
  IRedeSocial,
  ISubarea,
  useCadastroComplementar,
} from '../../../../hooks/detalheFornecedor';
import { formatarTipoRedeSocial } from '../../../../utils/RedeSocialFormatter';
import { geral_api } from '../../../../services/geral_api';
import { FormError } from '../../../../utils/FormError';
import { pessoas_api } from '../../../../services/pessoas_api';
import { useAuth } from '../../../../contexts/auth';
import { getCategoriaEspecialidade } from '../../../../utils/CategoriaEspecialidadeFormatter';

interface ISubareaSelecionada {
  id_subarea_interesse: number;
}

export function TurbineForm() {
  const { user } = useAuth();
  const { pessoa, setPessoa, updateFornecedor, setAbaSelecionada } =
    useCadastroComplementar();

  const [errors, setErrors] = useState<ErrorMessages>({} as ErrorMessages);
  const [plano, setPlano] = useState('');
  const [areas, setAreas] = useState<IArea[]>([]);
  const [subareasSelecionadas, setSubareasSelecionadas] = useState<
    ISubareaSelecionada[]
  >([]);
  const [resumoProfissional, setResumoProfissional] = useState('');
  const [urlVideo, setUrlVideo] = useState('');
  const [isConsultor, setIsConsultor] = useState(false);
  const [isEspecialista, setIsEspecialista] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState('');
  const [habilidadesComportamentais, setHabilidadesComportamentais] =
    useState('');
  const [nivelExperiencia, setNivelExperiencia] = useState('');
  const [redesSociais, setRedesSociais] = useState<IRedeSocial[]>([]);
  const [redeSocialTipo, setRedeSocialTipo] = useState('');
  const [redeSocialUrl, setRedeSocialUrl] = useState('');
  const [certificacoes, setCertificacoes] = useState<ICertificacao[]>([]);
  const [certificacaoOrgaoCertificador, setCertificacaoOrgaoCertificador] =
    useState('');
  const [certificacaoDescricao, setCertificacaoDescricao] = useState('');

  useEffect(() => {
    pessoas_api.get(`/pessoas?id_usuario=${user.id_usuario}`).then(response => {
      const data = response.data;

      setPlano(data.plano || 'BASICO');
      setResumoProfissional(data.resumo_profissional);
      setUrlVideo(data.url_video_apresentacao);
      setHabilidadesTecnicas(data.habilidades_tecnicas);
      setHabilidadesComportamentais(data.habilidades_comportamentais);
      setNivelExperiencia(data.nivel_experiencia);
      setRedesSociais(data.redes_sociais);
      setCertificacoes(data.certificacoes);

      const categoriasEspecialiadePessoa: ICategoriaEspecialidade[] =
        data.categorias_especialidade;

      categoriasEspecialiadePessoa?.forEach(ce => {
        if (ce.id_categoria_especialidade) {
          const descricao = getCategoriaEspecialidade(
            ce.id_categoria_especialidade,
          );

          if (descricao === 'CONSULTOR') {
            setIsConsultor(true);
          } else if (descricao === 'COACH') {
            setIsCoach(true);
          } else if (descricao === 'MENTOR') {
            setIsMentor(true);
          } else if (descricao === 'ESPECIALISTA') {
            setIsEspecialista(true);
          } else if (descricao === 'FREELANCER') {
            setIsFreelancer(true);
          }
        }
      });

      setSubareasSelecionadas(data.subareas_interesse);
    });
  }, [user.id_usuario]);

  useEffect(() => {
    geral_api.get('/areas').then(response => {
      setAreas(response.data);
    });
  }, []);

  const handleSelectSubarea = (
    event: ChangeEvent<HTMLInputElement>,
    subarea: ISubarea,
  ) => {
    const isChecked = event.target.checked;

    if (isChecked && subarea?.id) {
      const novaSubarea = {
        id_subarea_interesse: subarea.id,
      };

      const subareasSelecionadasAtualizadas = [
        ...subareasSelecionadas,
        novaSubarea,
      ];

      setSubareasSelecionadas(subareasSelecionadasAtualizadas);
      setPessoa({
        ...pessoa,
        subareas_interesse: subareasSelecionadasAtualizadas,
      });
    } else {
      const subareasSelecionadasAtualizadas = subareasSelecionadas.filter(
        ss => ss.id_subarea_interesse !== subarea.id,
      );

      setSubareasSelecionadas(subareasSelecionadasAtualizadas);
      setPessoa({
        ...pessoa,
        subareas_interesse: subareasSelecionadasAtualizadas,
      });
    }
  };

  const handleAdicionarRedeSocial = () => {
    if (!redeSocialUrl) {
      setErrors({ ...errors, redesSociais: 'URL é obrigatória' });
      return;
    }

    const redeSocialJaAdicionada = redesSociais.find(
      rs => rs.tipo === redeSocialTipo,
    );
    if (redeSocialJaAdicionada) {
      setErrors({
        ...errors,
        redesSociais: 'Esta rede social já foi adicionada',
      });
      return;
    }

    const novaRedeSocial: IRedeSocial = {
      tipo: redeSocialTipo,
      url: redeSocialUrl,
    };

    const redesSociaisPessoa = [...redesSociais, novaRedeSocial];

    setRedesSociais(redesSociaisPessoa);
    setPessoa({ ...pessoa, redes_sociais: redesSociaisPessoa });
    setRedeSocialTipo('');
    setRedeSocialUrl('');
    setErrors({ ...errors, redesSociais: '' });
  };

  const handleRemoverRedeSocial = (redeSocial: IRedeSocial) => {
    const redesSociaisAtualizadas = redesSociais.filter(
      rs => rs.tipo !== redeSocial.tipo,
    );

    setRedesSociais(redesSociaisAtualizadas);
    setPessoa({ ...pessoa, redes_sociais: redesSociaisAtualizadas });
  };

  const handleAdicionarCertificacao = () => {
    if (!certificacaoOrgaoCertificador) {
      setErrors({
        ...errors,
        certificacoes: 'Órgão certificador é obrigatório',
      });
      return;
    }

    if (!certificacaoDescricao) {
      setErrors({
        ...errors,
        certificacoes: 'Descrição é obrigatória',
      });
      return;
    }

    const certificacaoJaAdicionada = certificacoes.find(
      c =>
        c.orgao_certificador === certificacaoOrgaoCertificador &&
        c.descricao.toLowerCase() === certificacaoDescricao.toLowerCase(),
    );
    if (certificacaoJaAdicionada) {
      setErrors({
        ...errors,
        certificacoes: 'Esta certificação já foi adicionada',
      });
      return;
    }

    const novaCertificacao = {
      orgao_certificador: certificacaoOrgaoCertificador,
      descricao: certificacaoDescricao,
    };

    const certificacoesAtualizadas = [...certificacoes, novaCertificacao];
    setCertificacoes(certificacoesAtualizadas);
    setPessoa({ ...pessoa, certificacoes: certificacoesAtualizadas });
    setCertificacaoOrgaoCertificador('');
    setCertificacaoDescricao('');
    setErrors({ ...errors, certificacoes: '' });
  };

  const handleRemoverCertificacao = (certificacao: ICertificacao) => {
    const certificacoesAtualizadas = certificacoes.filter(
      certificacaoExistente =>
        certificacaoExistente.descricao !== certificacao.descricao,
    );

    setCertificacoes(certificacoesAtualizadas);
    setPessoa({ ...pessoa, certificacoes: certificacoesAtualizadas });
  };

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      setErrors({});
      try {
        if (!resumoProfissional || resumoProfissional.length === 0) {
          throw new FormError(
            'resumo_profissional',
            'Resumo profissional é obrigatório',
          );
        }

        if (resumoProfissional.length < 200) {
          throw new FormError(
            'resumo_profissional',
            'Resumo profissional deve ter no mínimo 200 caracteres',
          );
        }

        if (resumoProfissional.length > 1000) {
          throw new FormError(
            'resumo_profissional',
            'Resumo profissional deve ter no máximo 1000 caracteres',
          );
        }

        const categoriasEspecialidades = [
          isCoach,
          isConsultor,
          isEspecialista,
          isFreelancer,
          isMentor,
        ];

        const qtdCategoriasSelecionadas = categoriasEspecialidades.filter(
          c => c === true,
        ).length;

        if (qtdCategoriasSelecionadas === 0) {
          throw new FormError(
            'categorias_especialidade',
            'Categoria de especialidade é obrigatória',
          );
        }

        if (plano === 'BASICO' && qtdCategoriasSelecionadas > 1) {
          throw new FormError(
            'categorias_especialidade',
            'Seu plano permite apenas uma categoria de especialidade',
          );
        }

        if (plano === 'PRO' && qtdCategoriasSelecionadas > 2) {
          throw new FormError(
            'categorias_especialidade',
            'Seu plano permite apenas duas categorias de especialidade',
          );
        }

        const qtdSubareasSelecionadas = subareasSelecionadas.length;

        if (plano === 'BASICO' && qtdSubareasSelecionadas > 3) {
          throw new FormError(
            'subareas',
            'Seu plano permite apenas três subareas',
          );
        }

        if (plano === 'PRO' && qtdSubareasSelecionadas > 15) {
          throw new FormError(
            'subareas',
            'Seu plano permite apenas quinze subareas',
          );
        }

        if (plano === 'PREMIUM' && qtdSubareasSelecionadas > 30) {
          throw new FormError(
            'subareas',
            'Seu plano permite apenas trinta subareas',
          );
        }

        const qtdHabilidadesTecnicas = habilidadesTecnicas
          ? habilidadesTecnicas.split('|').length
          : 0;
        if (qtdHabilidadesTecnicas === 0 || qtdHabilidadesTecnicas > 5) {
          throw new FormError(
            'habilidades_tecnicas',
            'Você deve adicionar entre 1 e 5 habilidades técnicas',
          );
        }

        const qtdHabilidadesComportamentais = habilidadesComportamentais
          ? habilidadesComportamentais.split('|').length
          : 0;
        if (
          qtdHabilidadesComportamentais === 0 ||
          qtdHabilidadesComportamentais > 5
        ) {
          throw new FormError(
            'habilidades_comportamentais',
            'Você deve adicionar entre 1 e 5 habilidades comportamentais',
          );
        }

        if (!nivelExperiencia) {
          throw new FormError(
            'nivel_experiencia',
            'Nível de experiência é obrigatório',
          );
        }

        const categoriasEspecialidadePessoa = [];
        if (isConsultor) {
          categoriasEspecialidadePessoa.push({ id_categoria_especialidade: 1 });
        }
        if (isCoach) {
          categoriasEspecialidadePessoa.push({ id_categoria_especialidade: 2 });
        }
        if (isMentor) {
          categoriasEspecialidadePessoa.push({ id_categoria_especialidade: 3 });
        }
        if (isEspecialista) {
          categoriasEspecialidadePessoa.push({ id_categoria_especialidade: 4 });
        }
        if (isFreelancer) {
          categoriasEspecialidadePessoa.push({ id_categoria_especialidade: 5 });
        }

        const pessoaState = Object.assign(
          {},
          {
            ...pessoa,
            resumo_profissional: resumoProfissional,
            url_video_apresentacao: urlVideo,
            nivel_experiencia: nivelExperiencia,
            habilidades_tecnicas: habilidadesTecnicas,
            habilidades_comportamentais: habilidadesComportamentais,
            categorias_especialidade: categoriasEspecialidadePessoa,
          },
        );

        setPessoa(pessoaState);
        await updateFornecedor(pessoaState);

        setAbaSelecionada({ indice: 3, porcentagem: 80 });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);
          setErrors(validationErrors);
        }

        if (error instanceof FormError) {
          setErrors({ ...errors, [error.field]: error.message });
          window.scrollTo(0, 0);
        }

        console.error(error);
      } finally {
        window.scrollTo(0, 0);
      }
    },
    [
      errors,
      resumoProfissional,
      isCoach,
      isConsultor,
      isEspecialista,
      isFreelancer,
      isMentor,
      plano,
      subareasSelecionadas,
      habilidadesTecnicas,
      habilidadesComportamentais,
      nivelExperiencia,
      pessoa,
      urlVideo,
      updateFornecedor,
      setPessoa,
      setAbaSelecionada,
    ],
  );

  return (
    <Content>
      <Container>
        <Spacer size={80} />
        <TituloForm titulo="Turbine seu potencial" />

        <Form>
          <Row className="mt-4">
            <Col lg={9}>
              <TextArea
                name="resumo_profissional"
                label="Resumo profissional"
                placeholder="Breve descrição de seu resumo profissional"
                value={resumoProfissional}
                setter={setResumoProfissional}
                error={errors.resumo_profissional}
              />
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg={9}>
              <Input
                name="url_video"
                label="URL do vídeo"
                placeholder="Vídeo de apresentação"
                value={urlVideo}
                setter={setUrlVideo}
                error={errors.urlVideo}
              />
            </Col>
          </Row>

          <Row className="mt-4 d-flex">
            <Col lg={9}>
              <div className="especialidades">
                <LabelCheck
                  name="consultor"
                  label="CONSULTOR"
                  checked={isConsultor}
                  setter={setIsConsultor}
                />

                <LabelCheck
                  name="especialista"
                  label="ESPECIALISTA"
                  checked={isEspecialista}
                  setter={setIsEspecialista}
                />

                <LabelCheck
                  name="coaching"
                  label="COACH"
                  checked={isCoach}
                  setter={setIsCoach}
                />

                <LabelCheck
                  name="mentor"
                  label="MENTOR"
                  checked={isMentor}
                  setter={setIsMentor}
                />

                <LabelCheck
                  name="freelancer"
                  label="FREELANCER"
                  checked={isFreelancer}
                  setter={setIsFreelancer}
                />
              </div>
            </Col>
            <Spacer size={16} />
            <Col lg={9}>
              {errors.categorias_especialidade && (
                <div className="error-message">
                  {errors.categorias_especialidade}
                </div>
              )}
            </Col>
          </Row>

          <Spacer size={40} />

          <Row>
            <Col lg={9}>
              <Accordion>
                {areas &&
                  areas.map(area => (
                    <AccordionItem
                      key={area.id}
                      idHeader={`header-${area.id}`}
                      idCollapse={`collapse-${area.id}`}
                      title={area.descricao || ''}
                    >
                      {area.subareas &&
                        area.subareas.map(subarea => (
                          <FormCheck
                            key={subarea.id}
                            label={subarea.descricao}
                            onChange={event =>
                              handleSelectSubarea(event, subarea)
                            }
                            checked={
                              !!subareasSelecionadas?.find(
                                s => s.id_subarea_interesse === subarea.id,
                              )
                            }
                          />
                        ))}
                    </AccordionItem>
                  ))}
              </Accordion>
            </Col>
            <Spacer size={16} />
            <Col lg={9}>
              {errors.subareas && (
                <div className="error-message">{errors.subareas}</div>
              )}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg={9}>
              <InputTag
                name="habilidates_tecnicas"
                label="Habilidades técnicas"
                value={habilidadesTecnicas}
                setter={setHabilidadesTecnicas}
              />
            </Col>
            <Spacer size={16} />
            <Col lg={9}>
              {errors.habilidades_tecnicas && (
                <div className="error-message">
                  {errors.habilidades_tecnicas}
                </div>
              )}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg={9}>
              <InputTag
                name="habilidates_comportamentais"
                label="Habilidades comportamentais"
                value={habilidadesComportamentais}
                setter={setHabilidadesComportamentais}
              />
            </Col>
            <Spacer size={16} />
            <Col lg={9}>
              {errors.habilidades_comportamentais && (
                <div className="error-message">
                  {errors.habilidades_comportamentais}
                </div>
              )}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg={9}>
              <Select
                label="Nível de experiência"
                name="nivel_experiencia"
                value={nivelExperiencia}
                options={[
                  {
                    value: 'INICIANTE',
                    label: 'Iniciante',
                  },
                  {
                    value: 'INTERMEDIARIO',
                    label: 'Intermediário',
                  },
                  {
                    value: 'ESPECIALISTA',
                    label: 'Especialista',
                  },
                ]}
                setter={event => setNivelExperiencia(event.target.value)}
                error={errors.nivel_experiencia}
              />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={9}>
              <Form.Label>Link das redes sociais</Form.Label>
              <div className="add-item">
                <div>
                  <Select
                    noValueOption="Selecione o tipo"
                    name="tipo"
                    value={redeSocialTipo}
                    options={[
                      {
                        value: 'FACEBOOK',
                        label: 'Facebook',
                      },
                      {
                        value: 'INSTAGRAM',
                        label: 'Instagram',
                      },
                      {
                        value: 'LINKEDIN',
                        label: 'LinkedIn',
                      },
                      {
                        value: 'TWITTER',
                        label: 'Twitter',
                      },
                      {
                        value: 'YOUTUBE',
                        label: 'Youtube',
                      },
                    ]}
                    setter={event => setRedeSocialTipo(event.target.value)}
                  />

                  <Input
                    placeholder="URL"
                    name="redeSocialURL"
                    value={redeSocialUrl}
                    setter={setRedeSocialUrl}
                  />

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAdicionarRedeSocial}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div>
                  {errors.posGraduacoes && (
                    <div className="error-message">{errors.posGraduacoes}</div>
                  )}
                </div>
                <div>
                  <ul>
                    {redesSociais &&
                      redesSociais.map((item, index) => (
                        <li key={index}>
                          <span>
                            <a href={item.url} type="_blank">
                              {formatarTipoRedeSocial(item.tipo)}{' '}
                            </a>
                          </span>
                          <a
                            href="#redesSociais"
                            onClick={() => handleRemoverRedeSocial(item)}
                          >
                            <Image src={DeleteButton} alt="Excluir" />
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={9}>
              <Form.Label>Certificações</Form.Label>
              <div className="add-item">
                <div>
                  <Input
                    placeholder="Órgão certificador"
                    name="certificacaoOrgaoCertificador"
                    value={certificacaoOrgaoCertificador}
                    setter={setCertificacaoOrgaoCertificador}
                  />

                  <Input
                    placeholder="Descrição"
                    name="certificacaoDescricao"
                    value={certificacaoDescricao}
                    setter={setCertificacaoDescricao}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAdicionarCertificacao}
                  >
                    <FaPlus />
                  </button>
                </div>
                <div>
                  {errors.certificacoes && (
                    <div className="error-message">{errors.certificacoes}</div>
                  )}
                </div>
                <div>
                  <ul>
                    {certificacoes &&
                      certificacoes.map((item, index) => (
                        <li key={index}>
                          <span>
                            {item.descricao} ({item.orgao_certificador})
                          </span>
                          <a
                            href="#certificacoes"
                            onClick={() => handleRemoverCertificacao(item)}
                          >
                            <Image src={DeleteButton} alt="Excluir" />
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col lg={9} className="d-flex justify-content-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                SALVAR
              </button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Content>
  );
}
