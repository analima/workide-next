import { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import { SEO } from 'src/components/SEO';
import { GetStaticProps } from 'next';
import PrimaryAcess from 'src/Containers/PrimaryAcess';

export default function QuemSomos() {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/primeiro-acesso');
  }, []);

  return (
    <>
      <SEO title="Primeiro acesso" />
      <PrimaryAcess />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
