import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { pessoas_api } from '../../services/pessoas_api';
import { AMARELO, AZUL, LARANJA, VERDE } from '../../styles/variaveis';
import { formatarValor } from '../../utils/CurrencyFormat';
import { Titulo } from '../Titulo';
import {
  ContainerStyled,
  HeaderStyled,
  TypographyDateStyled,
  TypographyNameStyled,
  TypographyTypeStyled,
  TypographyValueStyled,
} from './style';

type Props = {
  date: string;
  status: string;
  value: number;
  portion: number;
  id_fornecedor: number;
  id_projeto: number;
  id_proposta: number;
  isProbono: boolean;
};

interface IFornecedorProps {
  nome: string;
  tipo: string;
  nome_tratamento: string;
}

export const ProposalCard = ({
  id_proposta,
  id_projeto,
  id_fornecedor,
  date,
  status,
  value,
  portion,
  isProbono = false,
}: Props): JSX.Element => {
  const dateCurrency = new Date(date);
  const history = useHistory();
  const [dadosFornecedor, setDadosFornecedor] = useState<IFornecedorProps>(
    {} as IFornecedorProps,
  );
  const checkStatus = (status: string) => {
    switch (status) {
      case 'AGUARDANDO_PAGAMENTO':
        return <Titulo titulo="Aceita" cor={VERDE} tamanho={16} />;
      case 'ACEITA':
        return <Titulo titulo="Aceita" cor={VERDE} tamanho={16} />;
      case 'ENVIADA':
        return <Titulo titulo="Analisar" cor={VERDE} tamanho={16} />;
      case 'RECUSADA':
        return <Titulo titulo="Recusada" cor={LARANJA} tamanho={16} />;
      case 'REVISAO':
        return <Titulo titulo="Aguardando revisão" cor={AZUL} tamanho={16} />;
      case 'REVISADA':
        return <Titulo titulo="Proposta revisada" cor={AZUL} tamanho={16} />;
      case 'CANCELADA':
        return (
          <Titulo titulo="Proposta cancelada" cor={AMARELO} tamanho={16} />
        );
      default:
        <Titulo titulo="Aguardando revisão" cor={AZUL} tamanho={16} />;
    }
  };

  const checkTypePeople = (type: string) => {
    if (type === 'PF')
      return '(Este profissional está cadastrado como Pessoa Física)';
    if (type === 'PJ')
      return '(Este profissional está cadastrado como Pessoa Jurídica)';
  };

  useEffect(() => {
    pessoas_api.get(`/pessoas/${id_fornecedor}`).then(({ data }) => {
      setDadosFornecedor({
        nome: data.nome,
        tipo: data.tipo,
        nome_tratamento: data.nome_tratamento,
      });
    });
  }, [id_fornecedor]);

  return (
    <ContainerStyled
      onClick={() =>
        history.push(`/contratante/propostas`, {
          id_proposta,
          id_projeto,
          id_fornecedor,
        })
      }
    >
      <HeaderStyled>
        <TypographyDateStyled>
          {dateCurrency.toLocaleDateString('pt-br')}
        </TypographyDateStyled>
        {checkStatus(status)}
      </HeaderStyled>
      <TypographyNameStyled>
        {dadosFornecedor.nome_tratamento}
      </TypographyNameStyled>
      {!isProbono && (
        <TypographyValueStyled>
          <span>{formatarValor(value)}</span> em até {portion}X no cartão
        </TypographyValueStyled>
      )}
      <TypographyTypeStyled>
        {checkTypePeople(dadosFornecedor.tipo)}
      </TypographyTypeStyled>
    </ContainerStyled>
  );
};
