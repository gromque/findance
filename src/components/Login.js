import React, { useState } from 'react';
import { Lock, User, DollarSign } from 'lucide-react';

export default function Component() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful!');
    }, 2000);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '300px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <DollarSign size={32} color="#4CAF50" />
          <h1 style={{ marginLeft: '10px', color: '#333', fontSize: '24px' }}>findance</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <User size={20} style={{ position: 'absolute', left: '10px', top: '10px', color: '#666' }} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', left: '10px', top: '10px', color: '#666' }} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a href="#" style={{ color: '#4CAF50', textDecoration: 'none' }}>Forgot password?</a>
        </div>
      </div>
    </div>
  );
}