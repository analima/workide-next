import { useEffect, useState } from 'react';
import { BsArrowDown, BsArrowRight } from 'react-icons/bs';
import { VERDE } from '../../styles/variaveis';
import { Container, Content } from './styles';
import { useRouter } from 'next/router';
export function CardProjetosMaisBuscados() {
  const [sizePage, setSizePage] = useState(0);

  const handleResize = (e: any) => {
    setSizePage(window.innerWidth);
  };

  useEffect(() => {
    setSizePage(window.innerWidth);
    window.addEventListener('resize', handleResize);
  }, []);
  const router = useRouter()
  return (
    <Container>
      <Content>
        <h1 onClick={() => {router.push('/fornecedor/captar-projetos')}}>
          Projetos mais buscados
          {sizePage > 478 ? (
            <BsArrowRight color={VERDE} size={32} />
          ) : (
            <BsArrowDown color={VERDE} size={32} />
          )}
        </h1>
        <div className="content-subarea">
          <h2>Design Gráfico</h2>
          <h3>Tecnologia da Informação</h3>
          <h3>UX Design</h3>
          <h4>Marketing</h4>
          <h4>Escrita e Tradução</h4>
          <h4>Audiovisual</h4>
        </div>
      </Content>
    </Container>
  );
}
