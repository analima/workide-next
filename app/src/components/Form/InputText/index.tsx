import { InputHTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import { Container, Label } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  label?: string;
  name: string;
  error?: string;
  isString?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  autocomplete?: string;
  value?: any;
  onChangeValue?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

export function InputText({
  label,
  placeholder,
  name,
  control,
  type,
  error,
  required,
  isString,
  readOnly,
  maxLength,
  min,
  max,
  step,
  autoComplete,
  onChangeValue,
  onKeyUp,
  onFocus,
  onBlur,
}: InputProps) {
  const regexLetras = (e: any) => {
    return e.target.value.replace(/[^a-zA-Zà-ù ]/g, '');
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
          <Form.Control
            id={name}
            name={name}
            maxLength={maxLength}
            type={type}
            value={value}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            autoComplete={autoComplete}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={e => {
              if (isString) {
                onChange(regexLetras(e));
              } else {
                onChange(e.target.value);
              }
              onChangeValue && onChangeValue(e);
            }}
            readOnly={readOnly}
            onKeyUp={(e: any) => {
              if (onKeyUp) {
                onKeyUp(e);
              }
            }}
          />
        )}
      />
      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
