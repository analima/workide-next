import { OverlayTrigger } from 'react-bootstrap';
import Selo  from '../../assets/selo-membro.svg';
import SeloVideo  from '../../assets/selo-membro-without-shadow.svg';
import { Content, TooltipMember } from './style';
import Image from 'next/image'

interface Props {
  id: number;
  isViewVideo?: boolean;
}

export function SeloMembro({ id, isViewVideo }: Props) {
  return (
    <Content isViewVideo={isViewVideo}>
      <OverlayTrigger
        key={id}
        overlay={
          <TooltipMember>
            Esse profissional trabalhou no desenvolvimento dessa plataforma.
          </TooltipMember>
        }
      >
        {isViewVideo ? <Image src={SeloVideo} alt="selo video" /> : <Image src={Selo} alt="selo"/>}
      </OverlayTrigger>
    </Content>
  );
}
