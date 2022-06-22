import { Col, Row } from 'react-bootstrap';
import { Titulo } from '../../../../components/Titulo';
import {
  Avaliacao,
  AvaliacaoContainer,
  Content,
  LabelAvaliacao,
  LabelIndicacao,
} from './style';
import { TextArea } from '../../../../components/Form/TextArea';
import { useAvaliacaoProjetoConsumidor } from '../../../../hooks/avaliacaoProjetoConsumidor';
import { CINZA_80, VERDE, VERMELHO } from '../../../../styles/variaveis';
import { range } from 'lodash';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';

export default function AjudeMelhorar() {
  const {
    control,
    nota_plataforma,
    setNota_plataforma,
    setUsabilidade,
    usabilidade,
    funcionalidade,
    seguranca,
    setFuncionalidade,
    setSeguranca,
    setValue,
  } = useAvaliacaoProjetoConsumidor();

  return (
    <Content>
      <Row>
        <Col lg={12}>
          <Titulo
            titulo="Ajude-nos também a melhorar"
            cor={VERDE}
            tamanho={24}
          />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <span>
            Em uma escala de 0 a 10, quais chances de você indicar a Gyan para
            um amigo?
          </span>
        </Col>
        <Col lg={12} className="d-flex">
          {range(0, 11).map(numero => (
            <LabelIndicacao
              key={numero}
              onClick={() => {
                setNota_plataforma(numero);
              }}
              checked={
                nota_plataforma !== undefined && numero <= nota_plataforma
              }
            >
              {numero}
            </LabelIndicacao>
          ))}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <p>Avalie agora a nossa plataforma Gyan</p>
        </Col>
        <Col lg={12}>
          <AvaliacaoContainer>
            <LabelAvaliacao>Usabilidade</LabelAvaliacao>
            <Avaliacao>
              <AiFillLike
                onClick={() => setUsabilidade(true)}
                color={
                  usabilidade && usabilidade !== undefined ? VERDE : CINZA_80
                }
              />
              <AiFillDislike
                onClick={() => setUsabilidade(false)}
                color={
                  !usabilidade && usabilidade !== undefined
                    ? VERMELHO
                    : CINZA_80
                }
              />
            </Avaliacao>
          </AvaliacaoContainer>
        </Col>
        <Col lg={12}>
          <AvaliacaoContainer>
            <LabelAvaliacao>Funcionalidade</LabelAvaliacao>
            <Avaliacao>
              <AiFillLike
                onClick={() => setFuncionalidade(true)}
                color={
                  funcionalidade && funcionalidade !== undefined
                    ? VERDE
                    : CINZA_80
                }
              />
              <AiFillDislike
                onClick={() => setFuncionalidade(false)}
                color={
                  !funcionalidade && funcionalidade !== undefined
                    ? VERMELHO
                    : CINZA_80
                }
              />
            </Avaliacao>
          </AvaliacaoContainer>
        </Col>
        <Col lg={12}>
          <AvaliacaoContainer>
            <LabelAvaliacao>Segurança</LabelAvaliacao>
            <Avaliacao>
              <AiFillLike
                onClick={() => setSeguranca(true)}
                color={seguranca && seguranca !== undefined ? VERDE : CINZA_80}
              />
              <AiFillDislike
                onClick={() => setSeguranca(false)}
                color={
                  !seguranca && seguranca !== undefined ? VERMELHO : CINZA_80
                }
              />
            </Avaliacao>
          </AvaliacaoContainer>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg={12}>
          <TextArea
            control={control}
            onChange={event => {
              setValue('comentario', event.target.value);
            }}
            name="comentario"
            placeholder="Opcional"
            label="Deixe-nos um comentário"
          />
        </Col>
      </Row>
    </Content>
  );
}
