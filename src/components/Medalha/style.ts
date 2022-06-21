import styled, { css } from 'styled-components';

type PropsContent = {
  isActive?: boolean;
};

export const Content = styled.div<PropsContent>`
  ${props =>
    props.isActive === true
      ? css`
          filter: grayscale(0);
        `
      : css`
          filter: grayscale(1);
        `}
`;
