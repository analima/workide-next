import SelecionarPlanoContent from './SelecionarPlanoContent';
import { InformacoesFinanceirasProvider } from '../../../../hooks/informacoesFinanceiras';
import { Helmet } from 'react-helmet';
export default function SelecionarPlano(): JSX.Element {
  return (
    <InformacoesFinanceirasProvider>
      <Helmet>
        <title>freelas town - Turbine seu potencial com os nossos planos</title>
      </Helmet>
      <SelecionarPlanoContent />
    </InformacoesFinanceirasProvider>
  );
}
