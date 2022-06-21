import { OverlayTrigger } from 'react-bootstrap';
import { ReactComponent as Selo } from '../../assets/selo-membro.svg';
import { ReactComponent as SeloVideo } from '../../assets/selo-membro-without-shadow.svg';
import { Content, TooltipMember } from './style';

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
        {isViewVideo ? <SeloVideo /> : <Selo />}
      </OverlayTrigger>
    </Content>
  );
}
