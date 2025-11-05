import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { CommentAuthor, CommentContainer, CommentContent, CommentDate, CommentItem } from "../styles/Style";

const CommentList = ({boardNo, success}) =>{

    // props 쓰는게 좋음
    const [comments, setComments] = useState([]);

    useEffect (() => {
        axios
        .get(`http://localhost:8080/comments?boardNo=${boardNo}`)
        .then((result) =>{
            setComments([...result.data]);
        });
    }, [success]);

    return (
        <>
            <CommentContainer>
                {comments.length === 0 ?(
                    <CommentItem>
                        <CommentAuthor>댓글이</CommentAuthor>
                        <CommentContent>하나도</CommentContent>
                        <CommentDate>없어요</CommentDate>
                    </CommentItem>
                ) : (
                    comments.map((comment) => {
                        return (
                            <CommentItem>
                                <CommentAuthor>{comment.commentWriter}</CommentAuthor>
                                <CommentContent>{comment.commentContent}</CommentContent>
                                <CommentDate>{comment.createDate}</CommentDate>
                            </CommentItem>
                        )
                    })
                )}
            </CommentContainer>
        </>
    )
}

export default CommentList;