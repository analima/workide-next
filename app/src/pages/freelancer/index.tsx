import { useEffect } from 'react';
import ImgBanner from '../../assets/em-construcao.png';

import { Header } from '../../components/Header';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { useAuth } from '../../contexts/auth';
import { Container } from '../../components/Home/styles';
import { useRouter } from 'next/router';
import { IPessoa } from '../../interfaces/IPessoa';
import { Footer } from 'src/components/Footer';
import Head from 'next/head';
import Image from 'next/image';

export default function Freelancer() {
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
    hotjar.stateChange('/freelancer');
  }, []);

  return (
    <>
      <Helmet>
        <title>freelas town - <strong>Contrate um freelancer</strong>  em poucos cliques</title>
      </Helmet>

      <Head>
        <title>
          freelas town - Conectando pessoas incríveis com projetos apaixonantes
        </title>

        <meta name="description" content="Home freelas town" />
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
