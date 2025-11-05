import { Input, Button } from "../../styles/Styles";


const ChangePassword = () => {
    return (

        <>
            <Input type="password" placeholder="현재 비밀번호를 입력하세요." />
            <Input type="password" placeholder="변경할 비밀번호를 입력하세요."/>
            <Button>비밀번호 변경하기</Button>
        </>

    )
}

export default ChangePassword;