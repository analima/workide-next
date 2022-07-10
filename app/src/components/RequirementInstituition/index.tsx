import Link from 'next/link';
import { necessity } from '../../mock/ongsMock';
import { Content, ContentLabel, Label } from './styles';

export function RequirementInstituition() {
  return (
    <Content>
      <h1>Quais são as necessidades de sua instituição?</h1>
      <span>
        Aqui, você se conectará com profissionais que podem contribuir para o
        crescimento da sua ONG. Veja alguns exemplos:
      </span>

      {necessity && (
        <ContentLabel>
          {necessity.map((need: string, index: number) => (
            <Label key={index}>{need}</Label>
          ))}
        </ContentLabel>
      )}
    </Content>
  );
}
