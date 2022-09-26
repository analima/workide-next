import React from 'react';
import { Container } from './style';

interface IProps {
  mensagem: string;
}

export function SemConteudo({ mensagem }: IProps) {
  return (
    <Container>
      <span>{mensagem}</span>
    </Container>
  );
}
