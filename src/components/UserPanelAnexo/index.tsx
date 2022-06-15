import { useEffect, useState } from 'react';
import { handleSplitAt } from '../../helpers/formatsHelper';
import { arquivos_api } from '../../services/arquivos_api';
import { pessoas_api } from '../../services/pessoas_api';
import {
  Anexo,
  ContainerAnexos,
  ContainerStyled,
  ContentImageStyled,
  ContentInfoStyled,
  TypographyNameStyled,
} from './styles';

type Props = {
  anexo: string;
  id: number;
};

export const UserPanelAnexo = ({ anexo, id }: Props): JSX.Element => {
  const [imageRemetente, setImageRemetente] = useState('');
  const [id_arquivo, setId_arquivo] = useState();
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (id_arquivo) {
      arquivos_api
        .get<{ url: string }>(`/arquivos/${id_arquivo}`)
        .then(({ data }) => {
          const { url } = data;
          setImageRemetente(url);
        });
    }
  }, [id_arquivo]);

  useEffect(() => {
    pessoas_api.get(`/pessoas/${id}`).then(({ data }) => {
      setName(data.nome_tratamento);
      setId_arquivo(data.id_arquivo);
    });
  }, [id]);

  return (
    <>
      <ContainerStyled>
        <ContentImageStyled>
          <img src={imageRemetente} alt="Logo" />
        </ContentImageStyled>
        <ContentInfoStyled>
          <TypographyNameStyled>{name}</TypographyNameStyled>
          <ContainerAnexos>
            <Anexo href={anexo} download target="blank">
              {handleSplitAt(anexo) + ' '}
            </Anexo>
          </ContainerAnexos>
        </ContentInfoStyled>
      </ContainerStyled>
    </>
  );
};
