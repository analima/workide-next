import styled, { css } from 'styled-components';

type Props = {
  isViewVideo?: boolean;
};

export const Content = styled.div<Props>`
  position: absolute;
  top: 0;
  margin: 4px 0;
  right: 0;

  svg {
    width: 50px;
    height: 68px;
    cursor: pointer;

    ${({ isViewVideo }) =>
      isViewVideo === true &&
      css`
        filter: grayscale(100%);
        opacity: 0.4;
      `}

    -webkit-transition: -webkit-transform 0.5s ease;
    transition: transform 0.5s ease;

    &:hover {
      -webkit-transform: scale(1.03);
      transform: scale(1.03);
    }
  }
`;

export const TooltipMember = styled.div`
  width: 210px;
  height: 54px;
  padding: 10px;
  border-radius: 16px;
  background-color: #49494990;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;
