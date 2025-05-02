import React from 'react';
import './Header.css';

function Header({ activeMenu, onMenuChange, onLogout }) {
  const menus = [
    { id: 'dashboard', label: '대시보드' },
    { id: 'products', label: '상품 관리' },
    { id: 'orders', label: '주문 관리' },
    { id: 'customers', label: '고객 관리' },
    { id: 'settings', label: '설정' }
  ];

  return (
    <header className="header">
      <div className="logo">관리자 시스템</div>
      <nav className="main-menu">
        <ul>
          {menus.map(menu => (
            <li 
              key={menu.id} 
              className={activeMenu === menu.id ? 'active' : ''}
              onClick={() => onMenuChange(menu.id)}
            >
              {menu.label}
            </li>
          ))}
        </ul>
      </nav>
      <div className="user-info">
        <span>홍길동님</span>
        <button onClick={onLogout}>로그아웃</button>
      </div>
    </header>
  );
}

export default Header;