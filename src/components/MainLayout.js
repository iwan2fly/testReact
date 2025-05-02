import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import './MainLayout.css';

function MainLayout({ activeMenu, onMenuChange, onLogout }) {
  return (
    <div className="main-layout">
      <Header activeMenu={activeMenu} onMenuChange={onMenuChange} onLogout={onLogout} />
      <div className="layout-body">
        <Sidebar activeMenu={activeMenu} />
        <Content activeMenu={activeMenu} />
      </div>
    </div>
  );
}

export default MainLayout;