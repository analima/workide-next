import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  Descricao,
  DescricaoRodape,
  DescricaoRodapeContainer,
  DescricaoTexto,
  DescricaoTitulo,
  ButtomCase,
} from './style';
import Content from './style';

interface ITooltipDescricao {
  id: number;
  titulo: string;
  problema: string;
  solucao: string;
  resultado: string;
  total_horas: number;
  setor: string;
}

interface IItem {
  item: ITooltipDescricao[];
  open?: boolean;
  servicoLink?: string;
}

export default function TooltipDescricao({ item, open = false, servicoLink }: IItem) {
  const [caseSucessNumber, setCaseSucessNumber] = useState(0);

  useEffect(() => {
    if (item) {
      setCaseSucessNumber(item[0]?.id);
    }
  }, [item]);

  return (
    <Content>
      <Container>
        <Row>
          <Col lg={12} className="d-flex gap-4 col-btn-descricao">
            {item.map(i => (
              <ButtomCase
                key={i.id}
                active={i.id === caseSucessNumber}
                onClick={() => setCaseSucessNumber(i.id)}
              >
                {i.titulo}
              </ButtomCase>
            ))}
          </Col>
          {item
            .filter(item => item.id === caseSucessNumber)
            .map(i => (
              <Col lg={12} className="col-box-descricao" key={i.id}>
                <Descricao>
                  <DescricaoTitulo>O problema</DescricaoTitulo>
                  <DescricaoTexto>{i.problema}</DescricaoTexto>

                  <DescricaoTitulo>A solução</DescricaoTitulo>
                  <DescricaoTexto>{i.solucao}</DescricaoTexto>

                  <DescricaoTitulo>O resultado</DescricaoTitulo>
                  <DescricaoTexto>{i.resultado}</DescricaoTexto>

                  <DescricaoRodapeContainer>
                    <div>
                      <DescricaoRodape>
                        Esse case levou {i.total_horas} dias para ser
                        finalizado.
                      </DescricaoRodape>
                      <DescricaoRodape>Setor: {i.setor}</DescricaoRodape>
                    </div>
                    {servicoLink && (
                      <div>
                        <DescricaoRodape>
                          Mais informações acesse:
                        </DescricaoRodape>
                        <a
                          href={servicoLink}
                          data-testid="more-info__link"
                          target="__blank"
                        >
                          {servicoLink?.length > 22 ? (
                            <>{servicoLink?.substring(0, 22)}...</>
                          ) : (
                            <>{servicoLink}</>
                          )}
                        </a>
                      </div>
                    )}
                  </DescricaoRodapeContainer>
                </Descricao>
              </Col>
            ))}
        </Row>
      </Container>
    </Content>
  );
}
