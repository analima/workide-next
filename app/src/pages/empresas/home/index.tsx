import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { GetStaticProps } from 'next';
import { consultas_api } from 'src/services/consultas_api';
import { IServicoInfo } from 'src/interfaces/IServicoInfo';
import { SEO } from 'src/components/SEO';
import EmpresasHome from 'src/Containers/EmpresasHome';
import { version } from '../../../../package.json';
interface IPropsData {
  vitrineData: IServicoInfo[];
  appVersion: string;
}

export default function Home({ vitrineData, appVersion }: IPropsData) {
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
        title="Freelas Town - Encontre e contrate os melhores profissionais"
        description="Olá amigo(a), como vai? Gostaria de compartilhar com você essa ideia. Estou usando uma plataforma muito legal chamada freelas town. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!"
        excludeTitleSuffix
      />
      <EmpresasHome vitrineData={vitrineData} version={appVersion} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const appVersion = version;

  const searchOffers = async (): Promise<any> => {
    const { data } = await consultas_api.post<{ values: IServicoInfo[] }>(
      `/consulta/ofertas?limit=12`,
    );
    return data.values;
  };

  const vitrineData = await searchOffers();

  return {
    props: {
      appVersion,
      vitrineData,
    },
    revalidate: 86400,
  };
};
