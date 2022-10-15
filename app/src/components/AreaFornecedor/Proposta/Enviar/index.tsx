import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { Anexo } from '../../../../components/Anexo';
import { Card } from '../../../../components/Card';
import { Button } from '../../../../components/Form/Button';
import { InputCheck } from '../../../../components/Form/InputCheck';
import { InputList } from '../../../../components/Form/InputList';
import { InputNumber } from '../../../../components/Form/InputNumber';
import { TextArea } from '../../../../components/Form/TextArea';
import { Titulo } from '../../../../components/Titulo';
import { usePropostaFornecedor } from '../../../../hooks/propostaFornecedor';
import { oportunidades_api } from '../../../../services/oportunidades_api';
import { LARANJA, PRETO_10, VERDE } from '../../../../styles/variaveis';
import { useAuth } from '../../../../contexts/auth';

import { AvatarModeracao } from '../../../../components/AvatarModeracao';

import {
  DiasCorridosContainer,
  Error,
  Load,
  ValoresContainer,
  ValueMax,
  AjudaCalculadora,
  TitleCondicoes,
} from './style';
import Content from './style';
import { ModalInformation } from '../../../../components/ModalInformation';
import { formatToPrice } from '../../../../helpers/formatsHelper';
import { InputMoney } from '../../../../components/Form/InputMoney';
import { useLimitacoesPlanos } from '../../../../contexts/planLimitations';
import { ModalCalculadora } from '../../../../components/ModalCalculadora';

