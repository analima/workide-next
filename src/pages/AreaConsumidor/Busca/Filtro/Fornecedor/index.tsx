import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  Content,
  ContentIcon,
  HeaderTitle,
  ContentFilter,
  TypographyTitle,
  ContentCheck,
} from './style';
import * as Yup from 'yup';

import { useCallback, useEffect, useState } from 'react';
import { IFiltroFornecedor } from '..';
import { FiltroSubarea, Subarea } from '../FiltroSubarea';
import { InputCheck } from '../../../../../components/Form/InputCheck';
import { FaQuestionCircle } from 'react-icons/fa';
import { PRETO_40 } from '../../../../../styles/variaveis';
import { useBuscaFornecedorOferta } from '../../../../../hooks/buscaConsumidor';
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
import  FiltroHabilidades  from '../FiltroHabilidades';
import  FiltroCausas  from '../FiltroCausas';

type FornecedorProps = {
  onChange?: (filtro: IFiltroFornecedor) => void;
  setMensagem: (mensagem: string) => void;
  viewAntonio: boolean;
  setViewAntonio: (viewAntonio: boolean) => void;
};

export function Fornecedor({
  setMensagem,
  viewAntonio,
  setViewAntonio,
}: FornecedorProps) {
  const schema = Yup.object().shape({});
  const {
    volunteers,
    consultant,
    setConsultant,
    freelancer,
    setFreelancer,
    especialista,
    setEspecialista,
    coaching,
    setCoaching,
    mentor,
    setMentor,
    sizeFilter,
    setSizeFilter,
    basic,
    setBasic,
    intermediary,
    setIntermediary,
    advanced,
    setAdvanced,
    specialist,
    setSpecialist,
    setFiltroFornecedor,
    avaliacao,
    setAvaliacao,
    causas,
    setCausas,
  } = useBuscaFornecedorOferta();

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
      habilidades,
      causas,
    }));
  }, [subareas, volunteers, setFiltroFornecedor, habilidades, causas]);

  const handleChangeSubareas = useCallback((selSubareas: Subarea[]) => {
    setSubareas(selSubareas.map(sa => sa.descricao));
  }, []);

  const handleChangeHabilidades = useCallback((selHabilidades: any[]) => {
    setHabilidades(selHabilidades.map(sa => sa.habilidades));
  }, []);

  const handleChangeCausas = useCallback(
    (selCausas: any[]) => {
      setCausas(selCausas);
    },
    [setCausas],
  );

  return (
    <Content sizeFilter={sizeFilter}>
      <ContentIcon sizeFilter={sizeFilter}>
        {sizeFilter === 'small' ? (
          <FiArrowUpRight
            onClick={() => setSizeFilter('large')}
            color={PRETO_40}
            size={20}
          />
        ) : (
          <FiArrowDownLeft
            onClick={() => setSizeFilter('small')}
            color={PRETO_40}
            size={20}
          />
        )}
      </ContentIcon>
      {sizeFilter === 'large' && (
        <>
          {volunteers && (
            <ContentFilter>
              <HeaderTitle>
                <TypographyTitle>Causas sociais</TypographyTitle>
              </HeaderTitle>
              <FiltroCausas
                label=""
                control={control}
                onChange={handleChangeCausas}
              />
            </ContentFilter>
          )}
          <ContentFilter>
            <HeaderTitle>
              <TypographyTitle>Categoria</TypographyTitle>
              <FaQuestionCircle
                onClick={() => {
                  setViewAntonio(!viewAntonio);
                  setMensagem(
                    'Um mentor: é aquele que dá suporte e encorajamento para que a outra pessoa gerencie seu próprio aprendizado, maximize seu portencial, desenvolva suas skills, aprimore sua performance e se torne a melhor pessoa que ela possa vir a ser.',
                  );
                }}
                size={16}
                color={PRETO_40}
              />
            </HeaderTitle>
            <ContentCheck>
              <InputCheck
                checked={freelancer}
                control={control}
                name="freelancer"
                type="checkbox"
                className="label-blue"
                label="Freelancer"
                onClick={() => setFreelancer(!freelancer)}
              />

              <InputCheck
                checked={especialista}
                control={control}
                name="especialista"
                type="checkbox"
                className="label-blue"
                label="Especialista"
                onClick={() => setEspecialista(!especialista)}
              />

              <InputCheck
                checked={consultant}
                control={control}
                name="consultor"
                type="checkbox"
                className="label-blue"
                label="Consultor"
                onClick={() => setConsultant(!consultant)}
              />

              <InputCheck
                checked={coaching}
                control={control}
                name="coaching"
                type="checkbox"
                className="label-blue"
                label="Coaching"
                onClick={() => setCoaching(!coaching)}
              />

              <InputCheck
                checked={mentor}
                control={control}
                name="mentor"
                type="checkbox"
                className="label-blue"
                label="Mentor"
                onClick={() => setMentor(!mentor)}
              />
            </ContentCheck>
          </ContentFilter>

          <ContentFilter>
            <HeaderTitle>
              <TypographyTitle>Nível de experiência</TypographyTitle>
            </HeaderTitle>

            <ContentCheck>
              <InputCheck
                checked={basic}
                control={control}
                name="basico"
                type="checkbox"
                className="label-blue"
                label="Básico"
                onClick={() => setBasic(!basic)}
              />

              <InputCheck
                checked={intermediary}
                control={control}
                name="intermediario"
                type="checkbox"
                className="label-blue"
                label="Intermediário"
                onClick={() => setIntermediary(!intermediary)}
              />

              <InputCheck
                checked={advanced}
                control={control}
                name="avancado"
                type="checkbox"
                className="label-blue"
                label="Avançado"
                onClick={() => setAdvanced(!advanced)}
              />

              <InputCheck
                checked={specialist}
                control={control}
                name="specialist"
                type="checkbox"
                className="label-blue"
                label="Especialista"
                onClick={() => setSpecialist(!specialist)}
              />
            </ContentCheck>
          </ContentFilter>

          <ContentFilter>
            <HeaderTitle>
              <TypographyTitle>Avaliação</TypographyTitle>
            </HeaderTitle>

            <ContentCheck>
              <InputCheck
                checked={avaliacao === 3}
                control={control}
                name="3estrelas"
                type="checkbox"
                className="label-blue"
                label="3 estrelas"
                onClick={() => setAvaliacao(3)}
              />

              <InputCheck
                checked={avaliacao === 4}
                control={control}
                name="4estrelas"
                type="checkbox"
                className="label-blue"
                label="4 estrelas"
                onClick={() => setAvaliacao(4)}
              />

              <InputCheck
                checked={avaliacao === 5}
                control={control}
                name="5estrelas"
                type="checkbox"
                className="label-blue"
                label="5 estrelas"
                onClick={() => setAvaliacao(5)}
              />

              <InputCheck
                checked={avaliacao === 0}
                control={control}
                name="indiferente"
                type="checkbox"
                className="label-blue"
                label="Indiferente"
                onClick={() => setAvaliacao(0)}
              />
            </ContentCheck>
          </ContentFilter>

          <ContentFilter>
            <HeaderTitle>
              <TypographyTitle>Áreas</TypographyTitle>
            </HeaderTitle>
            <FiltroSubarea
              control={control}
              label=""
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
              label=""
            />
          </ContentFilter>
        </>
      )}
    </Content>
  );
}
