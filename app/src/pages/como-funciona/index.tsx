import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { Header } from '../../components/Header';
import { Container } from '../../components/ComoFunciona/styles';
import { CardProjetosMaisBuscados } from '../../components/CardProjetosMaisBuscados';
import { BannerComoFunciona } from 'src/components/ComoFunciona/BannerComoFunciona';
import { ComoCadastrar } from 'src/components/ComoFunciona/ComoCadastrar';
import { ConhecaComoFunciona } from 'src/components/ComoFunciona/ConhecaComoFunciona';
import { CardRecomendacao } from 'src/components/ComoFunciona/CardRecomendacao';
import { Vitrine } from 'src/components/Home/Vitrine';
import { FrequentQuestions } from 'src/components/FrequentQuestions';
import { perguntaComoFunciona } from '../../mock/perguntasFrequentesMock';
import { Footer } from 'src/components/Footer';
import Head from 'next/head';

export default function ComoFunciona() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/como-funciona');
  }, []);

  return (
    <>
      <Helmet>
        <title>
          freelas town - Conectando pessoas incríveis com projetos apaixonantes
        </title>
      </Helmet>
      <Head>
        <title>
          freelas town - Conectando pessoas incríveis com projetos apaixonantes
        </title>

        <meta name="description" content="Como funciona" />
      </Head>
      {typeof window !== 'undefined' && (
        <>
          <Header />
          <Container>
            <BannerComoFunciona />
            <ComoCadastrar />
            <ConhecaComoFunciona />
            <CardRecomendacao />
            <Vitrine />
            <FrequentQuestions item={perguntaComoFunciona[0]} />
            <CardProjetosMaisBuscados />
            <Footer />
          </Container>
        </>
      )}
    </>
  );
}
