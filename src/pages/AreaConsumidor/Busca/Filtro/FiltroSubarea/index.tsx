import React, { useCallback, useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import { InputCheck } from '../../../../../components/Form/InputCheck';
import { InputText } from '../../../../../components/Form/InputText';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';
import { useCaptarProjetoFornecedor } from '../../../../../hooks/captarProjetoFornecedor';
import { geral_api } from '../../../../../services/geral_api';
import {
  Container,
  Grupo,
  GrupoResultado,
  SubAreaContainer,
  SubAreaItem,
} from './style';

export type Subarea = {
  id: number;
  descricao: string;
  selected: boolean;
};

type Area = {
  descricao: string;
  id: number;
  subareas: Subarea[];
};

type FiltroSubareaProps = {
  control: Control;
  onChange?: (subareas: Subarea[]) => void;
  label?: string;
  setter?: React.Dispatch<React.SetStateAction<Subarea[]>>;
  initialValue?: Subarea[];
  page?: string;
};

const FiltroSubarea = ({
  control,
  onChange,
  label = 'Selecione uma ou mais áreas',
  setter,
  initialValue,
  page,
}: FiltroSubareaProps): JSX.Element => {
  const { handleSubmit, obterProjetos, mudar, setValue } =
    useCaptarProjetoFornecedor();
  const { isMudar } = useBuscaFornecedorOferta();

  const [areas, setAreas] = useState<Area[]>([]);
  const [selectedSubareas, setSelectedSubareas] = useState<Subarea[]>([]);
  const [textoSubarea, setTextoSubarea] = useState('');
  const [subareaGraficos, setSubareaGraficos] = useState<Subarea[]>([]);
  const [subareaMarketing, setSubareaMarketing] = useState<Subarea[]>([]);
  const [subareaEscrita, setSubareaEscrita] = useState<Subarea[]>([]);
  const [subareaVideo, setSubareaVideo] = useState<Subarea[]>([]);
  const [subareaTecnologia, setSubareaTecnologia] = useState<Subarea[]>([]);

  const [foundAreasLength, setFoundAreasLength] = useState(0);

  const onSubmit = useCallback(() => {
    if (page === 'captar') {
      obterProjetos();
    }
  }, [obterProjetos, page]);

  useEffect(() => {
    if (page === 'captar') setValue('busca', '');

    setTextoSubarea('');
    setSubareaGraficos([]);
    setSubareaMarketing([]);
    setSubareaEscrita([]);
    setSubareaVideo([]);
    setSubareaTecnologia([]);
    setSelectedSubareas([]);
    setAreas(oldAreas => {
      return oldAreas.map(a => ({
        id: a.id,
        descricao: a.descricao,
        subareas: a.subareas.map(sa => ({
          id: sa.id,
          descricao: sa.descricao,
          selected: false,
        })),
      }));
    });
  }, [mudar, isMudar, page, setValue]);

  useEffect(() => {
    if (page === 'captar') {
      handleSubmit(onSubmit);
    }
  }, [handleSubmit, onSubmit, page, selectedSubareas]);

  const handleChangeSubareas = useCallback((event: any) => {
    const selectedId = Number(event.target.id);
    setAreas(oldAreas => {
      return oldAreas.map(a => ({
        id: a.id,
        descricao: a.descricao,
        subareas: a.subareas.map(sa => ({
          id: sa.id,
          descricao: sa.descricao,
          selected: selectedId === sa.id ? !sa.selected : sa.selected,
        })),
      }));
    });
  }, []);

  useEffect(() => {
    if (textoSubarea) {
      setSubareaGraficos(areas[0].subareas);
      setSubareaMarketing(areas[1].subareas);
      setSubareaEscrita(areas[2].subareas);
      setSubareaVideo(areas[3].subareas);
      setSubareaTecnologia(areas[4].subareas);

      setSubareaGraficos(oldSubareas =>
        oldSubareas.filter(
          sa =>
            sa.descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1 ||
            areas[0].descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1,
        ),
      );

      setSubareaMarketing(oldSubareas =>
        oldSubareas.filter(
          sa =>
            sa.descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1 ||
            areas[1].descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1,
        ),
      );

      setSubareaEscrita(oldSubareas =>
        oldSubareas.filter(
          sa =>
            sa.descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1 ||
            areas[2].descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1,
        ),
      );

      setSubareaVideo(oldSubareas =>
        oldSubareas.filter(
          sa =>
            sa.descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1 ||
            areas[3].descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1,
        ),
      );

      setSubareaTecnologia(oldSubareas =>
        oldSubareas.filter(
          sa =>
            sa.descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1 ||
            areas[4].descricao
              .toLocaleLowerCase()
              .indexOf(textoSubarea.toLocaleLowerCase()) !== -1,
        ),
      );
    } else {
      setSubareaGraficos([]);
      setSubareaMarketing([]);
      setSubareaEscrita([]);
      setSubareaVideo([]);
      setSubareaTecnologia([]);
    }

    const selSubareas: Subarea[] = [];

    areas.forEach(a => {
      a.subareas.forEach(sa => {
        if (sa.selected) selSubareas.push(sa);
      });
    });

    if (page === 'captar') {
      handleSubmit(onSubmit);
    }

    setSelectedSubareas(selSubareas);
  }, [areas, handleSubmit, onSubmit, page, textoSubarea]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedSubareas);
    }
    if (setter !== undefined) {
      setter(selectedSubareas);
    }
  }, [onChange, selectedSubareas, setter]);

  useEffect(() => {
    if (initialValue) {
      setSelectedSubareas(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    geral_api.get<Area[]>('/areas').then(res => {
      setAreas(
        res.data.map(a => ({
          descricao: a.descricao,
          id: a.id,
          subareas: a.subareas.map(sa => ({
            id: sa.id,
            descricao: sa.descricao,
            selected:
              initialValue?.map((iv: Subarea) => iv.id).includes(sa.id) ||
              false,
          })),
        })),
      );
    });
  }, [initialValue]);

  useEffect(() => {
    setFoundAreasLength(
      subareaGraficos.length +
        subareaMarketing.length +
        subareaEscrita.length +
        subareaVideo.length +
        subareaTecnologia.length,
    );
  }, [
    subareaGraficos,
    subareaMarketing,
    subareaEscrita,
    subareaVideo,
    subareaTecnologia,
  ]);

  return (
    <Container>
      <ul>
        <li>
          <Grupo>
            <div
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTextoSubarea(event.target.value.toLocaleLowerCase())
              }
            >
              <InputText
                autoComplete="off"
                value={textoSubarea}
                control={control}
                label={label}
                placeholder="Faça uma busca"
                name="busca"
              />
            </div>
          </Grupo>
        </li>

        {foundAreasLength > 0 && (
          <li>
            <label className="resultados">Resultados</label>
            <GrupoResultado>
              {subareaGraficos.length > 0 && (
                <SubAreaContainer>
                  <span>{areas[0]?.descricao}</span>
                  {subareaGraficos.map(selectedSubarea => (
                    <SubAreaItem
                      className="subarea__item"
                      key={selectedSubarea.id}
                    >
                      <InputCheck
                        control={control}
                        name={selectedSubarea.id.toString()}
                        type="checkbox"
                        checked={selectedSubarea.selected}
                        onChange={handleChangeSubareas}
                        label={selectedSubarea.descricao}
                        onClick={() => {
                          if (page === 'captar') {
                            handleSubmit(onSubmit);
                          }
                        }}
                      />
                    </SubAreaItem>
                  ))}
                </SubAreaContainer>
              )}
              {subareaMarketing.length > 0 && (
                <SubAreaContainer>
                  <span>{areas[1]?.descricao}</span>
                  {subareaMarketing.map((selectedSubarea: any) => (
                    <SubAreaItem
                      className="subarea__item"
                      key={selectedSubarea.id}
                    >
                      <InputCheck
                        control={control}
                        name={selectedSubarea.id.toString()}
                        type="checkbox"
                        checked={selectedSubarea.selected}
                        onChange={handleChangeSubareas}
                        label={selectedSubarea.descricao}
                        onClick={() => {
                          if (page === 'captar') {
                            handleSubmit(onSubmit);
                          }
                        }}
                      />
                    </SubAreaItem>
                  ))}
                </SubAreaContainer>
              )}
              {subareaEscrita.length > 0 && (
                <SubAreaContainer>
                  <span>{areas[2]?.descricao}</span>
                  {subareaEscrita.map(selectedSubarea => (
                    <SubAreaItem
                      className="subarea__item"
                      key={selectedSubarea.id}
                    >
                      <InputCheck
                        control={control}
                        name={selectedSubarea.id.toString()}
                        type="checkbox"
                        checked={selectedSubarea.selected}
                        onChange={handleChangeSubareas}
                        label={selectedSubarea.descricao}
                        onClick={() => {
                          if (page === 'captar') {
                            handleSubmit(onSubmit);
                          }
                        }}
                      />
                    </SubAreaItem>
                  ))}
                </SubAreaContainer>
              )}
              {subareaVideo.length > 0 && (
                <SubAreaContainer>
                  <span>{areas[3]?.descricao}</span>
                  {subareaVideo.map(selectedSubarea => (
                    <SubAreaItem
                      className="subarea__item"
                      key={selectedSubarea.id}
                    >
                      <InputCheck
                        control={control}
                        name={selectedSubarea.id.toString()}
                        type="checkbox"
                        checked={selectedSubarea.selected}
                        onChange={handleChangeSubareas}
                        label={selectedSubarea.descricao}
                        onClick={() => {
                          if (page === 'captar') {
                            handleSubmit(onSubmit);
                          }
                        }}
                      />
                    </SubAreaItem>
                  ))}
                </SubAreaContainer>
              )}
              {subareaTecnologia.length > 0 && (
                <SubAreaContainer>
                  <span>{areas[4]?.descricao}</span>
                  {subareaTecnologia.map(selectedSubarea => (
                    <SubAreaItem
                      className="subarea__item"
                      key={selectedSubarea.id}
                    >
                      <InputCheck
                        control={control}
                        name={selectedSubarea.id.toString()}
                        type="checkbox"
                        checked={selectedSubarea.selected}
                        onChange={handleChangeSubareas}
                        label={selectedSubarea.descricao}
                        onClick={() => {
                          if (page === 'captar') {
                            handleSubmit(onSubmit);
                          }
                        }}
                      />
                    </SubAreaItem>
                  ))}
                </SubAreaContainer>
              )}
            </GrupoResultado>
          </li>
        )}

        <li>
          {selectedSubareas.length > 0 && (
            <>
              <label className="resultados">Selecionados</label>
              <GrupoResultado>
                <SubAreaContainer>
                  {selectedSubareas?.map(selectedSubarea => (
                    <SubAreaItem
                      className="subarea__item"
                      key={selectedSubarea.id}
                    >
                      <InputCheck
                        control={control}
                        name={selectedSubarea.id.toString()}
                        type="checkbox"
                        checked={selectedSubarea.selected}
                        onChange={handleChangeSubareas}
                        label={selectedSubarea.descricao}
                        onClick={() => {
                          if (page === 'captar') {
                            handleSubmit(onSubmit);
                          }
                        }}
                      />
                    </SubAreaItem>
                  ))}
                </SubAreaContainer>
              </GrupoResultado>
            </>
          )}
        </li>
      </ul>
    </Container>
  );
};

export { FiltroSubarea };
