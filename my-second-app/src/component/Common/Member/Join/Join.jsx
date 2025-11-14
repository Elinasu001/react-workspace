import { Container, Form, Title, Input, Button } from "../../../styles/style";
import { useState  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {

    const navi = useNavigate();

    // 원래는 handler로 만드는게 맞는데 일단, onChange로 진행
    const [memberId, setMemberId] = useState("");
    const [memberPwd, setMemberPwd] = useState("");
    const [memberName, setMemberName] = useState("");
    const [loading, isLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();/// 기본 이벤트 삭제
        isLoading(true);
        // console.log(`아이디 : ${memberId}`);
        // console.log(`비밀번호 : ${memberPwd}`);
        // console.log(`닉네임 : ${memberName}`);


        // 서버로 데이터 전송
        axios.post("http://localhost:8080/members", {
            memberId,
            memberPwd,
            memberName
        }).then((result) => {  
            // console.log(result);
            if(result.status === 201){
                alert("회원가입이 완료되었습니다.");
                setTimeout(() => {
                    navi("/"); 
                }, 1000);
            }
        }).catch((error) => {
            console.log(error.response.data["error-message"]); // 이미 존재하는 아이디입니다.
            setErrMsg(error.response.data["error-message"]);
            isLoading(false);
        }).catch(e => {
            console.log(e);
        });
    }


    return <>
        <Container>
            { loading ? <Title>가입 중입니다...</Title> :
            <Form onSubmit={handleSubmit}>
                <Title>회원가입</Title>

                <label style={{color:"red"}}>{errMsg}</label><br/>
                
                <h4>아이디</h4>
                <Input 
                    placeholder="아이디를 입력해주세요" 
                    type="text" 
                    onChange={e => setMemberId(e.target.value)}
                />
                <h4>비밀번호</h4>
                <Input 
                    placeholder="비밀번호를 입력해주세요" 
                    type="password"
                    onChange={e => setMemberPwd(e.target.value)}
                />
                <h4>닉네임</h4>
                <Input 
                    placeholder="닉네임을 입력해주세요" 
                    type="text"
                    onChange={e => setMemberName(e.target.value)}
                />
                <Button type="submit">즐거운 회원가입하기</Button>
            </Form>
            }
        </Container>
    </>;
};

export default Join;