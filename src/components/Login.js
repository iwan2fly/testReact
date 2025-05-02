import React, { useState } from 'react';
import './Login.css';

function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 간단한 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    // 여기에 로그인 로직 추가 (API 호출 등)
    console.log('로그인 시도:', { email, password });
    
    // 성공 시 처리 (예: 홈 페이지로 리다이렉트)
    alert('로그인 성공!');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-title">로그인</div>
        {error && <div className="login-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소 입력"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              required
            />
          </div>
          
          <button type="submit" className="login-btn">로그인</button>
        </form>
        
        <div className="login-links">
          <a href="#" onClick={onSwitchToRegister}>계정이 없으신가요? 회원가입</a>
          <a href="#">비밀번호를 잊으셨나요?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;