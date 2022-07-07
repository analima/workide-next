import { InputHTMLAttributes, useCallback, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { BRANCO } from '../../styles/variaveis';
import { Container } from './style';

interface SearchInputHomeProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  variation?: 'default' | 'no-button';
  className?: string;
  onChange?: (value: any) => void;
}

export function SearchInputHome({
  placeholder,
  onChange,
  className,
  variation = 'default',
  ...rest
}: SearchInputHomeProps) {
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [term, setTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleEnterKey = useCallback(
    event => {
      if (event.key === 'Enter' && onChange) {
        onChange(term);
      }
    },
    [onChange, term],
  );

  const handleClickButton = useCallback(() => {
    if (onChange) {
      onChange(term);
      inputRef.current.focus();
    }
  }, [onChange, term]);

  const handleChange = useCallback(
    event => {
      setTerm(event.target.value);
      if (variation === 'no-button' && onChange) {
        onChange(event.target.value);
      }
    },
    [variation, onChange],
  );

  return (
    <Container isFocused={isFocused} className={className}>
      <section>
        <FiSearch />
        <input
          value={term}
          ref={inputRef}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          onBlur={handleInputBlur}
          onChange={handleChange}
          onKeyUp={handleEnterKey}
          {...rest}
        />
      </section>

      <div onClick={handleClickButton}>
        <FiSearch size={38} color={BRANCO} />
      </div>
    </Container>
  );
}
