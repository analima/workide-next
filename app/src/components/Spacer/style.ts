import styled from 'styled-components';

interface ContentInterface {
  altura: number;
}

export const Content = styled.div<ContentInterface>`
  padding-top: ${props => props.altura}px;
`;
