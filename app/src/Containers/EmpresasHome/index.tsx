import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { hotjar } from 'react-hotjar';
import { Vitrine } from '../../components/Home/Vitrine';
import { Container } from '../../styles/empresas/styles';
import { CardCategory } from '../../components/CardCategoria';
import { IServicoInfo } from 'src/interfaces/IServicoInfo';
import { SEO } from 'src/components/SEO';
import { FrequentQuestions } from 'src/components/FrequentQuestions';
import { perguntaComoFunciona } from 'src/mock/perguntasFrequentesMock';
import { RecommendationComment } from 'src/components/RecommendationComment';
import { LetsStart } from 'src/components/LetsStart';
import { SearchIdealProfessional } from 'src/components/SearchIdealProfessional';
import { BannerInformation } from 'src/components/BannerInformation';
import { BannerEmpresa } from 'src/components/BannerEmpresa';

interface IPropsData {
  vitrineData: IServicoInfo[];
}

export default function EmpresasHome({ vitrineData }: IPropsData) {
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
        title="Freelas.town - Contrate um freelancer em poucos cliques"
        excludeTitleSuffix
      />
      <Header esconderMsg />
      <Container>
        <BannerEmpresa />
        <div>
          <BannerInformation />
          <SearchIdealProfessional />
        </div>
        <CardCategory
          title="Profissionais de diversas áreas de atuação."
          page="empresas"
        />
        <LetsStart />
        <RecommendationComment />
        <Vitrine vitrineData={vitrineData} />
        <FrequentQuestions item={perguntaComoFunciona[0]} />
      </Container>
    </>
  );
}
