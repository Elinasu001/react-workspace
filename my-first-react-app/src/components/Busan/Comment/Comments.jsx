import { useState, useEffect } from "react";
import axios from "axios"; // API 요청용 라이브러리

// 하위(자식) 컴포넌트
const Comments = (props) => {

    const [comments, setComments] = useState([]); // 가변적으로 변하는 comments useState로 관리
    const id = props.id; // 항상 변수로 빼놓기 // 특정 id(예: 음식번호)에 해당하는 댓글만 조회 // 부모에서 받은 id
    //console.log(`상위 컴포넌트가 넘겨준 :  ${props}`); // 그럼 상위 컴포너트는 하위 컴포넌트에게 값을 내려줌 (Detail.jsx)

    // 즉, state를 props로 내려주기
    // 적당 : 부모 → 자식으로 props 전달만 충분
    // 많아질 경우 : context api 상태관리 라이브러리 사용

    // 오늘의 숙제 ...................... ㅎ ㅎ 미니 프로젝트에서 사용할 open api 골라오기+ api문서 정독하고오기

    // 받아온 값을 다루기
    // 컴포넌트가 렌더링되거나 id가 바뀔 때 실행
    useEffect(() =>{

        // 전체 후기를 싹다 조회 하는게 아님 // 특정 id(음식 번호)에 해당하는 댓글만 조회
        // SELECT * FROM FOOD_COMMENT WHERE SEQ = 94;
        axios.get(`http://localhost:81/spring/api/comments/${id}`).then((result) =>{
            console.log(result);
            setComments([...result.data]);// result에 데이터를 담고
        
        });

    }, [props.success, id]);// 리렌더링(다시 데이터 불러오기)의 핵심 역할 즉, 배열 안에 있는 값이 바뀔 때마다 useEffect 안의 코드가 다시 실행
                            // 즉, props.success가 바뀌거나, id가 바뀔 때마다 댓글을 다시 불러온다!
    return (
        // 인덱스 키로 만들면 안좋음 , why? 겹칠 우려 만약 사용 시 key 속성 값은 안겹치는걸로해야됨
        <>
            { 
                comments.length != [] ? (
                comments.map((e) => {
                    return(
                        <dib style={{width:"auto", margin:"auto"}} key={e.content}>
                            <hr/>
                            <h4>{e.content}</h4>
                            <h5>{e.createDate}</h5>
                        </dib>
                    )
                })
                ):(
                    <h2>아직 댓글이 존재하지 않습니다.</h2>
                )
            }
        </>
    )
}

export default Comments;