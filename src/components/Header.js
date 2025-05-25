import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ activeMenu, onMenuChange, onLogout, isLoggedIn }) {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menus = [
    { id: 'dashboard', label: '커뮤니티' },
    { id: 'products', label: '상품 관리' },
    { id: 'orders', label: '주문 관리' },
    { id: 'customers', label: '고객 관리' },
    { id: 'settings', label: '설정' }
  ];

  const handleMenuClick = (menuId) => {
    // 커뮤니티 메뉴 클릭 시 대시보드로 이동
    if (menuId === 'dashboard') {
      // 이미 커뮤니티 관련 페이지에 있는 경우 대시보드로 이동
      if (['freeboard', 'marketplace', 'gallery', 'recommended'].includes(activeMenu)) {
        navigate('/dashboard');
      } else {
        navigate(`/${menuId}`);
      }
    } else {
      // 다른 메뉴는 해당 경로로 이동
      navigate(`/${menuId}`);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const navigateToProfile = () => {
    setShowProfileDropdown(false);
    navigate('/profile');
  };

  const navigateToChangePassword = () => {
    setShowProfileDropdown(false);
    navigate('/change-password');
  };

  return (
    <header className="header">
      <div className="logo">관리자 시스템</div>
      <nav className="main-menu">
        <ul>
          {menus.map(menu => (
            <li 
              key={menu.id} 
              className={
                activeMenu === menu.id || 
                (menu.id === 'dashboard' && ['freeboard', 'marketplace', 'gallery', 'recommended'].includes(activeMenu)) 
                ? 'active' : ''
              }
              onClick={() => handleMenuClick(menu.id)}
            >
              {menu.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="user-info">
        {isLoggedIn ? (
          <div className="profile-section" ref={dropdownRef}>
            <span className="user-name" onClick={handleProfileClick}>홍길동님</span>
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={navigateToProfile}>내 정보보기</div>
                <div className="dropdown-item" onClick={navigateToChangePassword}>비밀번호 변경</div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item" onClick={handleLogout}>로그아웃</div>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleLogin}>로그인</button>
        )}
      </div>
    </header>
  );
}

export default Header;
