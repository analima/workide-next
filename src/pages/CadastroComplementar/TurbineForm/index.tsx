import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Alert, Col, Container, FormCheck, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../../contexts/auth';
import { pessoas_api } from '../../../services/pessoas_api';
import { geral_api } from '../../../services/geral_api';
import { useCadastroComplementar } from '../../../hooks/cadastroComplementar';
import { Spacer } from '../../../components/Spacer';
import { TituloForm } from '../../../components/TituloForm';
import { InputText } from '../../../components/Form/InputText';
import { LabelCheck } from '../../../components/LabelCheck';
import { Button as ButtonGhost } from '../../../components/Form/Button';
import OtherButton from '../../../components/Button';
import { Accordion } from '../../../components/Accordion';
import { AccordionItem } from '../../../components/Accordion/AccordionItem';
import { InputTag } from '../../../components/Form/InputTag';
import RedesSociais from './RedesSociais';
import Certificacoes from './Certificacoes';
import { IoMdHelpCircle } from 'react-icons/io';
import { FiXCircle } from 'react-icons/fi';

import { Actions } from './style';
import Content from './style';
import Profissoes from '../ComplementarForm/Profissoes';
import Graduacoes from '../ComplementarForm/Graduacoes';
import PosGraduacoes from '../ComplementarForm/PosGraduacoes';
import Cursos from '../ComplementarForm/Cursos';
import { AZUL, PRETO_60 } from '../../../styles/variaveis';
import { Titulo } from '../../../components/Titulo';
import { UserData } from '../../../interfaces/userInterface';
import { IRegistryClientData } from '../../../interfaces/iuguInterfaces';
import { getUserData } from '../../../utils/getUserData';
import { useLimitacoesPlanos } from '../../../contexts/planLimitations';
import {
  handleFormatDocument,
  handleGetDddOfPhone,
  handleGetFormatedCep,
  handleGetFormatedPhone,
} from '../../../helpers/formatsHelper';
import { pagamentos_api } from '../../../services/pagamentos_api';
import { AvatarCadastroIncompleto } from '../../../components/AvatarCadastroIncompleto';
import { LabelStyled } from '../../../components/ToggleSwitch/style';
import { CardExperiencia } from '../../../components/CardExperiencia';
import { AvatarRegrasPlano } from '../../../components/AvatarRegrasPlano';
import { AvatarAssinaturaInicial } from '../../../components/AvatarAssinaturaInicial';
import { useGAEventsTracker } from '../../../hooks/useGAEventsTracker';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../../components/Spinner';
import Idioma from '../ComplementarForm/Idioma';

interface IFormProps {
  resumo_profissional: string;
  url_video_apresentacao: string;
  habilidades_tecnicas: string;
  habilidades_comportamentais: string;
  nivel_experiencia: string;
  voluntariado: boolean;
}

interface IPessoaCategoriaEspecialidade {
  id_categoria_especialidade: number;
  id_pessoa: number;
}

interface IArea {
  id: number;
  descricao: string;
  subareas: ISubarea[];
}

interface ISubarea {
  id: number;
  id_subarea_interesse: number;
  descricao: string;
}

interface ISubareaSelecionada {
  id_subarea_interesse: number;
}

const schema = Yup.object().shape({});

