import { useCallback, useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { GetStaticProps } from 'next';
import { consultas_api } from 'src/services/consultas_api';
import { IServicoInfo } from 'src/interfaces/IServicoInfo';
import { SEO } from 'src/components/SEO';
import EmpresasHome from 'src/Containers/EmpresasHome';
import { version } from '../../../../package.json';
import { TIME_REVALIDATE } from 'src/const';
import { Accordion, Col, FormCheck, Row } from 'react-bootstrap';
import { geral_api } from 'src/services/geral_api';
import { AccordionItem } from 'src/components/Accordion/AccordionItem';
import PrimaryAcess from 'src/Containers/PrimaryAcess';
interface IPropsData {
  vitrineData: IServicoInfo[];
  appVersion: string;
}

interface IArea {
  id: number;
  descricao: string;
  subareas: ISubarea[];
}

interface ISubarea {
  id: number;
  id_subarea_interesse: number;
  descricao: string;
}

export default function AreasAtuacao() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/empresas/home');
  }, []);

  return (
    <>
      <SEO
        title="Freelas Town - Encontre e contrate os melhores profissionais"
        description="Uma plataforma para voce encontrar profissionais e tirar do papel todos os seus projetos."
        excludeTitleSuffix
      />
      <PrimaryAcess />
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
    revalidate: TIME_REVALIDATE,
  };
};
