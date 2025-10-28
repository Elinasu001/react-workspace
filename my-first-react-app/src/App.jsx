/* eslint-disable no-constant-binary-expression */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import SelectBoard from './components/Chapter01/SelectBoard';
import Fusion from './components/modules/Fusion';
import Container from 'react-bootstrap/Container';
import {Routes, Route} from 'react-router-dom';
import Nav from './components/common/nav/Nav'
import Chapter01 from './components/Chapter01/Chapter01';
import Chapter02 from './components/Chapter02/Chapter02';
import Chapter03 from './components/Chapter03/Chapter03';

//const el = React.createElement("p", null, "HELLO REACT");


function App() {
	
	return (
		<>
			<Header/>
			
			{/* 자바스크립트 코드를 작성할 수 있는 영역 */}
			{false && <Fusion/> && <Chapter01/>}
			<div className="contentWrap">
				<Container>

					<Nav/>
					{/* <SelectBoard/> */}
					<Routes>
						<Route path="/" element={<h1>메인입니다.</h1>} />
						<Route path="/fusion" element={<Fusion />} />
						<Route path="/01" element={<Chapter01 />} />
						<Route path="/02" element={<Chapter02 />} />
						<Route path="/03" element={<Chapter03 />} />
						<Route path="*" element={<h1>존재하지 않는 페이지입니다.</h1>} />
					</Routes>

				</Container>
			</div>
			<Footer/>
		</>
	)
}

export default App;
