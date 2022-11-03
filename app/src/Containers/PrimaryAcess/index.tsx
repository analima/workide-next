import { useEffect, useRef, useState } from 'react';
import { hotjar } from 'react-hotjar';
import {
  Container,
  ContentFilter,
  ContentButton,
  ButtonOrange,
} from './styles';
import { CardPrimaryAcess } from 'src/components/CardPrimaryAcess';
import { FilterPrimaryAcess } from 'src/components/FilterPrimaryAcess';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LARANJA } from 'src/styles/variaveis';
import { useRouter } from 'next/router';
import autoAnimate from '@formkit/auto-animate';
import { Spinner } from 'src/components/Spinner';
import { InputText } from 'src/components/Form/InputText';

export default function PrimaryAcess() {
  const [step, setStep] = useState(2);
  const router = useRouter();
  const parent = useRef(null);
  const schema = Yup.object().shape({});
  const [loading, setLoading] = useState(false);

  const { control } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

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
                  name="name_projeto"
                />
              </div>
              <h2>SELECIONE ÁREA E SUB-ÁREA DA ATIVIDADE NECESSITADA</h2>
              <FilterPrimaryAcess control={control} setLoading={setLoading} />
              <ContentButton>
                <ButtonOrange onClick={() => router.push('/cadastro-basico')}>
                  PULAR
                </ButtonOrange>
              </ContentButton>
            </ContentFilter>
          )}
        </>
      )}
    </Container>
  );
}
