import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ activeMenu, onMenuChange, onLogout }) {
  const navigate = useNavigate();

  const menus = [
    { id: 'dashboard', label: '대시보드' },
    { id: 'products', label: '상품 관리' },
    { id: 'orders', label: '주문 관리' },
    { id: 'customers', label: '고객 관리' },
    { id: 'settings', label: '설정' }
  ];

  const handleMenuClick = (menuId) => {
    // URL만 변경하고, activeMenu는 MainLayout의 useEffect에서 처리하도록 함
    navigate(`/${menuId}`);
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
              className={activeMenu === menu.id ? 'active' : ''}
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
