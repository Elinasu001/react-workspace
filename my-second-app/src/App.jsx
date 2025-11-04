import { Route, Routes } from "react-router-dom";
import Footer from "./component/Common/Footer/Footer";
import Header from "./component/Common/Header/Header";
import Home from "./component/Common/Home/Home";
import Join from "./component/Common/Member/Join/Join";

function App() {
	return (
		<>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/join" element={<Join />} />
		</Routes>
		<Footer />
		</>
	);
};
export default App;