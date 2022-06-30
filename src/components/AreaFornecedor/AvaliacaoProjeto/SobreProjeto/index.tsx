import { Col, Row } from 'react-bootstrap';
import { Titulo } from '../../../../components/Titulo';
import { AZUL } from '../../../../styles/variaveis';
import EstrelaOff from '../../../../assets/estrela-off.svg';
import Estrela from '../../../../assets/estrela.svg';
import { AvaliacaoContainer } from './style';
import Content from './style';
import { useAvaliacaoProjetoFornecedor } from '../../../../hooks/avaliacaoProjetoFornecedor';
import { TextArea } from '../../../../components/Form/TextArea';
import { useEffect, useState } from 'react';
import { pessoas_api } from '../../../../services/pessoas_api';

interface IProps {
  idConsumidor: number;
}

export default function SobreProjeto({ idConsumidor }: IProps) {
  const { control, errors, nota, setNota, setValue } =
    useAvaliacaoProjetoFornecedor();
  const [nomeConsumidor, setNomeConsumidor] = useState<string>('');

  const [numeroEstrelas, setNumeroEstrelas] = useState<Array<number>>();

  useEffect(() => {
    pessoas_api.get(`/pessoas/${idConsumidor}`).then(({ data }) => {
      setNomeConsumidor(data.nome_tratamento);
    });
  }, [idConsumidor]);

  useEffect(() => {
    const arrayAux = [];
    if (nota) {
      for (
        let quantidadeEstrelas = 1;
        quantidadeEstrelas <= 5;
        quantidadeEstrelas++
      ) {
        if (quantidadeEstrelas <= nota) arrayAux.push(1);
        else arrayAux.push(0);
      }
      setNumeroEstrelas(arrayAux);
    } else {
      const arrayAux = [];
      for (let estrelas = 1; estrelas <= 5; estrelas++) {
        arrayAux.push(0);
      }
      setNumeroEstrelas(arrayAux);
    }
  }, [nota]);

  const preencherEstrelas = (e: any, index: number) => {
    const arrayAux = [];
    for (
      let quantidadeEstrelas = 1;
      quantidadeEstrelas <= 5;
      quantidadeEstrelas++
    ) {
      if (quantidadeEstrelas <= index) arrayAux.push(1);
      else arrayAux.push(0);
    }
    setNumeroEstrelas(arrayAux);
    setNota(index);
  };

  return (
    <Content>
      <Row className="mt-3">
        <Col lg={12}>
          <Titulo titulo="Sobre o projeto" cor={AZUL} tamanho={24} />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col lg={12}>
          <span>
            Conte-nos um pouco mais como foi trabalhar com{' '}
            <strong>{nomeConsumidor}</strong>
          </span>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <span>Escolha de 1 a 5 para classificar</span>
        </Col>
        <Col lg={12}>
          <AvaliacaoContainer>
            {numeroEstrelas?.map((estrela, index) => {
              return estrela === 1 ? (
                <Estrela
                  onClick={(e: any) => preencherEstrelas(e, index + 1)}
                  key={index}
                />
              ) : (
                <EstrelaOff
                  onClick={(e: any) => preencherEstrelas(e, index + 1)}
                  key={index}
                />
              );
            })}
          </AvaliacaoContainer>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col lg={12}>
          <TextArea
            control={control}
            onChange={event => {
              setValue('experiencia', event.target.value);
            }}
            name="experiencia"
            placeholder="Opcional"
            label="Você também pode deixar uma avaliação por escrito. Descreva como foi sua experiência"
            error={errors.experiencia && errors.experiencia.message}
            contador={false}
          />
        </Col>
      </Row>
    </Content>
  );
}
