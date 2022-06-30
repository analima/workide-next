import { Modal, ModalBody } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { Titulo } from '../Titulo';
import {
  Content,
  ContentProvider,
  ContentConsumer,
  MenuProvider,
  CardsProvider,
  ItemMenu,
  ContentMenuProvider,
} from './style';
import { infoCard, infoProvider } from './configuration/configuration';
import { Card } from './components/Container';
import { useHistory } from 'react-router';
import { Spacer } from '../Spacer';
import { useAuth } from '../../contexts/auth';
import { ModalRecomendacao } from '../../components/ModalRecomendacao';
import { AZUL, LARANJA } from '../../styles/variaveis';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalCentralMenu({
  showModal,
  setShowModal,
}: IModalRecomendacao) {
  const history = useHistory();
  const [link, setLink] = useState('');
  const [showRecomendacaoModal, setShowRecomendacaoModal] = useState(false);
  const { user } = useAuth();
  const [linkUrlAmbiente, setLinkUrlAmbiente] = useState<string>();

  const handleLinkShare = useCallback(() => {
    const urlAtual = window.location.href;
    const posicaoBarra = urlAtual.indexOf('/', 7);
    setLinkUrlAmbiente(urlAtual.slice(0, posicaoBarra));
  }, [setLinkUrlAmbiente]);

  useEffect(() => {
    handleLinkShare();
  }, [handleLinkShare]);

  const handleRedirect = (selected: string) => {
    switch (selected) {
      case 'home':
        setShowModal(false);
        history.push('/fornecedor/home');
        break;
      case 'homeProvider':
        setShowModal(false);
        history.push('/consumidor/home');
        break;
      case 'editProfile':
        setShowModal(false);
        history.push('/cadastro-complementar', { cadastroCompleto: true });
        break;
      case 'myProjects':
        setShowModal(false);
        history.push('/fornecedor/meus-projetos');
        break;
      case 'shareMe':
        setShowModal(false);
        if (user && user.id && user.nome) {
          const handleLink = `${linkUrlAmbiente}/fornecedor/perfil-publico/${
            user?.id_usuario
          }-${user.nome.replace(/ /g, '-')}`;
          setLink(handleLink);
          setShowRecomendacaoModal(true);
        } else {
          history.push('/login');
        }
        break;
      case 'myFavorite':
        setShowModal(false);
        history.push('/consumidor/home?section=favoritos');
        break;

      case 'campaigns':
        setShowModal(false);
        history.push('/fornecedor/meus-servicos');
        break;

      case 'editProfileProvider':
        setShowModal(false);
        history.push('/cadastro-complementar', {
          cadastroCompleto: true,
          isConsumidor: true,
        });
        break;

      case 'myProjectsProvider':
        setShowModal(false);
        history.push('/consumidor/home?section=meus-projetos');
        break;

      default:
        setShowModal(false);
        history.push('/consumidor/home');
    }
  };

  return (
    <Content>
      <ModalRecomendacao
        showModal={showRecomendacaoModal}
        setShowModal={setShowRecomendacaoModal}
        link={link}
      />
      <Modal
        onHide={() => setShowModal(false)}
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-dialog modal-lg"
      >
        <ModalBody>
          <ContentProvider>
            <Titulo titulo="Quero trabalhar" tamanho={16} cor={LARANJA} />
            <ContentMenuProvider>
              <MenuProvider>
                <ItemMenu
                  isProvider
                  onClick={() => {
                    handleRedirect('home');
                  }}
                >
                  Home
                </ItemMenu>
                <ItemMenu
                  isProvider
                  onClick={() => {
                    handleRedirect('editProfile');
                  }}
                >
                  Atualizar Perfil
                </ItemMenu>
                <ItemMenu
                  isProvider
                  onClick={() => {
                    handleRedirect('campaigns');
                  }}
                >
                  Minhas ofertas
                </ItemMenu>
                <ItemMenu
                  isProvider
                  onClick={() => {
                    handleRedirect('shareMe');
                  }}
                >
                  Compartilhar-me
                </ItemMenu>
              </MenuProvider>
              <CardsProvider>
                {infoCard.map((item, index) => (
                  <div className="cards" key={index}>
                    <Card
                      key={index}
                      typeCard={item.type}
                      text={item.text}
                      img={item.img}
                      onClick={() => setShowModal(false)}
                    />
                  </div>
                ))}
              </CardsProvider>
            </ContentMenuProvider>
          </ContentProvider>
          <Spacer size={20} />
          <ContentConsumer>
            <Titulo titulo="Quero contratar" tamanho={16} cor={AZUL} />
            <ContentMenuProvider>
              <MenuProvider>
                <ItemMenu
                  onClick={() => {
                    handleRedirect('homeProvider');
                  }}
                >
                  Home
                </ItemMenu>
                <ItemMenu
                  onClick={() => {
                    handleRedirect('editProfileProvider');
                  }}
                >
                  Atualizar Perfil
                </ItemMenu>
                <ItemMenu
                  onClick={() => {
                    handleRedirect('myProjectsProvider');
                  }}
                >
                  Meus Projetos
                </ItemMenu>
                <ItemMenu
                  onClick={() => {
                    handleRedirect('myFavorite');
                  }}
                >
                  Meus Favoritos
                </ItemMenu>
              </MenuProvider>
              <CardsProvider>
                {infoProvider.map((item, index) => (
                  <div className="cards" key={index}>
                    <Card
                      typeCard={item.type}
                      text={item.text}
                      img={item.img}
                      onClick={() => setShowModal(false)}
                    />
                  </div>
                ))}
              </CardsProvider>
            </ContentMenuProvider>
          </ContentConsumer>
        </ModalBody>
      </Modal>
    </Content>
  );
}