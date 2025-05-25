import React, { useState, useEffect } from 'react';
import './Content.css';
import { FaChartLine, FaShoppingCart, FaUsers, FaMoneyBillWave, FaBoxOpen, FaHeadphones, FaBatteryFull } from 'react-icons/fa';
import WritePost from './WritePost';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';

function Content({ activeMenu, isLoggedIn = false }) {
  // State for writing mode
  const [isWriting, setIsWriting] = useState(false);
  const [currentBoard, setCurrentBoard] = useState('');

  // Reset writing mode when activeMenu changes
  useEffect(() => {
    setIsWriting(false);
  }, [activeMenu]);

  // Mock data for community posts
  const [communityData, setCommunityData] = useState({
    freeboard: [],
    marketplace: [],
    gallery: [],
    recommended: []
  });

  // Simulate fetching data from an API
  useEffect(() => {
    // Mock data for community sections
    const mockData = {
      freeboard: [
        { id: 1, title: '자유게시판 첫 번째 글입니다', author: '홍길동', timestamp: '2025-05-17 14:30', views: 120, likes: 15 },
        { id: 2, title: '오늘 날씨가 정말 좋네요', author: '김철수', timestamp: '2025-05-17 13:45', views: 85, likes: 10 },
        { id: 3, title: '주말 계획 있으신가요?', author: '이영희', timestamp: '2025-05-17 12:20', views: 67, likes: 8 },
        { id: 4, title: '새로운 취미를 찾고 있어요', author: '박지민', timestamp: '2025-05-17 11:10', views: 92, likes: 12 },
        { id: 5, title: '추천 영화 알려주세요', author: '최민수', timestamp: '2025-05-17 10:05', views: 105, likes: 18 },
        { id: 6, title: '오늘 점심 뭐 먹었나요?', author: '정수정', timestamp: '2025-05-17 09:30', views: 78, likes: 9 },
        { id: 7, title: '여름 휴가 계획 세우셨나요?', author: '강동원', timestamp: '2025-05-16 18:45', views: 112, likes: 14 },
        { id: 8, title: '좋은 아침이에요!', author: '손예진', timestamp: '2025-05-16 08:15', views: 65, likes: 7 },
        { id: 9, title: '주말에 볼만한 영화 추천', author: '김태희', timestamp: '2025-05-16 07:30', views: 98, likes: 16 },
        { id: 10, title: '오늘 하루도 화이팅!', author: '이민호', timestamp: '2025-05-16 06:45', views: 72, likes: 11 }
      ],
      marketplace: [
        { id: 1, title: '아이폰 14 Pro 팝니다', author: '판매자1', timestamp: '2025-05-17 15:20', views: 145, likes: 22 },
        { id: 2, title: '삼성 갤럭시 S23 판매합니다', author: '판매자2', timestamp: '2025-05-17 14:10', views: 132, likes: 18 },
        { id: 3, title: '맥북 프로 M2 거의 새것', author: '판매자3', timestamp: '2025-05-17 13:05', views: 178, likes: 25 },
        { id: 4, title: '에어팟 프로 2세대 팝니다', author: '판매자4', timestamp: '2025-05-17 12:30', views: 95, likes: 12 },
        { id: 5, title: '닌텐도 스위치 OLED 판매', author: '판매자5', timestamp: '2025-05-17 11:45', views: 110, likes: 15 },
        { id: 6, title: '아이패드 프로 M2 팝니다', author: '판매자6', timestamp: '2025-05-17 10:50', views: 125, likes: 19 },
        { id: 7, title: '소니 WH-1000XM5 헤드폰', author: '판매자7', timestamp: '2025-05-16 19:30', views: 88, likes: 10 },
        { id: 8, title: '다이슨 에어랩 판매합니다', author: '판매자8', timestamp: '2025-05-16 18:20', views: 102, likes: 14 },
        { id: 9, title: '캠핑 장비 일괄 판매', author: '판매자9', timestamp: '2025-05-16 17:15', views: 115, likes: 17 },
        { id: 10, title: '자전거 팝니다 (로드바이크)', author: '판매자10', timestamp: '2025-05-16 16:40', views: 98, likes: 13 }
      ],
      gallery: [
        { id: 1, title: '제주도 여행 사진', author: '사진작가1', timestamp: '2025-05-17 16:15', views: 210, likes: 45 },
        { id: 2, title: '봄 꽃 사진 모음', author: '사진작가2', timestamp: '2025-05-17 15:40', views: 185, likes: 38 },
        { id: 3, title: '일몰 풍경 사진', author: '사진작가3', timestamp: '2025-05-17 14:55', views: 165, likes: 32 },
        { id: 4, title: '도시 야경 사진', author: '사진작가4', timestamp: '2025-05-17 13:50', views: 195, likes: 41 },
        { id: 5, title: '반려동물 사진 공유', author: '사진작가5', timestamp: '2025-05-17 12:45', views: 230, likes: 52 },
        { id: 6, title: '음식 사진 모음', author: '사진작가6', timestamp: '2025-05-17 11:30', views: 175, likes: 36 },
        { id: 7, title: '산 풍경 사진', author: '사진작가7', timestamp: '2025-05-16 20:25', views: 155, likes: 29 },
        { id: 8, title: '바다 사진 공유합니다', author: '사진작가8', timestamp: '2025-05-16 19:10', views: 180, likes: 37 },
        { id: 9, title: '가을 단풍 사진', author: '사진작가9', timestamp: '2025-05-16 18:05', views: 160, likes: 33 },
        { id: 10, title: '겨울 눈 사진', author: '사진작가10', timestamp: '2025-05-16 17:30', views: 190, likes: 40 }
      ],
      recommended: [
        { id: 1, title: '꼭 봐야할 영화 TOP 10', author: '추천자1', timestamp: '2025-05-17 17:20', views: 320, likes: 75 },
        { id: 2, title: '이번 주 베스트 음악', author: '추천자2', timestamp: '2025-05-17 16:35', views: 285, likes: 62 },
        { id: 3, title: '추천 도서 리스트', author: '추천자3', timestamp: '2025-05-17 15:50', views: 245, likes: 53 },
        { id: 4, title: '맛집 추천합니다', author: '추천자4', timestamp: '2025-05-17 14:40', views: 310, likes: 68 },
        { id: 5, title: '여행지 추천 리스트', author: '추천자5', timestamp: '2025-05-17 13:25', views: 275, likes: 59 },
        { id: 6, title: '이번 달 인기 앱', author: '추천자6', timestamp: '2025-05-17 12:10', views: 230, likes: 48 },
        { id: 7, title: '추천 운동 루틴', author: '추천자7', timestamp: '2025-05-16 21:15', views: 265, likes: 57 },
        { id: 8, title: '주말에 볼만한 넷플릭스 시리즈', author: '추천자8', timestamp: '2025-05-16 20:05', views: 295, likes: 64 },
        { id: 9, title: '추천 스마트폰 액세서리', author: '추천자9', timestamp: '2025-05-16 19:50', views: 225, likes: 47 },
        { id: 10, title: '요즘 핫한 유튜브 채널', author: '추천자10', timestamp: '2025-05-16 18:40', views: 255, likes: 55 }
      ]
    };

    setCommunityData(mockData);
  }, []);

  // Function to handle starting a new post
  const handleStartWriting = (boardType) => {
    setCurrentBoard(boardType);
    setIsWriting(true);
  };

  // Function to handle canceling a post
  const handleCancelWriting = () => {
    setIsWriting(false);
    setCurrentBoard('');
  };

  return (
    <div className="content">
      <div className="content-body">
        {isWriting ? (
          <WritePost boardType={currentBoard} onCancel={handleCancelWriting} />
        ) : (
          renderContent(activeMenu, communityData, isLoggedIn, handleStartWriting)
        )}
      </div>
    </div>
  );
}

