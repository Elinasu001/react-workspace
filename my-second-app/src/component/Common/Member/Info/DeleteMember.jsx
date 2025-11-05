import { Input, Button } from "../../../styles/style";
import axios from "axios";
import { useState, useContext } from "react";   
import { AuthContext } from "../../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";


const DeleteMember = () => {
    const [password, setPassword] = useState("");
    const { auth, logout } = useContext(AuthContext);
    const navi = useNavigate();

    const handleDelete= () => {

        // DELETE 요청에서 body는 반드시 data 속성 안에 넣어야 함
        axios
        .delete(
            "http://localhost:8080/members", 
            {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                data: { 
                    password 
                }, 
            }
        )
        .then((result) => {
            // if (result.status === 200 || result.status === 204) {
            //     console.log(result)
            //     alert("회원 탈퇴에 성공하셨습니다.");
            // }
            console.log(result)
            alert("회원 탈퇴에 성공하셨습니다.");

            logout(); // 로그아웃 처리
            navi("/"); // 홈으로 이동

        }).catch((err) => {
            console.log(err);
            alert("회원 탈퇴에 실패하였습니다.");
        });
    };

    return (

        <>
            <Input 
                type="text" 
                placeholder = "비밀번호를 입력해주세요." 
                required
                onChange={e => setPassword(e.target.value)}
            />

            <br/>

            <Button onClick={handleDelete} type="submit">탈퇴하기</Button>
        </>

    )
}

export default DeleteMember;