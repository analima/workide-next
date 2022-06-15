import { Content } from './style';

import { PagamentoServicoProvider } from '../../hooks/pagamentoServico';
import { InformacoesFinanceirasProvider } from '../../hooks/informacoesFinanceiras';
import { ModalAcceptProposalContent } from './ModalAcceptProposalContent';

interface IModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  valor?: number;
  parcelas?: number;
  idPessoaConsumidor?: number;
  idPessoaFornecedor?: number;
  tipo: 'servico' | 'assinatura';
  descricao: string;
  idProjeto?: number | null;
  nomeProjeto?: string;
  mudarFormaPagamento?: boolean;
}

export function ModalAcceptProposal({
  showModal,
  setShowModal,
  valor,
  parcelas = 1,
  idPessoaConsumidor,
  idPessoaFornecedor,
  tipo,
  descricao,
  idProjeto,
  nomeProjeto,
  mudarFormaPagamento = false,
}: IModal) {
  return (
    <Content>
      <InformacoesFinanceirasProvider>
        <PagamentoServicoProvider>
          <ModalAcceptProposalContent
            showModal={showModal}
            setShowModal={setShowModal}
            valor={valor}
            parcelas={parcelas}
            tipo={tipo}
            idPessoaConsumidor={idPessoaConsumidor || 0}
            idPessoaFornecedor={idPessoaFornecedor || 0}
            descricao={descricao}
            idProjeto={idProjeto || null}
            nomeProjeto={nomeProjeto || ''}
            mudarFormaPagamento={mudarFormaPagamento}
          />
        </PagamentoServicoProvider>
      </InformacoesFinanceirasProvider>
    </Content>
  );
}
