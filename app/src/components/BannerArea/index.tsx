import Image from 'next/image';
import {
  Container,
  Content,
  ContentDescription,
  ContentBox,
  ContentBoxMobile,
} from './style';
import { CINZA_90 } from '../../styles/variaveis';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { IPerguntasAreasProps } from '../../interfaces/IDetalheAreaProps';
import { useEffect, useState } from 'react';

interface IProps {
  item: IPerguntasAreasProps;
}

export function BannerArea({ item }: IProps) {
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
        <ContentDescription>
          <div className="breach-chumb">
            <span>freelas town</span>
            {'>'}
            <span>Área de Atuação</span>
            {'>'}
            <span>{area.nome}</span>
          </div>
          <h1>{area.nome}</h1>

          <ContentBoxMobile>
            {area.image && (
              <Image
                width={587}
                height={631}
                src={area.image}
                alt={area.nome}
                objectFit="contain"
                loading="eager"
                layout="fill"
              />
            )}
          </ContentBoxMobile>
          <h2>
            Descubra os melhores profissionais em <b>{area.nome} </b>
            para o seu negócio!
          </h2>
          <p>
            Comece o seu projeto agora. Centenas de especialistas estão
            esperando o seu projeto ser publicado para te enviar uma proposta.
          </p>
        </ContentDescription>

        <ContentBox>
          {area.image && (
            <Image
              layout="intrinsic"
              objectFit="contain"
              width={587}
              height={631}
              alt={area.nome}
              src={area.image}
            />
          )}
        </ContentBox>
      </Content>

      <BsFillArrowDownCircleFill size={36} color={CINZA_90} />
    </Container>
  );
}
