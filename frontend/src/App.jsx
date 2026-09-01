import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';

function Home() {
  const [status, setStatus] = useState('Checking...');

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then((res) => res.json())
      .then((data) => setStatus(`${data.status} — database: ${data.database}`))
      .catch(() => setStatus('Backend unreachable'));
  }, []);

  const token = localStorage.getItem('token');

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Food Freshness Monitoring Platform</h1>
      <p>Backend says: <strong>{status}</strong></p>
      {token ? (
        <p>You are logged in. <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>Logout</button></p>
      ) : (
        <p><Link to="/login">Login</Link> or <Link to="/register">Register</Link></p>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;