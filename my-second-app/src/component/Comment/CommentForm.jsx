import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Button, Container, Form, Input, Title } from "../styles/Style"
import CommentList from "./CommentList"

const CommentForm = ({boardNo}) =>{
    const { auth } = useContext(AuthContext);
    const [commentContent, setCommentContent]  = useState("");
    const [success, onSuccess] = useState(false); // 원래는 props로
    
    const handleInsertComment = e => {
        e.preventDefault();
        if(commentContent.trim() === ""){
            alert("내용을 작성해주세요");
            return;
        }

        if(!auth.isAuthenticated){
            alert("로그인 부터하셈");
            return;
        }

        axios.post("http://localhost:8080/comments", 
        {
            refBoardNo : boardNo,
            commentContent: commentContent,
        }, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,

            },
        })
        .then(response => {
            if(response.status === 201){
                alert("성공성공");
                setCommentContent("");
                onSuccess((success) => !success); // true면 false/ false/ture
            }
        })
        .catch((err) => {
            console.error(err);
        })

        

    }

    return (
        <>
            <Container>
                
                <Form onSubmit={handleInsertComment}>
                    <Title>댓글작성</Title>
                    <Input
                        type="text"
                        value={commentContent}
                        placeholder="작성해보아요"
                        onChange={e => setCommentContent(e.target.value)}    
                    />
                    <Button type="submit">작성하기</Button>
                </Form>
                <CommentList boardNo={boardNo} success={success}/>
            </Container>
        </>
    )
}

export default CommentForm;