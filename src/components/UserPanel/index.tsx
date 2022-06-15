import { useEffect, useState } from 'react';
import { handleSplitAt } from '../../helpers/formatsHelper';
import { arquivos_api } from '../../services/arquivos_api';
import {
  Anexo,
  ContainerAnexos,
  ContainerStyled,
  ContentImageStyled,
  ContentInfoStyled,
  TypographyDateStyled,
  TypographyInfoStyled,
  TypographyNameStyled,
} from './style';
import { parseISO, format } from 'date-fns';

type Props = {
  image: string | number;
  name: string;
  text: string;
  date: string;
  isAnexo?: boolean;
};

export const UserPanel = ({
  image,
  name,
  text,
  date,
  isAnexo,
}: Props): JSX.Element => {
  const dateCurrency = format(parseISO(date), 'dd/MM/yyyy HH:mm');
  const [imageRemetente, setImageRemetente] = useState('');

  useEffect(() => {
    if (image) {
      arquivos_api
        .get<{ url: string }>(`/arquivos/${image}`)
        .then(({ data }) => {
          const { url } = data;
          setImageRemetente(url);
        });
    }
  }, [image]);

  return (
    <>
      {imageRemetente && (
        <ContainerStyled>
          <ContentImageStyled>
            <img src={imageRemetente} alt="Logo" />
          </ContentImageStyled>
          <ContentInfoStyled>
            <TypographyNameStyled>{name}</TypographyNameStyled>
            {!isAnexo ? (
              <TypographyInfoStyled>{text}</TypographyInfoStyled>
            ) : (
              <ContainerAnexos>
                <Anexo href={text} download target="blank">
                  {handleSplitAt(text) + ''}
                </Anexo>
              </ContainerAnexos>
            )}
            <TypographyDateStyled>{dateCurrency}</TypographyDateStyled>
          </ContentInfoStyled>
        </ContainerStyled>
      )}
    </>
  );
};
