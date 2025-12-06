import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError('Invalid username or password');
        return;
      }

      const data = await res.json();
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      localStorage.setItem('mailId', data.mailId || '');
      onLogin(data.username, data.role, data.mailId || '');
    } catch (err) {
      setError('Login failed. Check server connection.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '16px',
    boxSizing: 'border-box',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  };

  const formStyle = {
    minWidth: '320px',
    maxWidth: '450px',
    width: '100%',
    padding: '40px 30px',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
    textAlign: 'center',
    background: 'white',
  };

  const titleStyle = {
    margin: '0 0 8px 0',
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
  };

  const subtitleStyle = {
    margin: '0 0 30px 0',
    fontSize: '14px',
    color: '#999',
    fontWeight: '500',
  };

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '8px',
    marginBottom: '20px',
    textAlign: 'left',
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '6px',
  };

  const inputStyle = {
    padding: '12px 14px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '10px',
    transition: 'all 0.3s ease',
  };

  const errorStyle = {
    color: '#dc2626',
    marginTop: '16px',
    padding: '12px',
    background: '#fee2e2',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    border: '1px solid #fecaca',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle} className="login-form">
        <h2 style={titleStyle}>Welcome</h2>
        <p style={subtitleStyle}>Sign in to your account</p>
        <div style={fieldStyle}>
          <label style={labelStyle}>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
            placeholder="Enter your username"
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Sign In
        </button>
        {error && <div style={errorStyle}>{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
