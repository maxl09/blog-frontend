import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LeftColumn from './components/LeftColumn';
import Profile from './pages/Profile';
import Users from './pages/Users';
import { useAuth } from './context/useAuth';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from './pages/CreatePost';
import Search from './pages/Search';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.isAdmin ? children : <Navigate to='/' replace />
}

const MainLayout = () => (
  <>
    <LeftColumn />
    <Outlet />
  </>
)

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/user/:userId" element={<Profile />} />
          </Route>
          {/* Pages without left column */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={(
            <AdminRoute>
              <Users />
            </AdminRoute>
          )} />
        </Routes>
      </BrowserRouter>
    </div >
  )
}

export default App
