import { ReactComponent as CoracaoOn } from '../../assets/coracao.svg';
import { ReactComponent as EstrelaOff } from '../../assets/estrela-off.svg';
import { ReactComponent as Estrela } from '../../assets/estrela.svg';
import {
  Content,
  Body,
  InfoPrimary,
  Avaliacao,
  Footer,
  InfoSecondary,
  FotoPerfil,
  Foto,
  Favorito,
  TypographyName,
  Typography,
  AreaContainer,
} from './style';
import { Titulo } from '../Titulo';
import { AZUL, CINZA_40, LARANJA } from '../../styles/variaveis';
import { ModalLoading } from '../ModalLoading';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { pessoas_api } from '../../services/pessoas_api';
import { geral_api } from '../../services/geral_api';

interface IDataVitrine {
  dataVitrine: Array<any>;
  setRemoveUser: React.Dispatch<React.SetStateAction<Number>>;
}

export function VitrinePerfil({ dataVitrine, setRemoveUser }: IDataVitrine) {
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const history = useHistory();
  const [datas, setDatas] = useState<any[]>([]);

  useEffect(() => {
    const handleData = async () => {
      const allDatas: any = [];
      for (let data of dataVitrine) {
        const user = data.pessoas;
        const areas: string[] = [];
        const { data: allAreas } = await geral_api.get('/areas');
        const { data: userSubAreas } = await pessoas_api.get(
          `/pessoas/${user.id}/subareas-interesse`,
        );

        for (let area of allAreas) {
          let isUserArea = false;
          for (let subarea of userSubAreas) {
            const indexOfSubArea = area.subareas.findIndex(
              (sa: any) => sa.id === subarea.id_subarea_interesse,
            );
            if (indexOfSubArea !== -1) {
              areas.push(area.subareas[indexOfSubArea].descricao);
              isUserArea = true;
            } else {
              if (!isUserArea) {
                isUserArea = false;
              }
            }
          }
          if (isUserArea) {
            areas.push(area.descricao);
          }
        }
        allDatas.push({
          ...data,
          pessoas: {
            ...user,
            areas: areas,
          },
        });
      }
      setDatas(allDatas);
    };

    handleData();
  }, [dataVitrine]);

  async function handleRemoveFavorite(id: string) {
    setShowLoadingModal(true);
    await pessoas_api.delete(`/fornecedores/${id}/favoritos`);
    setRemoveUser(Number(id));
    setShowLoadingModal(false);
  }

  return (
    <Content>
      <div className="container">
        {datas.map((item, index) => (
          <div className="card" key={index}>
            <div
              onClick={() => {
                history.push(
                  `/fornecedor/perfil-publico/${
                    item.pessoas.id_usuario
                  }-${item.pessoas.nome.replace(/ /gi, '-')}`,
                );
              }}
            >
              <Body>
                <FotoPerfil>
                  <Foto src={item.imagem} alt={item.pessoas.nome_tratamento} />
                </FotoPerfil>

                <InfoPrimary>
                  <TypographyName>
                    {item.pessoas.nome_tratamento}
                  </TypographyName>

                  <Avaliacao>
                    <span>{item.avaliacao ? item.avaliacao : 0}</span>
                    {item.estrelas >= 1 ? <Estrela /> : <EstrelaOff />}
                    {item.estrelas >= 2 ? <Estrela /> : <EstrelaOff />}
                    {item.estrelas >= 3 ? <Estrela /> : <EstrelaOff />}
                    {item.estrelas >= 4 ? <Estrela /> : <EstrelaOff />}
                    {item.estrelas >= 5 ? <Estrela /> : <EstrelaOff />}
                  </Avaliacao>

                  <Typography>Ranking: {item.ranking}</Typography>
                  <Typography>Nº de projetos {item.projetos}</Typography>
                </InfoPrimary>
              </Body>
            </div>
            <Footer>
              <div>
                <Titulo titulo="FREELANCER" cor={AZUL} tamanho={12} />

                {item.pessoas.profissoes.length > 0 ? (
                  <Titulo
                    titulo={item.pessoas.profissoes[0]?.descricao}
                    cor={CINZA_40}
                    tamanho={16}
                  />
                ) : (
                  <Titulo titulo="Não informado" cor={CINZA_40} tamanho={16} />
                )}
                {item.pessoas.areas.length > 0 ? (
                  <div>
                    <Titulo
                      titulo="Áreas de atuação"
                      cor={LARANJA}
                      tamanho={16}
                    />
                    <AreaContainer>
                      {item.pessoas.areas.map((area: string, i: number) => (
                        <div key={i}>
                          {i <= 7 && <div className="area-item">{area}</div>}
                        </div>
                      ))}
                      {item.pessoas.areas.length > 7 && (
                        <div>
                          <div className="area-item active">
                            + {item.pessoas.areas.length - 8} áreas
                          </div>
                        </div>
                      )}
                    </AreaContainer>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div>
                <InfoSecondary>
                  <Favorito>
                    <CoracaoOn
                      onClick={() => {
                        handleRemoveFavorite(item.pessoas.id);
                      }}
                    />
                  </Favorito>
                </InfoSecondary>
                <ModalLoading
                  showModal={showLoadingModal}
                  setShowModal={setShowLoadingModal}
                />
              </div>
            </Footer>
          </div>
        ))}
      </div>
    </Content>
  );
}
