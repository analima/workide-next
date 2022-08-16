import { Header } from '../Header';
import { Container } from './styles';
import { Footer } from '../Footer';
import { BannerOngs } from '../BannerOngs';
import { RequirementInstituition } from '../RequirementInstituition';
import { ConnectOngs } from '../ConnectOngs';
import { EbookPageOngs } from '../EbookPageOngs';
import { MeetOurBlog } from '../MeetOurBlog';
import { BannerHours } from '../BannerHours';

const PageOng: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <BannerOngs />
        <EbookPageOngs />
        <RequirementInstituition />
        <ConnectOngs />
        <BannerHours />
        <MeetOurBlog />
        <Footer />
      </Container>
    </>
  );
};

export default PageOng;