// 메뉴 ID에 따른 페이지 타이틀 반환
function getPageTitle(menuId) {
  const titles = {
    dashboard: '커뮤니티',
    products: '상품 관리',
    orders: '주문 관리',
    customers: '고객 관리',
    settings: '시스템 설정'
  };
  return titles[menuId] || '';
}

// 커뮤니티 섹션 렌더링 함수
function renderCommunitySection(title, posts, sectionId) {
  // useNavigate 훅을 직접 사용할 수 없으므로 onClick 핸들러를 통해 처리
  const handleMoreClick = (e) => {
    e.preventDefault();

    // 커뮤니티 메뉴를 자동으로 열고 해당 항목으로 이동하는 이벤트 발생
    // 커스텀 이벤트를 통해 Sidebar 컴포넌트와 통신
    const event = new CustomEvent('openCommunityMenu', { 
      detail: { sectionId } 
    });
    document.dispatchEvent(event);

    // URL 변경 (history API 사용)
    window.history.pushState({}, '', `/${sectionId}`);

    // URL 변경 후 라우터에 알리기 위한 이벤트 발생
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div className="community-section">
      <div className="section-header">
        <h3 className="section-title">{title}</h3>
        <a href={`/${sectionId}`} className="more-link" onClick={handleMoreClick}>더보기</a>
      </div>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-item">
            <div className="post-number">{post.id}</div>
            <div className="post-content">
              <div className="post-title">{post.title}</div>
              <div className="post-meta">
                <span className="post-author">{post.author}</span>
                <span className="post-time">{post.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 메뉴 ID에 따른 컨텐츠 렌더링
function renderContent(menuId, communityData, isLoggedIn, onStartWriting) {
  switch(menuId) {
    case 'profile':
      return <UserProfile />;
    case 'change-password':
      return <ChangePassword />;
    case 'dashboard':
      return (
        <div className="dashboard-content">
          <h2 className="page-title">커뮤니티</h2>
          <div className="community-grid">
            {renderCommunitySection('자유게시판', communityData.freeboard, 'freeboard')}
            {renderCommunitySection('벼룩시장', communityData.marketplace, 'marketplace')}
            {renderCommunitySection('갤러리', communityData.gallery, 'gallery')}
            {renderCommunitySection('추천', communityData.recommended, 'recommended')}
          </div>
        </div>
      );
    case 'freeboard':
      return (
        <div className="freeboard-content">
          <div className="freeboard-header">
            <h4 className="freeboard-title">자유게시판</h4>
            {isLoggedIn && (
              <button className="write-button" onClick={() => onStartWriting('freeboard')}>글쓰기</button>
            )}
          </div>
          <div className="freeboard-list">
            <table className="post-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                  <th>등록일</th>
                  <th>조회수</th>
                  <th>좋아요</th>
                </tr>
              </thead>
              <tbody>
                {communityData.freeboard.map((post, index) => (
                  <tr key={post.id} className="post-row">
                    <td>{post.id}</td>
                    <td className="post-title-cell">{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.timestamp}</td>
                    <td>{post.views}</td>
                    <td>{post.likes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'marketplace':
      return (
        <div className="freeboard-content">
          <div className="freeboard-header">
            <h4 className="freeboard-title">벼룩시장</h4>
            {isLoggedIn && (
              <button className="write-button" onClick={() => onStartWriting('marketplace')}>글쓰기</button>
            )}
          </div>
          <div className="freeboard-list">
            <table className="post-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                  <th>등록일</th>
                  <th>조회수</th>
                  <th>좋아요</th>
                </tr>
              </thead>
              <tbody>
                {communityData.marketplace.map((post, index) => (
                  <tr key={post.id} className="post-row">
                    <td>{post.id}</td>
                    <td className="post-title-cell">{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.timestamp}</td>
                    <td>{post.views}</td>
                    <td>{post.likes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'gallery':
      return (
        <div className="freeboard-content">
          <div className="freeboard-header">
            <h4 className="freeboard-title">갤러리</h4>
            {isLoggedIn && (
              <button className="write-button" onClick={() => onStartWriting('gallery')}>글쓰기</button>
            )}
          </div>
          <div className="freeboard-list">
            <table className="post-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                  <th>등록일</th>
                  <th>조회수</th>
                  <th>좋아요</th>
                </tr>
              </thead>
              <tbody>
                {communityData.gallery.map((post, index) => (
                  <tr key={post.id} className="post-row">
                    <td>{post.id}</td>
                    <td className="post-title-cell">{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.timestamp}</td>
                    <td>{post.views}</td>
                    <td>{post.likes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'recommended':
      return (
        <div className="freeboard-content">
          <div className="freeboard-header">
            <h4 className="freeboard-title">추천</h4>
            {isLoggedIn && (
              <button className="write-button" onClick={() => onStartWriting('recommended')}>글쓰기</button>
            )}
          </div>
          <div className="freeboard-list">
            <table className="post-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                  <th>등록일</th>
                  <th>조회수</th>
                  <th>좋아요</th>
                </tr>
              </thead>
              <tbody>
                {communityData.recommended.map((post, index) => (
                  <tr key={post.id} className="post-row">
                    <td>{post.id}</td>
                    <td className="post-title-cell">{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.timestamp}</td>
                    <td>{post.views}</td>
                    <td>{post.likes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'products':
      return <div>상품 관리 컨텐츠</div>;
    case 'orders':
      return <div>주문 관리 컨텐츠</div>;
    case 'customers':
      return <div>고객 관리 컨텐츠</div>;
    case 'settings':
      return <div>설정 컨텐츠</div>;
    default:
      return <div>선택해주세요</div>;
  }
}

export default Content;
