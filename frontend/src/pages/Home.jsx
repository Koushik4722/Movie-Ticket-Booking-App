import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const url = keyword 
          ? `/api/movies?keyword=${keyword}` 
          : '/api/movies';
        const { data } = await api.get(url);
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };
    fetchMovies();
  }, [keyword]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      {!keyword && (
        <div className="bg-primary rounded-xl p-8 mb-12 text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Welcome to <span className="text-secondary">booking.com</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Book tickets for the latest movies in your favorite theaters.
            </p>
          </div>
        </div>
      )}

      {/* Movies Section */}
      <h2 className="text-2xl font-bold mb-6 border-l-4 border-secondary pl-3 text-primary">
        {keyword ? `Search Results for "${keyword}"` : 'Recommended Movies'}
      </h2>
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center text-text-muted my-12">No movies found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link to={`/movies/${movie._id}`} key={movie._id} className="group">
              <div className="bg-surface rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform group-hover:-translate-y-1 duration-300 border border-gray-200">
                <img src={movie.poster} alt={movie.title} className="w-full h-auto aspect-[2/3] object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate text-primary" title={movie.title}>{movie.title}</h3>
                  <p className="text-sm text-text-muted truncate">{movie.genre.join(', ')}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
