import { useCallback, useState } from 'react';
import { Content, ButtonLabel, ButtonIcon } from './style';

interface IButtonProps {
  label: string;
  color?: 'primary' | 'ghost' | 'danger';
  size?: 'medium';
  onClick: any;
  disabled?: boolean;
}

export function Button({
  label,
  color = 'primary',
  size = 'medium',
  onClick,
  disabled,
}: IButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    onClick();

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [onClick]);

  return (
    <Content color={color} size={size} onClick={handleClick}>
      {isLoading && <ButtonIcon />}
      {!isLoading && (
        <ButtonLabel aria-disabled={disabled ? disabled : false}>
          {label}
        </ButtonLabel>
      )}
    </Content>
  );
}
