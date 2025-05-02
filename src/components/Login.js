import React, { useState } from 'react';
import './Login.css';

function Login({ onSwitchToRegister, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 로그인 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 간단한 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    // 실제 구현에서는 여기서 인증 로직을 처리합니다
    setError('');
    onLogin(); // 로그인 성공 시 호출
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
            />
          </div>
          
          <button type="submit" className="login-btn">
            로그인
          </button>
        </form>
        
        <div className="login-links">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            onSwitchToRegister();
          }}>
            계정이 없으신가요? 회원가입
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            비밀번호를 잊으셨나요?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;