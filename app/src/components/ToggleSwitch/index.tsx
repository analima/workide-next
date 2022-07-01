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
