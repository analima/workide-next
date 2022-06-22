import PessoaVerificada from '../../assets/selo-pessoa_verificada.svg';
import  Fundador from '../../assets/selo-fundador.svg';
import  Feedback from '../../assets/selo-feedback.svg';
import PrimeiroProjeto from '../../assets/selo-primeiro-projeto.svg';
import CadastroCompleto from '../../assets/selo-cadastro-completo.svg';
import  RecomendacaoBronze from '../../assets/selo-recomendacoes-bronze.svg';
import  RecomendacaoPrata from '../../assets/selo-recomendacoes-prata.svg';
import  RecomendacaoOuro from '../../assets/selo-recomendacoes-ouro.svg';
import IndicacaoBronze from '../../assets/selo-indicacao-bronze.svg';
import IndicacaoPrata from '../../assets/selo-indicacao-prata.svg';
import IndicacaoOuro from '../../assets/selo-indicacao-ouro.svg';

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
