import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/auth';
import { AZUL, CINZA_10 } from '../../styles/variaveis';
import {
  ContainerPaginacao,
  Content,
  Registro,
  RegistroQuantidade,
  ButtonPagina,
} from './style';

interface IPaginacao {
  totalPaginas: number;
  proxima: () => void;
  anterior: () => void;
  pagina: number;
  tipoPagina?: string;
  ultima?: () => void;
  primeira?: () => void;
}

export function Paginacao({
  totalPaginas,
  proxima,
  anterior,
  pagina,
  tipoPagina,
  ultima,
  primeira,
}: IPaginacao) {
  const { user } = useAuth();
  const history = useHistory();

  return (
    <Content>
      <Registro>
        <RegistroQuantidade>
          Exibindo {pagina} de {totalPaginas} página{totalPaginas > 1 && 's'}
        </RegistroQuantidade>

        <ContainerPaginacao>
          {tipoPagina === 'moderacao' && (
            <ButtonPagina disabled={pagina === 1} onClick={primeira}>
              Primeira
            </ButtonPagina>
          )}
          <button disabled={pagina === 1} onClick={anterior}>
            <FiChevronLeft color={pagina === 1 ? CINZA_10 : AZUL} />
          </button>
          <button
            disabled={pagina === totalPaginas}
            onClick={() => {
              if (!user.id_pessoa) {
                history.push('/cadas-basico');
                return;
              }
              proxima();
            }}
          >
            <FiChevronRight color={pagina === totalPaginas ? CINZA_10 : AZUL} />
          </button>
          {tipoPagina === 'moderacao' && (
            <ButtonPagina disabled={pagina === totalPaginas} onClick={ultima}>
              Ultima
            </ButtonPagina>
          )}
        </ContainerPaginacao>
      </Registro>
    </Content>
  );
}
