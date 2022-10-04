import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { Helmet } from 'react-helmet';
import ImgBanner from '../../assets/em-construcao.png';

import { hotjar } from 'react-hotjar';
import { useAuth } from '../../contexts/auth';
import { Container } from '../../components/Home/styles';
import { useRouter } from 'next/router';
import { IPessoa } from '../../interfaces/IPessoa';
import { Footer } from 'src/components/Footer';
import Head from 'next/head';
import Image from 'next/image';

export default function TrabalhoVoluntario() {
  const router = useRouter();

  let { user } = useAuth();

  if (!user) {
    user = {} as IPessoa;
  }

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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                alt="Em construção"
                layout="fixed"
                width={500}
                height={500}
                src={ImgBanner}
              />
            </div>
            <Footer />
          </Container>
        </>
      )}
    </>
  );
}
