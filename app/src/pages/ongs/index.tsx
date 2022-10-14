import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import PageOng from 'src/components/PageOng';
import { SEO } from 'src/components/SEO';
import { IPostProps, IStatsProps } from 'src/interfaces/IPostProps';
import { consultas_api } from 'src/services/consultas_api';
import { version } from '../../../package.json';

interface PostProps {
  posts: IPostProps[];
  stats: IStatsProps;
  appVersion: string;
}

export default function Ongs({ posts, stats, appVersion }: PostProps) {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/ongs');
  }, []);

  return (
    <>
      <SEO title="Encontre um voluntário em poucos cliques" />
      <PageOng posts={posts} stats={stats} versao={appVersion} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const appVersion = version;

  const getAllPostsOngs = async (): Promise<IPostProps[]> => {
    const posts = await fetch(
      `${process.env.REACT_APP_BLOG_API}/articles?populate=deep&filters[category][slug][$eq]=ongs`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN_BLOG}`,
        },
      },
    );
    const { data } = await posts.json();
    return data;
  };

  const getStats = async (): Promise<any> => {
    const stats = await consultas_api.get<IStatsProps>(
      '/consulta/estatisticas',
    );
    const { data } = await stats;
    return data;
  };

  const posts = await getAllPostsOngs();
  const stats = await getStats();

  return {
    props: {
      posts,
      stats,
      appVersion,
    },
    revalidate: 86400,
  };
};
