
export function WhatIsReact(){
	return (
	<div>
		<h1>리액트란?</h1>
		<pre>
			UI(User Interface)를 구현하기 위한 Javascript Library
			<br/>
			자바스크립트 코드를 작성 코드의 단위를 Component로 구분함.
			<br/>
			Component를 조합하여 복잡한 UI를 구선할 수 있다.
			<br/>
			SPA(Single Page Application)을 구현하기 위한 도구로 사용함!
			<strong>
				화면을 예쁘게 만드는것과 React는 전혀 연관이 없다
			</strong>
			<br/>
			리액트를 학습하기 위해서 Node.js라는 Javascript Runtime을 설치
			<br/>
			NPM(Node Page Manager)라는 패키지 매니저 + JSX(Babel)문법을 활용하여 학습할 예정!
		</pre>

		<hr/>

		
	</div>

	)
}





export const WhatIsJx = () =>	{
	return (
		<>
		<h2>JSX란 무엇인가?</h2>

		<pre>
			JSX(Javascript XML)는 Javascript + XML을 사용한 자바스크립트 확장문법
			<br/>
			리액트 요소 만드는 법 : React.creatElement('h1', null, 'hello~')
			<br/>
			JSX 문법으로 리액트 요소 만들기 : <h1>hello~</h1>
			<br/>
			JSX 문법을 사용해서 Javascript코드 내부에서 react의 "Element"를 생성할 수 있음
			<br/>
			JavaScrpipt의 모든 기능을 이요할 수 있음 + UI를 생성할 때 React랑 같이 쓰라고 권장함.
			<br/>
			ReactElement란?
			<br/>
			Component를 구성하는 요소이다.
			화면에 만들어내고 싶은 요소를 작성해서 React가 브라우저에 렌더링할 수 있게 해줌
			<br/>
			특징 : 불변객체
			<br/>
			React는 index.html안에 있는 아이디 속성값이 root인 div요소 안에서 모든 요소를 관리
			<br/>
			main.jsx에서 root.render()를 호출해서 element를 전달
			<br/>
			React를 이용해서 UI를 변경하는 방법은 ReactElement를 만들어서 
			root.render()의 인자값으로 전달하는 방법뿐!!
		</pre>
		</>
	)
}