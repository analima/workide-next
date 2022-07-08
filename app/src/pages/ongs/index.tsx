import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { hotjar } from 'react-hotjar';
import { BannerArea } from '../../components/BannerArea';
import { Header } from '../../components/Header';
import { Container } from './styles';
import { Footer } from '../../components/Footer';
import { MainCategories } from '../../components/MainCategories';
import { ProfessionalShowCase } from '../../components/ProfessionalShowCase';
import { FrequentQuestions } from '../../components/FrequentQuestions';
import { MoreCategories } from '../../components/MoreCategories';
import { perguntaAreas } from '../../mock/perguntasAreasMock';
import {
  IAreaProps,
  IPerguntasAreasProps,
} from '../../interfaces/IDetalheAreaProps';
import { geral_api } from '../../services/geral_api';
import { BannerOngs } from '../../components/BannerOngs';
import { RequirementInstituition } from '../../components/RequirementInstituition';
import { ConnectOngs } from '../../components/ConnectOngs';

export default function DetalheArea() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/ongs');
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Gyan - Conectando pessoas incríveis com projetos apaixonantes
        </title>
      </Helmet>
      <Header />
      <Container>
        <BannerOngs />
        <RequirementInstituition />
        <ConnectOngs />
        <Footer />
      </Container>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}
