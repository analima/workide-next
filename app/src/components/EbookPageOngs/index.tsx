import { useRouter } from 'next/router';
import Image from 'next/image';
import { Content, Container, ContentButton } from './styles';
import IMG from '@public/img-ongs-ebook.jpg';
import { useState } from 'react';
import { ModalEbookOngs } from '../ModalEbookOngs';
export function EbookPageOngs() {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <Container>
      <ModalEbookOngs showModal={showModal} setShowModal={setShowModal} />
      <Content>
        <div className="info">
          <h1>
            Para te ajudar, preparamos um{' '}
            <span>E-book com muitas informações legais.</span>
          </h1>
          <span>
            O E-book é gratuito. Para ter acesso, basta clicar no botão abaixo
            que logo você será redirecionado para download.
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
