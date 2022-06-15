import { InputHTMLAttributes } from 'react';
import { Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

import { Container } from './style';

export interface Option {
  value?: string;
  label: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  control: any;
  name: string;
  label?: string;
  options: Option[];
  noValueOption?: string;
  event?: (event?: any) => void;
  error?: string;
  onKeyUp?: (event?: any) => void;
}

export function Select({
  control,
  label,
  name,
  disabled,
  noValueOption = 'Selecione...',
  options,
  error,
  event,
  onKeyUp,
  ...rest
}: SelectProps) {
  return (
    <Container isInvalid={!!error}>
      {label && <Form.Label>{label}</Form.Label>}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <select
            className="form-control form-select"
            id={name}
            name={name}
            value={value}
            onChange={e => {
              onChange(e);

              if (event) {
                event(e);
              }
            }}
            disabled={disabled || false}
          >
            <option>{noValueOption}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
