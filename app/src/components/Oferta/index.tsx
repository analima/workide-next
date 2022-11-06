import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Content, ContentFilter } from './style';
import * as Yup from 'yup';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Subarea } from '../FiltroSubarea';
import FiltroSubarea from '../FiltroSubarea';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';
import autoAnimate from '@formkit/auto-animate';

export default function Oferta() {
  const { sizeFilter, setFiltroOferta, limparFiltros } =
    useBuscaFornecedorOferta();
  const schema = Yup.object().shape({});
  const [subareas, setSubareas] = useState<string[]>([]);
  const parent = useRef(null);

  const { control } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  const handleChangeSubareas = useCallback((selSubareas: Subarea[]) => {
    setSubareas(selSubareas.map(sa => sa.descricao));
  }, []);

  useEffect(() => {
    setFiltroOferta(oldFiltro => ({
      ...oldFiltro,
      subareas,
    }));
  }, [subareas, setFiltroOferta]);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <Content ref={parent}>
      <ContentFilter ref={parent}>
        <FiltroSubarea
          label=""
          control={control}
          onChange={handleChangeSubareas}
        />
      </ContentFilter>
    </Content>
  );
}
