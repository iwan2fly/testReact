import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import './MainLayout.css';

function MainLayout({ activeMenu, onMenuChange, onLogout, isLoggedIn = false }) {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  // URL의 menuId가 변경되면 activeMenu 상태 업데이트
  useEffect(() => {
    // URL 파라미터가 있고, 현재 activeMenu와 다른 경우에만 상태 업데이트
    if (menuId && menuId !== activeMenu) {
      onMenuChange(menuId);
    }
  }, [menuId, activeMenu, onMenuChange]);

  // 두 번째 useEffect 제거 - URL은 Header에서 직접 변경하므로 필요 없음

  return (
    <div className="main-layout">
      <Header activeMenu={activeMenu} onMenuChange={onMenuChange} onLogout={onLogout} isLoggedIn={isLoggedIn} />
      <div className="layout-body">
        <Sidebar activeMenu={activeMenu} />
        <Content activeMenu={activeMenu} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

export default MainLayout;
