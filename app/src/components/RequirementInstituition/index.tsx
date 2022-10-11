import Link from 'next/link';
import { useRouter } from 'next/router';
import { necessity } from '../../mock/ongsMock';
import { Content, ContentButton, ContentLabel, Label } from './styles';

export function RequirementInstituition() {
  const router = useRouter();

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

      <ContentButton>
        <button
          onClick={() => router.push(`/contratante/busca?voluntario=true`)}
        >
          CONTRATE UM VOLUNTÁRIO AGORA
        </button>
      </ContentButton>
    </Content>
  );
}
