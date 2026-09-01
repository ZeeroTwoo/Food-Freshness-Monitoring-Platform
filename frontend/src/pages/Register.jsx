import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    email: '', password: '', full_name: '', role: 'consumer'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Registration failed');
      }
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="full_name" placeholder="Full Name" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <select name="role" onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}>
          <option value="consumer">Consumer</option>
          <option value="retail_manager">Retail Manager</option>
          <option value="warehouse_operator">Warehouse Operator</option>
          <option value="food_quality_inspector">Food Quality Inspector</option>
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" style={{ padding: '8px 16px' }}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Register;