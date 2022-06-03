import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import { Container } from './style';

interface TextAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  label?: string;
  name: string;
  error?: string;
  readonly?: boolean;
  maxLength?: number;
  labelIsBold?: boolean;
  length?: string;
  contador?: boolean;
}

export function TextArea({
  label,
  control,
  placeholder,
  name,
  error,
  readonly,
  maxLength,
  length,
  labelIsBold,
  contador = true,
}: TextAreaProps) {
  const [conteudo, setConteudo] = useState('');

  useEffect(() => {
    if (length) setConteudo(length);
  }, [length]);

  return (
    <Container isInvalid={!!error}>
      {label && (
        <Form.Label
          style={{
            fontWeight: `${labelIsBold ? 'bold' : 'normal'}`,
          }}
        >
          {label}
        </Form.Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Form.Control
            id={name}
            name={name}
            value={value}
            onChange={e => {
              if (e.target.value.length <= (maxLength ? maxLength : 250)) {
                onChange(e);
                setConteudo(e.target.value);
              }
            }}
            as="textarea"
            placeholder={placeholder}
            rows={5}
            disabled={readonly || false}
            maxLength={maxLength ? maxLength : 250}
          />
        )}
      />
      <span className="length">
        {contador &&
          `${conteudo?.toString().length || 0}/${maxLength ? maxLength : 250}`}
      </span>
      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
