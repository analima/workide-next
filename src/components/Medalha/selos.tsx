import { ReactComponent as PessoaVerificada } from '../../assets/selo-pessoa_verificada.svg';
import { ReactComponent as Fundador } from '../../assets/selo-fundador.svg';
import { ReactComponent as Feedback } from '../../assets/selo-feedback.svg';
import { ReactComponent as PrimeiroProjeto } from '../../assets/selo-primeiro-projeto.svg';
import { ReactComponent as CadastroCompleto } from '../../assets/selo-cadastro-completo.svg';
import { ReactComponent as RecomendacaoBronze } from '../../assets/selo-recomendacoes-bronze.svg';
import { ReactComponent as RecomendacaoPrata } from '../../assets/selo-recomendacoes-prata.svg';
import { ReactComponent as RecomendacaoOuro } from '../../assets/selo-recomendacoes-ouro.svg';
import { ReactComponent as IndicacaoBronze } from '../../assets/selo-indicacao-bronze.svg';
import { ReactComponent as IndicacaoPrata } from '../../assets/selo-indicacao-prata.svg';
import { ReactComponent as IndicacaoOuro } from '../../assets/selo-indicacao-ouro.svg';

export const Selos = [
  {
    chave: 'pessoa-verificada',
    componente: PessoaVerificada,
    descricao: 'Pessoa Verificada',
  },
  { chave: 'fundador', componente: Fundador, descricao: 'Fundador' },
  { chave: 'feedback', componente: Feedback, descricao: 'Feedback' },
  {
    chave: 'primeiro-projeto',
    componente: PrimeiroProjeto,
    descricao: 'Primeiro Projeto',
  },
  {
    chave: 'cadastro-completo',
    componente: CadastroCompleto,
    descricao: 'Cadastro Completo',
  },
  {
    chave: 'recomendacao-bronze',
    componente: RecomendacaoBronze,
    descricao: 'Recomendação Bronze',
  },
  {
    chave: 'recomendacao-prata',
    componente: RecomendacaoPrata,
    descricao: 'Recomendação Prata',
  },
  {
    chave: 'recomendacao-ouro',
    componente: RecomendacaoOuro,
    descricao: 'Recomendação Ouro',
  },
  {
    chave: 'indicacao-bronze',
    componente: IndicacaoBronze,
    descricao: 'Indicação Bronze',
  },
  {
    chave: 'indicacao-prata',
    componente: IndicacaoPrata,
    descricao: 'Indicação Prata',
  },
  {
    chave: 'indicacao-ouro',
    componente: IndicacaoOuro,
    descricao: 'Indicação Ouro',
  },
];
