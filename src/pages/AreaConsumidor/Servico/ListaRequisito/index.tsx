import { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { InputCheck } from '../../../../components/Form/InputCheck';
import { Titulo } from '../../../../components/Titulo';
import { AZUL } from '../../../../styles/variaveis';
import {
  RequisitoContainer,
  RequisitoLabel,
  Card,
  ContainerTitle,
} from './style';
import Content from './style';
import { IRequisito } from '../../../../interfaces/IServicoInfo';
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';

export default function ListaRequisito({ requisitos }: { requisitos: IRequisito[] }) {
  const [showRequisitos, setShowRequisitos] = useState(true);
  const { control, reset } = useForm();

  useEffect(() => {
    reset({
      requisito_1: true,
    });
  }, [reset]);

  const handleShowRequisitos = useCallback(() => {
    setShowRequisitos(!showRequisitos);
  }, [showRequisitos]);

  return (
    <Content>
      <Row>
        <Col lg={12}>
          <ContainerTitle>
            <Titulo
              titulo="Lista de requisitos"
              cor={AZUL}
              tamanho={32}
              negrito={false}
            />
            {showRequisitos ? (
              <FiArrowDownCircle
                size={22}
                color={AZUL}
                onClick={handleShowRequisitos}
              />
            ) : (
              <FiArrowUpCircle
                size={22}
                color={AZUL}
                onClick={handleShowRequisitos}
              />
            )}
          </ContainerTitle>
        </Col>
      </Row>
      {showRequisitos && (
        <Row className="justify-content-left mt-4 mb-4">
          <Col lg={10}>
            <Card>
              {requisitos.map(requisito => (
                <RequisitoContainer key={requisito.id}>
                  <InputCheck
                    control={control}
                    name="requisito_1"
                    readOnly={true}
                  />
                  <RequisitoLabel>{requisito.descricao}</RequisitoLabel>
                </RequisitoContainer>
              ))}
            </Card>
          </Col>
        </Row>
      )}
    </Content>
  );
}
