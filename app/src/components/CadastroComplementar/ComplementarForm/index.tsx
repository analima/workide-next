import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { useAuth } from '../../../contexts/auth';
import { useCadastroComplementar } from '../../../hooks/cadastroComplementar';
import { pessoas_api } from '../../../services/pessoas_api';
import { geral_api } from '../../../services/geral_api';
import { fetchCEP } from '../../../utils/FetchCEP';
import { InputText } from '../../../components/Form/InputText';
import { InputCheck } from '../../../components/Form/InputCheck';
import { InputMask } from '../../../components/Form/InputMask';
import { Button } from '../../../components/Form/Button';
import { IoMdHelpCircle } from 'react-icons/io';

import { Subtitulo, Actions, ContainerCausas, SkipButton } from './style';
import Content from './style';
import { FiXCircle } from 'react-icons/fi';

import { TextArea } from '../../../components/Form/TextArea';
import { FaCheckCircle } from 'react-icons/fa';
import { AZUL, LARANJA, PRETO_10, PRETO_60 } from '../../../styles/variaveis';
import { Titulo } from '../../../components/Titulo';
import { Spacer } from '../../../components/Spacer';
import { IRegistryClientData } from '../../../interfaces/iuguInterfaces';
import {
  handleFormatDocument,
  handleGetDddOfPhone,
  handleGetFormatedCep,
  handleGetFormatedPhone,
} from '../../../helpers/formatsHelper';
import { pagamentos_api } from '../../../services/pagamentos_api';
import { InputNumber } from '../../../components/Form/InputNumber';
import { ModalInformation } from '../../../components/ModalInformation';
import { check18YearsOld } from '../../../utils/DateValidator';
import { useGAEventsTracker } from '../../../hooks/useGAEventsTracker';
import UploadProfilePhoto from './UploadProfilePhoto';

interface IIuguCLienteData {
  email: string;
  nome: string;
  ddd: string;
  telefone: string;
  numero: string;
  complemento?: string;
  cep: string;
}
interface IFormProps {
  id_foto?: number;
  nome: string;
  nome_tratamento: string;
  telefone_fornecedor: string;
  tipo_pessoa?: string;
  cpf?: string;
  cnpj?: string;
  ong: boolean;
  proBono: boolean;
  data_nascimento?: string;
  data_fundacao?: string;
  resumo_profissional: string;
  estado: string;
  endereco: {
    cep: string;
    id_municipio: number;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
  };
}

interface IUFProps {
  id_pais: number;
  sigla: string;
  nome: string;
}

interface IMunicipioProps {
  id: number;
  sigla_uf: string;
  nome: string;
}

interface IImageProps {
  id: number;
  causasSociais: string;
  imgCausaSocial: string;
}

