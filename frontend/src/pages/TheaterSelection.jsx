import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { MapPin } from 'lucide-react';

const TheaterSelection = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [showsRes, movieRes] = await Promise.all([
          api.get(`/api/shows?movieId=${movieId}`),
          api.get(`/api/movies/${movieId}`)
        ]);
        
        // Group shows by theater
        const groupedShows = showsRes.data.reduce((acc, show) => {
          const tId = show.theaterId._id;
          if (!acc[tId]) {
            acc[tId] = {
              theater: show.theaterId,
              shows: []
            };
          }
          acc[tId].shows.push(show);
          return acc;
        }, {});

        setShows(Object.values(groupedShows));
        setMovie(movieRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex justify-center my-24">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold">{movie?.title} - Select Theater & Show</h1>
      </div>

      {shows.length === 0 ? (
        <div className="text-center text-text-muted mt-10">No shows available for this movie currently.</div>
      ) : (
        <div className="space-y-6">
          {shows.map((item) => (
            <div key={item.theater._id} className="bg-surface shadow-md border border-gray-200 p-6 rounded-xl shadow-lg flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{item.theater.theaterName}</h3>
                <p className="text-text-muted flex items-center gap-1">
                  <MapPin size={16} /> {item.theater.location}, {item.theater.city}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 flex-1 justify-start md:justify-end">
                {item.shows.map(show => (
                  <button 
                    key={show._id}
                    onClick={() => navigate(`/seat-selection/${show._id}`)}
                    className="border border-primary text-primary hover:bg-primary hover:text-text-dark px-4 py-2 rounded font-semibold transition-colors"
                  >
                    {new Date(show.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TheaterSelection;
