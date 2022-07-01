import { InputHTMLAttributes, useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FaPlus, FaTimesCircle } from 'react-icons/fa';

import { Col, Form, Row } from 'react-bootstrap';

import {
  Container,
  Label,
  Button,
  Values,
  Item,
  ItemLabel,
  ItemAction,
  ContentLabel,
  ContentInput,
  InputStyled,
} from './style';
import { AZUL, VERMELHO } from '../../../styles/variaveis';
import { ScrollContainer } from '../../ScrollContainer';
import { AtividadesProps } from '../../../hooks/propostaConsumidor';
import { oportunidades_api } from '../../../services/oportunidades_api';
import { ModalInformation } from '../../ModalInformation';
import { Spinner } from '../../Spinner';
import { addMinutes, format } from 'date-fns';

interface IInputList extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  label?: string;
  secondaryLabel?: string;
  name: string;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  maxLength?: number;
  setValue: React.Dispatch<React.SetStateAction<AtividadesProps[]>>;
  color?: string;
  items: AtividadesProps[];
  labelIsBold?: boolean;
  disabled?: boolean;
  visao: string;
  idProjeto: number;
  getProjeto: () => void;
}

export function InputHour({
  items,
  label,
  secondaryLabel,
  placeholder,
  name,
  control,
  error,
  required,
  readOnly,
  maxLength,
  setValue,
  color = AZUL,
  labelIsBold,
  disabled,
  visao,
  idProjeto,
  getProjeto,
}: IInputList) {
  const now = new Date();

  const [errorMessage, setErrorMessage] = useState(error);
  const [showModal, setShowModal] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [numberHour, setNumberHour] = useState<number>(0);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState<string>('');
  const [loadingAdd, setLoadingAdd] = useState(false);

  const handleDelete = useCallback(
    (idAtividade: string) => {
      oportunidades_api
        .delete(`/projetos/${idProjeto}/atividades/${idAtividade}`)
        .then(() => {
          setTimeout(() => {
            getProjeto();
          }, 500);
        })
        .catch(() => {
          setErrorMessage('Erro ao deletar atividade');
        });
    },
    [getProjeto, idProjeto],
  );

  const formatRowDate = useCallback(async (dateStr: string) => {
    const dateFormatted = dateStr.split('/');
    const dateFormattedFormat = `${dateFormatted[2]}-${dateFormatted[1]}-${dateFormatted[0]}Z`;
    const newDate = new Date(dateFormattedFormat);
    return addMinutes(newDate, newDate.getTimezoneOffset());
  }, []);

  const handleAddAtividade = useCallback(async () => {
    try {
      const dateObj = await formatRowDate(date);

      setLoadingAdd(true);
      if (numberHour === 0 || description === '') {
        setErrorMessage('Informe todos os campos');
        setLoadingAdd(false);
        return;
      }

      if (!dateObj || String(dateObj) === 'Invalid Date' || !date.length) {
        setErrorMessage('Data inválida');
        setLoadingAdd(false);
        return;
      }

      await oportunidades_api.post(`/projetos/${idProjeto}/atividades`, {
        descricao: description,
        horas: numberHour,
        data: dateObj,
      });

      setTimeout(() => {
        setNumberHour(0);
        setDescription('');
        setDate('');
        setLoadingAdd(false);
      }, 500);
      getProjeto();
    } catch (error: any) {
      setMsgError(error.response.data.message);
      setShowModal(true);

      setTimeout(() => {
        setLoadingAdd(false);
      }, 1000);

      console.log(error);
    }
  }, [description, getProjeto, idProjeto, numberHour, date, formatRowDate]);

  const handleOnChangeDate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const dateTyped = event.target.value;

      if (dateTyped.length > 10) {
        return;
      }

      if (dateTyped.length === 3 && dateTyped.slice(-1) !== '/') {
        setDate(
          dateTyped.slice(0, dateTyped.length - 1) + '/' + dateTyped.slice(-1),
        );
      } else if (dateTyped.length === 6 && dateTyped.slice(-1) !== '/') {
        setDate(
          dateTyped.slice(0, dateTyped.length - 1) + '/' + dateTyped.slice(-1),
        );
      } else {
        setDate(dateTyped);
      }

      setErrorMessage('');
    },
    [],
  );

  return (
    <Container isInvalid={!!error}>
      {visao === 'FORNECEDOR' && (
        <>
          <Row>
            <Col lg={6}>
              <ContentLabel>
                {label && (
                  <Label htmlFor={name} required={required}>
                    {labelIsBold ? <strong>{label}</strong> : label}
                    {required && <span className="required"> *</span>}
                  </Label>
                )}

                <Form.Control
                  disabled={disabled}
                  id={`${name}-text`}
                  name={`${name}-text`}
                  maxLength={maxLength}
                  type="text"
                  placeholder={placeholder}
                  value={description}
                  onChange={e => {
                    setErrorMessage('');
                    setDescription(e.target.value);
                  }}
                  readOnly={readOnly}
                />
              </ContentLabel>
            </Col>

            <Col lg={6}>
              <ContentInput>
                <div>
                  <Label required={required}>
                    <strong>Hrs</strong>
                  </Label>
                  <InputStyled
                    value={numberHour}
                    onKeyPress={e => !/[0-9]/.test(e.key) && e.preventDefault()}
                    onChange={evt => {
                      setErrorMessage('');
                      setNumberHour(Number(evt.target.value));
                    }}
                    type="number"
                  />
                </div>
                <div>
                  <Label required={required}>
                    <strong>Data</strong>
                  </Label>

                  <InputStyled
                    width="120px"
                    value={date}
                    placeholder={`${now.getDate()}/${
                      now.getMonth() + 1
                    }/${now.getFullYear()}`}
                    onChange={evt => {
                      handleOnChangeDate(evt);
                    }}
                    type="text"
                  />
                </div>

                <Button
                  disabled={disabled}
                  color={color}
                  onClick={() => {
                    handleAddAtividade && handleAddAtividade();
                  }}
                >
                  {loadingAdd ? <Spinner /> : <FaPlus />}
                </Button>
              </ContentInput>
            </Col>
          </Row>

          <Controller
            name={name}
            control={control}
            render={({ field: { value } }) => (
              <Form.Control id={name} name={name} type="hidden" value={value} />
            )}
          />
        </>
      )}

      <ScrollContainer height={300}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Values>
          {items &&
            items.map((item, index) => (
              <Item key={index}>
                <ItemLabel visao={visao}>
                  <span title={item.descricao}>{item.descricao}</span>
                  <div>
                    <span>
                      {format(
                        addMinutes(
                          new Date(item.data),
                          new Date(item.data).getTimezoneOffset(),
                        ),
                        'dd/MM/yyyy',
                      )}
                    </span>
                    <span> ({item.horas}h)</span>
                  </div>
                </ItemLabel>

                {visao === 'FORNECEDOR' && (
                  <ItemAction onClick={() => handleDelete(item.id)}>
                    <FaTimesCircle />
                  </ItemAction>
                )}
              </Item>
            ))}
        </Values>
      </ScrollContainer>
      <ModalInformation
        showModal={showModal}
        setShowModal={setShowModal}
        title={msgError}
        color={VERMELHO}
      />
    </Container>
  );
}
