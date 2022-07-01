import { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { Form } from 'react-bootstrap';

import { Container } from './style';

export interface Option {
  value?: string;
  label: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  value: string | number | string[] | undefined;
  options: Option[];
  noValueOption?: string;
  setter: ChangeEventHandler<HTMLSelectElement>;
  error?: string;
}

export function Select({
  label,
  name,
  disabled = false,
  value,
  noValueOption = 'Selecione...',
  options,
  error,
  setter,
}: SelectProps) {
  return (
    <Container isInvalid={!!error}>
      {label && <Form.Label>{label}</Form.Label>}

      <select
        className="form-control form-select"
        id={name}
        name={name}
        value={value}
        onChange={setter}
        disabled={disabled}
      >
        <option>{noValueOption}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
