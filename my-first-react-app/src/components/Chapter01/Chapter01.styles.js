import styled from 'styled-components';

export const StyledP = styled.p`
    background-color: white;
    color: black;
    width: 100%;
    height:200px;
    line-height:200px;
    border:1px dotted orange;

    &:hover {
        pointer: cursor;
        background-color: crimson;
    }
`;

export const StyledBlueP = styled.p`
    background-color:blue;
    color:white;
    font-weight:900;
`;