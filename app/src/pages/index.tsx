import { useEffect } from 'react';
import { Conheca } from '../components/Home/Conheca';
import { Header } from '../components/Header';
import { hotjar } from 'react-hotjar';
import { Banner } from '../components/Home/Banner';
import { Vitrine } from '../components/Home/Vitrine';
import { Container } from '../components/Home/styles';
import { CardCategory } from '../components/CardCategoria';
import { CardBoasIdeias } from '../components/CardBoasIdeias';
import { CardConhecaComoFunciona } from '../components/CardConhecaComoFunciona';
import { CardCountUp } from '../components/CardCountUp';
import { CardProjetosMaisBuscados } from '../components/CardProjetosMaisBuscados';
import { Footer } from 'src/components/Footer';
import { GetStaticProps } from 'next';
import { consultas_api } from 'src/services/consultas_api';
import { IServicoInfo } from 'src/interfaces/IServicoInfo';
import { SEO } from 'src/components/SEO';

interface IPropsData {
  vitrineData: IServicoInfo[];
}

export default function Home({ vitrineData }: IPropsData) {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/');
  }, []);

  return (
    <>
      <SEO
        title="freelas town - Contrate um freelancer em poucos cliques"
        excludeTitleSuffix
      />
      <Header />
      <Container>
        <Banner />
        <CardCategory title="Procure talentos por categoria" page="home" />
        <CardBoasIdeias />
        <CardConhecaComoFunciona />
        <Vitrine vitrineData={vitrineData} />
        <Conheca />
        <CardCountUp />
        <CardProjetosMaisBuscados />
        <Footer />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const searchOffers = async (): Promise<any> => {
    const { data } = await consultas_api.post<{ values: IServicoInfo[] }>(
      `/consulta/ofertas?limit=12`,
    );
    return data.values;
  };

  const vitrineData = await searchOffers();

  return {
    props: {
      vitrineData,
    },
    revalidate: 86400,
  };
};
