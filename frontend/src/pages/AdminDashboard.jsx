import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
    api.get('/api/movies').then(({ data }) => setMovies(data));
  }, [user, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-300 pb-4 text-primary">Admin Dashboard</h1>
      
      <div className="bg-surface p-6 rounded-xl shadow-md border border-gray-200 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-dark">Manage Movies</h2>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-900">Add New Movie</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="p-4 rounded-tl">ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Release Date</th>
                <th className="p-4 rounded-tr">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm text-text-muted">{movie._id.substring(0, 8)}...</td>
                  <td className="p-4 font-semibold text-text-dark">{movie.title}</td>
                  <td className="p-4 text-text-muted">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button className="text-blue-500 hover:text-blue-700 mr-4 font-medium">Edit</button>
                    <button className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
