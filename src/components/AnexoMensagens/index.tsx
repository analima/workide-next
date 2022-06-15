import { InputHTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';

import { Container, Label, ContainerIcone } from './styles';
import { BsPaperclip } from 'react-icons/bs';
import { BRANCO } from '../../styles/variaveis';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  control: any;
  label?: string;
  error?: string;
  getValues?: (files: any) => void;
  value?: any;
  id_proposta?: number;
}

export function AnexoMensagens({
  name,
  id,
  control,
  label,
  error,
  getValues,
  value,
  id_proposta,
  ...rest
}: InputProps) {
  return (
    <Container isInvalid={!!error}>
      <div className="div-label">
        <Label htmlFor={name}>
          <ContainerIcone>
            <BsPaperclip color={BRANCO} />
          </ContainerIcone>
        </Label>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <input id={id} name={name} type="file" />
          )}
        />
      </div>

      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
