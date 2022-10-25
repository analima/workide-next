import {
  Content,
  ContentImage,
  ContentInfo,
  Information,
  Title,
  LastInformation,
} from './style';
import IMG from '@public/homen-info.png';
import IMGEbook from '@public/ebook.png';
import Image from 'next/image';
import { useState } from 'react';
import { ModalEbook } from '../ModalEbook';

export function BannerInformation() {
  const [title, setTitle] = useState('price');
  const [showModal, setShowModal] = useState(false);

  return (
    <Content>
      <ContentImage>
        <Image src={IMG} alt="homem-info" />
      </ContentImage>

      <ContentInfo>
        <div className="information">
          <div className="titles">
            <Title onClick={() => setTitle('price')} cor="#0384d1">
              Preço justo
            </Title>
            <Title onClick={() => setTitle('security')} cor="#529fcd">
              Segurança
            </Title>
            <Title onClick={() => setTitle('support')} cor="#3b769A">
              Suporte
            </Title>
          </div>

          {title === 'price' && (
            <Information cor="#0384d1">
              <span>
                A freelas.town não tem limites de uso. O usuário tem acesso
                gratuito à todas as funcionalidades da plataforma, e o repasse
                da taxa de 12% de intermediação ocorre apenas quando um projeto
                for finalizado com sucesso.
              </span>
            </Information>
          )}

          {title === 'security' && (
            <Information cor="#529fcd">
              <span>
                Caso seu profissional inicie o projeto e o abandone antes de
                conclui-lo, você tem a opção de finalizar o projeto e iniciar um
                processo de negociação da devolução do valor de forma
                automatizada e, se necessário, você poderá entrar em contato
                diretamente com nosso suporte.
              </span>
            </Information>
          )}

          {title === 'support' && (
            <Information cor="#3b769A">
              <span>
                Nossa plataforma oferece suporte completo ao usuário: contamos
                com atendimento via WhatsApp, onde você fala diretamente com
                nossos atendentes, além de uma lista de FAQ (Perguntas
                Frequentes) e um sistema de feedback - Thaís, nossa assistente
                virtual - onde você pode reportar um erro, fazer uma reclamação,
                sugestão ou elogio, que nós retornaremos o mais breve possível.
              </span>
            </Information>
          )}
        </div>

        <LastInformation cor="#0384d1">
          <div className="wrapper">
            <h1>Quer saber como gerenciar seus projetos com freelancers?</h1>
            <button onClick={() => setShowModal(true)}>
              BAIXE O E-BOOK GRATUÍTO
            </button>
          </div>

          <div className="img-ebook">
            <Image src={IMGEbook} alt="homem-info" />
          </div>
        </LastInformation>
      </ContentInfo>
      <ModalEbook
        type="empresas"
        showModal={showModal}
        setShowModal={setShowModal}
        link="https://gyan-sp-public.s3.sa-east-1.amazonaws.com/E-book++-+Empresas.pdf"
      />
    </Content>
  );
}
