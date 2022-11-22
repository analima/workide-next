import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../../../../contexts/auth';
import { AZUL, CINZA_10 } from '../../../../../styles/variaveis';
import { ContainerPaginacao, Registro, RegistroQuantidade } from './style';
import Content from './style';
import { useRouter } from 'next/router';

interface IPaginacao {
  totalPaginas: number;
  pagina: number;
  setPagina: (pagina: number) => void;
}

export default function Paginacao({
  totalPaginas,
  setPagina,
  pagina,
}: IPaginacao) {
  const { user } = useAuth();
  const router = useRouter();

  const handleProximaPagina = () => {
    setPagina(pagina < totalPaginas ? pagina + 1 : pagina);
  };

  const handlePaginaAnterior = () => {
    setPagina(pagina > 1 ? pagina - 1 : pagina);
  };

  return (
    <Content>
      <Registro>
        <RegistroQuantidade>
          Exibindo {pagina} de {totalPaginas} páginas
        </RegistroQuantidade>

        <ContainerPaginacao>
          <button onClick={handlePaginaAnterior}>
            <FiChevronLeft size={20} color={pagina === 1 ? CINZA_10 : AZUL} />
          </button>
          <button
            onClick={() => {
              if (!user.id_pessoa) {
                router.push('/cadastro-basico');
                return;
              } else {
                handleProximaPagina();
              }
            }}
          >
            <FiChevronRight
              size={20}
              color={pagina === totalPaginas ? CINZA_10 : AZUL}
            />
          </button>
        </ContainerPaginacao>
      </Registro>
    </Content>
  );
}
