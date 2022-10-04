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
import { GetStaticProps } from 'next';
import { consultas_api } from 'src/services/consultas_api';
import { IServicoInfo } from 'src/interfaces/IServicoInfo';

interface IPropsData {
  vitrineData: IServicoInfo[];
}

export default function ComoFunciona({ vitrineData }: IPropsData) {
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
          Freelas.town - Conectando pessoas incríveis com projetos apaixonantes
        </title>
      </Helmet>
      <Head>
        <title>
          Freelas.town - Conectando pessoas incríveis com projetos apaixonantes
        </title>

        <meta name="description" content="Como funciona" />
      </Head>
      <Header />
      <Container>
        <BannerComoFunciona />
        <ComoCadastrar />
        <ConhecaComoFunciona />
        <CardRecomendacao />
        <Vitrine vitrineData={vitrineData} />
        <FrequentQuestions item={perguntaComoFunciona[0]} />
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
