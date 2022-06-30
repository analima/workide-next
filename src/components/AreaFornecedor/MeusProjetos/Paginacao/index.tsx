import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { AZUL, CINZA_10 } from '../../../../styles/variaveis';
import {
  ContainerPaginacao,
  Registro,
  RegistroQuantidade,
} from './style';
import Content from './style';

interface IPaginacao {
  totalPaginas: number;
  pagina: number;
  setPagina: (pagina: number) => void;
}

export default function Paginacao({ totalPaginas, setPagina, pagina }: IPaginacao) {
  const handleProximaPagina = () => {
    setPagina(pagina + 1);
  };

  const handlePaginaAnterior = () => {
    setPagina(pagina - 1);
  };

  return (
    <Content>
      <Registro>
        <RegistroQuantidade>
          Exibindo {totalPaginas === 0 ? 0 : pagina} de {totalPaginas} páginas
        </RegistroQuantidade>

        <ContainerPaginacao>
          <button disabled={pagina === 1} onClick={handlePaginaAnterior}>
            <FiChevronLeft color={pagina === 1 ? CINZA_10 : AZUL} />
          </button>
          <button
            disabled={pagina === totalPaginas}
            onClick={handleProximaPagina}
          >
            <FiChevronRight color={pagina === totalPaginas ? CINZA_10 : AZUL} />
          </button>
        </ContainerPaginacao>
      </Registro>
    </Content>
  );
}