export default function Enviar() {
  const {
    control,
    errors,
    setValue,
    handleOnSubmit,
    dataInicio,
    setDataInicio,
    dataFinal,
    setDataFinal,
    watch,
    setAnexo,
    editar,
    setEditar,
    setIdProposta,
    proposaAlreadySubmitted,
    profileInModeration,
    setProfileInModeration,
    successModalIsOpen,
    requisitos,
    setRequisitos,
    metodoEntrega,
    setMetodoEntrega,
    isLoading,
    setArquivosDaProposta,
    project,
    condicoesGerais,
    setCondicoesGerais,
  } = usePropostaFornecedor();
  const [valor, setValor] = useState<number>(0);
  const [arquivos, setArquivos] = useState<string[]>([]);
  const location = useLocation();
  const { state }: { state: any } = location;
  const idProject = window.location.href.split('/')[5];
  const [diasFinalChecked, setDiasFinalChecked] = useState<boolean>();
  const [diasIncioChecked, setDiasInicioChecked] = useState<boolean>();
  const [valorTaxa, setValorTaxa] = useState(0);
  const [taxaFornecedor, setTaxaFornecedor] = useState(10);
  const { buscarLimitacoes, limitacoesPlano } = useLimitacoesPlanos();
  const [showModalCalculadora, setShowModalCalculadora] = useState(false);

  const { user } = useAuth();

  function handleDisponibilityDate(
    disponibilityDate: string,
    baseDate: string,
  ) {
    const baseDateFormated = new Date(baseDate).getTime();
    let dateToInitialize = new Date(disponibilityDate.slice(0, 10)).getTime();
    //transformando milissegundos em dias
    return Math.ceil(
      (dateToInitialize - baseDateFormated) / 24 / 60 / 60 / 1000,
    );
  }

  const handleGetProviderFee = useCallback(() => {
    setTaxaFornecedor(Number(limitacoesPlano.taxaAdministracao));
  }, [limitacoesPlano.taxaAdministracao]);

  useEffect(() => {
    watch(value => {
      if (control._formValues.dias_inicial) {
        setDiasInicioChecked(true);
        setDataInicio('dias_inicial');
      } else setDiasInicioChecked(false);
    });
  }, [setDataInicio, control._formValues.dias_inicial, watch]);

  useEffect(() => {
    watch(value => {
      if (control._formValues.dias_final) {
        setDiasFinalChecked(true);
        setDataFinal('dias_final');
      } else setDiasFinalChecked(false);
    });
  }, [setDataFinal, control._formValues.dias_final, watch]);

  useEffect(() => {
    buscarLimitacoes();
    handleGetProviderFee();
  }, [buscarLimitacoes, handleGetProviderFee, idProject]);

  useEffect(() => {
    watch((value: any) => {
      setValor(Number(value.valor_proposta));
    });
    let taxaValue = 0;
    if (project.escopo === 'FECHADO') {
      taxaValue = valor / (1 - 0.12) - valor;
    } else if (project.escopo === 'ABERTO') {
      taxaValue =
        (valor * project.totalHoras) / (1 - 0.12) - valor * project.totalHoras;
    }
    setValorTaxa(taxaValue >= 14 ? taxaValue : 14);
  }, [
    watch,
    project.escopo,
    project.totalHoras,
    control._formValues.valor_proposta,
    valor,
    user.plano,
    user.id_pessoa,
    taxaFornecedor,
  ]);

  useEffect(() => {
    if (state?.type) {
      oportunidades_api
        .get(`projetos/propostas/${state.id_proposta}`)
        .then(({ data }) => {
          setValue('description', data.descricao, {
            shouldValidate: true,
          });
          if (project.escopo === 'ABERTO')
            setValue('valor_proposta', data.valor / data.totalHoras, {
              shouldValidate: true,
            });
          else
            setValue('valor_proposta', data.valor, {
              shouldValidate: true,
            });

          setValue('total_horas', data.totalHoras, { shouldValidate: true });

          const daysToDisponibility = handleDisponibilityDate(
            data.dataInicioEstimada,
            data.dataHoraUltimaAtualizacao,
          );

          if (daysToDisponibility <= 1) setDataInicio('01');
          else if (daysToDisponibility === 3) setDataInicio('03');
          else if (daysToDisponibility === 7) setDataInicio('07');
          else {
            setDataInicio(daysToDisponibility.toString());
            setValue('dias_inicial', daysToDisponibility.toString());
          }

          if (data.prazoConclusao === 1) setDataFinal('01');
          else if (data.prazoConclusao === 3) setDataFinal('03');
          else if (data.prazoConclusao === 7) setDataFinal('07');
          else {
            setDataFinal(data.prazoConclusao.toString());
            setValue('dias_final', data.prazoConclusao.toString());
          }

          setArquivos(data.arquivos.map((arquivo: any) => arquivo.id));
          setArquivosDaProposta(
            data.arquivos.map((arquivo: any) => arquivo.id),
          );

          setCondicoesGerais(
            data.condicoesGerais.map((condicao: any) => condicao),
          );

          setMetodoEntrega(
            data.entregaveis.map((entrega: any) => entrega.descricao),
          );
          setRequisitos(
            data.requisitos.map((requisito: any) => requisito.descricao),
          );
          setIdProposta(data.id);

          setEditar(true);
        });
    }
  }, [
    project.escopo,
    setAnexo,
    setArquivosDaProposta,
    setCondicoesGerais,
    setDataFinal,
    setDataInicio,
    setEditar,
    setIdProposta,
    setMetodoEntrega,
    setRequisitos,
    setValue,
    state,
  ]);

  const renderProposaAlreadySubmittedError = proposaAlreadySubmitted ? (
    <Row className="mt-4 text-end">
      <Col lg={12}>
        <Error>
          Uma proposta não pode ser enviada mais de uma vez para o mesmo
          projeto.
        </Error>
      </Col>
    </Row>
  ) : null;

  const renderProfileInModeration = profileInModeration ? (
    <AvatarModeracao
      mostrar={profileInModeration}
      esconderAvatar={() => {
        setProfileInModeration(false);
      }}
    />
  ) : null;

  function handleArquivos(values: string[]) {
    setArquivosDaProposta(values);
  }

  return (
    <Content>
      <Card>
        <Row className="mt-4">
          <Col xs={12}>
            <Titulo titulo="Enviar uma proposta" cor={PRETO_10} tamanho={28} />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={8}>
            <TextArea
              control={control}
              name="description"
              label="Descreva o trabalho a ser feito (Escopo)"
              placeholder="Obrigatorio"
              error={errors.description && errors.description.message}
              labelIsBold
              maxLength={1000}
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg={12}>
            <Anexo
              control={control}
              name="anexo_proposta"
              label="Anexe aqui um arquivo de proposta que deseja enviar para esse projeto"
              setValue={setAnexo}
              onDeleteValues={handleArquivos}
              value={arquivos}
              id_proposta={state?.id_proposta}
              getValues={files => setAnexo(files)}
            />
          </Col>
        </Row>

        {project.escopo === 'FECHADO' ? (
          <Row className="mt-5">
            <label className="label-total-horas">
              Total de horas estimadas a serem gastas
            </label>
            <Col lg={10} className="d-flex align-items-center">
              <Col lg={1}>
                <InputNumber
                  control={control}
                  name="total_horas"
                  placeholder="30"
                />
              </Col>
              <p className="total-horas">horas</p>
            </Col>
            {errors.total_horas && (
              <span className="block-error">{errors.total_horas.message}</span>
            )}
          </Row>
        ) : (
          <Row className="mt-5">
            <Col
              lg={6}
              className="d-flex justify-content-between align-items-center"
            >
              <strong>Quantidade de horas: {project.totalHoras}h</strong>
              <strong>
                Prazo de entrega:{' '}
                {project.prazoConclusao === 1
                  ? project.prazoConclusao + ' dia'
                  : project.prazoConclusao + ' dias'}
              </strong>
            </Col>
          </Row>
        )}
        <Row className="mt-5">
          <Col lg={9}>
            <Row>
              <Col lg={2}>
                <label>
                  <strong>Disponibilidade</strong>
                </label>
              </Col>
              <Col lg={3} className="ms-4 mb-4">
                <InputCheck
                  checked={dataInicio === '01'}
                  control={control}
                  name="imediato_inicial"
                  type="checkbox"
                  className="label-blue"
                  label="Imediato"
                  onChangeValue={value => {
                    setDataInicio('01');
                    setDiasInicioChecked(false);
                    setValue('dias_inicial', '');
                  }}
                />
                <InputCheck
                  checked={dataInicio === '03'}
                  control={control}
                  name="03_dias_inicial"
                  type="checkbox"
                  className="label-blue"
                  label="03 dias corridos"
                  onChangeValue={value => {
                    setDataInicio('03');
                    setDiasInicioChecked(false);
                    setValue('dias_inicial', '');
                  }}
                />
                <InputCheck
                  checked={dataInicio === '07'}
                  control={control}
                  name="07_dias_inicial"
                  type="checkbox"
                  className="label-blue"
                  label="07 dias corridos"
                  onChangeValue={value => {
                    setDataInicio('07');
                    setDiasInicioChecked(false);
                    setValue('dias_inicial', '');
                  }}
                />
                <DiasCorridosContainer>
                  <InputCheck
                    control={control}
                    name="prazo_inicial"
                    checked={dataInicio === 'dias_inicial' || diasIncioChecked}
                    onChangeValue={value => {
                      setDataInicio('dias_inicial');
                      setDiasInicioChecked(true);
                    }}
                  />
                  <InputNumber
                    control={control}
                    name="dias_inicial"
                    placeholder="30"
                  />
                  <span>dias corridos</span>
                </DiasCorridosContainer>
                {errors.dias_inicial && (
                  <span className="block-error">
                    {errors.dias_inicial.message}
                  </span>
                )}
              </Col>
              {project.escopo === 'FECHADO' && (
                <>
                  <Col lg={2}>
                    <label>
                      <strong>Prazo de entrega</strong>
                    </label>
                  </Col>
                  <Col lg={3} className="ms-4 mb-4">
                    <InputCheck
                      control={control}
                      name="imediata_final"
                      label="Imediata"
                      checked={dataFinal === '01'}
                      onChangeValue={value => {
                        setDataFinal('01');
                        setDiasFinalChecked(false);
                        setValue('dias_final', '');
                      }}
                    />
                    <InputCheck
                      control={control}
                      name="03_dias_final"
                      label="03 dias corridos"
                      checked={dataFinal === '03'}
                      onChangeValue={value => {
                        setDataFinal('03');
                        setDiasFinalChecked(false);
                        setValue('dias_final', '');
                      }}
                    />
                    <InputCheck
                      control={control}
                      name="07_dias_final"
                      label="07 dias corridos"
                      checked={dataFinal === '07'}
                      onChangeValue={value => {
                        setDataFinal('07');
                        setDiasFinalChecked(false);
                        setValue('dias_final', '');
                      }}
                    />
                    <DiasCorridosContainer>
                      <InputCheck
                        control={control}
                        name="prazo_final"
                        checked={dataFinal === 'dias_final' || diasFinalChecked}
                        onChangeValue={value => {
                          setDataFinal('dias_final');
                          setDiasFinalChecked(true);
                        }}
                      />
                      <InputNumber
                        control={control}
                        name="dias_final"
                        placeholder="30"
                      />
                      <span>dias corridos</span>
                    </DiasCorridosContainer>
                    {errors.dias_final && (
                      <span className="block-error">
                        {errors.dias_final.message}
                      </span>
                    )}
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
        {project.escopo === 'FECHADO' && (
          <>
            <Row>
              <Col lg={8} className="mt-4">
                <InputList
                  control={control}
                  setValue={setMetodoEntrega}
                  name="metodo_entrega"
                  label="Adicione os métodos de entrega ou entregáveis (até 10 itens)"
                  items={metodoEntrega}
                  labelIsBold
                />
                {errors.metodo_entrega && (
                  <span className="block-error">
                    {errors.metodo_entrega.message}
                  </span>
                )}
              </Col>
            </Row>

            <Row>
              <Col lg={8} className="mt-4">
                <InputList
                  control={control}
                  setValue={setRequisitos}
                  name="metodo_aceite_cliente"
                  label="Adicione o que você precisa do cliente (até 10 itens)"
                  items={requisitos}
                  labelIsBold
                  color={LARANJA}
                />
                {errors.metodo_aceite_cliente && (
                  <span className="block-error">
                    {errors.metodo_aceite_cliente.message}
                  </span>
                )}
              </Col>
            </Row>
          </>
        )}

        {!project.proBono && (
          <Row className="mt-4">
            <Col lg={8} className="mt-4">
              <TitleCondicoes>
                Condições gerais ou regras para o cancelamento do serviço
              </TitleCondicoes>

              <InputList
                maxLength={100}
                control={control}
                setValue={setCondicoesGerais}
                name="condicoes_gerais"
                label="Aqui pode adicionar suas condições de entrega, de desistência e outros"
                items={condicoesGerais}
                color={LARANJA}
              />

              {errors.condicoes_entrega && (
                <span className="block-error">
                  {errors.condicoes_entrega.message}
                </span>
              )}
            </Col>
          </Row>
        )}
        {!project.proBono && (
          <Row className="mt-4 d-flex align-items-center">
            {project.escopo === 'FECHADO' ? (
              <Col lg={2} className="mt-4">
                <InputMoney
                  control={control}
                  name="valor_proposta"
                  label="Valor da Proposta"
                  labelIsBold
                  maxValue={8000}
                />
                {errors.valor_proposta ? (
                  <p className="block-error">{errors.valor_proposta.message}</p>
                ) : (
                  <ValueMax>Valor máximo: R$ 8.000,00</ValueMax>
                )}
              </Col>
            ) : (
              <Col lg={2} className="mt-4">
                <InputMoney
                  control={control}
                  name="valor_proposta"
                  label="Valor da hora"
                  labelIsBold
                  maxValue={8000}
                />

                {errors.valor_proposta ? (
                  <span className="block-error">
                    {errors.valor_proposta.message}
                  </span>
                ) : (
                  <ValueMax>Valor máximo: R$ 8.000,00</ValueMax>
                )}
              </Col>
            )}

            {valor > 0 && (
              <Col lg={3}>
                <ValoresContainer>
                  <span>Taxa freelas town</span>
                  <span>{formatToPrice(valorTaxa)}</span>
                </ValoresContainer>
                <ValoresContainer>
                  <h4>Total</h4>

                  {project.escopo === 'FECHADO' ? (
                    <h4>{formatToPrice(valor + valorTaxa)}</h4>
                  ) : (
                    <h4>
                      {formatToPrice(valor * project.totalHoras + valorTaxa)}
                    </h4>
                  )}
                </ValoresContainer>
              </Col>
            )}
          </Row>
        )}

        <Row className="mt-4">
          {!project.proBono && (
            <Col lg={3}>
              <AjudaCalculadora onClick={() => setShowModalCalculadora(true)}>
                Precisa de ajuda para calcular?
              </AjudaCalculadora>
            </Col>
          )}
        </Row>

        <Row className="mt-4 text-end">
          <Col lg={12}>
            {isLoading ? (
              <Load>
                <div
                  className="spinner-border text-secundary"
                  role="status"
                ></div>
              </Load>
            ) : (
              <Button
                onClick={() => {
                  handleOnSubmit();
                }}
                label={editar ? 'SALVAR PROPOSTA' : 'ENVIAR PROPOSTA'}
              />
            )}
          </Col>
        </Row>

        {renderProposaAlreadySubmittedError}

        {renderProfileInModeration}

        <ModalInformation
          title="Proposta enviada com sucesso! :)"
          showModal={successModalIsOpen}
          color={VERDE}
        />

        <ModalCalculadora
          setShowModal={setShowModalCalculadora}
          showModal={showModalCalculadora}
          porHora={project.escopo === 'ABERTO'}
          totalHoras={project.totalHoras}
        />
      </Card>
    </Content>
  );
}
