import { useState, useCallback, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ofertas_api } from '../../../../../services/ofertas_api';
import { Card } from '../../../../../components/Card';
import { InputText } from '../../../../../components/Form/InputText';
import { Spacer } from '../../../../../components/Spacer';
import { TextArea } from '../../../../../components/Form/TextArea';
import { Titulo } from '../../../../../components/Titulo';
import { AZUL, CINZA_40, PRETO } from '../../../../../styles/variaveis';
import ItemAdicionarExtras from './ItemAdicionarExtras';

import { Button, GhostButton } from './style';
import Content from './style';
import { useCadastroServico } from '../../../../../hooks/cadastroServico';
import { IoMdHelpCircle } from 'react-icons/io';
import { InputNumber } from '../../../../../components/Form/InputNumber';
import { InputMoney } from '../../../../../components/Form/InputMoney';
import { ModalInformation } from '../../../../../components/ModalInformation';

interface IAdicionarExtrasProps {
  continuar: () => void;
  voltar: () => void;
}

interface IFormProps {
  nome: string;
  descricao: string;
  extra: number;
  acrescimo: string;
}

interface IServicoExtra {
  id: number;
  nome: string;
  descricao: string;
  extra: number;
  acrescimo: string;
}

const schema = Yup.object().shape({
  nome: Yup.string()
    .min(10, 'Nome deve conter no mínimo 10 caracteres')
    .max(100, 'Nome deve conter no máximo 100 caracteres')
    .required('Nome é obrigatório'),
  descricao: Yup.string()
    .min(150, 'Descrição deve conter no mínimo 150 caracteres')
    .max(1000, 'Descrição deve conter no máximo 1000 caracteres')
    .required('Descrição é obrigatória'),
  extra: Yup.string().required('Extra é obrigatório'),
  acrescimo: Yup.string().required('Acrescimo é obrigatório'),
});

export default function AdicionarExtras({ continuar, voltar }: IAdicionarExtrasProps) {
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

  const [listaAdicionarExtras, setListaAdicionarExtras] = useState<
    IServicoExtra[]
  >([]);
  const [erroPreco, setErroPreco] = useState('');
  const [showSuccess, setShowSuccess] = useState('');

  const { idServico, mostrarDicaAntonio } = useCadastroServico();
  const mensagemServicoExtra = `
  Em sua oferta você pode incluir serviços extras que possam
  interessar o seu cliente e tornar o seu serviço ainda mais completo.
  Ou até mesmo qualquer condição que não esteja incluso na oferta
  original por um adicional a mais. Esses serviços extras serão
  oferecidos junto com a oferta principal. Isso é bom! Por exemplo:
  caso seu cliente compre o seu plano básico, você ainda pode incluir
  na oferta os serviços adicionais que estariam em um plano mais completo
  cobrando o adicional de cada um deles. Assim o cliente pode também
  personalizar o seu serviço e negociar as condições com você.
  `;
  const loadCasesSucesso = useCallback(async () => {
    const response = await ofertas_api.get(
      `servicos-extra?size=9999&filter=servico=${idServico}`,
    );

    const { data } = response.data;

    setListaAdicionarExtras(data);
  }, [idServico]);

  useEffect(() => {
    loadCasesSucesso();
  }, [loadCasesSucesso]);

  const handleCriarServicoExtra = useCallback(
    async (form: IFormProps) => {
      const servicoExtra = {
        id_servico: idServico,
        ...form,
      };

      const response = await ofertas_api.post('/servicos-extra', servicoExtra);

      const listaAtualizada = [...listaAdicionarExtras, response.data];

      setListaAdicionarExtras(listaAtualizada);
      reset({
        nome: '',
        descricao: '',
        extra: '',
        acrescimo: '',
      });

      setShowSuccess('O seu serviço extra foi criado com sucesso!');
      setTimeout(() => {
        setShowSuccess('');
      }, 3000);
    },
    [idServico, listaAdicionarExtras, reset],
  );

  useEffect(() => {
    if (Number(control._formValues.extra) > 1000000) {
      setErroPreco('A taxa máxima é de R$ 10.000,00');
    } else {
      setErroPreco('');
    }
  }, [control]);

  return (
    <Content>
      <ModalInformation
        title="Sucesso"
        text={showSuccess}
        color={AZUL}
        showModal={showSuccess.length > 0}
      ></ModalInformation>
      <Titulo titulo="Adicionar serviços Extras" cor={PRETO} />
      <Titulo
        titulo="Adicione serviços extras que serão ofertados para seu cliente junto com essa oferta."
        tamanho={20}
        cor={CINZA_40}
      />

      <Spacer size={32} />

      <Card>
        <Container>
          <Row>
            <Col lg={12} className="d-flex justify-content-end">
              <IoMdHelpCircle
                color={AZUL}
                size={24}
                onClick={() => mostrarDicaAntonio(mensagemServicoExtra)}
              />
            </Col>
          </Row>

          <Spacer size={32} />

          <Row>
            <Col lg={12} className="mb-3">
              <Row>
                <Col lg={2}>Nome: </Col>
                <Col lg={10}>
                  <InputText
                    control={control}
                    name="nome"
                    placeholder="Ex: Arquivo editável"
                    error={errors.nome && errors.nome.message}
                    maxLength={100}
                  />
                </Col>
              </Row>
            </Col>

            <Col lg={12} className="mb-3">
              <Row>
                <Col lg={2}>Descrição: </Col>
                <Col lg={10}>
                  <TextArea
                    control={control}
                    name="descricao"
                    placeholder="Ex.: Vou enviar mais unidades do serviço..."
                    error={errors.descricao && errors.descricao.message}
                    maxLength={1000}
                  />
                </Col>
              </Row>
            </Col>

            <Row>
              <Col lg={6} className="mb-3">
                <Row>
                  <Col lg={4}>Por um extra de: </Col>
                  <Col lg={6}>
                    <InputMoney
                      control={control}
                      name="extra"
                      placeholder="R$"
                      error={errors.extra ? errors.extra.message : erroPreco}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={6} className="mb-3">
                <Row>
                  <Col lg={3}>E acrescentará mais: </Col>
                  <Col lg={6}>
                    <InputNumber
                      control={control}
                      name="acrescimo"
                      placeholder="Em dias"
                      error={errors.acrescimo && errors.acrescimo.message}
                    />
                  </Col>
                  <Col lg={2}>ao prazo.</Col>
                </Row>
              </Col>
            </Row>

            <Col lg={12} className="mt-4">
              <Button onClick={handleSubmit(handleCriarServicoExtra as any)}>
                SALVAR
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>

      {listaAdicionarExtras.map(extra => (
        <div key={extra.id}>
          <ItemAdicionarExtras item={extra} loadItens={loadCasesSucesso} />
        </div>
      ))}

      <Spacer size={120} />

      <Container>
        <Row>
          <Col lg={12}>
            <div className="btn-acoes">
              <GhostButton onClick={voltar}>VOLTAR</GhostButton>
              <Button onClick={continuar}>CONCLUIR</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Content>
  );
}