const schema = Yup.object().shape({
  nome: Yup.string()
    .matches(
      /^$|^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/,
      'Formato inválido.',
    )
    .required('Nome é obrigatório'),
  nome_tratamento: Yup.string().required('Apelido é obrigatório').nullable(),
  telefone_fornecedor: Yup.string().required('Telefone é obrigatório'),
  tipo_pessoa: Yup.string().required('Tipo de pessoa é obrigatório'),
  resumo_profissional: Yup.string().required('Resumo é obrigatório'),
  cpf: Yup.string().when('tipo_pessoa', {
    is: 'PF',
    then: Yup.string()
      .test('cpf-check', 'CPF inválido', value => {
        const cpf = value
          ?.replaceAll('_', '')
          .replaceAll('.', '')
          .replaceAll('-', '');
        if (cpf?.length === 0) return true;
        if (cpf && cpf?.length < 11) return true;
        if (!value) {
          return false;
        }

        return cpfValidator.isValid(value);
      })
      .nullable(),
  }),
  cnpj: Yup.string().when('tipo_pessoa', {
    is: 'PJ',
    then: Yup.string().test('cnpj-check', 'CNPJ inválido', value => {
      if (!value) {
        return false;
      }

      return cnpjValidator.isValid(value);
    }),
  }),
  data_nascimento: Yup.string().when('tipo_pessoa', {
    is: 'PF',
    then: Yup.string()
      .test('date-check', 'Data inválida', value => {
        if (!value) {
          return false;
        }
        if (value) {
          const input = parse(value, 'P', new Date(), { locale: ptBR });
          const today = new Date();
          if (input > today) {
            return false;
          }

          if (value[6] !== '1' && value[6] !== '2') return false;
        }

        return isValid(parse(value, 'P', new Date(), { locale: ptBR }));
      })
      .test('years-old-check', 'Você deve ter mais de 18 anos.', value => {
        if (!value) return false;
        return check18YearsOld(value);
      }),
  }),
  data_fundacao: Yup.string().when('tipo_pessoa', {
    is: 'PJ',
    then: Yup.string().test('date-check', 'Data inválida', value => {
      if (!value) {
        return false;
      }
      if (value) {
        const input = parse(value, 'P', new Date(), { locale: ptBR });
        const today = new Date();

        if (input > today) {
          return false;
        }
      }

      return isValid(parse(value, 'P', new Date(), { locale: ptBR }));
    }),
  }),
  endereco: Yup.object({
    cep: Yup.string().required('CEP é obrigatório'),
    id_municipio: Yup.number().required('Município é obrigatório'),
    endereco: Yup.string().required('Endereço é obrigatório'),
    bairro: Yup.string().required('Bairro é obrigatório'),
    numero: Yup.string().required('Número é obrigatório'),
  }),
});

