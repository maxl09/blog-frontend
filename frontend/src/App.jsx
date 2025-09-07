import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LeftColumn from './components/LeftColumn';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
        <LeftColumn />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
