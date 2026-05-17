import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Clock, Calendar, Globe } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await api.get(`/api/movies/${id}`);
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center my-24">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!movie) return <div className="text-center mt-20 text-xl">Movie not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Background banner */}
      <div 
        className="w-full h-64 md:h-96 rounded-xl bg-cover bg-center relative shadow-2xl mb-8"
        style={{ backgroundImage: `url(${movie.poster})`, backgroundPosition: 'center 20%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent rounded-xl"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 -mt-32 relative z-10">
        <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0 shadow-2xl rounded-lg overflow-hidden border-4 border-secondary">
          <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover" />
        </div>
        
        <div className="flex-1 mt-4 md:mt-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          <div className="flex flex-wrap gap-4 text-text-muted mb-6">
            <span className="flex items-center gap-1"><Clock size={18} /> {movie.runtime} min</span>
            <span className="flex items-center gap-1"><Calendar size={18} /> {new Date(movie.releaseDate).toLocaleDateString()}</span>
            <span className="flex items-center gap-1"><Globe size={18} /> {movie.language.join(', ')}</span>
          </div>
          
          <div className="flex gap-2 mb-6">
            {movie.genre.map(g => (
              <span key={g} className="px-3 py-1 bg-surface shadow-md border border-gray-200 text-text-dark rounded-full text-sm border border-gray-300">
                {g}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
          <p className="text-text-muted leading-relaxed mb-8 max-w-3xl">
            {movie.description}
          </p>

          <button 
            onClick={() => navigate(`/book/${movie._id}`)}
            className="bg-primary text-white text-lg font-bold px-8 py-3 rounded hover:bg-red-700 transition-colors shadow-lg"
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
