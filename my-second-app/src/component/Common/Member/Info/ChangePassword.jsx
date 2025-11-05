import { Input, Button } from "../../../styles/style";
import { useState, useContext, useEffect  } from "react";  
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const ChangePassword = () => {
    const [ currentPassword, setCurrentPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const { auth } = useContext(AuthContext);
    const [error, setError] = useState("");


    useEffect(() => {
        console.log(" accessToken 확인:", auth?.accessToken);
    }, [auth]);

    const handleUpdatePassword = () => {
    
    //  비어있을 경우 빠른 검증
    if (!currentPassword || !newPassword) {
        setError("현재 비밀번호와 새 비밀번호를 모두 입력하세요.");
        return;
    }

    setError("");


    // accessToken이 없으면 로그인 상태 아님
    if (!auth?.accessToken) {
        setError("로그인이 필요한 서비스입니다.");
        return;
    }

    // 요청을 보낼때 액세스토큰을 헤더에 포함시켜야 한다.
    axios
    .put(
        "http://localhost:8080/members", // 필요 시 '/members/password' 등으로 변경 (백엔드 경로 확인)
        {
          currentPassword, // 백엔드 DTO 필드명과 동일해야 함
          newPassword,     //예: PasswordDTO { currentPassword, newPassword }
        },
        {
        headers: {
        Authorization: `Bearer ${auth.accessToken}`, // Bearer 공백 필수
        "Content-Type": "application/json",
        },
    }
    )
    .then((result) => {
        //console.log(result);
        if(result.status === 200){
            alert("비밀번호 변경에 성공하셨습니다. 추카추카");
        }

    }).catch((err) => {
        //console.log(error);
        setError(
            //error.response.data["error-message"]
            err?.response.data["error-message"] || "비밀번호 변경에 실패했습니다."
        )
    });

    }

    
    return (

        <>  
            <Input 
                type="password" 
                placeholder="현재 비밀번호를 입력하세요."
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input 
                type="password" 
                placeholder="변경할 비밀번호를 입력하세요."
                onChange ={(e) => setNewPassword(e.target.value)}
            />
            <label style={{color:"crimson", padding:"5px"}}>{error}</label>
            <Button 
                type="button"
                style={{backgroundColor: "skyblue"}}
                onClick={handleUpdatePassword}
            >비밀번호 변경하기</Button>
        </>

    )
}

export default ChangePassword;