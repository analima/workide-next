import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useBuscaFornecedorOferta } from 'src/hooks/buscaConsumidor';
import { Content, LabelStyled } from './style';

interface Consumidor {
  change: () => void;
  label: string;
  labelLeft?: string;
  checked: boolean;
  isGreenLabel?: boolean;
}

export function ToggleSwitch({
  checked,
  change,
  label,
  isGreenLabel,
  labelLeft,
}: Consumidor) {
  const router = useRouter();
  const { setVolunteers } = useBuscaFornecedorOferta();

  useEffect(() => {
    const { filter } = router.query;
    if (filter === 'voluntarios' && typeof window !== 'undefined') {
      setTimeout(() => {
        setVolunteers(true);
      }, 2000);
    }
  }, [router.query, setVolunteers]);

  return (
    <Content>
      <div className="form-check form-switch">
        {labelLeft && (
          <LabelStyled
            isGreenLabel={isGreenLabel}
            htmlFor="flexSwitchCheckDefault"
          >
            {labelLeft}
          </LabelStyled>
        )}
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          onChange={() => change()}
          checked={checked}
        />
        <LabelStyled
          isGreenLabel={isGreenLabel}
          htmlFor="flexSwitchCheckDefault"
        >
          {label}
        </LabelStyled>
      </div>
    </Content>
  );
}
