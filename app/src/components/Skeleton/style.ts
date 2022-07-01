import styled, { keyframes } from 'styled-components';

const KeyframesLoading = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

interface Props {
  width: string;
  height: string;
  radius: string;
}

export const LoadingSkeleton = styled.div<Props>`
  background-color: gray;
  border-radius: ${props => props.radius};
  margin-bottom: 10px;
  min-width: ${props => props.width};
  height: ${props => props.height};
  animation: ${KeyframesLoading} 500ms infinite alternate;
`;
