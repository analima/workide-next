import Image from 'next/image';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { Button } from '../Form/Button';
import { Content } from './style';
import PlaceholderImage from '../../assets/placeholderImg.png';

interface IProps {
  page: string;
}
export function InformationUser({ page }: IProps) {
  const { user } = useAuth();
  const history = useHistory();
  return (
    <Content>
      <div className="infos">
        {user?.arquivo ? (
          <Image
            src={user?.arquivo?.url}
            alt={user.arquivo?.nome}
            width={87}
            height={87}
            blurDataURL='"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU0NS8CAACSAFN02dlbQAAAABJRU5ErkJggg=="'
          />
        ) : (
          <Image
            src={PlaceholderImage}
            alt="placeholeder"
            width={87}
            height={87}
            blurDataURL='"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU0NS8CAACSAFN02dlbQAAAABJRU5ErkJggg=="'
          />
        )}
        <div className="info-user">
          <span>
            {user?.ong && <strong>ONG</strong>} {user?.nome}
          </span>
          <p>Bem-Vindo(a), comece a cadastrar suas necessidades</p>
        </div>
      </div>

      <div className="buttons">
        {page === 'busca' && (
          <span>Cadastre um projeto e receba propostas da comunidade.</span>
        )}

        <Button
          label="CADASTRAR PROJETO"
          onClick={() => history.push('/consumidor/projetos/geral')}
        />
        {page === 'home' && (
          <Button
            label="BUSCAR PROFISSIONAIS"
            onClick={() => history.push('/consumidor/busca')}
          />
        )}
      </div>
    </Content>
  );
}
