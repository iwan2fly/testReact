import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import MainLayout from './components/MainLayout';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const switchToLogin = () => setCurrentView('login');
  const switchToRegister = () => setCurrentView('register');
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false); // 로그아웃 함수 추가
  const handleMenuChange = (menu) => setActiveMenu(menu);

  // 로그인 상태에 따라 다른 레이아웃 표시
  if (!isLoggedIn) {
    return (
      <div className="App">
        {currentView === 'login' ? (
          <Login onSwitchToRegister={switchToRegister} onLogin={handleLogin} />
        ) : (
          <Register onSwitchToLogin={switchToLogin} />
        )}
      </div>
    );
  }

  // 로그인 후 메인 레이아웃
  return (
    <div className="App">
      <MainLayout 
        activeMenu={activeMenu} 
        onMenuChange={handleMenuChange}
        onLogout={handleLogout} // 로그아웃 함수 전달
      />
    </div>
  );
}

export default App;
