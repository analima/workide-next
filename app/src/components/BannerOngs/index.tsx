import { Container, Content, ContentButton } from './style';
import ImgOng from '@public/img-ong.webp';
import Logo from '../../assets/logo-branca-sem-fundo.svg';
import Image from 'next/image';
import { ModalEbook } from '../ModalEbook';
import { useState } from 'react';
import { useRouter } from 'next/router';

export function BannerOngs() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();
  return (
    <Container img={ImgOng.src}>
      <ModalEbook
        showModal={showModal}
        link="https://static.freelas.town/ebook-gyan.pdf"
        setShowModal={setShowModal}
        type="ong"
      />

      <Content>
        <div className="content-logo">
          <Image
            src={Logo}
            className="logo"
            alt="freelas town"
            width={200}
            height={80}
            onClick={() => router.push('/')}
          />
        </div>
        <h1>Sua ONG precisa de trabalho digital voluntário?</h1>
        <span>
          Está em busca de voluntários para colaborar com a sua causa, venha
          fazer parte da freelas town, e encontre os profissionais qualificados
          para solucionar os problemas que sua ONG passa no dia a dia.
        </span>

        <ContentButton>
          <button
            onClick={() => router.push('/primeiro-acesso')}
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
