import React, { useState } from 'react';
import './Register.css';

function Register({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 간단한 유효성 검사
    if (!name || !email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    // 여기에 회원가입 로직 추가 (API 호출 등)
    console.log('회원가입 시도:', { name, email, password });
    
    // 성공 시 처리 (예: 로그인 페이지로 리다이렉트)
    alert('회원가입 성공!');
    if (onSwitchToLogin) onSwitchToLogin();
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-title">회원가입</div>
        {error && <div className="register-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
              required
            />
          </div>
          
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
          
          <div className="input-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 다시 입력"
              required
            />
          </div>
          
          <button type="submit" className="register-btn">회원가입</button>
        </form>
        
        <div className="register-links">
          <a href="#" onClick={onSwitchToLogin}>이미 계정이 있으신가요? 로그인</a>
        </div>
      </div>
    </div>
  );
}

export default Register;