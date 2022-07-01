import { InputHTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';
import { FormCheck } from 'react-bootstrap';
import { Container, ContentStyled } from './style';
import { FaQuestionCircle } from 'react-icons/fa';
import { PRETO_40 } from '../../../styles/variaveis';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  label?: string;
  name: string;
  type?: 'checkbox' | 'radio';
  error?: string;
  isSpan?: boolean;
  handleEventSpan?: () => void;
  readOnly?: boolean;
  onChangeValue?: (value: any) => void;
}

export function InputCheck({
  control,
  label,
  name,
  type = 'checkbox',
  error,
  isSpan,
  handleEventSpan,
  readOnly,
  onChangeValue,
  ...rest
}: InputProps) {
  return (
    <Container isInvalid={!!error}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <ContentStyled>
            <FormCheck
              id={name}
              type={type}
              name={name}
              label={label}
              checked={value}
              onChange={e => {
                onChange(e.target.checked);
                if (onChangeValue) onChangeValue(e.target.checked);
              }}
              disabled={readOnly}
              {...rest}
            />
            {isSpan && (
              <FaQuestionCircle
                onClick={handleEventSpan}
                size={16}
                color={PRETO_40}
              />
            )}
          </ContentStyled>
        )}
      />

      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
