import { keyframes } from 'styled-components';

export const APPEAR_FROM_TOP = keyframes`
  from {
    opacity: 0;
    transform: translateY(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const APPEAR_FROM_LEFT = keyframes`
  from {
    opacity: 0;
    transform: translateX(-5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const APPEAR_FROM_RIGHT = keyframes`
from {
  opacity: 0;
  transform: translateX(3rem);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

export const APPEAR_FROM_BOTTOM = keyframes`
from {
  opacity: 0;
  transform: translateY(2rem);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

export const FADE = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;