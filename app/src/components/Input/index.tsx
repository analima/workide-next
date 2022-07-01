import { FormEvent, useCallback } from 'react';
import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';

import { Container, Label } from './style';
// eslint-disable-next-line
import { maskValue, cep, cpf } from './masks';
import { useEffect } from 'react';
import { useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string | number | string[] | undefined;
  setter: Dispatch<SetStateAction<string>>;
  mask?: 'cep' | 'cpf' | 'cnpj';
  error?: string;
}

export function Input({
  label,
  placeholder,
  name,
  type,
  value,
  error,
  mask,
  required,
  onBlur,
  setter,
}: InputProps) {
  const [inputValue, setInputValue] = useState('');
  const [maxLength, setMaxLength] = useState(524288);

  useEffect(() => {
    if (mask && value) {
      const maskOptions = maskValue({ value: String(value), mask });
      setMaxLength(maskOptions?.maxLength);
      setInputValue(maskOptions.value);
    } else {
      setInputValue(String(value));
    }
  }, [value, mask, name]);

  const handleKeyUp = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      if (mask) {
        const maskOptions = maskValue({
          value: event.currentTarget.value,
          mask,
        });
        setMaxLength(maskOptions?.maxLength);
        setInputValue(maskOptions.value);
      }
    },
    [mask],
  );

  return (
    <Container isInvalid={!!error}>
      {label && (
        <Label required={required}>
          {label}
          {required && <span className="required"> *</span>}
        </Label>
      )}

      <Form.Control
        id={name}
        name={name}
        type={type}
        value={inputValue}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={event => setter(event.target.value)}
        onBlur={onBlur}
        onKeyUp={handleKeyUp}
      />

      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
