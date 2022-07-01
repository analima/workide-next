import styled from 'styled-components';
import { ContainerRecontratar } from '../../../../../../Vitrine/style';
import { BRANCO } from '../../../../../../../styles/variaveis';

const Container = styled.div`
  width: 187px;
  height: 296px;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
`;
type PropsContent = {
  isBlocked: boolean;
  imgUrl: string;
};

export const ContentService = styled.div<PropsContent>`
  min-height: 182px;
  background-image: ${props =>
    props.isBlocked || !props.imgUrl
      ? 'linear-gradient(180deg, #f8f8f8, #6d6d6d)'
      : `url(${props.imgUrl})`};
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    padding: 0 0 8px 8px;
    margin: 0;
    font-weight: bold;
    color: ${BRANCO};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0 0px 16px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const LabelPrice = styled.h1`
  background-color: #6e6e6e;
  font-size: 16px;
  padding: 4px;
  margin: 0;
  border-radius: 8px 0px 0px 8px;
  color: #ccf2ec;
  font-weight: bold;
`;

export const ContentFooter = styled.div`
  padding: 10px;
  overflow: hidden;
  max-width: 180px;
  text-overflow: ellipsis;

  p {
    color: #6e6e6e;
    font-weight: 500;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

export default Container;
