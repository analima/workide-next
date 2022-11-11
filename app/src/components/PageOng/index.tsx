import { Container } from './styles';
import { Footer } from '../Footer';
import { BannerOngs } from '../BannerOngs';
import { BannerSecundaryOngs } from '../BannerSecundaryOngs';
import { MeetOurBlog } from '../MeetOurBlog';
import { WhyInvestInVolunteers } from '../WhyInvestInVolunteers';
import { Depositions } from '../Depositions';
import { ImpactfulProject } from '../ImpactfulProject';
import { DataThatProvesSuccess } from '../DataThatProvesSuccess';
import { ConnectOngs } from '../ConnectOngs';
import { IPostProps, IStatsProps } from 'src/interfaces/IPostProps';
import { Header } from '../Header';

interface PostProps {
  posts: IPostProps[];
  stats: IStatsProps;
  versao: string;
}

export default function PageOng({ posts, stats, versao }: PostProps) {
  return (
    <>
      <Header esconderMsg />
      <Container>
        <BannerOngs />
        <BannerSecundaryOngs />
        <WhyInvestInVolunteers />
        <Depositions />
        <ImpactfulProject />
        <DataThatProvesSuccess stats={stats} />
        <MeetOurBlog posts={posts} />
        <ConnectOngs />
        <Footer versao={versao} />
      </Container>
    </>
  );
}
