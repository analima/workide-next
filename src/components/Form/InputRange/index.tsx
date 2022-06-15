import { InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import { Container, Label } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  label?: string;
  name: string;
  error?: string;
  readOnly?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  type?: 'money' | 'parcels';
  labelIsBold?: boolean;
}

export function InputRange({
  placeholder,
  label,
  name,
  control,
  error,
  required,
  readOnly,
  min,
  max,
  step = 0.01,
  type,
  labelIsBold,
}: InputProps) {
  const [valor, setValor] = useState('');

  const formataValorRange = useCallback(() => {
    if (valor) {
      return type === 'parcels' ? `${valor}x` : `R$ ${valor}`;
    }

    return '';
  }, [type, valor]);

  useEffect(() => {
    setValor(control._formValues?.[name]);
    formataValorRange();
  }, [setValor, control._formValues, name, formataValorRange]);

  return (
    <Container isInvalid={!!error}>
      <Label htmlFor={name} required={required}>
        <span>{labelIsBold ? <strong>{label}</strong> : label}</span>
        <span>{formataValorRange()}</span>
        {required && <span className="required"> *</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Form.Control
            id={name}
            name={name}
            type="range"
            value={value || 1}
            placeholder={placeholder}
            inputMode="numeric"
            min={min}
            max={max}
            step={step || 1}
            onChange={e => {
              setValor(e.target.value);
              onChange(e.target.value);
            }}
            readOnly={readOnly}
          />
        )}
      />
      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
