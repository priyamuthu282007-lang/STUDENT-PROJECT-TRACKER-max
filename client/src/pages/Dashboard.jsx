import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects').then(res => setProjects(res.data));
    // ellam task edukkalam - simple ku
  }, []);

  const totalTasks = 12; // example, API la irunthu varum
  const completedTasks = 8;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Project Dashboard</h1>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: '#673AB7', color: 'white', padding: '20px', borderRadius: '10px', flex: 1 }}>
          <h2>{projects.length}</h2>
          <p>Total Projects</p>
        </div>
        <div style={{ background: '#009688', color: 'white', padding: '20px', borderRadius: '10px', flex: 1 }}>
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>
        <div style={{ background: '#E91E63', color: 'white', padding: '20px', borderRadius: '10px', flex: 1 }}>
          <h2>{progress}%</h2>
          <p>Overall Progress</p>
        </div>
      </div>

      <div style={{ background: '#eee', height: '25px', borderRadius: '10px', marginBottom: '20px' }}>
        <div style={{ width: `${progress}%`, background: '#4CAF50', height: '25px', borderRadius: '10px', textAlign: 'center', color: 'white' }}>{progress}%</div>
      </div>

      <h3>Recent Projects</h3>
      {projects.map(p => (
        <div key={p._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
          <b>{p.title}</b> - {p.status} <br />
          Team: {p.teamMembers?.join(', ')}
        </div>
      ))}
    </div>
  );
}