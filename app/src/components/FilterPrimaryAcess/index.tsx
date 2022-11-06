import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Control } from 'react-hook-form';
import autoAnimate from '@formkit/auto-animate';
import {
  Container,
  GrupoResultado,
  SubAreaContainer,
  NameArea,
  SubAreaItem,
} from './style';
import { Area } from 'src/components/VitrinePerfil/style';
import { geral_api } from 'src/services/geral_api';
import { InputCheck } from '../Form/InputCheck';

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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onChange?: (subareas: Subarea[]) => void;
  label?: string;
  setter: React.Dispatch<React.SetStateAction<Subarea[]>>;
  initialValue?: Subarea[];
};

export function FilterPrimaryAcess({
  control,
  onChange,
  label = 'Selecione uma ou mais áreas',
  setter,
  initialValue,
  setLoading,
}: FiltroSubareaProps) {
  const parent = useRef(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [areaSelect, setAreaSelect] = useState(
    areas[1]?.descricao || 'Gráficos & Design',
  );

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
    const selSubareas: Subarea[] = [];

    areas.forEach(a => {
      a.subareas.forEach(sa => {
        if (sa.selected) selSubareas.push(sa);
      });
    });

    setter(selSubareas);
  }, [areas, setter]);

  useEffect(() => {
    try {
      setLoading(true);

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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [initialValue, setLoading]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent, setLoading]);

  return (
    <Container>
      <GrupoResultado>
        <SubAreaContainer>
          <div className="areas">
            {areas.map(i => {
              return (
                <NameArea
                  ref={parent}
                  onClick={() => {
                    if (areaSelect === i.descricao) setAreaSelect('');
                    if (areaSelect !== i.descricao) setAreaSelect(i.descricao);
                  }}
                  select={areaSelect === i.descricao}
                  key={i.id}
                >
                  {i?.descricao}
                </NameArea>
              );
            })}
          </div>

          <SubAreaItem ref={parent} className="subarea__item">
            {areas
              .filter(i => i.descricao === areaSelect)
              .map(i => i.subareas)
              .map(selectedSubarea => (
                <>
                  {selectedSubarea.map(i => (
                    <InputCheck
                      key={i.descricao}
                      control={control}
                      name={i.id.toString()}
                      type="checkbox"
                      checked={i.selected}
                      onChange={handleChangeSubareas}
                      label={i.descricao}
                    />
                  ))}
                </>
              ))}
          </SubAreaItem>
        </SubAreaContainer>
      </GrupoResultado>
    </Container>
  );
}
