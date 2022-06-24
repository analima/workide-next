import { InformacoesFinanceirasProvider } from '../../../hooks/informacoesFinanceiras';
import FinanceiroFormContent from './FinanceiroFormContent';

export default function FinanceiroForm() {
  return (
    <InformacoesFinanceirasProvider>
      <FinanceiroFormContent />
    </InformacoesFinanceirasProvider>
  );
}
