import { yupResolver } from '@hookform/resolvers/yup';
import autoAnimate from '@formkit/auto-animate';
import { useForm } from 'react-hook-form';
import { Content, ContentFilter } from './style';
import * as Yup from 'yup';

import { useCallback, useEffect, useRef, useState } from 'react';
import IFiltroFornecedor from '..';
import { Subarea } from '../FiltroSubarea';
import FiltroSubarea from '../FiltroSubarea';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';

type FornecedorProps = {
  onChange?: (filtro: IFiltroFornecedor) => void;
  setMensagem: (mensagem: string) => void;
  viewAntonio: boolean;
  setViewAntonio: (viewAntonio: boolean) => void;
};

export default function Fornecedor({
  setMensagem,
  viewAntonio,
  setViewAntonio,
}: FornecedorProps) {
  const schema = Yup.object().shape({});
  const parent = useRef(null);

  const { volunteers, sizeFilter, setFiltroFornecedor } =
    useBuscaFornecedorOferta();

  const { control } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });
  const [subareas, setSubareas] = useState<string[]>([]);
  const [habilidades, setHabilidades] = useState<string[]>([]);

  useEffect(() => {
    setFiltroFornecedor(oldFiltro => ({
      ...oldFiltro,
      subareas,
      inVoluntariado: volunteers,
    }));
  }, [subareas, volunteers, setFiltroFornecedor, habilidades]);

  const handleChangeSubareas = useCallback((selSubareas: Subarea[]) => {
    setSubareas(selSubareas.map(sa => sa.descricao));
  }, []);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <Content ref={parent}>
      <ContentFilter ref={parent}>
        <FiltroSubarea
          control={control}
          label=""
          onChange={handleChangeSubareas}
        />
      </ContentFilter>
    </Content>
  );
}
