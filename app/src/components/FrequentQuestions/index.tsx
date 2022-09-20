import {
  AccordionPrimary,
  AccordionSecondary,
  Content,
  Container,
} from './styles';
import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { PRETO_10 } from '../../styles/variaveis';
import { IPerguntasAreasProps } from '../../interfaces/IDetalheAreaProps';

interface IProps {
  item: IPerguntasAreasProps;
}

export function FrequentQuestions({ item }: IProps) {
  const [idx, setIdx] = useState<number[]>([]);
  const [area, setArea] = useState<IPerguntasAreasProps>(
    {} as IPerguntasAreasProps,
  );
  useEffect(() => {
    if (!item) setArea({} as IPerguntasAreasProps);
    if (item) setArea(item);
  }, [item]);

  return (
    <Container>
      <Content>
        <h1>Perguntas Frequentes sobre {area.nome}</h1>
        {area.perguntas && (
          <>
            {area.perguntas.map((i: any, index: any) => (
              <AccordionPrimary key={i.id} id="headingOne">
                <AccordionSecondary
                  id="headingOne"
                  eventKey={String(index)}
                  onClick={() => {
                    if (idx.includes(index))
                      setIdx(idx.filter((i: number) => i !== index));
                    else setIdx([...idx, index]);
                  }}
                >
                  <span>{i.pergunta}</span>

                  <div className="icon">
                    {idx.includes(index) ? (
                      <IoIosArrowUp size={20} color={PRETO_10} />
                    ) : (
                      <IoIosArrowDown size={20} color={PRETO_10} />
                    )}
                  </div>
                </AccordionSecondary>

                <AccordionPrimary.Collapse eventKey={String(index)}>
                  <div>
                    <span>{i.resposta}</span>
                    {i.subresposta &&
                      i.subresposta.map((sub: string) => (
                        <li key={sub}>- {sub}</li>
                      ))}
                  </div>
                </AccordionPrimary.Collapse>
              </AccordionPrimary>
            ))}
          </>
        )}
      </Content>
    </Container>
  );
}
