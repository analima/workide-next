import { BaseSyntheticEvent, useCallback, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { IoMdSearch } from 'react-icons/io';
import { Container } from './style';

type SearchInputProps = {
  control: any;
  name: string;
  variation?: 'default' | 'no-button';
  placeholder?: string;
  className?: string;
  onClick(e?: BaseSyntheticEvent<object, any, any>): any;
};

export function SearchInput({
  control,
  name,
  variation = 'default',
  placeholder,
  className,
  onClick,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleEnterKey = useCallback(
    event => {
      if (event.key === 'Enter' && onClick) onClick(event);
    },
    [onClick],
  );

  return (
    <Container isFocused={isFocused} className={className}>
      {variation === 'no-button' && <IoMdSearch />}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <input
            name={name}
            value={value}
            ref={inputRef}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            onBlur={handleInputBlur}
            onChange={onChange}
            onKeyUp={handleEnterKey}
          />
        )}
      />
      {variation === 'default' && (
        <div>
          <IoMdSearch onClick={onClick} />
        </div>
      )}
    </Container>
  );
}
