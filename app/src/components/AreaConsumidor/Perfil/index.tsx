import { useEffect, useState } from 'react';
import { Col, Container, FormCheck, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { InputText } from '../../Form/InputText';
import { Foto } from '../../Foto';
import { Spacer } from '../../Spacer';
import Layout from '../Layout';
import Accordion from '../Accordion';
import AccordionItem from '../Accordion/AccordionItem';
import * as Yup from 'yup';
import { GhostButton, FotoPerfil, LinkFornecedor, Condicao } from './style';
import Content from './style';
import { yupResolver } from '@hookform/resolvers/yup';
import { Titulo } from '../../Titulo';
import { AZUL, PRETO_60 } from '../../../styles/variaveis';
import { TextArea } from '../../Form/TextArea';
import { TagInput } from '../../TagInput';
import { ToggleSwitch } from '../../Form/ToggleSwitch';
import { CartaoFlip } from '../../CartaoFlip';
import { IoMdHelpCircle } from 'react-icons/io';
import { Antonio } from '../../Antonio';
import { ModalCentralMenu } from '../../ModalCentralMenu';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';

const schema = Yup.object().shape({});

interface IDadosCartao {
  numero: string;
  nome: string;
  vencimento: string;
  cvv: string;
}

export default function Perfil() {
  const {
    control,
    // handleSubmit,
    // reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    watch((value, { name, type }) =>
      setDadosCartao({
        nome: value.nome_cartao,
        numero: value.numero_cartao,
        cvv: value.cvv,
        vencimento: value.vencimento,
      } as IDadosCartao),
    );
  }, [watch]);

  const [fotoId, setFotoId] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState(1);
  const [areaAtuacao, setAreaAtuacao] = useState('');

  const [showRecomendacaoModal, setShowRecomendacaoModal] = useState(false);
  const [dica, setDica] = useState(false);

  const [dadosCartao, setDadosCartao] = useState<IDadosCartao>(
    {} as IDadosCartao,
  );

  const [rotacionarCartao, setRotacionarCartao] = useState(false);
  const mensagem = `Lorem ipsum dolor sit amet consectetur
  adipisicing elit. Explicabo sint quasi, doloremque
  necessitatibus maiores deleniti fuga eaque iusto,
  porro esse expedita! Neque inventore beatae id corporis
  adipisicing elit. Explicabo sint quasi, doloremque
  necessitatibus maiores deleniti fuga eaque iusto,
  porro esse expedita! Neque inventore beatae id corporis
  adipisicing elit. Explicabo sint quasi, doloremque
  necessitatibus maiores deleniti fuga eaque iusto,
  porro esse expedita! Neque inventore beatae id corporis
  repellat repudiandae nulla possimus!`;

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/consumidor/perfil');
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Freelas.town - Editar suas informações de consumidor</title>
      </Helmet>
      <Layout titulo="Meu Perfil" activeMenu={true}>
        <Container>
          <Row className="mt-4">
            <Col lg={12}>
              <Accordion>
                <AccordionItem
                  idHeader="cadastro-basico"
                  idCollapse="collapse-cadastro-basico"
                  title="Cadastro básico"
                >
                  <Row>
                    <Col className="d-flex justify-content-end">
                      <IoMdHelpCircle
                        color={AZUL}
                        size={24}
                        onClick={() => setDica(true)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4 mb-4">
                    <Col lg={3} className="avatar mb-4">
                      <FotoPerfil>
                        <Foto
                          id="foto-servico"
                          idFoto={fotoId}
                          urlFoto={fotoUrl}
                          setterId={setFotoId}
                          setterUrl={setFotoUrl}
                        />
                      </FotoPerfil>
                    </Col>

                    <Col lg={9} className="mb-4">
                      <Row>
                        <Col lg={6} className="mb-4">
                          <InputText
                            control={control}
                            label="Nome Completo"
                            name="nome"
                            placeholder="Obrigatório"
                            error={errors.nome && errors.nome.message}
                          />
                        </Col>
                        <Col lg={6} className="mb-4">
                          <InputText
                            control={control}
                            label="Apelido"
                            name="apelido"
                            placeholder="Obrigatório"
                            error={errors.apelido && errors.apelido.message}
                          />
                        </Col>
                      </Row>

                      <Row className="d-flex align-items-center">
                        <Col lg={9} className="mb-4">
                          <InputText
                            control={control}
                            label="E-mail"
                            name="nome"
                            placeholder="Obrigatório"
                            error={errors.nome && errors.nome.message}
                          />
                        </Col>
                        <Col lg={3} className="mb-4">
                          <FormCheck
                            id="pessoa-fisica"
                            type="radio"
                            name="tipo_pessoa"
                            value={1}
                            checked={tipoPessoa === 1}
                            onChange={e => setTipoPessoa(1)}
                            label="Pessoa Física"
                          />

                          <FormCheck
                            id="pessoa-juridica"
                            type="radio"
                            name="tipo_pessoa"
                            value={2}
                            checked={tipoPessoa === 2}
                            onChange={e => setTipoPessoa(2)}
                            label="Pessoa Jurídica"
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={2}>
                          <InputText
                            control={control}
                            label="DDD"
                            name="ddd"
                            placeholder="DDD"
                            error={errors.ddd && errors.ddd.message}
                          />
                        </Col>
                        <Col lg={7}>
                          <InputText
                            control={control}
                            label="Telefone"
                            name="telefone"
                            placeholder="telefone"
                            error={errors.telefone && errors.telefone.message}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col lg={12} className="d-flex justify-content-end">
                      <GhostButton>SALVAR</GhostButton>
                    </Col>
                  </Row>
                </AccordionItem>

                <AccordionItem
                  idHeader="cadastro-complementar"
                  idCollapse="collapse-cadastro-complementar"
                  title="Cadastro complementar"
                >
                  <Row>
                    <Col className="d-flex justify-content-end">
                      <IoMdHelpCircle
                        color={AZUL}
                        size={24}
                        onClick={() => setDica(true)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4 mb-4">
                    <Col lg={12} className="mb-4">
                      <Titulo
                        titulo="Quer aumentar confiança dos fornecedores? Informe seu CPF ou CNPJ e ganhe o selo de pefil verificado"
                        tamanho={24}
                        cor={PRETO_60}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} className="mb-4">
                      <InputText
                        control={control}
                        label="CPF ou CPNJ"
                        name="cpf_cnpj"
                        placeholder="Opcional"
                        error={errors.cpf_cnpj && errors.cpf_cnpj.message}
                      />
                    </Col>
                    <Col lg={6} className="mb-4">
                      <InputText
                        control={control}
                        label="Data de Nascimento"
                        name="data_nascimento"
                        placeholder="Opcional"
                        error={
                          errors.data_nascimento &&
                          errors.data_nascimento.message
                        }
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4 mb-4">
                    <Col lg={12} className="mb-4">
                      <Titulo
                        titulo="Ajude-nos a melhorar suas buscas. Informe seu endereço para resultados mais precisos"
                        tamanho={24}
                        cor={PRETO_60}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={4} className="mb-4">
                      <InputText
                        control={control}
                        label="CEP"
                        name="cep"
                        placeholder="Opcional"
                        error={errors.cep && errors.cep.message}
                      />
                    </Col>
                    <Col lg={8} className="mb-4">
                      <InputText
                        control={control}
                        label="Endereço"
                        name="endereco"
                        placeholder="Opcional"
                        error={errors.endereco && errors.endereco.message}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={4} className="mb-4">
                      <InputText
                        control={control}
                        label="País"
                        name="pais"
                        placeholder="Opcional"
                        error={errors.pais && errors.pais.message}
                      />
                    </Col>
                    <Col lg={4} className="mb-4">
                      <InputText
                        control={control}
                        label="Cidade"
                        name="cidade"
                        placeholder="Opcional"
                        error={errors.cidade && errors.cidade.message}
                      />
                    </Col>
                    <Col lg={4} className="mb-4">
                      <InputText
                        control={control}
                        label="Estado"
                        name="estado"
                        placeholder="Opcional"
                        error={errors.estado && errors.estado.message}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col className="d-flex justify-content-end">
                      <IoMdHelpCircle
                        color={AZUL}
                        size={24}
                        onClick={() => setDica(true)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4 mb-4">
                    <Col lg={12} className="mb-4">
                      <Titulo
                        titulo="Conte nos um pouco mais sobre você"
                        tamanho={24}
                        cor={PRETO_60}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12} className="mb-4">
                      <TextArea
                        control={control}
                        name="sobre"
                        placeholder="Descreva aqui um pouco mais sobre você"
                        error={errors.sobre && errors.sobre.message}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col className="d-flex justify-content-end">
                      <IoMdHelpCircle
                        color={AZUL}
                        size={24}
                        onClick={() => setDica(true)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col lg={12} className="mb-4">
                      <Titulo
                        titulo="Áreas de atuação"
                        tamanho={24}
                        cor={PRETO_60}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12} className="mb-4">
                      <TagInput
                        name="areas_atuacao"
                        value={areaAtuacao}
                        setter={setAreaAtuacao}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12} className="mt-4 mb-4">
                      <LinkFornecedor href="#">
                        Para mais opções de cadastro, entre no modo Fornecedor
                      </LinkFornecedor>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col lg={12} className="d-flex justify-content-end">
                      <GhostButton>SALVAR</GhostButton>
                    </Col>
                  </Row>
                </AccordionItem>

                <AccordionItem
                  idHeader="dados-financeiros"
                  idCollapse="collapse-dados-financeiros"
                  title="Dados financeiros"
                >
                  <Row>
                    <Col className="d-flex justify-content-end">
                      <IoMdHelpCircle
                        color={AZUL}
                        size={24}
                        onClick={() => setDica(true)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4 mb-4">
                    <Col lg={12} className="mb-4">
                      <Titulo
                        titulo="Cartão de Crédito"
                        tamanho={24}
                        cor={PRETO_60}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col lg={6} className="mb-4">
                      <Row>
                        <Col
                          lg={12}
                          className="mb-4"
                          onFocus={() => setRotacionarCartao(false)}
                        >
                          <InputText
                            control={control}
                            label="Número"
                            name="numero_cartao"
                            placeholder="Obrigatório"
                            error={
                              errors.numero_cartao &&
                              errors.numero_cartao.message
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          lg={12}
                          className="mb-4"
                          onFocus={() => setRotacionarCartao(false)}
                        >
                          <InputText
                            control={control}
                            label="Nome e sobrenome"
                            name="nome_cartao"
                            placeholder="Obrigatório"
                            error={
                              errors.nome_cartao && errors.nome_cartao.message
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          lg={6}
                          className="mb-4"
                          onFocus={() => setRotacionarCartao(false)}
                        >
                          <InputText
                            control={control}
                            label="Vencimento"
                            name="vencimento"
                            placeholder="Obrigatório"
                            error={
                              errors.vencimento && errors.vencimento.message
                            }
                          />
                        </Col>
                        <Col
                          lg={6}
                          className="mb-4"
                          onFocus={() => setRotacionarCartao(true)}
                        >
                          <InputText
                            control={control}
                            label="Código de segurança"
                            name="cvv"
                            placeholder="Obrigatório"
                            error={errors.cvv && errors.cvv.message}
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col lg={6} className="mb-4 d-flex align-items-center">
                      <CartaoFlip
                        rotacionar={rotacionarCartao}
                        dados={dadosCartao}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4 mb-4">
                    <Col lg={12} className="mb-4">
                      <Titulo
                        titulo="Dados bancários para reembolso"
                        tamanho={24}
                        cor={PRETO_60}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col
                      lg={12}
                      className="mb-4"
                      onFocus={() => setRotacionarCartao(false)}
                    >
                      <InputText
                        control={control}
                        label="Nome e sobrenome"
                        name="nome_conta"
                        placeholder="Obrigatório"
                        error={errors.nome_conta && errors.nome_conta.message}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={4} className="mb-4">
                      <InputText
                        control={control}
                        label="Banco"
                        name="banco"
                        placeholder="Obrigatório"
                        error={errors.banco && errors.banco.message}
                      />
                    </Col>
                    <Col lg={4} className="mb-4">
                      <InputText
                        control={control}
                        label="Agência"
                        name="agencia"
                        placeholder="Obrigatório"
                        error={errors.agencia && errors.agencia.message}
                      />
                    </Col>
                    <Col lg={4} className="mb-4">
                      <InputText
                        control={control}
                        label="Conta"
                        name="conta"
                        placeholder="Obrigatório"
                        error={errors.conta && errors.conta.message}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} className="mb-4">
                      <InputText
                        control={control}
                        label="Tipo de chave"
                        name="tipo_chave"
                        placeholder="Obrigatório"
                        error={errors.tipo_chave && errors.tipo_chave.message}
                      />
                    </Col>
                    <Col lg={6} className="mb-4">
                      <InputText
                        control={control}
                        label="Pix"
                        name="pix"
                        placeholder="Obrigatório"
                        error={errors.pix && errors.pix.message}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col lg={12} className="d-flex justify-content-end">
                      <GhostButton>SALVAR</GhostButton>
                    </Col>
                  </Row>
                </AccordionItem>

                <AccordionItem
                  idHeader="condicoes-gerais"
                  idCollapse="collapse-condicoes-gerais"
                  title="Condições gerais"
                >
                  <Row>
                    <Col className="d-flex justify-content-end">
                      <IoMdHelpCircle
                        color={AZUL}
                        size={24}
                        onClick={() => setDica(true)}
                      />
                    </Col>
                  </Row>

                  <Row className="mt-4 mb-4">
                    <Col lg={12} className="mb-4">
                      <Titulo
                        titulo="Altere suas opções de notifcações"
                        tamanho={24}
                        cor={PRETO_60}
                      />
                    </Col>
                  </Row>

                  <Condicao>
                    <label>E-mail com novidade da plataforma</label>

                    <ToggleSwitch
                      control={control}
                      name="email_novidade_plataforma"
                      label=""
                      error={
                        errors.email_novidade_plataforma &&
                        errors.email_novidade_plataforma.message
                      }
                    />
                  </Condicao>
                  <Condicao>
                    <label>
                      Receber notificação quando receber uma proposta
                    </label>

                    <ToggleSwitch
                      control={control}
                      name="notificacao_proposta"
                      label=""
                      error={
                        errors.notificacao_proposta &&
                        errors.notificacao_proposta.message
                      }
                    />
                  </Condicao>
                  <Condicao>
                    <label>
                      Receber e-mail quando mensagens forem enviadas no chat da
                      plataforma
                    </label>

                    <ToggleSwitch
                      control={control}
                      name="email_mensagens_chat"
                      label=""
                      error={
                        errors.email_mensagens_chat &&
                        errors.email_mensagens_chat.message
                      }
                    />
                  </Condicao>
                  <Condicao>
                    <label>
                      Receber notificação quando meu projeto for aprovado
                    </label>

                    <ToggleSwitch
                      control={control}
                      name="notificacao_projeto_aprovado"
                      label=""
                      error={
                        errors.notificacao_projeto_aprovado &&
                        errors.notificacao_projeto_aprovado.message
                      }
                    />
                  </Condicao>
                  <ModalCentralMenu
                    showModal={showRecomendacaoModal}
                    setShowModal={setShowRecomendacaoModal}
                  />
                  <Condicao>
                    <label>Receber notificação via chat interno</label>

                    <ToggleSwitch
                      control={control}
                      name="notificacao_chat_interno"
                      label=""
                      error={
                        errors.notificacao_chat_interno &&
                        errors.notificacao_chat_interno.message
                      }
                    />
                  </Condicao>
                  <Condicao>
                    <label>Receber notificação por WhatsApp</label>

                    <ToggleSwitch
                      control={control}
                      name="notificacao_whatsapp"
                      label=""
                      error={
                        errors.notificacao_whatsapp &&
                        errors.notificacao_whatsapp.message
                      }
                    />
                  </Condicao>
                </AccordionItem>
              </Accordion>
            </Col>
          </Row>

          <Spacer size={122} />

          <div className="btn-acoes">
            <GhostButton>VOLTAR A HOME</GhostButton>
          </div>
        </Container>
      </Layout>

      <Antonio mensagem={mensagem} dica={dica} setDica={setDica} />
    </Content>
  );
}
