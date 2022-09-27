import { Content } from './style';
import { Selos } from './selos';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface IMedalha {
  chave: string;
  isActive?: boolean;
}

interface ISelo {
  chave: string;
  componente: React.FunctionComponent;
  descricao: string;
}

export function Medalha({ chave, isActive }: IMedalha) {
  const [selo, setSelo] = useState({} as ISelo);
  useEffect(() => {
    Selos.forEach(selo => selo.chave === chave && setSelo(selo));
  }, [chave]);

  return (
    <Content isActive={isActive}>
      <OverlayTrigger
        key={selo.chave}
        overlay={
          <Tooltip id={`tooltip-${selo.chave}`}>{selo.descricao}</Tooltip>
        }
      >
        <div>
          {selo.chave && (
            <Image
              id={selo.chave}
              src={selo.componente as any}
              width={'25px'}
              height={'25px'}
              alt="perfil-image"
            />
          )}
        </div>
      </OverlayTrigger>
    </Content>
  );
}
