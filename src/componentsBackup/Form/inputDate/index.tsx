import { ChangeEventHandler, InputHTMLAttributes } from 'react';
import ReactInputMask from 'react-input-mask';

import { Container, Label } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholderColor?: string;
}

export function InputDate({
  label,
  placeholder,
  value,
  name,
  error,
  required,
  onChange,
  placeholderColor = '#000',
}: InputProps) {
  return (
    <Container isInvalid={!!error} placeholderColor={placeholderColor}>
      {label && (
        <Label htmlFor={name} required={required}>
          {label}
          {required && <span className="required"> *</span>}
        </Label>
      )}

      <ReactInputMask
        id={name}
        name={name}
        mask="99/99/9999"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="form-control"
      />
      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
