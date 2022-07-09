import Image from 'next/image';
import { Container, Content } from './style';
import { CINZA_90 } from '../../styles/variaveis';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { IPerguntasAreasProps } from '../../interfaces/IDetalheAreaProps';
import { useEffect, useState } from 'react';

export function BannerOngs() {
  return (
    <Container img={'/assets/img-ong.png'}>
      <Content>
        <h1>Contribuir com sua causa social é muito importante para a Gyan</h1>
        <span>
          Como voluntários da sua ONG, queremos promover a conexão entre seus
          projetos e profissionais que estão ansiosos para oferecer seus
          serviços em prol do bem-estar coletivo.
          <br />
          <br />
          No atual cenário, marcado por contínuos avanços no universo digital,
          nossa plataforma se apresenta como uma ponte entre você e freelancers
          especialistas em tecnologia.
        </span>
      </Content>
    </Container>
  );
}
