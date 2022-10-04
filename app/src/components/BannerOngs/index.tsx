import { Container, Content, ContentButton } from './style';
import ImgOng from '@public/img-ong.webp';
import Logo from '../../assets/logo-branca.svg';
import Image from 'next/image';
import { ModalEbookOngs } from '../ModalEbookOngs';
import { useState } from 'react';
import { useRouter } from 'next/router';

export function BannerOngs() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Container img={ImgOng.src}>
      <ModalEbookOngs showModal={showModal} setShowModal={setShowModal} />

      <Content>
        <div className="content-logo">
          <Image
            src={Logo}
            className="logo"
            alt="Freelas.town"
            width={152}
            height={38}
            onClick={() => router.push('/')}
          />
        </div>
        <h1>Sua ONG precisa de trabalho digital voluntário?</h1>
        <span>
          Está em busca de voluntários para colaborar com a sua causa, venha
          fazer parte da Freelas.town, e encontre os profissionais qualificados
          para solucionar os problemas que sua ONG passa no dia a dia.
        </span>

        <ContentButton>
          <button
            onClick={() => router.push('/cadastro-basico')}
            className="btn-cadastrar"
          >
            CADASTRAR ONG
          </button>
          <button onClick={() => setShowModal(true)} className="btn-ebook">
            E-BOOK GRATUITO
          </button>
        </ContentButton>
      </Content>
    </Container>
  );
}
