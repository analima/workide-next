import { InformacoesFinanceirasProvider } from '../../../../hooks/informacoesFinanceiras';
import { MeusBeneficiosContent } from './MeusBeneficiosContent';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';

export function MeusBeneficios(): JSX.Element {
  useEffect(() => {
    hotjar.initialize(
      Number(process.env.REACT_APP_HOTJAR_ID) || 0,
      Number(process.env.REACT_APP_HOTJAR_SV),
    );
    hotjar.stateChange('/turbine-seu-potencial/planos');
  }, []);

  return (
    <InformacoesFinanceirasProvider>
      <MeusBeneficiosContent />
    </InformacoesFinanceirasProvider>
  );
}
