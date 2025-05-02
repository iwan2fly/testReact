import React from 'react';
import './Sidebar.css';

function Sidebar({ activeMenu }) {
  // 주 메뉴에 따른 서브 메뉴 정의
  const subMenus = {
    dashboard: [
      { id: 'overview', label: '개요' },
      { id: 'statistics', label: '통계' },
      { id: 'reports', label: '보고서' }
    ],
    products: [
      { id: 'list', label: '상품 목록' },
      { id: 'add', label: '상품 추가' },
      { id: 'categories', label: '카테고리 관리' }
    ],
    orders: [
      { id: 'new', label: '신규 주문' },
      { id: 'processing', label: '처리 중' },
      { id: 'completed', label: '완료된 주문' },
      { id: 'cancelled', label: '취소된 주문' }
    ],
    customers: [
      { id: 'list', label: '고객 목록' },
      { id: 'groups', label: '고객 그룹' },
      { id: 'feedback', label: '고객 피드백' }
    ],
    settings: [
      { id: 'account', label: '계정 설정' },
      { id: 'system', label: '시스템 설정' },
      { id: 'notifications', label: '알림 설정' }
    ]
  };

  // 현재 활성화된 메뉴에 해당하는 서브 메뉴 가져오기
  const currentSubMenus = subMenus[activeMenu] || [];

  return (
    <div className="sidebar">
      <h3>{getMenuTitle(activeMenu)}</h3>
      <ul className="sub-menu">
        {currentSubMenus.map(subMenu => (
          <li key={subMenu.id}>
            {subMenu.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 메뉴 ID에 따른 타이틀 반환
function getMenuTitle(menuId) {
  const titles = {
    dashboard: '대시보드',
    products: '상품 관리',
    orders: '주문 관리',
    customers: '고객 관리',
    settings: '설정'
  };
  return titles[menuId] || '';
}

export default Sidebar;