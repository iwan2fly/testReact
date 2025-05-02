import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // 컴포넌트 마운트 시 localStorage에서 로그인 상태 확인
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    
    // 마지막으로 활성화된 메뉴도 저장해두면 좋습니다
    const savedMenu = localStorage.getItem('activeMenu');
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  const switchToLogin = () => setCurrentView('login');
  const switchToRegister = () => setCurrentView('register');
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    // 로그인 시 항상 대시보드로 이동하도록 설정
    setActiveMenu('dashboard');
    localStorage.setItem('activeMenu', 'dashboard');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };
  
  const handleMenuChange = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem('activeMenu', menu);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={
            isLoggedIn ? <Navigate to={`/${activeMenu}`} /> : 
            <Login onSwitchToRegister={switchToRegister} onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            isLoggedIn ? <Navigate to={`/${activeMenu}`} /> : 
            <Register onSwitchToLogin={switchToLogin} />
          } />
          <Route path="/:menuId" element={
            !isLoggedIn ? <Navigate to="/login" /> :
            <MainLayout 
              activeMenu={activeMenu} 
              onMenuChange={handleMenuChange}
              onLogout={handleLogout}
            />
          } />
          <Route path="/" element={<Navigate to={isLoggedIn ? `/${activeMenu}` : "/login"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
