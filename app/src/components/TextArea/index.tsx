import { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';

import { Container } from './style';

interface TextAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string | undefined;
  setter: Dispatch<SetStateAction<string>>;
  error?: string;
}

export function TextArea({
  label,
  placeholder,
  name,
  value,
  error,
  setter,
  disabled = false,
}: TextAreaProps) {
  return (
    <Container isInvalid={!!error}>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control
        id={name}
        name={name}
        as="textarea"
        value={value}
        placeholder={placeholder}
        rows={5}
        onChange={event => setter(event.target.value)}
        disabled={disabled}
      />

      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
