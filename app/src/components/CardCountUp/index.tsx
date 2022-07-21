import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import {
  Container,
  Contador,
  Title,
  ContentData,
  DataProjects,
} from './styles';

import { useEffect, useState } from 'react';
import { consultas_api } from '../../services/consultas_api';

import Oportunidades from '../../assets/oportunidades.svg';
import Usuarios from '../../assets/usuarios.svg';
import Horas from '../../assets/horasprojetos.svg';
import Voluntarios from '../../assets/voluntarios.svg';
import Instituicoes from '../../assets/instituicoessociais.svg';
import Image from 'next/image';

interface Props {
  projetos: number;
  usuarios: number;
  horas: number;
  voluntarios: number;
  projetosVoluntarios: number;
}
export function CardCountUp() {
  const [totalProjetos, setTotalProjetos] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalHoras, setTotalHoras] = useState(0);

  const [totalProfissionaisVoluntarios, setTotalProfissionaisVoluntarios] =
    useState(0);
  const [totalProjetosVoluntarios, setTotalProjetosVoluntarios] = useState(0);

  useEffect(() => {
    consultas_api.get<Props>('/consulta/estatisticas').then(({ data }) => {
      setTotalUsuarios(data.usuarios);
      setTotalHoras(data.horas);
      setTotalProfissionaisVoluntarios(data.voluntarios);
      setTotalProjetosVoluntarios(data.projetosVoluntarios);
      setTotalProjetos(data.projetos);
    });
  }, []);

  return (
    <Container>
      <DataProjects>
        <h1>
          Dados que comprovam o sucesso da <br /> conexão entre projetos e
          pessoas
        </h1>
        <div>
          <ContentData>
            <Image src={Oportunidades} alt="Icon-Foguete" />
            <Contador>
              <CountUp end={totalProjetos} delay={1} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <strong ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              +
            </Contador>
            <Title>Oportunidades</Title>
          </ContentData>

          <ContentData>
            <Image src={Usuarios} alt="Icon-Sucesso" />

            <Contador>
              <CountUp end={totalUsuarios} delay={1} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <strong ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              +
            </Contador>
            <Title>Usuários</Title>
          </ContentData>

          <ContentData>
            <Image src={Horas} alt="Icon-Grafico" />
            <Contador>
              <CountUp end={totalHoras} delay={1} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <strong ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              +
            </Contador>
            <Title>Horas de projetos</Title>
          </ContentData>

          <ContentData>
            <Image src={Voluntarios} alt="Icon-Concept" />
            <Contador>
              <CountUp
                end={totalProfissionaisVoluntarios}
                delay={1}
                redraw={true}
              >
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <strong ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              +
            </Contador>
            <Title>Voluntários</Title>
          </ContentData>

          <ContentData>
            <Image src={Instituicoes} alt="Icon-Foguete" />

            <Contador>
              <CountUp end={totalProjetosVoluntarios} delay={1} redraw={true}>
                {({ countUpRef, start }) => (
                  <VisibilitySensor onChange={start} delayedCall>
                    <strong ref={countUpRef} />
                  </VisibilitySensor>
                )}
              </CountUp>
              +
            </Contador>
            <Title>Instituições Sociais</Title>
          </ContentData>
        </div>
      </DataProjects>
    </Container>
  );
}
