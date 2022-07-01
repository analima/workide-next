import styled from 'styled-components';

export const Load = styled.span<{
  size?: string;
}>`
  width: ${props => props.size || '16px'};
  height: ${props => props.size || '16px'};
`;
