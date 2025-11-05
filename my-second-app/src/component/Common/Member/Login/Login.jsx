import{ Button, Container, Form, Input, Label, Title } from "../../../styles/style";
import { useContext, useState }  from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const Login = () => {

    const [memberId, setMemberId] = useState("");
    const [memberPwd, setMemberPwd] = useState("");
    const [msg, setMsg] = useState("");
    //const [loading, isLoading] = useState(false);
    const { login } = useContext(AuthContext);  // AuthContext에서 login 함수 가져오기


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


            // 하나씩 처리 하기 많으니 구조 분해로 변수 한번에 처리
            //const accessToken = result.data["access-token"];
            //const refreshToken = result.data["refresh-token"];
            const{memberId, memberName, accessToken, refreshToken, role} = result.data;
            //console.log(memberId, memberName, accessToken, refreshToken, role);


            // ==로컬 스토리지에 토큰 저장 : application > local storage 확인 가능==
            alert("로그인에 성공했습니다.");
            // useNavigate("/")  // 로그인 후 홈으로 이동 사용하는게 좋음
            window.location.href = "/"; // 새로고침 효과도 있음
            login(memberId, memberName, accessToken, refreshToken, role)
            
            /*
            // AuthContext를 통해 상태 업데이트로 대체
            localStorage.setItem("memberId", memberId);
            localStorage.setItem("memberName", memberName);
            localStorage.setItem("access-token", accessToken);  // 최대한 짧게 이름을 짓는게 좋다. why? 사용자가 직접 쓸 수도 있으니
            localStorage.setItem("refresh-token", refreshToken);
            localStorage.setItem("role", role);
            */


            // sesseionStorage.setItem("memberId", memberId); 또 똑같다. 뽑을 때는 getItem 으로 진행하면 된다.

        }).catch(error => {
            //console.error(error);
            alert(error.response.data["error-message"]);
        }); 

        // 로그인 상태 관리 : 컴포넌트로 관리하게 되면 많이 번거로우니 전역 상태 관리 라이브러리 사용 권장

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