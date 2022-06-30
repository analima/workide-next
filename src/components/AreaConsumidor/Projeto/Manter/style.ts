import { lighten } from "polished";
import styled from "styled-components";
import { AZUL, BRANCO, CINZA_10 } from "../../../../styles/variaveis";

const Content = styled.div`
    background-color: ${CINZA_10};
`;


export const ButtonCancel = styled.button`
    width: 250px;
    padding: 16px 42px;
    text-decoration: none;
    text-align: center;
    font-weight: bold;
    color: ${AZUL};
    border: 2px solid ${AZUL};
    background-color: ${BRANCO};
    border-radius: 8px;

    &:hover {
        background-color: ${lighten(0.1, AZUL)};
        color: ${BRANCO};
    }

    @media (max-width: 478px) {
        width: 100%;
        margin-top: 16px;
        font-size: 12px;
    }
`;

export default Content;
