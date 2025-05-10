import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용
  
  const handleSubmit = async (e) => {
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
    
    // 회원가입 API 호출
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      console.log( response );
      
      const body = await response.json();
      
      if (!response.ok) {
        console.log('회원가입 실패패:', body);
        console.log( body.data.message );
        throw new Error( body.data.message || '회원가입 중 오류가 발생했습니다.');
      }
      
      // 성공 시 처리
      console.log('회원가입 성공:', body);
      alert('회원가입이 성공적으로 완료되었습니다!');
      
      // onSwitchToLogin 디버깅
      console.log('onSwitchToLogin 함수 존재 여부:', !!onSwitchToLogin);

      // 로그인 페이지로 이동
      if (onSwitchToLogin) {
        console.log('onSwitchToLogin 함수 호출');
        onSwitchToLogin();
      } else {
        console.log('onSwitchToLogin 함수가 없어 navigate 사용');
        // navigate('/login'); // useNavigate 사용 시
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      setError(error.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (onSwitchToLogin) {
      onSwitchToLogin();
    }
    navigate('/login'); // 로그인 페이지로 이동
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
          
          <button type="submit" className="register-btn" disabled={isLoading}>
            {isLoading ? '처리 중...' : '회원가입'}
          </button>
        </form>
        
        <div className="register-links">
          <a href="#" onClick={handleLoginClick} style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
            이미 계정이 있으신가요? 로그인
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;