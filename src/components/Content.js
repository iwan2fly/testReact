import React from 'react';
import './Content.css';

function Content({ activeMenu }) {
  return (
    <div className="content">
      <h2>{getPageTitle(activeMenu)}</h2>
      <div className="content-body">
        {renderContent(activeMenu)}
      </div>
    </div>
  );
}

// 메뉴 ID에 따른 페이지 타이틀 반환
function getPageTitle(menuId) {
  const titles = {
    dashboard: '대시보드 개요',
    products: '상품 관리',
    orders: '주문 관리',
    customers: '고객 관리',
    settings: '시스템 설정'
  };
  return titles[menuId] || '페이지';
}

// 메뉴 ID에 따른 컨텐츠 렌더링
function renderContent(menuId) {
  switch(menuId) {
    case 'dashboard':
      return (
        <div className="dashboard-content">
          <div className="card summary-card">
            <h3>요약 정보</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <div className="stat-value">152</div>
                <div className="stat-label">오늘 주문</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">2,450</div>
                <div className="stat-label">총 상품</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">1,257</div>
                <div className="stat-label">총 고객</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">₩8.2M</div>
                <div className="stat-label">월 매출</div>
              </div>
            </div>
          </div>
          
          <div className="card-row">
            <div className="card">
              <h3>최근 주문</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>주문 ID</th>
                    <th>고객</th>
                    <th>금액</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#12345</td>
                    <td>김철수</td>
                    <td>₩45,000</td>
                    <td><span className="status-badge new">신규</span></td>
                  </tr>
                  <tr>
                    <td>#12344</td>
                    <td>이영희</td>
                    <td>₩120,000</td>
                    <td><span className="status-badge processing">처리중</span></td>
                  </tr>
                  <tr>
                    <td>#12343</td>
                    <td>박지민</td>
                    <td>₩35,000</td>
                    <td><span className="status-badge completed">완료</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="card">
              <h3>인기 상품</h3>
              <ul className="popular-products">
                <li>
                  <div className="product-name">스마트폰 케이스</div>
                  <div className="product-sales">판매량: 245</div>
                </li>
                <li>
                  <div className="product-name">무선 이어폰</div>
                  <div className="product-sales">판매량: 189</div>
                </li>
                <li>
                  <div className="product-name">보조 배터리</div>
                  <div className="product-sales">판매량: 152</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    case 'products':
      return <div>상품 관리 페이지 컨텐츠</div>;
    case 'orders':
      return <div>주문 관리 페이지 컨텐츠</div>;
    case 'customers':
      return <div>고객 관리 페이지 컨텐츠</div>;
    case 'settings':
      return <div>설정 페이지 컨텐츠</div>;
    default:
      return <div>페이지를 선택해주세요</div>;
  }
}

export default Content;