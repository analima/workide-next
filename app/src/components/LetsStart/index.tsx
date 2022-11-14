import { Content, ContentImage, ContentInfo } from './style';

import { FiArrowRight } from 'react-icons/fi';
import { AZUL, BRANCO, LARANJA, VERDE } from '../../styles/variaveis';
import IMG from '@public/lets-start.png';
import { useRouter } from 'next/router';
import { Button } from '../Form/Button';
import Image from 'next/image';

export function LetsStart() {
  const router = useRouter();

  return (
    <Content>
      <ContentInfo>
        <h1>Vamos começar? Publique seu primeiro projeto!</h1>
        <span>
          Faça sua primeira solicitação de serviços e encontre agora mesmo um
          profissional qualificado para a sua demanda.
        </span>
        <Button
          label="CRIAR PROJETO"
          onClick={() => router.push('/primeiro-acesso')}
        />
      </ContentInfo>

      <ContentImage>
        <Image src={IMG} alt="lets-start" />
      </ContentImage>
    </Content>
  );
}
