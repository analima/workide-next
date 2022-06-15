import React from 'react';
import { ButtonMainStyled, ContainerStyled, TypographyStyled } from './style';

type Props = {
  text: string;
  textButton: string;
  handleEvent: () => void;
};

export const SearchProject = ({
  text,
  textButton,
  handleEvent,
}: Props): JSX.Element => {
  return (
    <ContainerStyled>
      <TypographyStyled>{text}</TypographyStyled>
      <ButtonMainStyled onClick={handleEvent}>{textButton}</ButtonMainStyled>
    </ContainerStyled>
  );
};
