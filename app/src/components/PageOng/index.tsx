import { Header } from '../Header';
import { Container } from './styles';
import { Footer } from '../Footer';
import { BannerOngs } from '../BannerOngs';
import { RequirementInstituition } from '../RequirementInstituition';
import { ConnectOngs } from '../ConnectOngs';
import { EbookPageOngs } from '../EbookPageOngs';
import { MeetOurBlog } from '../MeetOurBlog';

const PageOng: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <BannerOngs />
        <EbookPageOngs />
        <RequirementInstituition />
        <ConnectOngs />
        <MeetOurBlog />
        <Footer />
      </Container>
    </>
  );
};

export default PageOng;
