import { useNavigate }   from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

// 사용자가 url을 통해 접근하는 것을 방지하기 위해서


{/* 마이페이지 :  비밀번호 변경, 회원 탈퇴 */}
const Info = () => {

    const { auth } = useContext(AuthContext);
    const navi = useNavigate();


    if(!auth.authenticated){
        alert("로그인이 필요한 페이지입니다.");
        navi("/login");
    }

    return (
        <>
            

        </>
    )
};

export default Info;