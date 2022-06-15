import { InformacoesFinanceirasProvider } from '../../../hooks/informacoesFinanceiras';
import { FinanceiroFormContent } from './FinanceiroFormContent';

export function FinanceiroForm() {
  return (
    <InformacoesFinanceirasProvider>
      <FinanceiroFormContent />
    </InformacoesFinanceirasProvider>
  );
}
