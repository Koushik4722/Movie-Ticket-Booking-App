import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-surface shadow-md border border-gray-200 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-text-dark">Login</h2>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-text-muted mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-100 text-text-dark border border-gray-300 focus:border-primary focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-text-muted mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-100 text-text-dark border border-gray-300 focus:border-primary focus:outline-none"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-red-700 transition-colors">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-text-muted">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
