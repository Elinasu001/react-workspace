import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Title, Button, Container, ImageContainer, ImagePreview, Input, Label, Form } from "../../styles/style";


const BoardForm = ()=> {
    const [ boardTitle, setBoardTitle ] = useState("");
    const [ boardContent, setBoardContent ] = useState("");
    const [ file, setFile ] = useState(null); // 첨부 안할 수도 있으니 null
    const { auth } = useContext(AuthContext);
    const navi = useNavigate();


    useEffect(() => {
        if(!auth.isAuthenticated){
            alert("로그인하세요ㅋ");
            navi("/login");
        }
    }, [auth.isAuthenticated]);


    const handleFileChange = (e) =>{
        const selectedFile = e.target.files[0]; // 파일보기
        // console.log(selectedFile);
        const allowTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"]; // 확장자
        const maxSize = 1024 * 1024 * 10; // 뒷단도 해놨지만 앞단도 해놓기!


        if(selectedFile && !allowTypes.includes(selectedFile.type)){
            alert("이미지만 올려주세요 확장자는 jpg등등 이런거만 가능합니당.");
            return;
        }

        if(selectedFile && selectedFile.size > maxSize){
            alert("너무 용량이 커요 힘듭니다 서버가");
            return;
        }
        setFile(selectedFile);

    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!boardContent.trim() || !boardTitle.trim()){
            alert('제목 및 내용은 꼭꼭 입력을 부탁드려요~');
            return;
        }


        const formData = new FormData();
        formData.append("boardTitle", boardTitle);    
        formData.append("boardContent", boardContent);
        if(file){
            formData.append("file", file);
        }   


        axios
        .post("http://localhost:8080/boards", formData, {
            headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "multipart/form-data",
            },
        })
        .then((result) => {
            console.log(result);
            alert("게시글이 성공적으로 등록되었습니다!");
            navi("/"); // 작성 완료 후 홈으로 이동
        })
        .catch((error) => {
            console.error(error);
            alert("게시글 등록 중 오류가 발생했습니다.");
        });
    };


    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Title>게시판글을 써보자</Title>
                    <Label>제목</Label>
                    <Input 
                        type="text" 
                        placeholder="제목을 작성해주세요." 
                        onChange={e => setBoardTitle(e.target.value)}
                    />
                    <Label>내용</Label>
                    <Input
                        type="text"
                        placeholder="내용을 작성해주세요."
                        onChange={e => setBoardContent(e.target.value)}>
                    </Input>
                    <Label>작성자</Label>
                    <Input
                        type="text"
                        value={auth.memberName} 
                        readOnly
                        style={{backgroundColor: "lightgray", fontWeight: "bold"}}
                    />
                    <Label>파일첨부</Label>
                    <Input 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <ImageContainer>
                        <ImagePreview src="" alt="미리보기"/>
                    </ImageContainer>

                    <Button>작성하기</Button>
                        
                </Form>
            </Container>
        </>
    )
};

export default BoardForm;