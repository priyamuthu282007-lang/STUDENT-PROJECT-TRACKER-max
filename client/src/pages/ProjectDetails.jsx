import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

export default function ProjectDetails() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    axios.get(`http://localhost:5000/api/tasks/${id}`).then(res => setTasks(res.data));
  };

  useEffect(() => { loadTasks(); }, [id]);

  const completed = tasks.filter(t => t.status === 'Completed').length;
  const progress = tasks.length? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div>
      <h2>Project Tasks</h2>
      <h3>Progress: {progress}% ({completed}/{tasks.length})</h3>
      <div style={{ background: '#eee', height: '20px', borderRadius: '10px' }}>
        <div style={{ width: `${progress}%`, background: 'green', height: '20px', borderRadius: '10px' }}></div>
      </div>

      <TaskForm projectId={id} refresh={loadTasks} />
      <hr />
      {tasks.map(t => <TaskCard key={t._id} task={t} refresh={loadTasks} />)}
    </div>
  );
}