import { InputHTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';

import { Container, Label } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  label?: string;
  name: string;
  mask: string;
  error?: string;
}

export function InputMask({
  label,
  placeholder,
  name,
  mask,
  control,
  error,
  required,
  ...rest
}: InputProps) {
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
          <ReactInputMask
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            mask={mask}
            onChange={onChange}
            className="form-control"
            {...rest}
          />
        )}
      />
      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
