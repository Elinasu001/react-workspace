import { NavLink } from "react-router-dom";
import { StyleNav } from "../nav/Nav.styles";

const Nav = () => {
    return (
        <StyleNav>
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/fusion">fusion</NavLink>
            <NavLink to="/01">01</NavLink>
            <NavLink to="/02">02</NavLink>
            <NavLink to="/03">03</NavLink>
            <NavLink to="/input">Input</NavLink>
            <NavLink to="/foods">부산</NavLink>
        </StyleNav>
    );
};

export default Nav;