export default function ComplementarForm() {
  const { user, refreshUserData } = useAuth();
  const { setAbaSelecionada, setMensagemAvatar, handleShowAvatar } =
    useCadastroComplementar();
  const mensagemApelido = `A primeira impressão é a que fica não é verdade?! A foto que você escolher deve refletir o seu trabalho e o sentimento que você
    transmite com ele. Por exemplo, se trabalha com criatividade, experimente fotos únicas e inovadoras ou se deseja
    trabalhar com o meio empresarial, escolha uma foto espontânea, mas séria.*

    Além disso, você receberá dicas, informações e notificações em seu e-mail ou telefone, então adicione seu melhor contato para não perder nada.*
    `;
  const mensagemProfissao = `Aqui você tem a liberdade para contar a todos, tudo o que considera importante sobre seu trabalho e sobre quem é você.*
    Não se preocupe muito com atribuições e habilidades. Aproveite para expressar suas ideias, motivações, principios e missões.
    `;
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [formError, setFormError] = useState('');
  const [email, setEmail] = useState('');
  const [ufs, setUfs] = useState<IUFProps[]>([]);
  const [uf, setUf] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [images, setImages] = useState<IImageProps[]>([]);
  const [checked, setChecked] = useState(false);
  const [checkedVoluntario, setCheckedVoluntario] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [showModalInformation, setShowModalInformation] = useState(false);
  const [fotoId, setFotoId] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');

  const GAEventsTracker = useGAEventsTracker('Cadastro Complementar');

  useEffect(() => {
    watch(value => {
      setDescricao(value.resumo_profissional);
    });
  }, [watch]);

  useEffect(() => {
    const loadInitialData = async () => {
      const responseUfs = await geral_api.get('/paises/1/ufs');

      setUfs(responseUfs.data);

      let {
        nome,
        nome_tratamento,
        id_arquivo,
        url_avatar,
        tipo,
        data_nascimento,
        codigo_cadastro,
        resumo_profissional,
        telefone_fornecedor,
        proBono,
        ong,
        endereco,
      } = user;

      const dataFormatada = formatDate(data_nascimento || '');

      if (endereco) {
        const responseMunicipio = await geral_api(
          `/municipios/${endereco.id_municipio}`,
        );

        const municipioSelecionado: IMunicipioProps = responseMunicipio.data;

        if (municipioSelecionado) {
          setMunicipio(municipioSelecionado.nome);

          const estadoSelecionado = responseUfs.data.find(
            (uf: IUFProps) => uf.sigla === municipioSelecionado.sigla_uf,
          );

          if (estadoSelecionado) {
            setUf(estadoSelecionado.nome);
          }
        }
      }

      reset({
        nome,
        nome_tratamento,
        telefone_fornecedor,
        resumo_profissional,
        tipo_pessoa: tipo ? tipo : 'PF',
        cpf: tipo === 'PF' ? codigo_cadastro : '',
        cnpj: tipo === 'PJ' ? codigo_cadastro : '',
        data_nascimento: tipo === 'PF' ? dataFormatada : '',
        data_fundacao: tipo === 'PJ' ? dataFormatada : '',
        proBono,
        ong,
        endereco: {
          id_municipio: endereco?.id_municipio,
          cep: endereco?.cep,
          endereco: endereco?.endereco,
          numero: endereco?.numero,
          complemento: endereco?.complemento,
          bairro: endereco?.bairro,
        },
      });
      setCheckedVoluntario(proBono || false);

      if (id_arquivo) {
        setFotoId(id_arquivo);
        setFotoUrl(url_avatar || '');
      }

      setEmail(user.email!);
    };

    loadInitialData();
  }, [reset, user]);

  const handleChangeTipoPessoa = (tipoSelecionado: string) => {
    setChecked(false);
    if (control._formValues.tipo_pessoa !== tipoSelecionado) {
      reset({ ...control._formValues, cpf: '', cnpj: '' });
    }

    reset({ ...control._formValues, tipo_pessoa: tipoSelecionado });
  };

  useEffect(() => {
    async function handleData() {
      const { data } = await geral_api.get(`/causas-sociais`);
      setImages(data);
    }
    handleData();
  }, []);

  const handleFetchCep = useCallback(async () => {
    const { cep } = control._formValues.endereco;
    if (cep) {
      const dadosEndereco = await fetchCEP(cep);
      const { erro } = dadosEndereco;

      if (erro) {
        setFormError('CEP invalido');
        window.scrollTo(0, 0);
        setMunicipio('');
        setUf('');
        reset({
          ...control._formValues,
          endereco: {
            ...control._formValues.endereco,
            endereco: '',
            bairro: '',
            complemento: '',
            numero: '',
          },
        });
        return;
      }

      if (!erro) {
        setFormError('');
        if (dadosEndereco.logradouro) {
          reset({
            ...control._formValues,
            endereco: {
              ...control._formValues.endereco,
              endereco: dadosEndereco.logradouro,
              numero: '',
            },
          });
        }
        if (dadosEndereco.bairro) {
          reset({
            ...control._formValues,
            endereco: {
              ...control._formValues.endereco,
              endereco: dadosEndereco.logradouro,
              bairro: dadosEndereco.bairro,
            },
          });
        }

        if (dadosEndereco.complemento) {
          reset({
            ...control._formValues,
            endereco: {
              ...control._formValues.endereco,
              endereco: dadosEndereco.logradouro,
              complemento: dadosEndereco.complemento,
            },
          });
        }

        if (!dadosEndereco.bairro) {
          reset({
            ...control._formValues,
            endereco: {
              ...control._formValues.endereco,
              bairro: '',
            },
          });
        }
        if (!dadosEndereco.logradouro) {
          reset({
            ...control._formValues,
            endereco: {
              ...control._formValues.endereco,
              endereco: '',
            },
          });
        }

        const estadoSelecionado = ufs.find(uf => uf.sigla === dadosEndereco.uf);

        if (estadoSelecionado) {
          setUf(estadoSelecionado.nome);

          reset({
            ...control._formValues,
            estado: estadoSelecionado.sigla,
          });

          const responseMunicipios = await geral_api.get(
            `/ufs/${estadoSelecionado.sigla}/municipios`,
          );

          const municipioSelecionado = responseMunicipios.data.find(
            (municipio: IMunicipioProps) =>
              municipio.nome === dadosEndereco.localidade,
          );

          if (municipioSelecionado) {
            setMunicipio(municipioSelecionado.nome);

            reset({
              ...control._formValues,
              endereco: {
                ...control._formValues.endereco,
                id_municipio: municipioSelecionado.id,
              },
            });
          }
        }
      }
    }
  }, [control, reset, ufs]);

  const registryIuguClient = useCallback(
    async (form: IFormProps) => {
      const { nome, telefone_fornecedor, cpf, cnpj, endereco, tipo_pessoa } =
        form;
      let client: IRegistryClientData = {
        cep: handleGetFormatedCep(endereco?.cep || ''),
        complemento: endereco?.complemento || '',
        cpf_cnpj:
          tipo_pessoa === 'PF'
            ? handleFormatDocument(cpf || '')
            : handleFormatDocument(cnpj || ''),
        email: user.email || '',
        nome: nome,
        numero: endereco?.numero,
        bairro: endereco?.bairro,
        rua: endereco?.endereco,
        ddd: handleGetDddOfPhone(telefone_fornecedor || ''),
        telefone: handleGetFormatedPhone(telefone_fornecedor || '')
          .replaceAll('_', '')
          .trim(),
        fundador: true,
        id_pessoa: user.id_pessoa?.toString() || '',
      };
      // Caso esteja vazio, o complemento deve ser deletado para não dar problema na API
      if (client.complemento === '') delete client.complemento;
      try {
        await pagamentos_api.post('/clientes', client);
      } catch (error: any) {
        const iuguCLientData: IIuguCLienteData = {
          email: user.email || '',
          nome,
          ddd: telefone_fornecedor.slice(0, 2),
          telefone: telefone_fornecedor.slice(3).trim(),
          numero: endereco.numero,
          complemento: endereco.complemento,
          cep: endereco.cep,
        };
        if (iuguCLientData.complemento && !endereco.complemento)
          delete iuguCLientData.complemento;
        if (!iuguCLientData.complemento) delete iuguCLientData.complemento;
        await handleUpdateIuguClient(
          iuguCLientData,
          tipo_pessoa === 'PF'
            ? handleFormatDocument(cpf || '')
            : handleFormatDocument(cnpj || '') || '',
        );
        console.log(error.response.data);
        if (error.response.data.message !== 'CPF/CNPJ já cadastrado')
          throw new Error(error.response.data.message);
      }
    },
    [user.email, user.id_pessoa],
  );

  function parseDate(date: string, format = 'yyyy-MM-dd') {
    if (date) {
      const [day, month, year] = date.split('/');
      let formattedDay: number | string = Number(day);
      if (formattedDay < 10) formattedDay = `0${formattedDay}`;
      return `${year}-${month}-${formattedDay}`;
    } else {
      return '';
    }
  }
  const formatDate = (data: string) => {
    if (!data) return '';
    const dia = data[8].concat(data[9]);
    const mes = data[5].concat(data[6]);
    const ano = `${data[0]}${data[1]}${data[2]}${data[3]}`;
    return `${dia}/${mes}/${ano}`;
  };

  async function handleUpdateIuguClient(
    form: IIuguCLienteData,
    document: string,
  ) {
    try {
      await pagamentos_api.put(`/clientes/${document}`, form);
    } catch (error: any) {
      console.log(error.response);
    }
  }

  const handleSalvarPessoa = useCallback(
    async (form: IFormProps) => {
      if (checkedVoluntario && selectedItems.length < 1) {
        setFormError('Selecione pelo menos uma causa social.');
        window.scrollTo(0, 0);
        return;
      }
      if (!fotoId) {
        setFormError('Foto é obrigatória');
        window.scrollTo(0, 0);
        return;
      }

      const numeroCaracterCpf = form.cpf
        ?.replaceAll('_', '')
        .replaceAll('.', '')
        .replaceAll('-', '').length;
      if (numeroCaracterCpf && numeroCaracterCpf < 11) {
        setFormError('CPF inválido! ');
        window.scrollTo(0, 0);
        return;
      }
      if (control._formValues.nome.length < 8) {
        setFormError('Por favor, insira um nome válido');
        window.scrollTo(0, 0);
        return;
      }

      const {
        nome,
        nome_tratamento,
        telefone_fornecedor,
        tipo_pessoa,
        cpf,
        cnpj,
        data_nascimento,
        data_fundacao,
        endereco,
        resumo_profissional,
      } = form;

      if (
        nome?.length &&
        nome_tratamento?.length &&
        telefone_fornecedor?.length &&
        (cpf?.length || cnpj?.length) &&
        data_nascimento?.length &&
        endereco.cep?.length &&
        endereco.endereco?.length &&
        tipo_pessoa
      )
        setFormError('');

      if (
        resumo_profissional?.length < 10 ||
        resumo_profissional?.length > 1000
      ) {
        setFormError(
          'O campo "Conte-nos um pouco sobre você" não pode ser menor de que 10 e nem maior do que 1000 caracteres',
        );
        window.scrollTo(0, 0);
        return;
      }
      try {
        let pessoaRequestBody = {
          id_foto: fotoId,
          nome,
          nome_tratamento,
          ong: checked,
          proBono: checkedVoluntario,
          tipo: tipo_pessoa ? tipo_pessoa : undefined,
          codigo_cadastro: tipo_pessoa === 'PF' ? cpf : cnpj,
          data_nascimento:
            tipo_pessoa === 'PJ'
              ? parseDate(data_fundacao || '')
              : parseDate(data_nascimento || ''),
          resumo_profissional,
        };
        try {
          await pessoas_api.put('/pessoas/', pessoaRequestBody);
          setShowModalInformation(true);

          setTimeout(() => {
            setShowModalInformation(false);
          }, 1500);
        } catch (error: any) {
          setFormError(error.response.data.message);
          window.scrollTo(0, 0);
          return;
        }

        await refreshUserData();

        const {
          url_video_apresentacao,
          habilidades_tecnicas,
          habilidades_comportamentais,
        } = user;

        const fornecedorRequestBody = {
          resumo_profissional,
          habilidades_tecnicas,
          habilidades_comportamentais,
          telefone_fornecedor,
          endereco,
          url_video_apresentacao: url_video_apresentacao
            ? url_video_apresentacao
            : '',
        };

        try {
          await pessoas_api.put('/fornecedores', fornecedorRequestBody);
        } catch (error: any) {
          console.log(error.response);
        }

        await registryIuguClient(form);
        await refreshUserData();
        setAbaSelecionada({ indice: 1, porcentagem: 40 });
      } catch (error: any) {
        const message = error?.response?.data?.message;
        if (
          error.response?.data?.message === 'Cliente já possui cadastro na Iugu'
        ) {
          await refreshUserData();
          setAbaSelecionada({ indice: 1, porcentagem: 40 });
        }

        if (message) {
          setFormError(message);
          window.scrollTo(0, 0);
        }
      }
      GAEventsTracker(
        'Botao cadastro compelementar',
        'Aba cadastro complementar',
      );
    },
    [
      checkedVoluntario,
      selectedItems.length,
      control._formValues.nome,
      fotoId,
      GAEventsTracker,
      checked,
      refreshUserData,
      user,
      registryIuguClient,
      setAbaSelecionada,
    ],
  );

  const loadCausas = useCallback(async () => {
    const { data } = await pessoas_api.get(
      `/pessoas/${user.id_pessoa}/causas-sociais`,
    );
    setSelectedItems(data.map((causa: any) => causa.idCausasSociais));
  }, [user]);

  useEffect(() => {
    loadCausas();
  }, [loadCausas]);

  const handleCausas = useCallback(
    async (id: number) => {
      try {
        const alreadySelected = selectedItems.findIndex(item => item === id);
        if (alreadySelected >= 0) {
          const filteredItems = selectedItems.filter(item => item !== id);
          await pessoas_api.delete(
            `/pessoas/${user.id_pessoa}/causas-sociais/${id}`,
          );

          setSelectedItems(filteredItems);
        } else {
          setSelectedItems([...selectedItems, id]);
          await pessoas_api.post(`/pessoas/${user.id_pessoa}/causas-sociais`, {
            id_causas_sociais: id,
          });
        }
      } catch (error: any) {
        const message = error?.response?.data?.message;

        if (message) {
          setFormError(message);
          window.scrollTo(0, 0);
        }
      }
    },
    [selectedItems, user],
  );

  return (
    <Content>
      <Container>
        {formError && (
          <Row>
            <Col lg={12}>
              <Alert variant="danger">
                {formError}
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
        <Spacer size={20} />
        <Titulo
          titulo="Seja bem vindo(a) a comunidade freelas town!"
          tamanho={32}
          cor={AZUL}
        />
        <Spacer size={20} />
        <Row className="d-flex align-items-center">
          <Col lg={6}>
            <Subtitulo>Cadastro básico</Subtitulo>
          </Col>
          <Col
            lg={6}
            className="d-flex align-items-center justify-content-evenly"
          >
            <Titulo
              titulo="Você pode pular o cadastro, se quiser."
              tamanho={14}
              cor={LARANJA}
            />
            <SkipButton
              to="/fornecedor/home"
              onClick={() =>
                GAEventsTracker(
                  'Pular cadastro',
                  'Pulou o cadastro complementar',
                )
              }
            >
              PULAR ESSA ETAPA
            </SkipButton>
          </Col>
        </Row>

        <Titulo
          titulo="Aqui estão algumas informações básicas para ajudar você a criar o seu perfil. Boa sorte!"
          tamanho={18}
          cor={PRETO_10}
        />
        <Row className="mt-4">
          <Col lg={3}>
            <UploadProfilePhoto
              fotoId={fotoId}
              setFotoId={setFotoId}
              fotoUrl={fotoUrl}
              setFotoUrl={setFotoUrl}
            />
          </Col>
          <Col lg={9}>
            <Row>
              <Col lg={6}>
                <InputText
                  maxLength={70}
                  control={control}
                  name="nome"
                  label="Nome Completo"
                  placeholder="Nome da pessoa"
                  required
                  error={
                    errors.nome?.message?.includes('string')
                      ? 'Campo obrigatório.'
                      : errors?.nome?.message
                  }
                />
              </Col>
              <Col lg={4}>
                <InputText
                  control={control}
                  maxLength={20}
                  name="nome_tratamento"
                  label="Como você quer ser chamado?"
                  placeholder="Apelido ou nome de tratamento"
                  required
                  error={
                    errors.nome_tratamento?.message.includes(
                      'must be a `string`',
                    )
                      ? 'Favor selecionar uma experências.'
                      : errors.nome_tratamento?.message
                  }
                />
              </Col>
              <Col lg={1}>
                <IoMdHelpCircle
                  color={AZUL}
                  size={24}
                  onClick={() => {
                    setMensagemAvatar(mensagemApelido);
                    handleShowAvatar();
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={10}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  maxLength={50}
                  name="email"
                  value={email}
                  readOnly
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={6}>
                <InputMask
                  control={control}
                  name="telefone_fornecedor"
                  mask="(99) 99999-9999"
                  placeholder="Telefone da pessoa"
                  label="Telefone"
                  required
                  error={
                    errors.telefone_fornecedor?.message?.includes(
                      'must be a `string`',
                    )
                      ? 'Campo obrigatório'
                      : errors.telefone_fornecedor?.message
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Subtitulo className="mt-4">Cadastro complementar</Subtitulo>
        <Titulo
          titulo="Queremos te conhecer melhor! Nos conte um pouco sobre quem você é e sua trajetória profissional."
          tamanho={18}
          cor={PRETO_60}
        />
        <Row className="mt-4" id="container-checkbox">
          <Col lg={2}>
            <InputCheck
              disabled={user.codigo_cadastro !== null}
              control={control}
              name="tipo_pessoa"
              type="radio"
              checked={control._formValues.tipo_pessoa === 'PF'}
              onChange={() => {
                handleChangeTipoPessoa('PF');
                setChecked(false);
              }}
              label="Pessoa Física"
            />
          </Col>
          <Col lg={2}>
            <InputCheck
              disabled={user.codigo_cadastro !== null}
              control={control}
              name="tipo_pessoa"
              type="radio"
              checked={control._formValues.tipo_pessoa === 'PJ'}
              onChange={() => handleChangeTipoPessoa('PJ')}
              label="Pessoa Jurídica"
            />
          </Col>
        </Row>
        <Row className="mt-12" id="checkbox-sem-fins-lucrativos">
          <Col lg={2}>
            <InputCheck
              control={control}
              name="sem_fins_lucrativos"
              type="checkbox"
              checked={checked}
              disabled={control._formValues.tipo_pessoa !== 'PJ'}
              onChange={() => setChecked(!checked)}
              label="Sem fins lucrativos"
            />
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            {control._formValues.tipo_pessoa === 'PF' && (
              <InputMask
                control={control}
                name="cpf"
                mask="999.999.999-99"
                label="CPF"
                placeholder="CPF da pessoa"
                required
                error={
                  errors.cpf?.message?.includes('string')
                    ? 'Campo obrigatório.'
                    : errors?.cpf?.message
                }
                readOnly={user.codigo_cadastro !== null}
              />
            )}
            {control._formValues.tipo_pessoa === 'PJ' && (
              <InputMask
                control={control}
                name="cnpj"
                mask="99.999.999/9999-99"
                label="CNPJ"
                placeholder="CNPJ da empresa"
                required
                error={
                  errors.cnpj?.message.includes('string')
                    ? 'Campo obrigatório.'
                    : errors?.cnpj?.message
                }
                readOnly={user.codigo_cadastro !== null}
              />
            )}
          </Col>
          <Col lg={4}>
            {control._formValues.tipo_pessoa === 'PF' && (
              <InputMask
                control={control}
                name="data_nascimento"
                mask="99/99/9999"
                label="Data de nascimento"
                required
                error={
                  errors.data_nascimento?.message.includes('string')
                    ? 'Campo obrigatório.'
                    : errors?.data_nascimento?.message
                }
              />
            )}
            {control._formValues.tipo_pessoa === 'PJ' && (
              <InputMask
                control={control}
                name="data_fundacao"
                mask="99/99/9999"
                label="Data de fundação"
                required
                error={
                  errors.data_fundacao?.message?.includes('string')
                    ? 'Campo obrigatório.'
                    : errors?.data_fundacao?.message
                }
              />
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={4}>
            <InputMask
              control={control}
              name="endereco.cep"
              mask="99999-999"
              label="CEP"
              placeholder={
                control._formValues.tipo_pessoa === 'PF'
                  ? 'CEP da residência'
                  : 'CEP da empresa'
              }
              required
              onBlur={handleFetchCep}
              autoComplete="off"
              error={
                errors?.endereco?.cep?.message.includes('string')
                  ? 'Campo obrigatório.'
                  : errors?.endereco?.cep?.message
              }
            />
          </Col>
          <Col lg={4}>
            <InputText
              control={control}
              name="endereco.endereco"
              label="Rua"
              placeholder={
                control._formValues.tipo_pessoa === 'PF'
                  ? 'Rua da residência'
                  : 'Rua da empresa'
              }
              required
              maxLength={50}
              error={
                errors.endereco?.endereco?.message.includes('string')
                  ? 'Campo obrigatório.'
                  : errors?.endereco?.endereco?.message
              }
            />
          </Col>

          <Col lg={2}>
            <InputNumber
              control={control}
              name="endereco.numero"
              label="Número"
              placeholder="Número"
              maxLength={4}
              required
              error={
                errors.endereco?.numero?.message?.includes('string')
                  ? 'Campo obrigatório'
                  : errors?.endereco?.numero?.message
              }
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={5}>
            <InputText
              control={control}
              name="endereco.bairro"
              label="Bairro"
              required
              maxLength={50}
              placeholder="Bairro"
              error={
                errors.endereco?.bairro?.message?.includes('string')
                  ? 'Campo obrigatório'
                  : errors?.endereco?.bairro?.message
              }
            />
          </Col>

          <Col lg={5}>
            <InputText
              control={control}
              name="endereco.complemento"
              label="Complemento"
              maxLength={50}
              placeholder="complemento"
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={4}>
            <Form.Label>Cidade</Form.Label>
            <Form.Control name="municipio" value={municipio} readOnly />
          </Col>
          <Col lg={3}>
            <Form.Label>Estado</Form.Label>
            <Form.Control name="estado" value={uf} readOnly />
          </Col>
          <Col lg={3}>
            <Form.Label>País</Form.Label>
            <Form.Control name="pais" value="Brasil" readOnly />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={10}>
            {control._formValues.tipo_pessoa === 'PF' && (
              <TextArea
                control={control}
                name="resumo_profissional"
                label="Conte-nos um pouco sobre você"
                maxLength={1000}
                length={descricao}
                error={
                  errors.resumo_profissional?.message?.includes('string')
                    ? 'Campo obrigatório'
                    : errors?.resumo_profissional?.message
                }
              />
            )}
            {control._formValues.tipo_pessoa === 'PJ' && (
              <TextArea
                control={control}
                name="resumo_profissional"
                maxLength={1000}
                length={descricao}
                label={
                  !checked
                    ? 'Conte-nos um pouco sobre a empresa'
                    : 'Conte-nos um pouco sobre a organização'
                }
                error={
                  errors.resumo_profissional?.message?.includes('string')
                    ? 'Campo obrigatório'
                    : errors?.resumo_profissional?.message
                }
              />
            )}
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
        <Subtitulo className="mt-4">Pro bono & Voluntariado</Subtitulo>
        <Titulo
          titulo="Aqui na freelas town nós também apoiamos projetos sociais. Vamos nessa juntos? Selecione as causas que são do seu interesse."
          tamanho={18}
          cor={PRETO_60}
        />
        <Row className="mt-4">
          <Col lg={4}>
            <div className="content-toggle">
              <div className="toggle">
                <input
                  type="checkbox"
                  checked={checkedVoluntario}
                  onChange={() => setCheckedVoluntario(!checkedVoluntario)}
                  id="foo"
                />
                <label htmlFor="foo"></label>
              </div>
              <span>Tenho interesse em causas sociais</span>
            </div>
          </Col>
        </Row>

        {checkedVoluntario && (
          <Row className="mt-4">
            <Col lg={10}>
              <span className="title-causas">
                Selecione abaixo quais causas você apoia
              </span>
              <ContainerCausas
                selected={selectedItems.length > 0 ? true : false}
              >
                {images.map(item => (
                  <li key={item.id} onClick={() => handleCausas(item.id)}>
                    <FaCheckCircle
                      size={60}
                      color="#fff"
                      className={selectedItems.includes(item.id) ? 'p' : ''}
                    />
                    <Image
                      className={
                        selectedItems.includes(item.id) ? 'selected' : ''
                      }
                      src={item.imgCausaSocial}
                      alt={item.causasSociais}
                    />
                  </li>
                ))}
              </ContainerCausas>
            </Col>
          </Row>
        )}
        <Row>
          <Col lg={12}>
            <Actions>
              <Button
                label="SALVAR"
                onClick={handleSubmit(handleSalvarPessoa as any)}
              />
            </Actions>
          </Col>
        </Row>
      </Container>
      <ModalInformation
        showModal={showModalInformation}
        color={AZUL}
        title="Cadastro salvo com sucesso!"
      />
    </Content>
  );
}
