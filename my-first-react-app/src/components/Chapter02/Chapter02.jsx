import { styled } from "styled-components";

const StyleDiv = styled.div`
    width:100%;
    height:200px;
    border:1px solid lightgray;
    margin-top:40px;
    display:flex;
    flex-direction:column;
    gap:20px;
    justify-content: center;
    background-color:${(props) => (props.color ? props.color : "white")};
    /* 자기 컴포넌트에게 props로 적용 가능 */
`;

// eslint-disable-next-line no-unused-vars
const members = [
    {
        memberId : "admin",
        memberName : "짱구",
        email : "jjang9@kh.com",
        color : "lightyellow",
    },
    {
        memberId : "user01",
        memberName : "철수",
        email : "ironwater@kh.com",
        color : "lightblue",
    }, 
    {
        memberId : "user02",
        memberName : "유리",
        email : "uri@kh.com",
    },
];


// 하위 컴포넌트
const MemberInfo = (props) => {
    console.log(props);
    // 구조분해
    /* <StyleDiv color={props.member.color}> 이런식으로 비효율적으로 하는 것보다 아래와 같이 바꾼다.*/
    const { memberId, memberName, email, color } = props.member;
    console.log(memberId, memberName, email, color);

    return(
        <StyleDiv color={color}>
            <h5>아이디 : {memberId}</h5>
            <strong>이름 : {memberName}</strong>
            <p>이메일 : {email}</p>
        </StyleDiv>
    )
}

const TestComponent = props => {
    // Pure하지 않게 props값을 벼경하려고 하면 ~~꽥 ~~
    // props.num = props.num + 1; 읽기전용이라는 뜻 즉, 불변객체로 바꿀 수가 없다.
    return (
        <>
            프롭스값 + 2 : <div>{props + 2}</div>
        </>
    )
}

const Chapter02 = () => {
    return (
        <>  
            {/* 반복문 */}
            {members ? (
                    members.map((e) => (
                    <MemberInfo member={e} key={e.memberId} />
                ))
            ) : (
                <h1>조회결과가 없습니다.</h1>
            )}

            {/*  
                2절           
            <MemberInfo member={members[0]}/>
            <MemberInfo member={members[1]}/>
            <MemberInfo member={members[2]}/> */}
            {/*
            <StyleDiv>
                <h5>아이디 : {members[0].memberId}</h5>
                <strong>이름 : {members[0].memberName}</strong>
                <p>이메일 : {members[0].email}</p>
            </StyleDiv>
            <StyleDiv>
                <h5>아이디 : {members[1].memberId}</h5>
                <strong>이름 : {members[1].memberName}</strong>
                <p>이메일 : {members[1].email}</p>
            </StyleDiv>
            <StyleDiv>
                <h5>아이디 : {members[2].memberId}</h5>
                <strong>이름 : {members[2].memberName}</strong>
                <p>이메일 : {members[2].email}</p>
            </StyleDiv>
            */}

            <pre>
                props 사용 시 주의할 점
                <br/>
                React의 함수형 컴포넌트는 항상 Pure하게 만들어야 함!!  <br/>

                React의 사용목적 : 웹 애플리케이션 UI(UserInterface) => MVC(V)  <br/>
                필요한 값 입력받기  <br/>
                요청보내기  <br/>
                요청 결과 출력  <br/>
                만들용도로 사용  <br/>
            </pre>
        </>
    )
}

export default Chapter02;