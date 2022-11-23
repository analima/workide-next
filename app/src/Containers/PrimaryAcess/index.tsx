import { useEffect, useRef, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { Container, ContentFilter, ContentButton, Button } from './styles';
import { CardPrimaryAcess } from 'src/components/CardPrimaryAcess';
import { FilterPrimaryAcess } from 'src/components/FilterPrimaryAcess';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AZUL, LARANJA } from 'src/styles/variaveis';
import { useRouter } from 'next/router';
import autoAnimate from '@formkit/auto-animate';
import { Spinner } from 'src/components/Spinner';
import { InputText } from 'src/components/Form/InputText';

export type Subarea = {
  id: number;
  descricao: string;
  selected: boolean;
};

export default function PrimaryAcess() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const parent = useRef(null);
  const schema = Yup.object().shape({});
  const [loading, setLoading] = useState(false);
  const [selectedSubareas, setSelectedSubareas] = useState<Subarea[]>([]);
  const [nameProject, setNameProject] = useState('');
  const { control, watch } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    watch((value: any) => {
      setNameProject(value.name_project);
    });
  }, [watch, control._formValues.name_project]);

  function saveLocalStorage() {
    localStorage.setItem(
      '@freelas_town:primeiro-acesso',
      JSON.stringify({
        nameProject,
        subareas: selectedSubareas,
      }),
    );

    router.push('/cadastro-basico');
  }

  return (
    <Container ref={parent}>
      {step === 1 ? (
        <CardPrimaryAcess setStep={setStep} />
      ) : (
        <>
          {loading ? (
            <Spinner type="info" size="32px" />
          ) : (
            <ContentFilter ref={parent}>
              <h1>Aproveite e publique seu primeiro projeto!</h1>
              <div className="content-input">
                <InputText
                  control={control}
                  label="Como seu projeto deve ser chamado:"
                  name="name_project"
                />
              </div>
              <h2>SELECIONE ÁREA E SUB-ÁREA DA ATIVIDADE NECESSITADA</h2>
              <FilterPrimaryAcess
                control={control}
                setLoading={setLoading}
                setter={setSelectedSubareas}
              />
              <ContentButton>
                <Button color={AZUL} onClick={saveLocalStorage}>
                  AVANÇAR
                </Button>
              </ContentButton>
            </ContentFilter>
          )}
        </>
      )}
    </Container>
  );
}
