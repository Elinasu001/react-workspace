import {useState } from "react";

{/*3가지 기억하기 : input 요소에서 사용할 경우 범용성이좋게 onChange 사용 , form 태그안에는 onSubmit 사용, onClick*/}

// 사용자가 인풋요소에 값을 입력할 때마다 적절한 메시지를 화면상에 출력
const Chapter03_Input = () => {

    const [text, setText] = useState("");
    const [message, setMessage] = useState("값을 입력해주세요");

    const inputHandler = (e) => {
        
        console.log(e.target.value); // e.target.value 가 필요함

        // 이벤트 (질문 : 자바스크립트 이벤트 핸들러 3가지는 ? 인라인, 프로퍼티, addEventListener)
        setText(e.target.value);

        if(e.target.value.length > 10){
            setMessage("메세지가 너무 깁니다.");
        }
    };

    return (
        <>
            <br /><br /><br />
            <h2>값을 입력 받아보세욘</h2>
            <br /><br /><br />
            <input type="text" onChange={inputHandler}/> 
            <br /><br /><br />
            <span>사용자가 입력한 값 : {text}</span>
            <br /><br /><br />
            <span>안내 메세지 : {message}</span>
        </>
    )
}

export default Chapter03_Input;