import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LeftColumn from './components/LeftColumn';
import Profile from './pages/Profile';
import { Search } from 'lucide-react';
import Users from './pages/Users';
import { useAuth } from './context/useAuth';

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
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
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
