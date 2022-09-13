import { useCallback, useEffect } from 'react';
import { Conheca } from '../components/Home/Conheca';
import { Header } from '../components/Header';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { useAuth } from '../contexts/auth';
import { Banner } from '../components/Home/Banner';
import { Vitrine } from '../components/Home/Vitrine';
import { Container } from '../components/Home/styles';
import { CardCategory } from '../components/CardCategoria';
import { CardBoasIdeias } from '../components/CardBoasIdeias';
import { CardConhecaComoFunciona } from '../components/CardConhecaComoFunciona';
import { CardCountUp } from '../components/CardCountUp';
import { CardProjetosMaisBuscados } from '../components/CardProjetosMaisBuscados';
import { useQuery } from '../hooks/geral';
import { useRouter } from 'next/router';
import { IPessoa } from '../interfaces/IPessoa';
import { Footer } from 'src/components/Footer';
import Head from 'next/head';
import { selecionarRotaHome } from 'src/utils/selecionarRotaHome';

export default function Home() {
  const router = useRouter();

  const {
    query: { state },
  } = router;
  const query = useQuery();
  let { user } = useAuth();

  if (!user) {
    user = {} as IPessoa;
    console.log('não encontrou o usuario mesmo...');
  }

  useEffect(() => {
    function loadSorage() {
      if (!state) {
        const storageUser = localStorage.getItem('@Gyan:id_token');

        if (!user.id_pessoa === true && storageUser !== null) {
          return router.push('/');
        }

        router.push('/');
      }
    }
    loadSorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, user.id_pessoa]);

  useEffect(() => {
    const section = query.get('section');
    if (section === 'como-funciona') {
      if (window.innerWidth > 768) {
        window.scrollTo(0, 1700);
      } else {
        window.scrollTo(0, 1000);
      }
    }
  }, [query]);

  useEffect(() => {
    function loadSorage() {
      if (!state) {
        const storageUser = localStorage.getItem('@Gyan:id_token');
        console.log('Storage::', storageUser);
        if (!!user.id_pessoa === true && storageUser !== null) {
          return router.push(selecionarRotaHome(user?.tipoPerfil));
        }
        router.push('/');
      }
    }
    loadSorage();
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, user?.tipoPerfil, user.id_pessoa]);

  return (
    <>
      <Helmet>
        <title>Gyan - Contrate um freelancer em poucos cliques</title>
      </Helmet>

      <Head>
        <title>
          Gyan - Conectando pessoas incríveis com projetos apaixonantes
        </title>

        <meta name="description" content="Home Gyan" />
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
