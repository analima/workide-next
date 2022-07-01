import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { IConteudoInstitucional } from '../../interfaces/IConteudoInstitucional';
import { pessoas_api } from '../../services/pessoas_api';
import { AZUL } from '../../styles/variaveis';
import { Button, ContainerIconNext, ImageAvatar } from './style';

import AndreFullImage from '../../assets/andre-full.svg';
import AntonioFullImage from '../../assets/antonio-full.svg';
import CarolFullImage from '../../assets/carol-full.svg';
import ThaisFullImage from '../../assets/thais-full.svg';

import { ContainerBody, ContainerFooter, Content } from './style';
import { useAuth } from '../../contexts/auth';

import { useHistory } from 'react-router';

interface IProps {
  contents?: IConteudoInstitucional[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isPreview?: boolean;
  notShow?: boolean;
}

export function ModalConteudoInstitucional({
  contents,
  showModal,
  setShowModal,
  isPreview,
  notShow,
}: IProps) {
  const [newInstitutionalContents, setNewInstitutionalContents] = useState<
    IConteudoInstitucional[]
  >([] as IConteudoInstitucional[]);
  const itemsElement = useRef(null);
  const [index, setIndex] = useState(1);
  const [checkeds, setCheckeds] = useState<boolean[]>([]);
  const [checkedsErrors, setCheckedsErrors] = useState<string[]>([]);
  const history = useHistory();

  const { user } = useAuth();

  useEffect(() => {
    const grabUnseenContent = async () => {
      const contentToNotify: IConteudoInstitucional[] = [];

      if (isPreview) {
        if (contents && contents.length) {
          setNewInstitutionalContents(contents);
        }
        return;
      }

      if (!user || !user.id) {
        return;
      }

      if (user.visitante) {
        return;
      }

      if (history.location.pathname.indexOf('administracao') !== -1) {
        return;
      }

      if (notShow) {
        return;
      }

      const { data: newContents }: { data: IConteudoInstitucional[] } =
        await pessoas_api.get(`/conteudos_intitucionais?status=EM_ANDAMENTO`);
      const now = new Date();

      for (let newContent of newContents) {
        if (
          (user.voluntariado && newContent.user_type === 'VOLUNTARIO') ||
          (user.fornecedor &&
            newContent.user_type === 'FORNECEDOR' &&
            history.location.pathname.indexOf('fornecedor') !== -1) ||
          (user.consumidor &&
            newContent.user_type === 'CONSUMIDOR' &&
            history.location.pathname.indexOf('consumidor') !== -1) ||
          (user.tipo === 'PF' && newContent.user_type === 'PF') ||
          (user.tipo === 'PJ' && newContent.user_type === 'PJ') ||
          (user.ong && newContent.user_type === 'PJ_SEM_FINS') ||
          newContent.user_type === 'TODOS'
        ) {
          const start_at = new Date(newContent.start_at);

          if (now.getTime() > start_at.getTime()) {
            try {
              await pessoas_api.get(
                `/conteudo_intitucional/view/${newContent.id}`,
              );
            } catch (error) {
              // usuário ainda não viu o conteúdo
              if ((error as any).response.status === 404) {
                contentToNotify.push(newContent);
              }
            }
          }
        }
      }

      if (contentToNotify.length > 0) {
        setNewInstitutionalContents(contentToNotify);
        setShowModal(true);
      }
    };

    grabUnseenContent();
  }, [
    contents,
    user,
    setShowModal,
    isPreview,
    history.location.pathname,
    notShow,
  ]);

  const resetErrorsAndChacks = useCallback(() => {
    let arrCheckeds: boolean[] = [];
    let arrCheckedsErrors: string[] = [];

    newInstitutionalContents.forEach(() => {
      arrCheckeds.push(false);
      arrCheckedsErrors.push('');
    });

    setCheckeds(arrCheckeds);
    setCheckedsErrors(arrCheckedsErrors);
  }, [newInstitutionalContents]);

  useEffect(() => {
    resetErrorsAndChacks();
  }, [newInstitutionalContents, resetErrorsAndChacks]);

  const handleChangeChecks = (
    checkeds: boolean[],
    checked: boolean,
    i: number,
  ) => {
    let newCheckeds = [];

    for (let iInFor = 0; iInFor < checkeds.length; iInFor++) {
      if (iInFor === i - 1) {
        newCheckeds.push(checked);
      } else {
        newCheckeds.push(checkeds[iInFor]);
      }
    }

    setCheckeds(newCheckeds);
  };

  const validateCheckeds = useCallback(
    async (content: IConteudoInstitucional, indexPARAM?: number) => {
      if (
        content.isRequired &&
        !checkeds[indexPARAM !== undefined ? indexPARAM : index - 1]
      ) {
        const newCheckedErrors: string[] = [];

        for (let i = 0; i < newInstitutionalContents.length; i++) {
          if (i === (indexPARAM !== undefined ? indexPARAM : index - 1)) {
            newCheckedErrors.push('ERROR');
          } else {
            newCheckedErrors.push('');
          }
        }

        setCheckedsErrors(newCheckedErrors);

        return { isError: true };
      }

      return { isError: false };
    },
    [newInstitutionalContents, checkeds, index],
  );

  const handleViewContent = useCallback(
    async (content: IConteudoInstitucional, i?: number) => {
      const { isError } = await validateCheckeds(content, i);

      if (isError) return { isError: true };

      if (!isPreview) {
        await pessoas_api.post(`/conteudo_intitucional/view/${content.id}`);
      }
      return { isError: false };
    },
    [isPreview, validateCheckeds],
  );

  const handleScrollTo = async (x: number, i: number) => {
    if (x < 0 && i > 1) {
      (itemsElement.current as any).scrollBy(x, 0);
      setIndex(i - 1);
    }
    if (x > 0 && i < newInstitutionalContents.length) {
      const { isError } = await handleViewContent(
        newInstitutionalContents[i - 1],
      );

      if (isError) return;

      (itemsElement.current as any).scrollBy(x, 0);
      setIndex(i + 1);
    }
  };

  const handleAvatar = (item: IConteudoInstitucional) => {
    if (item.character === 'ANDRE') {
      return <ImageAvatar src={AndreFullImage} />;
    }
    if (item.character === 'ANTONIO') {
      return <ImageAvatar src={AntonioFullImage} />;
    }
    if (item.character === 'CAROL') {
      return <ImageAvatar src={CarolFullImage} />;
    }
    if (item.character === 'THAIS') {
      return <ImageAvatar src={ThaisFullImage} />;
    }
  };

  const handleClose = useCallback(async () => {
    if (
      !checkeds[newInstitutionalContents.length - 1] &&
      newInstitutionalContents[newInstitutionalContents.length - 1].isRequired
    ) {
      await handleViewContent(
        newInstitutionalContents[newInstitutionalContents.length - 1],
      );
      return;
    }

    let isError = false;
    for (let i = 0; i < newInstitutionalContents.length; i++) {
      let content = newInstitutionalContents[i];

      if (!isError) {
        isError = (await handleViewContent(content, i)).isError;
      }
    }

    if (isError) return;

    resetErrorsAndChacks();
    setIndex(1);
    setShowModal(false);
  }, [
    checkeds,
    handleViewContent,
    setShowModal,
    newInstitutionalContents,
    resetErrorsAndChacks,
  ]);

  return (
    <Content
      show={showModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-dialog modal-lg"
      onHide={handleClose}
      scrollable={true}
      backdrop="static"
    >
      <ContainerBody>
        <div id="items" ref={itemsElement}>
          {newInstitutionalContents.map(
            (item: IConteudoInstitucional, i: number) => (
              <div className="item" key={i}>
                <div className="item-body">
                  <div>{handleAvatar(item)}</div>
                  <div className="container-text">
                    <p className="title">{item.title}</p>
                    <p>{item.description}</p>
                    <div className="container-check">
                      {item.isRequired && (
                        <>
                          <input
                            type="checkbox"
                            checked={checkeds[index - 1]}
                            onChange={e =>
                              handleChangeChecks(
                                checkeds,
                                e.target.checked,
                                index,
                              )
                            }
                            id={`check-${i}`}
                          />
                          <label
                            htmlFor={`check-${i}`}
                            className={`${
                              checkedsErrors[index - 1] &&
                              checkedsErrors[index - 1].length > 0
                                ? 'ERROR'
                                : ''
                            }`}
                          >
                            Li e estou de acordo
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </ContainerBody>
      <ContainerFooter>
        {newInstitutionalContents.length > 1 && (
          <ContainerIconNext>
            <p>
              {index} de {newInstitutionalContents.length}
            </p>
            <div className="icons">
              {index !== newInstitutionalContents.length && (
                <div
                  className="icon"
                  onClick={() => handleScrollTo(300, index)}
                >
                  <IoIosArrowDropright color={AZUL} size={24} />
                </div>
              )}
            </div>
          </ContainerIconNext>
        )}
        <Button onClick={() => handleClose()}>FECHAR</Button>
      </ContainerFooter>
    </Content>
  );
}
