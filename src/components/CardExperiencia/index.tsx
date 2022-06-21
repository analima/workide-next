import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Container, Label, Descricao, Titulo } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  titulo: string;
  descricao: string;
  checked?: boolean;
}

export function CardExperiencia({
  name,
  control,
  titulo,
  descricao,
  checked = false,
  ...rest
}: InputProps) {
  const [selecionado, setSelecionado] = useState(checked);

  useEffect(() => {
    setSelecionado(checked);
  }, [checked]);

  return (
    <Container selecionado={selecionado}>
      <Label htmlFor={name}>
        <Titulo selecionado={selecionado}>{titulo}</Titulo>

        <Descricao selecionado={selecionado}>{descricao}</Descricao>

        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <input
              id={name}
              name={name}
              type="checkbox"
              value={value}
              checked={selecionado}
              onChange={e => {
                setSelecionado(e.target.checked);
                onChange(e.target.checked);
              }}
              {...rest}
            />
          )}
        />
      </Label>
    </Container>
  );
}
