import { InputHTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';

import CurrencyInput from 'react-currency-input-field';

import { Container, Label } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  label?: string;
  name: string;
  error?: string;
  permitirNegativo?: boolean;
  labelIsBold?: boolean;
  maxValue?: number;
  onChangeValue?: (e: any) => void;
}

export function InputMoney({
  label,
  placeholder,
  name,
  control,
  error,
  required,
  permitirNegativo = false,
  labelIsBold,
  onChangeValue,
  maxValue,
}: InputProps) {
  return (
    <Container isInvalid={!!error}>
      {label && (
        <Label htmlFor={name} required={required}>
          {labelIsBold ? <strong>{label}</strong> : label}
          {required && <span className="required"> *</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <CurrencyInput
            id={name}
            name={name}
            className="form-control"
            onValueChange={e => {
              if (maxValue) {
                if (Number(e || '0') <= maxValue)
                  onChange(e?.replaceAll(',', ''));

                if (onChangeValue) onChangeValue(e);
              }
            }}
            placeholder={placeholder}
            value={value}
            decimalsLimit={2}
            allowNegativeValue={permitirNegativo}
            intlConfig={{ locale: 'pt-br', currency: 'BRL' }}
          />
        )}
      />
      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
