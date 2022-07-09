import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BannerArea } from '../../components/BannerArea';
import { Header } from '../../components/Header';
import { Container } from '../../components/DetalhesArea/styles';
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

const DetalhesArea: React.FC = () => {
  const { query }: any = useRouter();
  const [areas, setAreas] = useState<IAreaProps[]>([]);
  const [dataArea, setDataArea] = useState<IPerguntasAreasProps>(
    {} as IPerguntasAreasProps,
  );

  useEffect(() => {
    if (query.area) {
      const areaFilter = perguntaAreas.find(i => i.id === Number(query.area));
      if (areaFilter) setDataArea(areaFilter);
    } else {
      const areaFilter = perguntaAreas.find(i => i.id === 1);
      if (areaFilter) setDataArea(areaFilter);
    }
  }, [query]);

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
};

export default DetalhesArea;
