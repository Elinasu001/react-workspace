import { StyledNav, NavLink } from "./Nav.styles";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Nav = () => {

    const navi = useNavigate();
    const { auth, logout, loading } = useContext(AuthContext);

    if (loading) return null;
    
    const handleLogout = () => {
        logout();
        navi("/"); 
    };

    return (
    <StyledNav>
        <NavLink onClick={() => navi("/")}>HOME</NavLink>
        {/* AuthContext을 사용하여 로그인 상태에 따라 링크 표시 */}

        {
            /* 로그인 전 : auth > isAuthenticated : true 면 */
            !auth.isAuthenticated ?
        (
            <>
            <NavLink onClick={() => navi("/join")}>회원가입</NavLink>
            <NavLink onClick={() => navi("/login")}>로그인</NavLink>
            </>
        ) : (
        <>
            {/* 로그인 후 */}
            <NavLink onClick={() => navi("/info")}>내정보</NavLink>
            {/* <NavLink onClick={logout}>로그아웃</NavLink>  */}
            <NavLink onClick={handleLogout}>로그아웃</NavLink> 
            {/* 로그아웃 할 때 refreshToken을 delete 해줘야된다._나중에 할 예정 */}
            </>
        )
    }
        <NavLink>게시판</NavLink>
    </StyledNav>
    );
};
export default Nav;