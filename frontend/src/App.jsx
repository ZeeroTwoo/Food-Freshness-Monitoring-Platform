import { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState('Checking...');

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then((res) => res.json())
      .then((data) => setStatus(`${data.status} — database: ${data.database}`))
      .catch(() => setStatus('Backend unreachable'));
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Food Freshness Monitoring Platform</h1>
      <p>Backend says: <strong>{status}</strong></p>
    </div>
  );
}

export default App;