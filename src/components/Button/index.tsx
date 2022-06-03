import React, { ButtonHTMLAttributes } from 'react';

import { FiLoader } from 'react-icons/fi';
import { Content } from './style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,

  children,
  ...rest
}) => (
  <Content className="btn" type="button" disabled={loading} {...rest}>
    {loading ? <FiLoader size={20} /> : <>{children}</>}
  </Content>
);

export default Button;
