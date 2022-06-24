import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FiXCircle } from 'react-icons/fi';

import { useAuth } from '../../../../contexts/auth';
import { useCadastroComplementar } from '../../../../hooks/cadastroComplementar';
import { pessoas_api } from '../../../../services/pessoas_api';
import { arquivos_api } from '../../../../services/arquivos_api';
import { geral_api } from '../../../../services/geral_api';
import { fetchCEP } from '../../../../utils/FetchCEP';
import { formatDate, parseDate } from '../../../../helpers/DateHelper';
import { InputText } from '../../../../components/Form/InputText';
import { InputCheck } from '../../../../components/Form/InputCheck';
import { InputMask } from '../../../../components/Form/InputMask';
import { Button } from '../../../../components/Form/Button';
import { Foto } from '../../../../components/Foto';
import Profissoes from '../../../CadastroComplementar/ComplementarForm/Profissoes';
import Graduacoes from '../../../CadastroComplementar/ComplementarForm/Graduacoes';
import PosGraduacoes from '../../../CadastroComplementar/ComplementarForm/PosGraduacoes';
import Cursos from '../../../CadastroComplementar/ComplementarForm/Cursos';

import { Subtitulo, Actions } from './style';
import Content from './style';

interface IFormProps {
  id_foto?: number;
  nome: string;
  telefone: string;
  nome_tratamento: string;
  tipo_pessoa?: string;
  cpf?: string;
  cnpj?: string;
  data_nascimento: string;
  estado: string;
  endereco: {
    cep: string;
    id_municipio: number;
    endereco: string;
    complemento: string;
  };
  [x: string]: any;

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

const schema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  telefone: Yup.string().required('Telefone é obrigatório'),
  nome_tratamento: Yup.string().required('Apelido é obrigatório'),
  tipo_pessoa: Yup.string().required('Tipo de pessoa é obrigatório'),
  cpf: Yup.string().when('tipo_pessoa', {
    is: 'PF',
    then: Yup.string().test('cpf-check', 'CPF inválido', value => {
      if (!value) {
        return false;
      }

      return cpfValidator.isValid(value);
    }),
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
  data_nascimento: Yup.string().test('date-check', 'Data inválida', value => {
    if (!value) {
      return false;
    }

    return isValid(parse(value, 'P', new Date(), { locale: ptBR }));
  }),
  endereco: Yup.object({
    cep: Yup.string().required('CEP é obrigatório'),
    id_municipio: Yup.number().required('Município é obrigatório'),
    endereco: Yup.string().required('Endereço é obrigatório'),
    complemento: Yup.string(),
  }),
});

export default function ComplementarForm() {
  const { user } = useAuth();
  const { setAbaSelecionada } = useCadastroComplementar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const [formError, setFormError] = useState('');
  const [fotoId, setFotoId] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [ufs, setUfs] = useState<IUFProps[]>([]);
  const [uf, setUf] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    const loadInitialData = async () => {
      const responseUfs = await geral_api.get('/paises/1/ufs');

      setUfs(responseUfs.data);

      const dataFormatada = formatDate(user.data_nascimento || '');

      if (user.endereco) {
        const responseMunicipio = await geral_api(
          `/municipios/${user.endereco.id_municipio}`,
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
        nome: user.nome,
        nome_tratamento: user.nome_tratamento,
        tipo_pessoa: user.tipo ? user.tipo : 'PF',
        data_nascimento: dataFormatada,
        cpf: user.tipo === 'PF' ? user.codigo_cadastro : '',
        cnpj: user.tipo === 'PJ' ? user.codigo_cadastro : '',
        endereco: {
          id_municipio: user.endereco?.id_municipio,
          cep: user.endereco?.cep,
          endereco: user.endereco?.endereco,
          complemento: user.endereco?.complemento,
        },
      });

      if (user.id_arquivo) {
        const responseArquivo = await arquivos_api.get(
          `/arquivos/${user.id_arquivo}`,
        );

        const {
          data: { id, url },
        } = responseArquivo;

        setFotoId(id);
        setFotoUrl(url);
      }

      setEmail(user.email!);
    };

    loadInitialData();
  }, [user, reset]);

  const handleChangeTipoPessoa = (tipoSelecionado: string) => {
    if (control._formValues.tipo_pessoa !== tipoSelecionado) {
      reset({ ...control._formValues, cpf: '', cnpj: '' });
    }

    reset({ ...control._formValues, tipo_pessoa: tipoSelecionado });
  };

  const handleFetchCep = useCallback(async () => {
    const { cep } = control._formValues.endereco;
    if (cep) {
      const dadosEndereco = await fetchCEP(cep);

      const { erro } = dadosEndereco;

      if (!erro) {
        reset({
          ...control._formValues,
          endereco: {
            ...control._formValues.endereco,
            endereco: `${dadosEndereco.logradouro}, ${dadosEndereco.bairro}.`,
          },
        });

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

  const handleSalvarPessoa = useCallback(
    async (form: IFormProps) => {
      setFormError('');

      if (!fotoId) {
        setFormError('Foto é obrigatória');
        window.scrollTo(0, 0);
        return;
      }

      const {
        nome,
        nome_tratamento,
        tipo_pessoa,
        cpf,
        cnpj,
        data_nascimento,
        endereco,
      } = form;

      try {
        let pessoaRequestBody = {
          id_foto: fotoId,
          nome,
          nome_tratamento,
          tipo: tipo_pessoa ? tipo_pessoa : undefined,
          codigo_cadastro: tipo_pessoa === 'PF' ? cpf : cnpj,
          data_nascimento: data_nascimento
            ? parseDate(data_nascimento)
            : undefined,
        };

        await pessoas_api.put('/pessoas', pessoaRequestBody);

        const pessoasResponse = await pessoas_api.get(
          `/pessoas/?id_usuario=${user.id_usuario}`,
        );

        const {
          resumo_profissional,
          url_video_apresentacao,
          habilidades_tecnicas,
          habilidades_comportamentais,
          telefone_fornecedor,
        } = await pessoasResponse.data;

        setTelefone(telefone_fornecedor);

        const fornecedorRequestBody = {
          resumo_profissional,
          url_video_apresentacao,
          habilidades_tecnicas,
          habilidades_comportamentais,
          telefone_fornecedor,
          endereco,
        };

        await pessoas_api.put('/fornecedores/', fornecedorRequestBody);

        setAbaSelecionada({ indice: 1, porcentagem: 50 });
      } catch (error: any) {
        const message = error?.response?.data?.message;

        if (message) {
          setFormError(message);
          window.scrollTo(0, 0);
        }
      }
    },
    [fotoId, user, setAbaSelecionada],
  );

  return (
    <Content>
      <Container>
        {formError && (
          <Row>
            <Col lg={9}>
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
        <Subtitulo>Cadastro básico</Subtitulo>
        <Row className="mt-4">
          <Col lg={3}>
            <Foto
              id="fotoPessoa"
              idFoto={fotoId}
              urlFoto={fotoUrl}
              setterId={setFotoId}
              setterUrl={setFotoUrl}
            />
          </Col>
          <Col lg={9}>
            <Row>
              <Col lg={6}>
                <InputText
                  control={control}
                  name="nome"
                  label="Nome Completo"
                  placeholder="Nome da pessoa"
                  required
                  error={errors.nome && errors.nome.message}
                />
              </Col>
              <Col lg={4}>
                <InputText
                  control={control}
                  name="nome_tratamento"
                  label="Apelido"
                  placeholder="Apelido ou nome de tratamento"
                  required
                  error={
                    errors.nome_tratamento && errors.nome_tratamento.message
                  }
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={6}>
                <Form.Label>E-mail</Form.Label>
                <Form.Control name="email" value={email} readOnly />
              </Col>
              <Col lg={6}>
                <InputMask
                  control={control}
                  name="telefone"
                  mask="99 99999-9999"
                  label="Telefone"
                  placeholder="Telefone"
                  required
                  onBlur={handleFetchCep}
                  error={errors.telefone && errors.telefone.message}
                />
              </Col>
              <Col lg={3} className="mt-4">
                <InputCheck
                  control={control}
                  name="tipo_pessoa"
                  type="radio"
                  value={telefone}
                  checked={control._formValues.tipo_pessoa === 'PF'}
                  onChange={() => handleChangeTipoPessoa('PF')}
                  label="Pessoa Física"
                />
                <InputCheck
                  control={control}
                  name="tipo_pessoa"
                  type="radio"
                  checked={control._formValues.tipo_pessoa === 'PJ'}
                  onChange={() => handleChangeTipoPessoa('PJ')}
                  label="Pessoa Jurídica"
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <Subtitulo className="mt-4">Cadastro complementar</Subtitulo>

        <Row>
          <Col lg={5}>
            {control._formValues.tipo_pessoa === 'PF' && (
              <InputMask
                control={control}
                name="cpf"
                mask="999.999.999-99"
                label="CPF"
                placeholder="CPF da pessoa"
                required
                error={errors.cpf && errors.cpf.message}
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
                error={errors.cnpj && errors.cnpj.message}
              />
            )}
          </Col>
          <Col lg={4}>
            <InputMask
              control={control}
              name="data_nascimento"
              mask="99/99/9999"
              label="Data de nascimento"
              placeholder="01/01/1950"
              required
              error={errors.data_nascimento && errors.data_nascimento.message}
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={3}>
            <InputMask
              control={control}
              name="endereco.cep"
              mask="99999-999"
              label="CEP"
              placeholder="CEP da residência"
              required
              onBlur={handleFetchCep}
              error={errors.endereco?.cep && errors.endereco?.cep.message}
            />
          </Col>
          <Col lg={6}>
            <InputText
              control={control}
              name="endereco.endereco"
              label="Endereço"
              placeholder="Endereço da residência"
              required
              error={
                errors.endereco?.endereco && errors.endereco?.endereco.message
              }
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg={3}>
            <Form.Label>País</Form.Label>
            <Form.Control name="pais" value="Brasil" readOnly />
          </Col>
          <Col lg={3}>
            <Form.Label>Estado</Form.Label>
            <Form.Control name="estado" value={uf} readOnly />
          </Col>
          <Col lg={3}>
            <Form.Label>Cidade</Form.Label>
            <Form.Control name="municipio" value={municipio} readOnly />
          </Col>
        </Row>

        {user.id_pessoa && (
          <>
            <Row className="mt-4">
              <Col lg={9}>
                <Profissoes id_pessoa={user.id_pessoa} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={9}>
                <Graduacoes id_pessoa={user.id_pessoa} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={9}>
                <PosGraduacoes id_pessoa={user.id_pessoa} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col lg={9}>
                <Cursos id_pessoa={user.id_pessoa} />
              </Col>
            </Row>
          </>
        )}

        <Row>
          <Col lg={9}>
            <Actions>
              <Button
                label="Salvar"
                onClick={handleSubmit(handleSalvarPessoa as any)}
              />
            </Actions>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
