import { useEffect, useRef, useState } from 'react';
import {
  Container,
  ContentFilter,
  ContentButton,
  Button,
  ContainerLogin,
} from './styles';
import { FilterPrimaryAcess } from 'src/components/FilterPrimaryAcess';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AZUL, LARANJA } from 'src/styles/variaveis';
import { useRouter } from 'next/router';
import autoAnimate from '@formkit/auto-animate';
import { InputText } from 'src/components/Form/InputText';
import { salvarOrigemAcesso } from 'src/utils/origemAcesso';
import { GhostButton } from 'src/components/GhostButton';
import { useHistory } from 'react-router-dom';
import Link from 'next/link';

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
  const history = useHistory();
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
      '@freelas_town:primeiro-projeto',
      JSON.stringify({
        nameProject,
        subareas: selectedSubareas,
      }),
    );
    salvarOrigemAcesso('contratante/projetos/geral');
    router.push('/cadastro-basico');
  }

  return (
    <Container ref={parent}>
      <ContentFilter ref={parent}>
        <h1>Publicando seu primeiro projeto!</h1>
        <div className="content-input">
          <InputText
            control={control}
            label="Nome do projeto:"
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
          <Button color={LARANJA} onClick={() => history.goBack()}>
            VOLTAR
          </Button>
          <Button color={AZUL} onClick={saveLocalStorage}>
            AVANÇAR
          </Button>
        </ContentButton>
        <ContainerLogin>
          <span>Já tem uma conta? Faça</span> <Link href="/login">Login</Link>
        </ContainerLogin>
      </ContentFilter>
    </Container>
  );
}
