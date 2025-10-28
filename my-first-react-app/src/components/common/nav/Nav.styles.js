import styled from 'styled-components';


export const StyleNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 1rem 0;
    background-color: #222;

    a {
        color: #fff;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
        color: #61dafb;
        }

        &.active {
        border-bottom: 2px solid #61dafb;
        color: #61dafb;
        }
    }
`;