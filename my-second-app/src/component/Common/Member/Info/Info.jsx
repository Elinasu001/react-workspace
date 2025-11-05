import { useNavigate }   from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Container, Form, Title, Input, Button, Tabs, Tab } from "../../../styles/style";
import ChangePassword from "./ChangePassword";
import DeleteMember from "./DeleteMember";

// 사용자가 url을 통해 접근하는 것을 방지하기 위해서

{/* 마이페이지 :  비밀번호 변경, 회원 탈퇴 */}
const Info = () => {
    const { auth, logout } = useContext(AuthContext);
    const navi = useNavigate();

    const [active, setActive] = useState(true);

    const handleToggle = () => {
        setActive((active) => !active);
    };

    useEffect(() => { // 컴포넌트가 렌더링 될 때마다 실행
        if (auth == null) return;
        
        if(!auth.isAuthenticated){
            alert("로그인이 필요한 페이지입니다.");
            logout();
            navi("/login");
        }
    }, [auth, navi]);

    return (
        <>
            <Container>
                <Form>
                    <Title>{active ? "비밀번호 변경" : "회원 탈퇴"}</Title>
                    <Tabs>
                        <Tab onClick={handleToggle}>다른 메뉴 보기</Tab>
                    </Tabs>
                    <Title>비밀번호 변경 / 회원 탈퇴</Title>


                    <Input type="text" value={auth.memberId} required readOnly/>
                    <Input type="text" value={auth.memberName} required readOnly/>
                    {active ? <ChangePassword /> : <DeleteMember />}
                    <Button type="button" onClick={() => navi(-1)} >뒤로가기</Button>
                    
                </Form>
            </Container>

        </>
    )
};

export default Info;