export default function TurbineForm() {
  const { user, refreshUserData } = useAuth();
  const GAEventsTracker = useGAEventsTracker('Cadastro Complementar');
  const {
    setAbaSelecionada,
    setMensagemAvatar,
    handleShowAvatar,
    porcentagem,
    isConsumer,
  } = useCadastroComplementar();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [isConsultor, setIsConsultor] = useState(false);
  const [isEspecialista, setIsEspecialista] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [isMentor, setIsMentor] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [formErrorCategoria, setFormErrorCategoria] = useState('');
  const [nivelExperiencia, setNivelExperiencia] = useState('');
  const [showAvatarRegrasPlano, setShowAvatarRegrasPlano] = useState(false);
  const [numHabildadesTecnicas, setNumHabilidadesTecnicas] = useState(0);
  const [numHabildadesComportamentais, setNumHabilidadesComportamentais] =
    useState(0);
  const [showAvatarAssinaturaInicial, setShowAvatarAssinaturaInicial] =
    useState(false);

  const [showAvatarCadastroIncompleto, setShowAvatarCadastroIncompleto] =
    useState(false);
  const { limitacoesPlano, buscarLimitacoes } = useLimitacoesPlanos();
  const mensagemVideo = `Entre diversos recursos para personalização de perfil, nós temos o vídeo de apresentação voltado para os profissionais. Ele é valioso por ser intuitivo, interessante e informativo para os clientes que os assistem. Mas se você, profissional, não sabe nem por onde começar, aqui vão 4 sugestões.*
    1) Um bom plano é escrever um roteiro.*
    Para qualquer vídeo de qualidade é preciso ter planejado e escrito tudo o que você precisa falar, isso transmite confiança e profissionalismo. No roteiro você pode resumir suas formações e capacitações, experiências de trabalho e de vida, habilidades inusitadas, enfim, tudo que o seu potencial cliente precisará saber.
    Para escrever um bom roteiro, você pode testar as falas enquanto escreve, usar frases que se conectam entre si, imaginar como ficará o produto final e com qual entonação você vai expressar as palavras.*

    2)	Muito importante também é ter ideia de duração.*
    Sabemos que o tanto de atenção que alguém dá para um vídeo diminui conforme sua duração se estende. É chave, portanto, saber comprimir as informações num vídeo curto, de forma que fique natural e não se torne maçante. É um verdadeiro desafio atingir eficácia na dualidade entre conteúdo e duração, mas com testes de gravação e atuação interativa é possível alcançar o melhor dos dois mundos.
    E falando em testes, as últimas dicas são para a hora da gravação.*

    3) Atenção ao ângulo.*
    É bom manter a câmera estável e apontada para o seu rosto durante a gravação do vídeo. Um tripé é a melhor opção, mas caso não tenha um, apoie em livros ou em objetos retos e pesados.*

    4) Atenção ao áudio.*
    Enquanto a qualidade de imagem não é tão importante para a imersão do cliente, a do áudio é. Investir no som que vai para o produto final é interessante. A melhor alternativa é o uso de um microfone, mas caso não tenha um, você também pode utilizar o microfone no cabo do fone de ouvido que acompanha vários celulares, gravar em um espaço com baixo eco,  falar em direção a câmera e desligar aparelhos que podem interferir com barulho, como o ar condicionado.*

    Anotou? Vamos recapitular:
    1) Roteiro
    2) Duração
    3) Ângulo
    4) Áudio*

    Agora é hora de arrasar!
    `;
  const mensagemCategoria = `
    Não sabe qual categoria selecionar? Vou te dar uma breve explicação:*

    O freelancer trabalha por meio de contratos profissionais, firmando um acordo com o cliente que paga pelo seu serviço. Nesse sentido, ele pode ser contratado de forma pontual, para realizar um determinado trabalho uma única vez, ou de maneira estendida, quando essa parceria dura um período.*

    Ao contrário do profissional generalista, o especialista dedica sua vida acadêmica e profissional em uma área específica. Ou seja, ele se especializa em um conhecimento, tornando-se expert ou referência no assunto.*

    Já um mentor é aquele que dá suporte e encorajamento para que a outra pessoa gerencie seu próprio aprendizado, maximize seu potencial, desenvolva seus skills, aprimore sua performance e se torne a melhor pessoa que ela possa vir a ser.*

    O trabalho de um consultor é mais genérico e serve também para resolver problemas gerenciais ou técnicos. Normalmente, ele levanta as necessidades do cliente, identifica os problemas, propõe soluções, e quando necessário implanta e viabiliza o projeto.*

    Coaching é um processo em que um profissional certificado orienta um cliente através de técnicas e métodos voltados para o desenvolvimento pessoal ou profissional. Além de passar os conhecimentos, técnicas e ferramentas ao seu cliente, o coach acompanha os resultados das sessões anteriores, passa e recebe feedbacks.*

    Eai? Já se identificou com alguma dessas categorias? Agora é só selecionar.
    `;

  const mensagemProfissao = `
    Preencha esse campo com sua profissão, nos conte com o que você trabalha!*
    Que tal alguns exemplos:*
    Arquiteto de redes, Ciência de dados, desenvolvedor mobile, Programador web, Analista de Negócios, Agente Publicitário, Estrategista de Marketing Digital e muitas outras.*
    Você pode adicionar mais de uma profissão.
    `;

  const mensagemGraduacao = `
    Você deu duro para chegar até aqui, nos conte o que aprendeu.*
    Toda capacitação tem seu valor, aqui você pode mostrar a todos tudo o que já fez para aperfeiçoar seu trabalho. Valorizamos sua especialização e o tempo que você levou para atingi-la, utilize esse espaço para se destacar!
    `;

  const mensagemHabilidades = `
    Como preencher minhas habilidades? Tanto para habilidades técnicas como para as comportamentais, funciona da mesma forma. Preparamos uma lista para que você possa utilizar. É só inserir “nome da habilidade” que mostraremos para você nossas opções mais populares.*
    Por exemplo, algumas habilidades comportamentais são:*
    Boa Comunicação, trabalho em equipe, resiliência, proatividade, pensamento crítico, criatividade, empatia, liderança, positividade e gerenciamento do tempo d muitas outras.*
    Destaque aqui todas as habilidades que você possui e considera importantes.*
    Mostre para os clientes aonde você possui maior autoridade.
    `;

  const mensagemCertificacoes = `
    Suas certificações têm poder!*
    Falar sobre sua experiência é legal, comprová-la é melhor ainda, pois trás confiança, mostra o que sabe e, é claro, atrai os clientes.
    `;

  const [areas, setAreas] = useState<IArea[]>([]);

  const [subareasSelecionadas, setSubareasSelecionadas] = useState<
    ISubareaSelecionada[]
  >([]);
  const [formErrorSubarea, setFormErrorSubarea] = useState('');

  const handleShowAvatarAssinaturaInicial = useCallback(() => {
    setShowAvatarAssinaturaInicial(!showAvatarAssinaturaInicial);
  }, [showAvatarAssinaturaInicial]);

  const loadAreas = useCallback(async () => {
    const response = await geral_api.get('/areas');

    setAreas(response.data);
  }, []);

  function handleShowAvatarCadastroIncompleto() {
    setShowAvatarCadastroIncompleto(!showAvatarCadastroIncompleto);
  }

  useEffect(() => {
    const handleVerificaCadastro = () => {
      if (porcentagem <= 20) {
        setShowAvatarCadastroIncompleto(true);
      }
      return;
    };
    handleVerificaCadastro();
  }, [porcentagem]);

  const handleShowAvatarRegrasPlano = useCallback(() => {
    setShowAvatarRegrasPlano(!showAvatarRegrasPlano);
  }, [showAvatarRegrasPlano]);

  const handleRegistryClientInIugu = useCallback(async () => {
    try {
      const dadosPessoa: UserData = await getUserData(user.id_usuario);
      let client: IRegistryClientData = {
        cep: handleGetFormatedCep(dadosPessoa.endereco?.cep || ''),
        complemento: dadosPessoa.endereco?.complemento || '',
        cpf_cnpj: handleFormatDocument(user.codigo_cadastro || ''),
        email: dadosPessoa.usuario.email,
        nome: dadosPessoa.nome,
        numero: dadosPessoa.endereco?.numero || '',
        bairro: dadosPessoa.endereco?.bairro || '',
        rua: dadosPessoa.endereco?.endereco || '',
        ddd: handleGetDddOfPhone(dadosPessoa.telefone_fornecedor || ''),
        telefone: handleGetFormatedPhone(dadosPessoa.telefone_fornecedor || ''),
        fundador: true,
        id_pessoa: dadosPessoa.id.toString(),
      };
      // Caso esteja vazio, o complemento deve ser deletado para não dar problema na API
      if (client.complemento === '') delete client.complemento;
      await pagamentos_api.post('/clientes', client);
    } catch (error: any) {
      console.error(error.response);
    }
  }, [user.codigo_cadastro, user.id_usuario]);

  const loadInitialData = useCallback(async () => {
    reset({
      resumo_profissional: user.resumo_profissional,
      url_video_apresentacao: user.url_video_apresentacao,
      habilidades_tecnicas: user.habilidades_tecnicas,
      habilidades_comportamentais: user.habilidades_comportamentais,
      nivel_experiencia: user.nivel_experiencia,
      voluntariado: user.voluntariado,
    });

    setNivelExperiencia(user.nivel_experiencia || '');

    const responseCategorias = await pessoas_api.get(
      `/pessoas/${user.id_pessoa}/categorias-especialidade`,
    );

    const { data: categoriasPessoa } = responseCategorias;

    if (categoriasPessoa) {
      categoriasPessoa.forEach(
        (categoriaPessoa: IPessoaCategoriaEspecialidade) => {
          if (categoriaPessoa.id_categoria_especialidade === 1) {
            setIsConsultor(true);
          } else if (categoriaPessoa.id_categoria_especialidade === 2) {
            setIsCoach(true);
          } else if (categoriaPessoa.id_categoria_especialidade === 3) {
            setIsMentor(true);
          } else if (categoriaPessoa.id_categoria_especialidade === 4) {
            setIsEspecialista(true);
          } else if (categoriaPessoa.id_categoria_especialidade === 5) {
            setIsFreelancer(true);
          }
        },
      );
    }

    const responseSubareas = await pessoas_api.get(
      `/pessoas/${user.id_pessoa}/subareas-interesse`,
    );

    setSubareasSelecionadas(responseSubareas.data);
  }, [user, reset]);

  useEffect(() => {
    buscarLimitacoes();
    verificarPrimeiraAssinatura();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verificarPrimeiraAssinatura = useCallback(async () => {
    try {
      await pessoas_api.get(
        `/assinaturas/${handleFormatDocument(user.codigo_cadastro || '')}`,
      );
    } catch (error: any) {
      if (
        error.response?.data?.message === 'Assinatura não encontrada' &&
        !isConsumer
      )
        handleShowAvatarAssinaturaInicial();
      console.error(error.response);
    }
  }, [user.codigo_cadastro, isConsumer, handleShowAvatarAssinaturaInicial]);

  useEffect(() => {
    window.scrollTo(0, 0);

    loadAreas();
    loadInitialData();
  }, [loadAreas, loadInitialData]);

  const handleCheckConsultor = useCallback(async () => {
    const initialState = isConsultor;

    try {
      setFormErrorCategoria('');

      if (isConsultor) {
        await pessoas_api.delete(
          `/pessoas/${user.id_pessoa}/categorias-especialidade/1`,
        );
        setIsConsultor(false);
      } else {
        await pessoas_api.post(
          `/pessoas/${user.id_pessoa}/categorias-especialidade`,
          {
            id_categoria_especialidade: 1,
          },
        );
        setIsConsultor(true);
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;
      console.error(error.response);
      if (message) {
        setFormErrorCategoria(message);
        setIsConsultor(initialState);
      }
    }
  }, [isConsultor, user]);

  const handleCheckCoach = useCallback(async () => {
    const initialState = isCoach;

    try {
      setFormErrorCategoria('');

      if (isCoach) {
        setIsCoach(false);
        await pessoas_api.delete(
          `/pessoas/${user.id_pessoa}/categorias-especialidade/2`,
        );
      } else {
        setIsCoach(true);
        await pessoas_api.post(
          `/pessoas/${user.id_pessoa}/categorias-especialidade`,
          {
            id_categoria_especialidade: 2,
          },
        );
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;
      console.error(error.response);
      if (message) {
        setFormErrorCategoria(message);
        setIsCoach(initialState);
      }
    }
  }, [isCoach, user]);

  const handleCheckMentor = useCallback(async () => {
    const initialState = isMentor;

    try {
      setFormErrorCategoria('');

      if (isMentor) {
        setIsMentor(false);
        await pessoas_api.delete(
          `/pessoas/${user.id_pessoa}/categorias-especialidade/3`,
        );
      } else {
        setIsMentor(true);
        await pessoas_api.post(
          `/pessoas/${user.id_pessoa}/categorias-especialidade`,
          {
            id_categoria_especialidade: 3,
          },
        );
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;
      console.error(error.response);
      if (message) {
        setFormErrorCategoria(message);
        setIsMentor(initialState);
      }
    }
  }, [isMentor, user]);

  const handleCheckEspecialista = useCallback(async () => {
    const initialState = isEspecialista;

    try {
      setFormErrorCategoria('');

      if (isEspecialista) {
        setIsEspecialista(false);
        await pessoas_api.delete(
          `/pessoas/${user.id_pessoa}/categorias-especialidade/4`,
        );
      } else {
        setIsEspecialista(true);
        await pessoas_api.post(
          `/pessoas/${user.id_pessoa}/categorias-especialidade`,
          {
            id_categoria_especialidade: 4,
          },
        );
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;
      console.error(error.response);
      if (message) {
        setFormErrorCategoria(message);
        setIsEspecialista(initialState);
      }
    }
  }, [isEspecialista, user]);

  const handleCheckFreelancer = useCallback(async () => {
    const initialState = isFreelancer;

    try {
      setFormErrorCategoria('');

      if (isFreelancer) {
        setIsFreelancer(false);
        await pessoas_api.delete(
          `/pessoas/${user.id_pessoa}/categorias-especialidade/5`,
        );
      } else {
        setIsFreelancer(true);
        await pessoas_api.post(
          `/pessoas/${user.id_pessoa}/categorias-especialidade`,
          {
            id_categoria_especialidade: 5,
          },
        );
      }
    } catch (error: any) {
      const message = error?.response?.data?.message;
      console.error(error.response);
      if (message) {
        setFormErrorCategoria(message);
        setIsFreelancer(initialState);
      }
    }
  }, [isFreelancer, user]);

  const handleSelectSubarea = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, subarea: ISubarea) => {
      const auxAreaSelecionadas = subareasSelecionadas;
      try {
        setFormErrorSubarea('');
        const isChecked = event.target.checked;

        if (isChecked && subarea?.id) {
          if (
            subareasSelecionadas.length >=
            limitacoesPlano.areasESubareasDeAtuacao
          ) {
            handleShowAvatarRegrasPlano();
            return;
          }
          if (
            !subareasSelecionadas.find(
              s => s.id_subarea_interesse === subarea.id,
            )
          ) {
            setSubareasSelecionadas([
              ...subareasSelecionadas,
              {
                id_subarea_interesse: subarea.id,
              },
            ]);
          }

          await pessoas_api.post(
            `/pessoas/${user.id_pessoa}/subareas-interesse`,
            {
              id_subarea_interesse: subarea.id,
            },
          );
        } else {
          if (
            subareasSelecionadas.find(
              s => s.id_subarea_interesse === subarea.id,
            )
          ) {
            setSubareasSelecionadas(
              subareasSelecionadas.filter(({ id_subarea_interesse }) => {
                return id_subarea_interesse !== subarea?.id;
              }),
            );
          }

          await pessoas_api.delete(
            `/pessoas/${user.id_pessoa}/subareas-interesse/${subarea.id}`,
          );
        }

        const responseSubareas = await pessoas_api.get(
          `/pessoas/${user.id_pessoa}/subareas-interesse`,
        );
        setSubareasSelecionadas(responseSubareas.data);
      } catch (error: any) {
        const message = error?.response?.data?.message;
        console.error(error.response);
        setSubareasSelecionadas(auxAreaSelecionadas);
        if (message) {
          setFormErrorSubarea(message);
        }
      }
    },
    [user, limitacoesPlano, subareasSelecionadas, handleShowAvatarRegrasPlano],
  );

  const setHabilidatesTecnicas = (value: string) => {
    reset({
      ...control._formValues,
      habilidades_tecnicas: value,
    });
  };

  const setVoluntariado = (value: boolean) => {
    reset({
      ...control._formValues,
      voluntariado: value,
    });
  };

  const setHabilidatesComportamentais = (value: string) => {
    reset({
      ...control._formValues,
      habilidades_comportamentais: value,
    });
  };

  const handlevalidateFields = useCallback(
    (field: any[] | string, message: string) => {
      if (!field?.length) {
        setFormError(message);
        window.scrollTo(0, 0);
        return false;
      }
      return true;
    },
    [],
  );

  const validateProfessions = useCallback(async () => {
    if (!user.id_pessoa) return;
    const response = await pessoas_api.get(
      `/pessoas/${user.id_pessoa}/profissoes`,
    );
    if (!response.data.length) {
      setFormError('Você precisa cadastrar pelo menos uma profissão');
      window.scrollTo(0, 0);
      return false;
    }
    return true;
  }, [user.id_pessoa]);

  const validateCategories = useCallback(() => {
    if (
      !isEspecialista &&
      !isCoach &&
      !isConsultor &&
      !isFreelancer &&
      !isMentor
    ) {
      setFormError('Você precisa selecioar pelo menos uma categoria');
      window.scrollTo(0, 0);
      return false;
    }
    return true;
  }, [isEspecialista, isCoach, isConsultor, isFreelancer, isMentor]);

  const handleSalvarPessoa = useCallback(
    async (form: IFormProps) => {
      setFormError('');
      setLoading(true);
      const {
        resumo_profissional,
        url_video_apresentacao,
        habilidades_tecnicas,
        habilidades_comportamentais,
        voluntariado,
      } = form;

      const responseValidateProfessions = await validateProfessions();
      if (!responseValidateProfessions) return;
      if (!validateCategories()) return;
      if (
        !handlevalidateFields(
          subareasSelecionadas,
          'Você precisa cadastrar pelo menos uma subárea',
        )
      )
        return;
      if (
        !handlevalidateFields(
          habilidades_tecnicas,
          'Você precisa cadastrar pelo menos uma habilidade técnica',
        )
      )
        return;
      if (
        !handlevalidateFields(
          habilidades_comportamentais,
          'Você precisa cadastrar pelo menos uma habilidade comportamental',
        )
      )
        return;

      if (!nivelExperiencia.length) {
        setFormError('Nível de experiência obrigatório.');
        return;
      }

      try {
        const fornecedorRequestBody = {
          resumo_profissional,
          url_video_apresentacao,
          habilidades_tecnicas,
          habilidades_comportamentais,
          nivel_experiencia: nivelExperiencia,
          voluntariado,
        };
        await pessoas_api.put('/fornecedores', fornecedorRequestBody);
        await handleRegistryClientInIugu();
        await refreshUserData();

        !user.moderacao
          ? history.push('/cadastro-concluido')
          : setAbaSelecionada({ indice: 3, porcentagem: 75 });
        window.scrollTo(0, 0);
      } catch (error: any) {
        const message = error?.response?.data?.message;
        console.error(error.response);
        if (message) {
          setFormError(message);
          window.scrollTo(0, 0);
        }
      }
      GAEventsTracker(
        'Botao cadastro compelementar',
        'Aba turbine seu potencial',
      );
    },
    [
      validateProfessions,
      validateCategories,
      handlevalidateFields,
      subareasSelecionadas,
      nivelExperiencia,
      GAEventsTracker,
      handleRegistryClientInIugu,
      refreshUserData,
      user.moderacao,
      history,
      setAbaSelecionada,
    ],
  );

  function handleSetExperiencia(experiencia: string) {
    setNivelExperiencia(experiencia);
    setValue('nivel_experiencia', experiencia);
  }

  useEffect(() => {
    watch((value: any) => {
      setNumHabilidadesComportamentais(
        value.habilidades_comportamentais?.split('|').length || 0,
      );
      setNumHabilidadesTecnicas(
        value.habilidades_tecnicas?.split('|').length || 0,
      );
    });
  }, [watch, control._formValues.experiencia]);

  return (
    <Content>
      <Container>
        <AvatarAssinaturaInicial
          mostrar={showAvatarAssinaturaInicial}
          esconderAvatar={handleShowAvatarAssinaturaInicial}
        />
        <AvatarCadastroIncompleto
          mostrar={showAvatarCadastroIncompleto}
          esconderAvatar={handleShowAvatarCadastroIncompleto}
          setAbaSelecionada={setAbaSelecionada}
          porcentagem={porcentagem}
          isConsumer={false}
        />

        <AvatarRegrasPlano
          mostrar={showAvatarRegrasPlano}
          esconderAvatar={handleShowAvatarRegrasPlano}
          aba={3}
          premium={limitacoesPlano.idPlano === 4}
        />

        <Spacer size={40} />
        <TituloForm titulo="Turbine seu potencial" />
        <Row>
          <Col lg={9}>
            <Titulo
              cor={PRETO_60}
              tamanho={18}
              titulo="Complete o seu perfil preenchendo as informações sobre a sua carreira, habilidades e conhecimentos. Dessa forma, você mostrará a seus clientes sua capacidade e qualidade do seu trabalho."
            />
          </Col>
        </Row>
        {formError && (
          <Row>
            <Spacer size={20} />
            <Col lg={9}>
              <Alert
                variant="danger"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {formError.includes('Nível de experiência inválido')
                  ? 'Nível de experiência obrigatório'
                  : formError}
                <FiXCircle
                  className="fechar"
                  onClick={() => setFormError('')}
                  size={20}
                  color="#c53030"
                />
              </Alert>
            </Col>
          </Row>
        )}

        <Row className="mt-4">
          <Col lg={9}>
            <InputText
              control={control}
              name="url_video_apresentacao"
              label="URL de vídeo de apresentação"
              placeholder="URL do vídeo"
              error={
                errors.url_video_apresentacao &&
                errors.url_video_apresentacao.message
              }
            />
          </Col>
          <Col lg={1}>
            <IoMdHelpCircle
              color={AZUL}
              size={24}
              onClick={() => {
                setMensagemAvatar(mensagemVideo);
                handleShowAvatar();
              }}
            />
          </Col>
        </Row>

        <Row className="mt-4 d-flex">
          <Col lg={9}>
            <h6>Selecione suas categorias</h6>
            <Spacer size={8} />
            <div className="especialidades">
              <LabelCheck
                name="consultor"
                label="CONSULTOR"
                checked={isConsultor}
                setter={setIsConsultor}
                onChange={() => handleCheckConsultor()}
              />

              <LabelCheck
                name="especialista"
                label="ESPECIALISTA"
                checked={isEspecialista}
                setter={setIsEspecialista}
                onChange={() => handleCheckEspecialista()}
              />

              <LabelCheck
                name="coaching"
                label="COACH"
                checked={isCoach}
                setter={setIsCoach}
                onChange={() => handleCheckCoach()}
              />

              <LabelCheck
                name="mentor"
                label="MENTOR"
                checked={isMentor}
                setter={setIsMentor}
                onChange={() => handleCheckMentor()}
              />

              <LabelCheck
                name="freelancer"
                label="FREELANCER"
                checked={isFreelancer}
                setter={setIsFreelancer}
                onChange={() => handleCheckFreelancer()}
              />
            </div>
          </Col>
          <Col lg={1}>
            <IoMdHelpCircle
              color={AZUL}
              size={24}
              onClick={() => {
                setMensagemAvatar(mensagemCategoria);
                handleShowAvatar();
              }}
            />
          </Col>
          <Spacer size={16} />
          <Col lg={9}>
            {formErrorCategoria && (
              <div className="error-message">{formErrorCategoria}</div>
            )}
          </Col>
        </Row>
        {user.id_pessoa && (
          <>
            <Row className="mt-4">
              <Col lg={9}>
                <Profissoes id_pessoa={user.id_pessoa} />
              </Col>
              <Col lg={1}>
                <IoMdHelpCircle
                  color={AZUL}
                  size={24}
                  onClick={() => {
                    setMensagemAvatar(mensagemProfissao);
                    handleShowAvatar();
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={9}>
                <Graduacoes id_pessoa={user.id_pessoa} />
              </Col>
              <Col lg={1}>
                <IoMdHelpCircle
                  color={AZUL}
                  size={24}
                  onClick={() => {
                    setMensagemAvatar(mensagemGraduacao);
                    handleShowAvatar();
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={9}>
                <PosGraduacoes id_pessoa={user.id_pessoa} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={9}>
                <Idioma id_pessoa={user.id_pessoa} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={9}>
                <Cursos id_pessoa={user.id_pessoa} />
              </Col>
            </Row>
          </>
        )}

        <Row className="mt-4">
          <Col lg={9}>
            <h6>Áreas</h6>
          </Col>
        </Row>

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
                            !!subareasSelecionadas.find(
                              s => s.id_subarea_interesse === subarea.id,
                            )
                          }
                        />
                      ))}
                  </AccordionItem>
                ))}
            </Accordion>
          </Col>

          <Col lg={9}>
            {formErrorSubarea && (
              <div className="error-message">{formErrorSubarea}</div>
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={9}>
            <InputTag
              name="habilidates_tecnicas"
              label="Habilidades técnicas"
              value={control._formValues.habilidades_tecnicas}
              setter={setHabilidatesTecnicas}
              validate={true}
              totalItens={numHabildadesComportamentais + numHabildadesTecnicas}
            />
          </Col>
          <Col lg={1}>
            <IoMdHelpCircle
              color={AZUL}
              size={24}
              onClick={() => {
                setMensagemAvatar(mensagemHabilidades);
                handleShowAvatar();
              }}
            />
          </Col>
          <Spacer size={16} />
          <Col lg={9}>
            {errors.habilidades_tecnicas && (
              <div className="error-message">{errors.habilidades_tecnicas}</div>
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={9}>
            <InputTag
              name="habilidates_comportamentais"
              label="Habilidades comportamentais"
              value={control._formValues.habilidades_comportamentais}
              setter={setHabilidatesComportamentais}
              validate={true}
              totalItens={numHabildadesComportamentais + numHabildadesTecnicas}
            />
          </Col>
          <Spacer size={16} />
          <Col lg={9}>
            {errors.habilidades_comportamentias && (
              <div className="error-message">
                {errors.habilidades_comportamentias}
              </div>
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={10}>
            <Spacer size={36} />
            <LabelStyled>
              Selecione o nível de experiência do profissional
            </LabelStyled>
            <Row>
              <Col lg={3}>
                <CardExperiencia
                  control={control}
                  name="basico"
                  titulo="Iniciante"
                  checked={nivelExperiencia === 'BASICO'}
                  descricao="Profissional iniciante. Você está começando agora e quer conquistar um espaço para desenvolver suas novas habilidades."
                  onClick={() => handleSetExperiencia('BASICO')}
                />
              </Col>

              <Col lg={3}>
                <CardExperiencia
                  control={control}
                  name="intermediario"
                  titulo="Intermediário"
                  checked={nivelExperiencia === 'INTERMEDIARIO'}
                  descricao="Profissional que já tem alguns anos de mercado. Passou por algumas experiências mas quer aumentar sua clientela. Sabe trabalhar em equipe e tem algumas referências."
                  onClick={() => handleSetExperiencia('INTERMEDIARIO')}
                />
              </Col>

              <Col lg={3}>
                <CardExperiencia
                  control={control}
                  name="avancado"
                  titulo="Avançado "
                  checked={nivelExperiencia === 'AVANCADO'}
                  descricao="Profissional hard core. Pronto para executar qualquer serviço dentro da sua área. Você já tem muita experiência e quer compartilha-la com um time bem engajado."
                  onClick={() => handleSetExperiencia('AVANCADO')}
                />
              </Col>

              <Col lg={3}>
                <CardExperiencia
                  control={control}
                  name="especialista_1"
                  titulo="Especialista"
                  checked={nivelExperiencia === 'ESPECIALISTA'}
                  descricao="Profissional muito experiente. Você está sempre pronto para tirar qualquer dúvida sobre a sua área. Seus longos anos de carreira te dão habilidades para gerenciar uma nova equipe."
                  onClick={() => handleSetExperiencia('ESPECIALISTA')}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        {user.id_pessoa && (
          <>
            <Row className="mt-4">
              <Col lg={9}>
                <RedesSociais id_pessoa={user.id_pessoa} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={9}>
                <Certificacoes id_pessoa={user.id_pessoa} />
              </Col>
              <Col lg={1}>
                <IoMdHelpCircle
                  color={AZUL}
                  size={24}
                  onClick={() => {
                    setMensagemAvatar(mensagemCertificacoes);
                    handleShowAvatar();
                  }}
                />
              </Col>
            </Row>
          </>
        )}

        <Row className="mt-4">
          <Col lg={4}>
            <div className="content-toggle">
              <div className="toggle">
                <input
                  type="checkbox"
                  id="foo"
                  name="voluntariado"
                  checked={control._formValues.voluntariado}
                  onChange={e => {
                    setVoluntariado(e.target.checked);
                  }}
                />
                <label htmlFor="foo"></label>
              </div>
              <span>Tenho disponibilidade para voluntariado</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={9}>
            <Actions>
              <ButtonGhost
                label="VOLTAR"
                color="ghost"
                onClick={() => {
                  setAbaSelecionada({ indice: 1, porcentagem: 25 });
                  window.scrollTo(0, 0);
                }}
              />

              <OtherButton onClick={handleSubmit(handleSalvarPessoa as any)}>
                {loading ? <Spinner size="18" /> : 'SALVAR'}
              </OtherButton>
            </Actions>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
