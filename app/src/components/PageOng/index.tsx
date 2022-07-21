import { Header } from '../Header';
import { Container } from './styles';
import { Footer } from '../Footer';
import { BannerOngs } from '../BannerOngs';
import { RequirementInstituition } from '../RequirementInstituition';
import { ConnectOngs } from '../ConnectOngs';

const PageOng: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <BannerOngs />
        <RequirementInstituition />
        <ConnectOngs />
        <Footer />
      </Container>
    </>
  );
};

export default PageOng;
