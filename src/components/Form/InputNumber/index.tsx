import { InputHTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';

import { Container, Label } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  label?: string;
  name: string;
  error?: string;
  maxValue?: number;
  changeInpuNumberValue?: (valor: any) => void;
}

export function InputNumber({
  label,
  placeholder,
  name,
  control,
  error,
  required,
  changeInpuNumberValue,
  maxValue,
  ...rest
}: InputProps) {
  const regexNumero = (e: any) => {
    return e.target.value.replace(/[^0-9]/g, '');
  };

  return (
    <Container isInvalid={!!error}>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
          {required && <span className="required"> *</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={e => {
              if (maxValue && Number(e.target.value) > maxValue) {
                return;
              }

              const valor = regexNumero(e);
              onChange(valor);
              if (changeInpuNumberValue) {
                changeInpuNumberValue(valor);
              }
            }}
            className="form-control"
            {...rest}
          />
        )}
      />
      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
