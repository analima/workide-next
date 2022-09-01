import { Container, Content, CardInfo, ContentButton } from './styles';
import ImgOng1 from '@public/icon-ong1.svg';
import ImgOng2 from '@public/icon-ong2.svg';
import ImgOng3 from '@public/icon-ong3.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IStatsProps } from 'src/interfaces/IPostProps';

interface StatsProps {
  stats: IStatsProps;
}

export function DataThatProvesSuccess({ stats }: StatsProps) {
  const router = useRouter();

  return (
    <Content>
      <h1>Dados que comprovam o sucesso da conexão entre projetos e pessoas</h1>

      <Container>
        <CardInfo>
          <div className="icon-info">
            <Image src={ImgOng1} width={72} height={65} alt="Voluntários" />
            <h2>+{stats.voluntarios}</h2>
          </div>
          <span>Voluntários</span>
        </CardInfo>

        <CardInfo>
          <div className="icon-info">
            <Image src={ImgOng2} width={86} height={74} alt="Instituições" />
            <h2>+{stats.ongs}</h2>
          </div>
          <span>Instituições</span>
        </CardInfo>

        <CardInfo>
          <div className="icon-info">
            <Image src={ImgOng3} width={84} height={84} alt="Projetos" />
            <h2>+{stats.projetosvoluntarios}</h2>
          </div>
          <span>Projetos</span>
        </CardInfo>
      </Container>

      <h3>
        Impacto social alcançando mais de{' '}
        <strong>{stats.pessoasAtendidas}</strong> pessoas, vamos continuar essa
        missão?
      </h3>

      <ContentButton>
        <button
          onClick={() => router.push('/consumidor/busca?filter=voluntarios')}
        >
          ENCONTRAR VOLUNTÁRIOS
        </button>
      </ContentButton>
    </Content>
  );
}
