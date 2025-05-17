import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ activeMenu, onMenuChange, onLogout }) {
  const navigate = useNavigate();

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
        <span>홍길동님</span>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  );
}

export default Header;
