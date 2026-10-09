import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert(`Welcome ${res.data.user.name}`);
      navigate('/');
    }catch(err){
      alert(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="Email" type="email" required onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Password" type="password" required onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit" style={{ padding: '10px', background: 'black', color: 'white' }}>Login</button>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}