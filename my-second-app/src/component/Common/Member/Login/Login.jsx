import{ Button, Container, Form, Input, Label, Title } from "../../../styles/style";
import { useState }  from "react";
import axios from "axios";

const Login = () => {

    const [memberId, setMemberId] = useState("");
    const [memberPwd, setMemberPwd] = useState("");
    const [msg, setMsg] = useState("");
    //const [loading, isLoading] = useState(false);

    // const fn1 = (e) => {
    //     setMemberId(e.target.value);
    // }


    const handleLogin = (e) => {

        e.preventDefault();

        const regexp = /^[a-zA-Z0-9]{3,20}$/;

        //console.log(!regexp.test(memberId));   

        if(!regexp.test(memberId)){
            setMsg("아이디는 영어 숫자 조합 3~20자리로 입력해주세요.");
            return;
        } else if(!regexp.test(memberPwd)){
            setMsg("비밀번호는 영어 숫자 조합 3~20자리로 입력해주세요.");
            return;
        } else {
            setMsg("");
        }
        // 폼으로 갈때는 key : value 형식으로, 이건 자바스크립트 객체 형식
        axios.post("http://localhost:8080/auth/login",{
            memberId,
            memberPwd
        }).then(result => {
            console.log(result);
        }).catch(error => {
            //console.error(error);
            alert(error.response.data["error-message"]);
        });


    };

    return (
        <>
            <Container height="400px">
                <Form onSubmit={handleLogin}>
                    <Title>로그인</Title>
                    <Input 
                        type="text" 
                        placeholder="아이디를 입력해주세요." 
                        onChange={(e) => setMemberId(e.target.value)}
                    />
                    <Label style={{fontSize:"13px", color:"red", padding:"4px"}}>
                        {msg}
                    </Label>
                    <Input 
                        type="password" 
                        placeholder="비밀번호를 입력해주세요." 
                        onChange={(e) => setMemberPwd(e.target.value)}
                    />
                    <Button type="submit">로그인하세요</Button>
                </Form>     
            </Container>
        </>
    )
}

export default Login;