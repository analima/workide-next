import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  Content,
  ContentIcon,
  ContentFilter,
  HeaderTitle,
  TypographyTitle,
} from './style';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { FiltroSubarea, Subarea } from '../FiltroSubarea';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { PRETO_40 } from '../../../../../styles/variaveis';
import { FiltroHabilidades } from '../FiltroHabilidades';
import { InputNumber } from '../../../../../components/Form/InputNumber';

export function Oferta() {
  const { sizeFilter, setSizeFilter, setFiltroOferta, limparFiltros } =
    useBuscaFornecedorOferta();
  const schema = Yup.object().shape({});
  const [subareas, setSubareas] = useState<string[]>([]);
  const [habilidades, setHabilidades] = useState<string[]>([]);

  const [precoMinimo, setPrecoMinimo] = useState(0);
  const [precoMaximo, setPrecoMaximo] = useState(0);
  const [prazo, setPrazo] = useState(0);

  const { control, setValue } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setPrecoMinimo(0);
    setPrecoMaximo(0);
    setPrazo(0);
    setValue('preco_minimo', '');
    setValue('preco_maximo', '');
  }, [limparFiltros, setValue]);

  const handleChangeSubareas = useCallback((selSubareas: Subarea[]) => {
    setSubareas(selSubareas.map(sa => sa.descricao));
  }, []);

  const handleChangeHabilidades = useCallback((selHabilidades: any[]) => {
    setHabilidades(selHabilidades.map(sa => sa.habilidades));
  }, []);

  useEffect(() => {
    setFiltroOferta(oldFiltro => ({
      ...oldFiltro,
      subareas,
      habilidades,
      preco_minimo: precoMinimo,
      preco_maximo: precoMaximo,
      prazo,
    }));
  }, [subareas, precoMinimo, precoMaximo, prazo, setFiltroOferta, habilidades]);

  return (
    <Content sizeFilter={sizeFilter}>
      <ContentIcon sizeFilter={sizeFilter}>
        {sizeFilter === 'small' ? (
          <FiArrowRight
            onClick={() => setSizeFilter('large')}
            color={PRETO_40}
            size={20}
          />
        ) : (
          <FiArrowLeft
            onClick={() => setSizeFilter('small')}
            color={PRETO_40}
            size={20}
          />
        )}
      </ContentIcon>
      {sizeFilter === 'large' && (
        <>
          <ContentFilter>
            <HeaderTitle>
              <TypographyTitle>Áreas</TypographyTitle>
            </HeaderTitle>
            <FiltroSubarea
              label=""
              control={control}
              onChange={handleChangeSubareas}
            />
          </ContentFilter>

          <ContentFilter>
            <HeaderTitle>
              <TypographyTitle>Habilidades</TypographyTitle>
            </HeaderTitle>

            <FiltroHabilidades
              control={control}
              onChange={handleChangeHabilidades}
              page="busca"
            />
          </ContentFilter>

          <ContentFilter>
            <HeaderTitle>
              <TypographyTitle>Faixa de preço</TypographyTitle>
            </HeaderTitle>

            <InputNumber
              name="preco_minimo"
              control={control}
              placeholder="R$"
              label="De:"
              onBlur={(e: any) => setPrecoMinimo(Number(e.target.value))}
              onKeyUp={(e: any) => {
                if (e.keyCode === 13) {
                  setPrecoMinimo(Number(e.target.value));
                }
              }}
            />

            <InputNumber
              name="preco_maximo"
              control={control}
              placeholder="R$"
              label="Até:"
              onBlur={(e: any) => setPrecoMaximo(Number(e.target.value))}
              onKeyUp={(e: any) => {
                if (e.keyCode === 13) {
                  setPrecoMaximo(Number(e.target.value));
                }
              }}
            />
          </ContentFilter>

          <ContentFilter>
            <HeaderTitle>
              <TypographyTitle>Prazo de entrega</TypographyTitle>
            </HeaderTitle>

            <InputNumber
              name="em_dias"
              control={control}
              placeholder="prazo"
              onBlur={(e: any) => setPrazo(Number(e.target.value))}
              onKeyUp={(e: any) => {
                if (e.keyCode === 13) {
                  setPrazo(Number(e.target.value));
                }
              }}
            />
          </ContentFilter>
        </>
      )}
    </Content>
  );
}
