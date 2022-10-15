import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { GetStaticProps } from 'next';
import { consultas_api } from 'src/services/consultas_api';
import { IServicoInfo } from 'src/interfaces/IServicoInfo';
import { SEO } from 'src/components/SEO';
import EmpresasHome from 'src/Containers/EmpresasHome';

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
      <SEO title="Empresas - Contrate um freelancer em poucos cliques" />
      <EmpresasHome vitrineData={vitrineData} />
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
