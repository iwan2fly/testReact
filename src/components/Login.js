import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onSwitchToRegister, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // SNS 로그인 핸들러 추가
  const handleSnsLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
    // 여기에 각 SNS 로그인 로직 구현
    // 예: OAuth 리다이렉션 또는 팝업 창 열기
    switch(provider) {
      case 'google':
        // 구글 로그인 로직
        window.location.href = 'http://localhost:8080/api/auth/google';
        break;
      case 'naver':
        // 네이버 로그인 로직
        window.location.href = 'http://localhost:8080/api/auth/naver';
        break;
      case 'kakao':
        // 카카오 로그인 로직
        window.location.href = 'http://localhost:8080/api/auth/kakao';
        break;
      default:
        break;
    }
  };

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 로그인 API 호출
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.log('로그인 실패:', data);
        throw new Error(data.message || '로그인 중 오류가 발생했습니다.');
      }

      // 성공 시 처리
      console.log('로그인 성공:', data);

      // 토큰이 있다면 로컬 스토리지에 저장
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // 로그인 성공 처리
      onLogin();
      navigate('/dashboard');
    } catch (error) {
      console.error('로그인 오류:', error);
      setError(error.message || '로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    onSwitchToRegister();
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">로그인</h1>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input 
              type="email" 
              id="email"
              placeholder="이메일 주소" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input 
              type="password" 
              id="password"
              placeholder="비밀번호" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? '처리 중...' : '로그인'}
          </button>
        </form>

        {/* 회원가입 링크로 변경 */}
        <div className="login-links">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleRegisterClick(); }}
            style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
          >
            계정이 없으신가요? 회원가입
          </a>
        </div>

        {/* SNS 로그인 버튼 추가 */}
        <div className="sns-login-container">
          <div className="sns-login-divider">
            <span>또는</span>
          </div>
          <div className="sns-login-buttons">
            <button 
              className="sns-btn google-btn" 
              onClick={() => handleSnsLogin('google')} 
              disabled={isLoading}
            >
              Google로 계속하기
            </button>
            <button 
              className="sns-btn naver-btn" 
              onClick={() => handleSnsLogin('naver')} 
              disabled={isLoading}
            >
              네이버로 계속하기
            </button>
            <button 
              className="sns-btn kakao-btn" 
              onClick={() => handleSnsLogin('kakao')} 
              disabled={isLoading}
            >
              카카오로 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
