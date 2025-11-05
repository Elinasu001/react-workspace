import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {useState, useEffect, useContext} from "react";
import { Button, Form, BoardContent, BoardWriter, Container, ImageContainer, ImagePreview, Title } from "../../styles/style";
import CommentForm from "../../Comment/CommentForm";
import { AuthContext } from "../../context/AuthContext";

// 서버 단일조회 불러서 사용
const BoardDetail = () => {
    // alert(`모범시민 특 잘 찍어봄 : ${id}`);
    const { id } = useParams();
    const navi = useNavigate();
    const [board, setBoard] = useState(null);
    const [load, isLoad] = useState(false);
    //const [msg, setMsg] = useState("");
    const { auth } = useContext(AuthContext);


    useEffect(()=>{
        axios.get(`http://localhost:8080/boards/${id}`, )
            .then((result) => {
                // console.log(result); // 파일 데이터까지 잘 넘어오는지 확인 필요
                setBoard(result.data);
                isLoad(true);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [id]);


    const handleDelete = e => {
        e.preventDefault();
        if(confirm("진짜 지울거임?")){
            axios.delete(`http://localhost:8080/boards/${id}`,{
                headers:{
                    Authorization: `Bearer ${auth.accessToken}`
                },
            })
            .then(() =>{
                setBoard({
                    boardTitle: "삭제중입니다...",
                    boardContent : "삭제중입닌다...",
                    boardWriter: "삭제중입니다...",
                }),
                setTimeout(()=>{

                    navi("/boards");

                }, 5000);
            })
        }
    }

    return (
        <>  

            {!load ? (
                <Container>
                    <Title style={{width:"50%", margin:"auto", lineHeight:"640px"}}> 게시글을 불러오는 중입니다...</Title>
                </Container>
                ):(
                    <Container>
                        <Title>{board.boardTitle}</Title>
                        <BoardWriter>작성자 : {board.boardWriter}</BoardWriter>
                        <BoardContent>{board.boardContent}</BoardContent>
                        {
                            board.fileUrl ? (
                                
                                // return "http://localhost:8080/uploads/" + originalFilename; 에 8080추가 필요
                                <ImageContainer>
                                    <ImagePreview src={board.fileUrl} alt="첨부이미지"/>
                                </ImageContainer>
                            ) : (
                                <div>이미지가 존재하지 않습니다.</div>
                            )

                        }

                        <Form onSubmit={handleDelete}>
                            {board.boardWriter === auth.memberId && (
                                <>
                                    <Button
                                        type="button" 
                                        style={{ background: "green" }}
                                    >
                                    수정하기인척하기
                                    </Button>
                                    <Button 
                                        type="button" 
                                        style={{background:"crimson"}}
                                        onClick={handleDelete}
                                    >
                                    삭제하기
                                    </Button>
                                </>
                            )}

                        </Form>

                        <Button onClick={() => navi(-1)} style={{background:"blue"}}>
                            뒤로가기
                        </Button>
                    </Container>
                )
            }
            <CommentForm boardNo={id}/>
        
        </>
    )
}

export default BoardDetail;