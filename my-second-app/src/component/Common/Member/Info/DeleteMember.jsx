import { Input } from "../../styles/Styles";


const DeleteMember = () => {
    return (

        <>
            <Input type="text" placeholder = "비밀번호를 입력해주세요."required/>

            <br/>

            <Button>탈퇴하기</Button>
        </>

    )
}

export default DeleteMember;