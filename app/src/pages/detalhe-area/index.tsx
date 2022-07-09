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

export default function DetalheArea() {
  const { query }: any = useRouter();
  const [areas, setAreas] = useState<IAreaProps[]>([]);
  const [dataArea, setDataArea] = useState<IPerguntasAreasProps>(
    {} as IPerguntasAreasProps,
  );

  useEffect(() => {
    if (query) {
      const areaFilter = perguntaAreas.find(i =>
        i.nome.trim().toLowerCase().includes(query.area),
      );

      if (areaFilter) setDataArea(areaFilter);
    } else {
      const areaFilter = perguntaAreas.find(i =>
        i.nome.trim().toLowerCase().includes('escrita'),
      );
      if (areaFilter) setDataArea(areaFilter);
    }
  }, [query]);

  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/detalhe-area');
  }, []);

  useEffect(() => {
    geral_api
      .get<IAreaProps[]>('/areas')
      .then(({ data }) => {
        setAreas(data);
      })
      .catch(err => {
        console.log(err);
        setAreas([]);
      });
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
        <BannerArea item={dataArea} />
        <MainCategories
          area={
            areas.find(i => i.descricao === dataArea.nome) || areas[dataArea.id]
          }
        />
        <ProfessionalShowCase />
        <FrequentQuestions item={dataArea} />
        <MoreCategories
          area={
            areas.find(i => i.descricao === dataArea.nome) || areas[dataArea.id]
          }
        />
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
