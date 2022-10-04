import { useEffect } from 'react';
import { Conheca } from '../components/Home/Conheca';
import { Header } from '../components/Header';
import { Helmet } from 'react-helmet';
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
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/');
  }, []);

  return (
    <>
      <Helmet>
        <title>Freelas.town - Contrate um freelancer em poucos cliques</title>
      </Helmet>

      <Head>
        <title>
          Freelas.town - Conectando pessoas incríveis com projetos apaixonantes
        </title>

        <meta name="description" content="Home Freelas.town" />
      </Head>
      {typeof window !== 'undefined' && (
        <>
          <Header />

          <Container>
            <Banner />
            <CardCategory />
            <CardBoasIdeias />
            <CardConhecaComoFunciona />
            <Vitrine />
            <Conheca />
            <CardCountUp />
            <CardProjetosMaisBuscados />
            <Footer />
          </Container>
        </>
      )}
    </>
  );
}
