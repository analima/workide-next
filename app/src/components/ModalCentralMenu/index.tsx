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
import { useAuth } from '../../contexts/auth';
import { ModalRecomendacao } from '../../components/ModalRecomendacao';
import { AZUL, LARANJA } from '../../styles/variaveis';
import { useRouter } from 'next/router';
import { useInformacoesTipoUsuario } from 'src/hooks/informacoesTipoUsuario';

interface IModalRecomendacao {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'Contratante' | 'Profissional';
}

export function ModalCentralMenu({
  showModal,
  setShowModal,
  type,
}: IModalRecomendacao) {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [showRecomendacaoModal, setShowRecomendacaoModal] = useState(false);
  const { user } = useAuth();
  const [linkUrlAmbiente, setLinkUrlAmbiente] = useState<string>();
  const { typeSelected } = useInformacoesTipoUsuario();

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
        router.push('/fornecedor/home');
        break;
      case 'homeProvider':
        setShowModal(false);
        router.push('/contratante/home');
        break;
      case 'editProfile':
        setShowModal(false);
        router.push('/cadastro-complementar');
        break;
      case 'myProjects':
        setShowModal(false);
        router.push('/fornecedor/meus-projetos');
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
          router.push('/login');
        }
        break;
      case 'myFavorite':
        setShowModal(false);
        router.push('/contratante/home?section=favoritos');
        break;

      case 'campaigns':
        setShowModal(false);
        router.push('/fornecedor/meus-servicos');
        break;

      case 'editProfileProvider':
        setShowModal(false);
        router.push('/cadastro-complementar');
        break;

      case 'myProjectsProvider':
        setShowModal(false);
        router.push('/contratante/home?section=meus-projetos');
        break;

      default:
        setShowModal(false);
        router.push('/contratante/home');
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
        style={{ zIndex: 9999 }}
      >
        <ModalBody>
          {(type === undefined ||
            type === 'Profissional' ||
            typeSelected === 'Selecione...') && (
            <ContentProvider>
              <Titulo
                titulo="Quero trabalhar em projetos apaixonantes"
                tamanho={16}
                cor={LARANJA}
              />
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
                        link={item.link}
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
          )}
          {(type === undefined ||
            type === 'Contratante' ||
            typeSelected === 'Selecione...') && (
            <ContentConsumer>
              <Titulo
                titulo="Quero contratar Pessoas Incríveis"
                tamanho={16}
                cor={AZUL}
              />
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
                        link={item.link}
                        onClick={() => setShowModal(false)}
                      />
                    </div>
                  ))}
                </CardsProvider>
              </ContentMenuProvider>
            </ContentConsumer>
          )}
        </ModalBody>
      </Modal>
    </Content>
  );
}
