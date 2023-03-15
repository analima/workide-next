import { useEffect } from 'react';
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
import { GetStaticProps } from 'next';
import { consultas_api } from 'src/services/consultas_api';
import { IServicoInfo } from 'src/interfaces/IServicoInfo';
import { SEO } from 'src/components/SEO';
//import { version } from '../../../package.json';
import packageInfo from '../../../package.json';
import { TIME_REVALIDATE } from 'src/const';

interface IPropsData {
  vitrineData: IServicoInfo[];
  appVersion: string;
}

export default function ComoFunciona({ vitrineData, appVersion }: IPropsData) {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/como-funciona');
  }, []);

  return (
    <>
      <SEO title="Como funciona" description="Descrição da plataforma" />
      <Header />
      <Container>
        <BannerComoFunciona />
        <ComoCadastrar />
        <ConhecaComoFunciona />
        <CardRecomendacao />
        <Vitrine vitrineData={vitrineData} />
        <FrequentQuestions item={perguntaComoFunciona[0]} />
        <CardProjetosMaisBuscados />
        <Footer versao={appVersion} />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const appVersion = packageInfo.version;

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
      appVersion,
    },
    revalidate: TIME_REVALIDATE,
  };
};
