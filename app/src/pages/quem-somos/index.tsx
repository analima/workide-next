import { useEffect } from 'react';
import { Conheca } from '../../components/QuemSomos/Conheca';
import { hotjar } from 'react-hotjar';
import { BannerQuemSomos } from '../../components/QuemSomos/BannerQuemSomos';
import { Header } from '../../components/Header';
import { CardBoasIdeias } from '../../components/CardBoasIdeias';
import { Container } from '../../components/QuemSomos/styles';
import { CardCountUp } from '../../components/CardCountUp';
import { CardProjetosMaisBuscados } from '../../components/CardProjetosMaisBuscados';
import { SEO } from 'src/components/SEO';
import { GetStaticProps } from 'next';
import { Footer } from 'src/components/Footer';

export default function QuemSomos() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/quem-somos');
  }, []);

  return (
    <>
      <SEO title="Quem somos" />

      <Header />
      <Container>
        <BannerQuemSomos />
        <Conheca />
        <CardBoasIdeias />
        <CardCountUp />
        <CardProjetosMaisBuscados />
        <Footer />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400,
  };
};
