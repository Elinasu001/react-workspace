import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import List from './components/List.jsx'
import Form from './components/Form.jsx'

function App() {

  const navi = useNavigate();

  return (
    <>
      <nav style={{position: 'fixed', top: '10px', left:'50%'}}>
        <ul style={{listStyle: 'none', padding: '0'}}>
          <li onClick={() => navi('/')}>홈화면</li>
          <li onClick={() => navi('/list')}>요거트 목록</li>
          <li onClick={() => navi('/form')}>요거트 추가</li>
        </ul>
      </nav>

      <hr/>

      <Routes>
        <Route path='/' element={<h1>어서오세요 요아정이에요</h1>} />
        <Route path='/list' element={<List/>}/>
        <Route path='/form' element={<Form/>} />
        <Route path="*" element={<h1>페이지가 존재하지 않습니다.</h1>} />
      </Routes>
    </>
  )
}

export default App
