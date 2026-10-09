import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Register Successful! Login pannu');
      navigate('/login');
    }catch(err){
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <h2>Register - IT B Project</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="Full Name" required onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" type="email" required onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Password" type="password" required onChange={e => setForm({...form, password: e.target.value})} />
        <input placeholder="Department - ex: IT" onChange={e => setForm({...form, department: e.target.value})} />
        <button type="submit" style={{ padding: '10px', background: 'black', color: 'white' }}>Register</button>
      </form>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}

