import { useNavigate, NavLink } from "react-router-dom";
import { StyleNav } from "../nav/Nav.styles";

// import {StyleNav, NavLink} from "./style"
// import { useNavigate } from "react-router-dom";

const Nav = () => {

    const navi = useNavigate();

    return (
        <StyleNav>
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/fusion">fusion</NavLink>
            <NavLink to="/01">01</NavLink>
            <NavLink to="/02">02</NavLink>
            <NavLink to="/03">03</NavLink>
        </StyleNav>
    )
}

export default Nav;