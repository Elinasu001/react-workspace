/* global kakao */

import { StyledMainImg, StyledDescription ,StyledOther ,StyledMap  } from "./Detail.styles";
import { StyledMoreButton, StyledTitle, StyledWrap } from "../Foods.styles"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Comments from "../Comment/Comments";

// 상위 컴포넌트 (예: Detail.jsx)
const Detail = () =>{
    const { id } = useParams();
    //alert(id); // 값 뽑장 ,코드가 돌고 있는 지 확인하기
    const navi = useNavigate();
    const [food, setFood] = useState({
        title: "",
        img: "",
        description: "",
        usageTime: "",
        address: "",
        lat: "",    // map 위도
        lng: "",    // map 경도
    });

    const [load, isLoad] = useState(false); // 응답이 돌아왔나 안왔나
    const [content, setContent] = useState(""); //사용자가 입력한 후기값 담을 상태
    const [success, isSuccess] = useState(false); // 댓글이 작성 될 때마다 스위칭할 상태 // false 로 넣었지만 true로 넣어도 상관없음.

    const contentHandler = e =>  { // 제어 변수 // input 태그
        setContent(e.target.value);
    }

    const submitHandler = e => { // 요청 발생시 // form 태그
        e.preventDefault(); // 기본적으로 url 없어짐


        if(content.trim == ''){ // 유효성검사 , 정규 표현식 체크
            alert('내용을 입력하세요!');
            return; 
        }

        /* 여러가지 유효성검사 끝날 시*/
        // post 방식 : 값을 바디에 보내야되니 ,
        axios.post(`http://localhost:81/spring/api/comments`, {
            foodNo: id,
            content: content
        })
        .then((result) => {
            console.log(result);
            // setContent("");
            setContent(""); // 입력창 초기화
            isSuccess((success) => ! success); // 댓글 작성에 성공하면 스위칭함. 그리고 이 state를 갔다가 하위 컴포넌트에게 넘겨줌
        })
    }

    // 받아온 값으로 돌리고 싶다면? axios, import 필요
    useEffect(() =>{
        axios.get(`http://localhost:81/spring/api/busan/${id}`).then((result) => {
            console.log(result);
            const response = result.data.getFoodKr.item[0];
            console.log(response);
            setFood({
                title: response.MAIN_TITLE,
                img: response.MAIN_IMG_NORMAL,
                description: response.ITEMCNTNTS,
                usageTime: response.USAGE_DAY_WEEK_AND_TIME,
                address: response.ADDR1,
                lat: response.LAT,
                lng: response.LNG,
            });

            isLoad(true);

            if(food.lat) {
                var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                var options = { //지도를 생성할 때 필요한 기본 옵션
                center: new kakao.maps.LatLng(response.LAT, response.LNG), //지도의 중심좌표.
                level: 3 //지도의 레벨(확대, 축소 정도)
            };
                var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
            }
            new kakao.maps.Marker({
                position: new kakao.maps.LatLng(food.lat, food.lng),
                map: map, 
            });
        });
        
    }, [food.lat]);

    if(!load){
        return(
            <StyledWrap>
                <StyledTitle>음식점을 조회 중입니다... 기다려...</StyledTitle>
            </StyledWrap>
        )
    }

    return (
        <>
            <StyledWrap>
                <StyledTitle>{food.title}</StyledTitle>
                <StyledMainImg src={food.img}/>
                <StyledDescription>{food.description}</StyledDescription>
                <StyledOther>{food.address}</StyledOther>
                <StyledOther>{food.usageTime}</StyledOther>
                <StyledMap id="map"></StyledMap>
                <StyledMoreButton onClick={() => navi(-1)}>뒤로가기</StyledMoreButton> {/** -1 전페이 , --1 전전페이지, +1 다음페이지, ++1 다다음페이지 */}
            </StyledWrap>

            <div style={{width:"60%", margin:"auto", height:"60px"}}>
                <form  onSubmit={submitHandler}> {/*기본 옵션 제거된 상태로 axios 보내기 */}
                    <input type="text" onChange={contentHandler} value={content} placeholder="★☆후기를 남겨주세요잉☆★"/>{/*후기 남기기 : 가변적이니 state로 관리 */}
                    <button>후기 남기기</button>
                </form>
            </div>

            <>
                <Comments id={id} success={success}/>{/*  여기서 자식에게 id를 내려줌*/}
            </> 
        </>
    )
}

export default Detail;