import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./component/context/AuthContext";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import Join from "./component/Common/Member/Join/Join";
import Login from "./component/Common/Member/Login/Login";
import Info from "./component/Common/Member/Info/Info";
import BoardList from "./component/Common/Board/BoardList";
import BoardForm from "./component/Common/Board/BoardForm";

function App() {
	return (
		<>
		{/* AuthProvider로 감싸서 하위 컴포넌트들이 인증 상태에 접근 가능하도록 함 */}
		{/* props로 받지 않고도 하위 컴포넌트들이 AuthContext의 값에 접근 가능 */}
		<AuthProvider>
			<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/join" element={<Join />} />
					<Route path="/login" element={<Login />} />
					<Route path="/info" element={<Info />} />
					<Route path="/boards" element={<BoardList />} />
					<Route path="/form" element={<BoardForm />} />
				</Routes>
			<Footer />
		</AuthProvider>
		</>
	);
};
export default App;