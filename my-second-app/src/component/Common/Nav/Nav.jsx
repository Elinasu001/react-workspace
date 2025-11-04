import { StyledNav, NavLink } from "./Nav.styles";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navi = useNavigate();
    return (
    <StyledNav>
        <NavLink onClick={() => navi("/")}>HOME</NavLink>
        <NavLink onClick={() => navi("/join")}>회원가입</NavLink>
        <NavLink>로그인</NavLink>
        <NavLink>내정보</NavLink>
        <NavLink>로그아웃</NavLink>
        <NavLink>게시판</NavLink>
    </StyledNav>
    );
};
export default Nav;