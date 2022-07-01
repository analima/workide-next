import React from 'react';
import { ContainerStyled, TypographyStyled } from './style';

type Props = {
  title: string;
  listItems: Array<string>;
};

export const RequirementsList = ({ title, listItems }: Props): JSX.Element => {
  return (
    <ContainerStyled>
      <TypographyStyled>{title}</TypographyStyled>
      {listItems?.map(item => (
        <TypographyStyled key={item} isItem>
          {item}
        </TypographyStyled>
      ))}
    </ContainerStyled>
  );
};
