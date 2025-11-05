/* eslint-disable react-refresh/only-export-components */

import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";


// context 생성 hook : Context API로 로그인 상태를 전역 관리
export const AuthContext = createContext();
// 요 컨텍스트를 통해 인증관련 데이터를 하위 컴포넌트에 전달함


export const AuthProvider = ({children}) => { // children : 하위 컴포넌트들 의미
    const navi = useNavigate();
    // auth 상태 관리
    const [auth, setAuth] = useState({
        memberId : null,
        memberName : null,
        accessToken : null, 
        refreshToken : null,
        role : null,
        isAuthenticated : false,
    });
    

    // 자동 로그인 구현을 위한 useEffect
    useEffect(() => {

        // 컴포넌트가 마운트 될 때 로컬 스토리지에서 인증 정보 불러오기 : 객체로 넣는 것이 좋음
        const accessToken = localStorage.getItem("access-token");
        const refreshToken = localStorage.getItem("refresh-token");
        const memberId = localStorage.getItem("memberId");
        const memberName = localStorage.getItem("memberName");
        const role = localStorage.getItem("role");

        // 모두 존재할 때만 상태 업데이트(성공적인 로그인 상태로 간주)
        if(accessToken && refreshToken && memberId && memberName && role){
            setAuth({
                memberId,
                memberName,
                accessToken, 
                refreshToken,
                role,
                isAuthenticated : true ,
            });
        }

    }, []); // 빈 배열 : 마운트 될 때만 실행


    // 로그인에 성공했을 때 수행할 함수
    const login = (memberId, memberName, accessToken, refreshToken, role) => {

        // 함수로 빼놓는게 좋음
        setAuth({
            memberId,
            memberName,
            accessToken, 
            refreshToken,
            role,
            isAuthenticated : true ,
        });

        localStorage.setItem("memberId", memberId);
        localStorage.setItem("memberName", memberName);
        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("refresh-token", refreshToken);
        localStorage.setItem("role", role);

    }


    // 로그아웃 함수
    const logout = () => {
        setAuth({
            memberId : null,
            memberName : null,
            accessToken : null, 
            refreshToken : null,
            role : null,
            isAuthenticated : false,
        });
        localStorage.removeItem("memberId");
        localStorage.removeItem("memberId");
        localStorage.removeItem("memberName");
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("role");

        // usNavi로 사용하는게 좋음
        //window.location.href="/"; // 로그아웃 후 홈으로 이동
        navi("/");

    }

    return(
        // AuthContext.Provider 컴포넌트를 사용하여 하위 컴포넌트에 auth 상태와 login, logout 함수를 제공
        <AuthContext.Provider value={{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}