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

    // 현재 URL에 따라 activeMenu 설정
    const currentPath = window.location.pathname;
    const menuId = getMenuIdFromPath(currentPath);

    // 커뮤니티 관련 경로인 경우 해당 메뉴로 설정
    if (['freeboard', 'marketplace', 'gallery', 'recommended'].includes(menuId)) {
      setActiveMenu(menuId);
      localStorage.setItem('activeMenu', menuId);
    } else {
      // 다른 경로인 경우 localStorage에서 마지막 활성화된 메뉴 가져오기
      const savedMenu = localStorage.getItem('activeMenu');
      if (savedMenu) {
        setActiveMenu(savedMenu);
      }
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

  // 특정 경로에 대한 메뉴 ID 매핑
  const getMenuIdFromPath = (path) => {
    // 커뮤니티 관련 경로들 처리
    if (path === '/freeboard') return 'freeboard';
    if (path === '/marketplace') return 'marketplace';
    if (path === '/gallery') return 'gallery';
    if (path === '/recommended') return 'recommended';
    return path.substring(1); // 첫 번째 문자(/) 제거
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
          <Route path="/freeboard" element={
            <MainLayout 
              activeMenu="freeboard" 
              onMenuChange={handleMenuChange}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          } />
          <Route path="/marketplace" element={
            <MainLayout 
              activeMenu="marketplace" 
              onMenuChange={handleMenuChange}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          } />
          <Route path="/gallery" element={
            <MainLayout 
              activeMenu="gallery" 
              onMenuChange={handleMenuChange}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          } />
          <Route path="/recommended" element={
            <MainLayout 
              activeMenu="recommended" 
              onMenuChange={handleMenuChange}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          } />
          <Route path="/profile" element={
            isLoggedIn ? (
              <MainLayout 
                activeMenu="profile" 
                onMenuChange={handleMenuChange}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/change-password" element={
            isLoggedIn ? (
              <MainLayout 
                activeMenu="change-password" 
                onMenuChange={handleMenuChange}
                onLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/:menuId" element={
            <MainLayout 
              activeMenu={activeMenu} 
              onMenuChange={handleMenuChange}
              onLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          } />
          <Route path="/" element={<Navigate to={`/${activeMenu}`} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
