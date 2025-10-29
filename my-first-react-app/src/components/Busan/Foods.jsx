import { useEffect, useState } from "react";
import { StyledCard, StyledInnerWrap, StyledMoreButton, StyledStoreName, StyledImg, StyledTitle, StyledWrap } from "./Foods.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 썸네일 클릭 시 상세보기로 넘어가려면 useNavigate 사용


const Foods = () => {
    const [pageNo, setPageNo] = useState(1);
    const [hasMore, setHasMore] = useState(true); // 식당이 더 있는가 없는가
    const [foods, setFoods] = useState([]);
    const navi = useNavigate(); // 썸네일 클릭 시 상세보기로

    // 스프링 서버로 요청을 보내는 코드
    useEffect(() => {
        /*
        fetch('http://localhost:81/spring/api/busan?pageNo=1')
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log("문제발생", err))
        .finally(console.log("얘는 무조건함"));
        //:ERR_FAILED 404 (Not Found) 막아 놓으니 spring에다가 추가 해주기
            */
        /*
        axios({
            url: "http://localhost:81/spring/api/busan?pageNo=1",
            method: "get",
        }).then((result) => console.log(result));
        */
        //axios. delete/put/get
        axios.get(`http://localhost:81/spring/api/busan?pageNo=${pageNo}`)
        .then((result) => {
            //console.log("응답 잘오나~~");
            //console.log(result);
            const response = result.data.getFoodKr.item;
            //console.log(response);
            setFoods([...foods, ...response]); // 기존 배열도 합치고 다른것도 풀어서 넣고 싶다면 
            //console.log(foods);
            if(response.length < 6) {
                setHasMore(false); //더보기 응답이 더이상 없을 경우
            }
        })

    }, [pageNo]); // pageNo 을 여기다가 넣으면 더보기가 생성되는게 아니라 그냥 기존 레이아웃에서 새로 생성됨.

    const buttonHandler = () => {
        setPageNo((pageNo) => pageNo + 1);
    }
    return (
        <>
            <StyledWrap>
                <StyledTitle>부산의 맛집 알아보기</StyledTitle>
                <StyledInnerWrap>
                    {foods.length === 0 ? (
                        <div>
                            <StyledCard></StyledCard>
                            <StyledCard></StyledCard>
                            <StyledCard></StyledCard>
                        </div>
                    ) : (
                    foods.map((e) => (
                        // 클릭 시 상세보기로 이동
                        <StyledCard key={e.MAIN_TITLE} onClick={() => navi(`/foods/${e.UC_SEQ}`)}> 
                            <StyledImg src={e.MAIN_IMG_THUMB}/>
                            <br/>
                            <StyledStoreName>{e.MAIN_TITLE}</StyledStoreName>
                        </StyledCard>
                    ))
                )}
                {/* true 일때만 더보기가 나타나게 함. */}
                {hasMore && (
                    <StyledMoreButton onClick={buttonHandler}>더보기 ▼</StyledMoreButton>
                )}
                    
                </StyledInnerWrap>
                
            </StyledWrap>
        </>
    )
}

export default Foods;