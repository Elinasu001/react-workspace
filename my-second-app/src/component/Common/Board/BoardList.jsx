import { Board, BoardOuter, BoardTitle, BoardWriter, Button, Container, CreateDate, Title } from "../../styles/style";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardList = ()  => {
    const navi = useNavigate();
    const [page, setPage] = useState(0); // offset rowbouds 
    const [boards, setBoards] = useState([]);
    const [hasMore, setHasMore] = useState(true); // 더보기 버튼 지정한 곳에서 안보이게 하기 위함


    useEffect(() => {
        axios
            .get(`http://localhost:8080/boards?page=${page}`) // get방식이라 페이징 처리 stream 붙여서 보냄
            .then((response) => {
                //console.log(response);
                setBoards([...response.data]);// 담자
            })
            .catch((err) => {
                console.error(err);
            });
    }, [page]); // 의존성을 위함.

    return (

        <>
            <Container>
                <Title>게시판입니다.</Title>
                <BoardOuter>
                    <Button onClick={() => navi("/form")}>글쓰기</Button>
                    <Board style={{ backgroundColor:"lightpink"}}>
                        <BoardWriter>글 번호</BoardWriter>
                        <BoardTitle>글 제목</BoardTitle>
                        <BoardWriter>작성자</BoardWriter>
                        <CreateDate>작성일</CreateDate>
                    </Board>
                    {
                        boards.map(board => (
                            <Board key={board.boardNo}>
                                <BoardWriter>{board.boardNo}</BoardWriter>
                                <BoardTitle>{board.boardTitle}</BoardTitle>
                                <BoardWriter>{board.boardWriter}</BoardWriter>
                                <CreateDate>{board.createDate}</CreateDate>
                            </Board>
                        ))
                    }
                </BoardOuter>
            </Container>
        </>

    )
}

export default BoardList;