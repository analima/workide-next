import { useRouter } from 'next/router';
import Image from 'next/image';
import { Content, Container, ContentButton } from './styles';
import IMG from '@public/img-ebook.png';
import { useState } from 'react';
import { ModalEbook } from '../ModalEbook';
export function EbookPageOngs() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <ModalEbook
        showModal={showModal}
        link=""
        type="ong"
        setShowModal={setShowModal}
      />
      <Content>
        <div className="info">
          <h1>
            Utilize a <span>tecnologia</span> de forma estratégica na sua{' '}
            <span>ONG</span> para expandir seus recursos
          </h1>
          <span>
            <h4>Saiba como:</h4>
            Leia o <b>E-book é gratuito</b> e aprenda como{' '}
            <span className="emphasis">
              se conectar a freelancers voluntários que acreditam na sua causa.
            </span>
            Para ter acesso, basta clicar no botão abaixo.
          </span>
          <ContentButton onClick={openModal}>
            <button>Quero ter acesso ao e-book</button>
          </ContentButton>
        </div>
        <div className="image-container">
          <Image
            alt="img-ong"
            layout="intrinsic"
            objectFit="cover"
            className={'image'}
            src={IMG}
            width={683}
            height={683}
          />
        </div>
      </Content>
    </Container>
  );
}
