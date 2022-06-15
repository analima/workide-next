import { Col, Row } from 'react-bootstrap';
// eslint-disable-next-line
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { Titulo } from '../Titulo';
import {
  Content,
  ContentHeader,
  ModalConfirmation,
  ModalBody,
  TypographyStyled,
  ContentDuplicateStyled,
  NenhumProjetoCadastrado,
} from './style';
import { CardProjectDuplicate } from '../CardProjectDuplicate';
import { oportunidades_api } from '../../services/oportunidades_api';
import { useCadastroProjeto } from '../../hooks/cadastroProjetos';
import { Subarea } from '../../views/AreaConsumidor/Busca/Filtro/FiltroSubarea';
import { LARANJA, PRETO_10 } from '../../styles/variaveis';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id_usuario: number | string | undefined;
  title: string;
  text: string;
  setIdSubAreas: any;
  setSubareasInitialValue: React.Dispatch<React.SetStateAction<Subarea[]>>;
  setListaExperiencia: React.Dispatch<React.SetStateAction<string[]>>;
  setHabilidadesTecnicas: React.Dispatch<React.SetStateAction<string[]>>;
  setHabilidadesComportamentais: React.Dispatch<React.SetStateAction<string[]>>;
  setVolunter: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}

type AreaInteresse = {
  dataHoraCriacao: string;
  descricao: string;
  id: number;
};

export type SubAreaType = {
  id: number;
  descricao: string;
  areaInteresse: Array<AreaInteresse>;
};

export type ProjectType = {
  dataHoraCriacao: string;
  dataHoraFim: null | string;
  dataHoraInicio: null | string;
  dataHoraUltimaAtualizacao: string;
  dataInicioEstimada: null | string;
  descricao: string;
  exclusivo: boolean;
  habilidadesComportamentais: string;
  habilidadesTecnicas: string;
  id: number;
  idPessoaConsumidor: number;
  idPessoaFornecedor: number;
  niveisExperiencia: string;
  nome: string;
  permitePerguntas: boolean;
  prazoConclusao: number;
  precoMaximo: string;
  precoMinimo: string;
  proBono: boolean;
  status: string;
  subareas: Array<SubAreaType> | [];
  usuarioUltimaAtualizacao: null | string;
  pessoasAtendidas: number;
  causaSocial: {
    descricao: string;
  };
  fornecedoresSelecionados: FornecedorSelecionadoProps[];
  escopo: string;
  setEscopo: Dispatch<SetStateAction<string>>;
  totalHoras: number;
};

type FornecedorSelecionadoProps = {
  id: number;
  nome: string;
  arquivo: {
    url: string;
  };
};

export function ModalDuplicateProject({
  showModal,
  setShowModal,
  id_usuario,
  text,
  title,
  setIdSubAreas,
  setSubareasInitialValue,
  setListaExperiencia,
  setHabilidadesTecnicas,
  setHabilidadesComportamentais,
  setVolunter,
  setQuestion,
}: IModalRecomendacao) {
  const handleClose = () => setShowModal(false);
  const [project, setProject] = useState<ProjectType[]>([]);
  const {
    setValue,
    setDescription,
    setNomesProjetos,
    setEscopo,
    setValorMinimoHora,
    setValorMaximoHora,
  } = useCadastroProjeto();
  const handlePublish = (id: number) => {
    const itemProject = project.filter(
      (item: ProjectType) => item.id === id,
    )[0];
    setValue('periodo', itemProject.prazoConclusao, { shouldValidate: true });
    setValue('valueMinHour', itemProject.precoMinimo, { shouldValidate: true });
    setValue('valueMaxHour', itemProject.precoMaximo, { shouldValidate: true });
    setValorMaximoHora(Number(itemProject.precoMaximo));
    setValorMinimoHora(Number(itemProject.precoMinimo));
    setValue('quantidadeHoras', itemProject.totalHoras, {
      shouldValidate: true,
    });
    setValue('name', itemProject.nome, { shouldValidate: true });
    setDescription(itemProject.descricao);
    setValue('minimo', itemProject.precoMinimo, { shouldValidate: true });

    setValue('maximo', itemProject.precoMaximo, { shouldValidate: true });
    const selectedSubares = itemProject.subareas.map((i: any) => ({
      ...i,
      selected: true,
    }));
    setSubareasInitialValue(selectedSubares);
    setIdSubAreas(selectedSubares.map((i: any) => i.id));
    setHabilidadesTecnicas(
      itemProject.habilidadesTecnicas
        ? itemProject.habilidadesTecnicas.split('|')
        : [''],
    );
    setHabilidadesComportamentais(
      itemProject.habilidadesComportamentais
        ? itemProject?.habilidadesComportamentais.split('|')
        : [''],
    );

    setEscopo(itemProject.escopo);

    setValue(
      'habilidades_tecnicas',
      itemProject.habilidadesTecnicas
        ? itemProject.habilidadesTecnicas.split('|')
        : [''],
      {
        shouldValidate: true,
      },
    );
    setValue(
      'habilidades_comportamentais',
      itemProject.habilidadesComportamentais
        ? itemProject.habilidadesComportamentais.split('|')
        : [''],
      {
        shouldValidate: true,
      },
    );
    setVolunter(itemProject.proBono);
    setQuestion(itemProject.permitePerguntas);
    setValue('causa', itemProject?.causaSocial?.descricao, {
      shouldValidate: true,
    });
    setValue('quantidade_pessoas', itemProject?.pessoasAtendidas, {
      shouldValidate: true,
    });

    setListaExperiencia(itemProject.niveisExperiencia.split('|'));

    setShowModal(false);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await oportunidades_api.get(
        '/projetos?order=dataHoraUltimaAtualizacao=desc',
      );
      setProject(data.values);
      setNomesProjetos(data.values.map((i: any) => i.nome));
    };
    fetchApi();
  }, [setNomesProjetos]);

  return (
    <Content>
      <ModalConfirmation
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-dialog modal-lg"
        onHide={handleClose}
      >
        <ModalBody>
          <ContentHeader>
            <Titulo titulo={title} tamanho={25} cor={PRETO_10} />
          </ContentHeader>
          {project.length > 0 ? (
            <>
              <Row className="mb-12">
                <Col lg={12} className="mb-3">
                  <TypographyStyled>{text}</TypographyStyled>
                </Col>
              </Row>
              <ContentDuplicateStyled>
                {project.map((item: ProjectType) => (
                  <CardProjectDuplicate
                    key={item.id}
                    nameProject={item.nome}
                    hours={item.dataHoraCriacao}
                    text={item.descricao}
                    arraySubArea={item.subareas}
                    img={item.fornecedoresSelecionados.map(i => i.arquivo.url)}
                    handleClick={() => {
                      handlePublish(item.id);
                    }}
                  />
                ))}
              </ContentDuplicateStyled>
            </>
          ) : (
            <NenhumProjetoCadastrado>
              <Titulo
                titulo="Você ainda não possui histórico de projetos."
                tamanho={20}
                cor={LARANJA}
              />
            </NenhumProjetoCadastrado>
          )}
        </ModalBody>
      </ModalConfirmation>
    </Content>
  );
}
