
/*
    컴포넌트 내부에서 변경이 가능한 데이터 값을 관리해야 할 경우
    props는 불변객체기 때문에 건들면 안됨.

    React에서 화면에 표시하는 데이터, 변화해야하는 값, 상태 등 모두 State를 통해서 관리
    예시) 숫자값, 문자값, 배열값, 버튼을 클릭했는가? / 값이 null인가?
    모달창이 열렸는가? / 에러가 발생했는가?/ 숫자값이 증가했는가?
    감소했는가? 문자값이 작성되었는가? 배열에 요소가 추가되었나 ? 감소했나? 객체가 생겼나?
    속성을 가지고 있나?

    함수형 컴포넌트에서 State를 관리하기 위해서는 useState라는 Hook을 사용함

    Hook: react 16.8버전부터 새롭게 추가된 기능
            React쓰면서 유용하게 사용할 수 있는 내장함수

*/

import { useState } from "react";


const Chapter03 = () => {
    
    //let count = 0;
    const [count, setCount] = useState(0); // 얘가 훅임 // 원래 내가 사용할 식별자 변수명을 사용, 속성의 값을 변경해주는 함수 setter
    // useState호출 시 배열이 반환됨 : 요소는 두개
    // [인자값으로 전달할 값이 대입되어있는 변수, 변수를 조작할 수 있는 setter]
    // ★★나는 컴포넌트 내부에서 값을 사용할 때 변수 사용 시 무조건 state 라는 것을 이용해야 한다.
    // useState 호출 시 반드시 인자값을 넘겨야함 --> 초기값
    // 문자, 숫자, 논리, 객체, 배열, undefined, NaN

    console.log(count);
    
    /*
    이렇게 안쓰기 위해서 구조분해가 필요하다.
    const value = arr[1];
    const value2 = arr[2];
    */

    //const arr = ["a", "b", "c"];
    // const a = arr[0];
    // const b = arr[1];
    // const c = arr[2];
    //const [a, b, c] = arr;
    //console.log(a);
    //console.log(b);
    //console.log(c);

    const onClickButton =  () => {
        //count += 1; : 상수 변수니깐 안되지 // setter 사용하여 변하는 값을 사용
        console.log(count);
        setCount(count => count + 1);

        /*
        setCount(function(count)~ 익명함수 
        다중 사용자가 있을 경우 최신값을 가져다가 사용하는게 안전한 방법이기 때문에 사용하는 setCount 사용
        */
    };

    /*
    버튼을 클릭했을 때 setter를 이용해서 state를 변경했더니
    수치가 바뀌고 화면이 변경됨.

    컴포넌트가 재렌더링 되었기 때문에


    함수형컴포넌트는 State(상태)가 변경될 때마다 처음부터 다시 수행됨
    React는 가상 DOM이라는 기술을 사용하여 변경된 부분만 실제 DOM에 반영
    
    즉, 똑같은 구조의 DOM을 두어 비교해서 바뀐 부분만 DOM에 반영
    => 이 과정을 재렌더링이라고 표현함

    state가 바뀌었네 ? => 함수컴포넌트 다시 실행! => 실제 DOM가상 DOM비교!
    => 바뀐부분만 재렌더링! => 어? state가 바뀌었네 ? => 함수부분컴포넌트~ 다시 실행 ~~ 
    
    React의 재렌더링 조건 
    1. setter를 이용한 state의 변경
    2. props값의 변경
    3. 재렌더링된 컴포넌트의 모든 하위 컴포넌트
    
    주의 : state는 항상 setter를 이용하여 값을 변경해야함!!
            그냥 내맘대로 대입해서 바꾸려고하면 절~~대 안됨!! 어차피 에러남

    */

    return (
        <>
            <h1>완전 중요한 친구</h1>
            <br/>
            <h3>{count}</h3>
            <button onClick={onClickButton}>나 클릭하면 숫자 증가함</button>
        </> 

    )
}

export default Chapter03;