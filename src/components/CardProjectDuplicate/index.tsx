import { Spacer } from '../Spacer';
import {
  ContainerStyled,
  TypographyName,
  TypographyDateStyled,
  TypographyTextStyled,
  ContentSubAreaStyled,
  LineSubAreaStyled,
  ButtonPublishStyled,
  CardHeader,
  Images,
  TypeProject,
  TextStatus,
} from './style';

type AreaInteresse = {
  dataHoraCriacao: string;
  descricao: string;
  id: number;
};

export type SubAreaType = {
  id: number;
  descricao: string;
  areaInteresse: Array<AreaInteresse>;
};

type Props = {
  nameProject: string;
  hours: string;
  text: string;
  arraySubArea: SubAreaType[];
  handleClick: () => void;
  img: string[];

  selectedItem?: number;
  id_project?: number;
  status?: {
    codigo: string;
    descricao: string;
  };
};

export const CardProjectDuplicate = ({
  nameProject,
  hours,
  text,
  arraySubArea,
  handleClick,
  img,
  selectedItem,
  id_project,
  status,
}: Props): JSX.Element => {
  const createdDate = new Date(hours);
  return (
    <>
      {id_project ? (
        <ContainerStyled
          selected={id_project === selectedItem ? true : false}
          onClick={handleClick}
        >
          <CardHeader>
            <TypographyName>{nameProject}</TypographyName>
            {img.length > 0 ? (
              <Images>
                {img.slice(0, 2).map((e: string) => (
                  <img key={e} src={e} alt="" />
                ))}
                {img.length > 2 && (
                  <div className="length-img">
                    <span>+{img.length - 2}</span>
                  </div>
                )}
              </Images>
            ) : (
              <TypeProject>Publico</TypeProject>
            )}
          </CardHeader>
          <Spacer size={10} />
          <TypographyDateStyled>
            Publicado dia{' '}
            {createdDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
          </TypographyDateStyled>
          <Spacer size={10} />
          <TypographyTextStyled>{text}</TypographyTextStyled>
          <Spacer size={12} />
          <ContentSubAreaStyled>
            <div className="content-area-label">
              {arraySubArea.map((item: SubAreaType) => (
                <LineSubAreaStyled key={item.id}>
                  {item.descricao}
                </LineSubAreaStyled>
              ))}
            </div>
          </ContentSubAreaStyled>
          {!status ? (
            <ButtonPublishStyled onClick={handleClick}>
              Publicado
            </ButtonPublishStyled>
          ) : (
            <TextStatus status={status.codigo}>{status.descricao}</TextStatus>
          )}
        </ContainerStyled>
      ) : (
        <ContainerStyled>
          <CardHeader>
            <TypographyName>{nameProject}</TypographyName>
            {img.length > 0 ? (
              <Images>
                {img.slice(0, 2).map((e: string) => (
                  <img key={e} src={e} alt="" />
                ))}
                <div className="length-img">
                  <span>+{img.length - 2}</span>
                </div>
              </Images>
            ) : (
              <TypeProject>Publico</TypeProject>
            )}
          </CardHeader>
          <Spacer size={10} />
          <TypographyDateStyled>
            Publicado dia{' '}
            {createdDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
          </TypographyDateStyled>
          <Spacer size={10} />
          <TypographyTextStyled>{text}</TypographyTextStyled>
          <Spacer size={12} />
          <ContentSubAreaStyled>
            <div className="content-area-label">
              {arraySubArea.map((item: SubAreaType) => (
                <LineSubAreaStyled key={item.id}>
                  {item.descricao}
                </LineSubAreaStyled>
              ))}
            </div>
          </ContentSubAreaStyled>
          {!status ? (
            <ButtonPublishStyled onClick={handleClick}>
              Publicado
            </ButtonPublishStyled>
          ) : (
            <TextStatus status={status.codigo}>{status.codigo}</TextStatus>
          )}
        </ContainerStyled>
      )}
    </>
  );
};
