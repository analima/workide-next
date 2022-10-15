import Image from 'next/image';
import { useAuth } from '../../contexts/auth';
import { Button } from '../Form/Button';
import { Content } from './style';
import PlaceholderImage from '../../assets/placeholderImg.png';
import { useRouter } from 'next/router';

interface IProps {
  page: string;
}
export function InformationUser({ page }: IProps) {
  const { user } = useAuth();
  const router = useRouter();
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
            {user.ong && <strong>ONG</strong>}
            {user.ong && ' - '}
            {user.nome}
          </span>
          <p>Bem-Vindo(a), comece a cadastrar suas necessidades</p>
        </div>
      </div>

      <div className="buttons">
        {page === 'busca' && (
          <>
            <span>Cadastre um projeto e receba propostas da comunidade.</span>
            <Button
              label="CADASTRAR PROJETO"
              onClick={() => router.push('/contratante/projetos/geral')}
            />
          </>
        )}

        {page === 'projeto-exclusivo' && (
          <div className="projeto-exclusivo">
            <p>Solicitar Proposta</p>
            <span>
              Nesta etapa você pode convidar este profissional para participar
              de uma concorrência de um projeto existente na plataforma ou
              cadastrar um novo projeto.
            </span>
          </div>
        )}

        {page === 'home' && (
          <>
            <Button
              label="CADASTRAR PROJETO"
              onClick={() => router.push('/contratante/projetos/geral')}
            />
            <Button
              label="BUSCAR PROFISSIONAIS"
              onClick={() => router.push('/contratante/busca')}
            />
          </>
        )}

        {page === 'fornecedor/home' && (
          <>
            <Button
              label="CADASTRAR OFERTA"
              onClick={() => router.push('/fornecedor/novo-servico')}
            />
            <Button
              label="BUSCAR OPORTUNIDADES"
              onClick={() => router.push('/fornecedor/captar-projetos')}
            />
          </>
        )}
      </div>
    </Content>
  );
}
