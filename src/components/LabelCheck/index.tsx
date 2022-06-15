import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';

import { Container } from './style';

interface LabelCheckProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked: boolean;
  setter: Dispatch<SetStateAction<boolean>>;
  onChange?: () => void;
  readonly?: boolean;
}

export function LabelCheck({
  label,
  name,
  checked = false,
  setter,
  onChange,
  readonly,
}: LabelCheckProps) {
  return (
    <Container checked={checked}>
      <label htmlFor={name}>
        <input
          type="checkbox"
          id={name}
          name={name}
          readOnly={readonly || false}
          onChange={() => {
            if(readonly) return;
            setter(!checked);

            if (onChange) {
              onChange();
            }
          }}
        />
        {label}
      </label>
    </Container>
  );
}
