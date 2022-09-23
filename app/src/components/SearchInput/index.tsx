import {
  InputHTMLAttributes,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import { IoMdSearch } from 'react-icons/io';
import { Container } from './style';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  variation?: 'default' | 'no-button';
  className?: string;
  onChange?: (value: any) => void;
  onChangeValue?: (value: any) => void;
}

export function SearchInput({
  placeholder,
  onChange,
  className,
  variation = 'default',
  onChangeValue,
  ...rest
}: SearchInputProps) {
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
    (event: { key: string }) => {
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
    (event: { target: { value: SetStateAction<string> } }) => {
      setTerm(event.target.value);
      if (variation === 'no-button' && onChange) {
        onChange(event.target.value);
      }
      if (onChangeValue) {
        onChangeValue(event.target.value);
      }
    },
    [onChange, variation, onChangeValue],
  );

  return (
    <Container isFocused={isFocused} className={className}>
      {variation === 'no-button' && <IoMdSearch />}
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
      {variation === 'default' && (
        <div onClick={handleClickButton}>
          <IoMdSearch />
        </div>
      )}
    </Container>
  );
}
