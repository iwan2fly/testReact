import React from 'react';
import './Content.css';
import { FaChartLine, FaShoppingCart, FaUsers, FaMoneyBillWave, FaBoxOpen, FaHeadphones, FaBatteryFull } from 'react-icons/fa';

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
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">
                <FaShoppingCart />
              </div>
              <div className="stat-details">
                <h3>오늘 주문</h3>
                <p className="stat-value">152</p>
                <p className="stat-change positive">+12.5% <span>지난주 대비</span></p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FaBoxOpen />
              </div>
              <div className="stat-details">
                <h3>총 상품</h3>
                <p className="stat-value">2,450</p>
                <p className="stat-change positive">+5.2% <span>지난달 대비</span></p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <div className="stat-details">
                <h3>총 고객</h3>
                <p className="stat-value">1,257</p>
                <p className="stat-change positive">+8.7% <span>지난달 대비</span></p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <FaMoneyBillWave />
              </div>
              <div className="stat-details">
                <h3>월 매출</h3>
                <p className="stat-value">₩8.2M</p>
                <p className="stat-change negative">-2.3% <span>지난달 대비</span></p>
              </div>
            </div>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-card chart-card">
              <div className="card-header">
                <h3>매출 추이</h3>
                <div className="card-actions">
                  <select defaultValue="month">
                    <option value="week">주간</option>
                    <option value="month">월간</option>
                    <option value="year">연간</option>
                  </select>
                </div>
              </div>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  <div className="chart-bar" style={{height: '60%'}}><span>월</span></div>
                  <div className="chart-bar" style={{height: '80%'}}><span>화</span></div>
                  <div className="chart-bar" style={{height: '65%'}}><span>수</span></div>
                  <div className="chart-bar" style={{height: '90%'}}><span>목</span></div>
                  <div className="chart-bar" style={{height: '75%'}}><span>금</span></div>
                  <div className="chart-bar" style={{height: '50%'}}><span>토</span></div>
                  <div className="chart-bar" style={{height: '40%'}}><span>일</span></div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <h3>최근 주문</h3>
                <div className="card-actions">
                  <button className="view-all-btn">전체보기</button>
                </div>
              </div>
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
                  <tr>
                    <td>#12342</td>
                    <td>최수진</td>
                    <td>₩78,500</td>
                    <td><span className="status-badge new">신규</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <h3>인기 상품</h3>
                <div className="card-actions">
                  <button className="view-all-btn">전체보기</button>
                </div>
              </div>
              <ul className="popular-products">
                <li>
                  <div className="product-info">
                    <div className="product-icon"><FaHeadphones /></div>
                    <div>
                      <div className="product-name">무선 이어폰</div>
                      <div className="product-category">전자기기</div>
                    </div>
                  </div>
                  <div className="product-sales">245개</div>
                </li>
                <li>
                  <div className="product-info">
                    <div className="product-icon"><FaBoxOpen /></div>
                    <div>
                      <div className="product-name">스마트폰 케이스</div>
                      <div className="product-category">액세서리</div>
                    </div>
                  </div>
                  <div className="product-sales">189개</div>
                </li>
                <li>
                  <div className="product-info">
                    <div className="product-icon"><FaBatteryFull /></div>
                    <div>
                      <div className="product-name">보조 배터리</div>
                      <div className="product-category">전자기기</div>
                    </div>
                  </div>
                  <div className="product-sales">152개</div>
                </li>
                <li>
                  <div className="product-info">
                    <div className="product-icon"><FaBoxOpen /></div>
                    <div>
                      <div className="product-name">노트북 파우치</div>
                      <div className="product-category">액세서리</div>
                    </div>
                  </div>
                  <div className="product-sales">98개</div>
                </li>
              </ul>
            </div>
            
            <div className="dashboard-card">
              <div className="card-header">
                <h3>고객 통계</h3>
                <div className="card-actions">
                  <select defaultValue="month">
                    <option value="week">주간</option>
                    <option value="month">월간</option>
                    <option value="year">연간</option>
                  </select>
                </div>
              </div>
              <div className="customer-stats">
                <div className="customer-stat">
                  <div className="customer-stat-value">65%</div>
                  <div className="customer-stat-label">재구매율</div>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div className="customer-stat">
                  <div className="customer-stat-value">42%</div>
                  <div className="customer-stat-label">신규 고객</div>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '42%'}}></div>
                  </div>
                </div>
                <div className="customer-stat">
                  <div className="customer-stat-value">78%</div>
                  <div className="customer-stat-label">만족도</div>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>
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