import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ activeMenu }) {
  const navigate = useNavigate();
  // 열린 메뉴 상태 관리
  const [openMenus, setOpenMenus] = useState({});

  // 메뉴 토글 함수
  const toggleMenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // 커뮤니티 메뉴를 열고 해당 항목으로 이동하는 함수
  const openCommunityMenuAndNavigate = (sectionId) => {
    // 커뮤니티 메뉴 열기
    setOpenMenus(prev => ({
      ...prev,
      community: true
    }));

    // 해당 경로로 이동 (이미 Content.js에서 처리되므로 여기서는 생략 가능)
    // navigate(`/${sectionId}`);
  };

  // 커스텀 이벤트 리스너 등록
  React.useEffect(() => {
    const handleOpenCommunityMenu = (event) => {
      const { sectionId } = event.detail;
      openCommunityMenuAndNavigate(sectionId);
    };

    // 이벤트 리스너 등록
    document.addEventListener('openCommunityMenu', handleOpenCommunityMenu);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('openCommunityMenu', handleOpenCommunityMenu);
    };
  }, [navigate]);

  // 서브메뉴 아이템 클릭 핸들러
  const handleSubmenuItemClick = (mainMenu, submenuId, itemId) => {
    // 커뮤니티 메뉴 아이템 클릭 시 해당 경로로 이동
    if (submenuId === 'community') {
      navigate(`/${itemId}`);
    }
  };

  // 주 메뉴에 따른 서브 메뉴 정의
  const subMenus = {
    dashboard: [
      { id: 'community', label: '커뮤니티', hasSubmenu: true, submenu: [
        { id: 'freeboard', label: '자유게시판' },
        { id: 'marketplace', label: '벼룩시장' },
        { id: 'gallery', label: '갤러리' },
        { id: 'recommended', label: '추천' }
      ] },
      { id: 'statistics', label: '통계' },
      { id: 'reports', label: '보고서' }
    ],
    products: [
      { id: 'list', label: '상품 목록', hasSubmenu: true, submenu: [
        { id: 'all', label: '전체 상품' },
        { id: 'featured', label: '추천 상품' },
        { id: 'outofstock', label: '품절 상품' }
      ] },
      { id: 'add', label: '상품 추가' },
      { id: 'categories', label: '카테고리 관리', hasSubmenu: true, submenu: [
        { id: 'manage', label: '카테고리 관리' },
        { id: 'add', label: '카테고리 추가' }
      ] }
    ],
    orders: [
      { id: 'new', label: '신규 주문' },
      { id: 'processing', label: '처리 중' },
      { id: 'completed', label: '완료된 주문' },
      { id: 'cancelled', label: '취소된 주문' }
    ],
    customers: [
      { id: 'list', label: '고객 목록', hasSubmenu: true, submenu: [
        { id: 'all', label: '전체 고객' },
        { id: 'vip', label: 'VIP 고객' },
        { id: 'inactive', label: '휴면 고객' }
      ] },
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
  // 커뮤니티 관련 메뉴인 경우 dashboard의 서브메뉴를 사용
  const isCommunityMenu = ['freeboard', 'marketplace', 'gallery', 'recommended'].includes(activeMenu);
  const currentSubMenus = isCommunityMenu ? subMenus['dashboard'] : (subMenus[activeMenu] || []);

  return (
    <div className="sidebar">
      <h3>{getMenuTitle(activeMenu)}</h3>
      <ul className="sub-menu">
        {currentSubMenus.map(subMenu => (
          <li key={subMenu.id}>
            {subMenu.hasSubmenu ? (
              <div>
                <div 
                  className="menu-item-with-submenu" 
                  onClick={() => toggleMenu(subMenu.id)}
                >
                  <span>{subMenu.label}</span>
                  <span className="toggle-indicator">
                    {openMenus[subMenu.id] ? '▼' : '▶'}
                  </span>
                </div>
                {openMenus[subMenu.id] && (
                  <ul className="nested-submenu">
                    {subMenu.submenu.map(item => (
                      <li 
                        key={item.id} 
                        className="submenu-item"
                        onClick={() => handleSubmenuItemClick(activeMenu, subMenu.id, item.id)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <div className="menu-item">
                {subMenu.label}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 메뉴 ID에 따른 타이틀 반환
function getMenuTitle(menuId) {
  const titles = {
    dashboard: '',
    products: '',
    orders: '',
    customers: '',
    settings: '',
    freeboard: '커뮤니티',  // 커뮤니티 관련 메뉴 타이틀 추가
    marketplace: '커뮤니티',
    gallery: '커뮤니티',
    recommended: '커뮤니티'
  };
  return titles[menuId] || '';
}

export default Sidebar;
