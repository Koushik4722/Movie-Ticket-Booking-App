import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001');

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/shows/${showId}`);
        setShow(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching show:', error);
        setLoading(false);
      }
    };
    fetchShow();

    socket.on('seatLocked', (data) => {
      if (data.showId === showId) {
        setLockedSeats(prev => [...new Set([...prev, ...data.seats])]);
      }
    });

    return () => { socket.off('seatLocked'); };
  }, [showId]);

  const handleSeatClick = (seatId) => {
    if (show?.bookedSeats?.includes(seatId) || lockedSeats.includes(seatId)) return;

    const newSelected = selectedSeats.includes(seatId)
      ? selectedSeats.filter(s => s !== seatId)
      : [...selectedSeats, seatId];
    
    setSelectedSeats(newSelected);
    socket.emit('lockSeat', { showId, seats: newSelected });
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return;
    navigate('/checkout', { state: { show, selectedSeats, totalAmount: selectedSeats.length * show.price } });
  };

  if (loading) return <div className="text-center mt-20 text-text-dark font-semibold">Loading seats...</div>;
  if (!show) return <div className="text-center mt-20 text-text-dark font-semibold">Show not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary">{show.movieId.title}</h2>
        <p className="text-text-muted mt-2 text-lg">{show.theaterId.theaterName} | {new Date(show.showTime).toLocaleString()}</p>
      </div>

      <div className="bg-surface p-12 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
        <div className="min-w-max">
          <div className="w-3/4 mx-auto h-3 bg-gradient-to-b from-gray-400 to-transparent mb-16 relative rounded-full">
            <div className="absolute w-full text-center top-6 text-gray-400 text-sm font-bold tracking-[0.5em]">SCREEN THIS WAY</div>
          </div>

          <div className="flex flex-col gap-5 items-center">
            {rows.map(row => (
              <div key={row} className="flex gap-4 items-center">
                <span className="w-6 font-bold text-gray-400 text-center">{row}</span>
                <div className="flex gap-2">
                  {cols.map(col => {
                    const seatId = `${row}${col}`;
                    const isBooked = show.bookedSeats?.includes(seatId);
                    const isLocked = lockedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    const mr = col === 5 ? 'mr-10' : '';

                    let seatClass = `w-8 h-8 rounded-t-xl rounded-b-sm border-2 ${mr} transition-all duration-200 transform `;
                    if (isBooked || isLocked) {
                        seatClass += 'bg-gray-300 border-gray-300 cursor-not-allowed';
                    } else if (isSelected) {
                        seatClass += 'bg-primary border-primary cursor-pointer scale-110 shadow-md';
                    } else {
                        seatClass += 'bg-transparent border-gray-300 hover:border-primary hover:bg-blue-50 cursor-pointer hover:scale-105';
                    }

                    return (
                      <div 
                        key={seatId} 
                        className={seatClass} 
                        onClick={() => handleSeatClick(seatId)} 
                        title={seatId} 
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-12 mt-16 pt-10 border-t border-gray-200 text-sm font-semibold text-text-dark">
          <div className="flex items-center gap-3"><div className="w-6 h-6 border-2 border-gray-300 rounded-t-lg" /><span>Available</span></div>
          <div className="flex items-center gap-3"><div className="w-6 h-6 bg-primary border-2 border-primary rounded-t-lg shadow-sm" /><span>Selected</span></div>
          <div className="flex items-center gap-3"><div className="w-6 h-6 bg-gray-300 border-2 border-gray-300 rounded-t-lg" /><span>Sold</span></div>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary p-6 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] z-50 animate-in slide-in-from-bottom duration-300">
          <div className="container mx-auto flex justify-between items-center px-4 max-w-4xl">
            <div>
              <p className="text-sm text-text-muted font-bold uppercase tracking-wider">Your Selection</p>
              <p className="font-extrabold text-2xl text-text-dark">{selectedSeats.join(', ')}</p>
            </div>
            <div className="flex items-center gap-10">
              <div className="text-right">
                <p className="text-sm text-text-muted font-bold uppercase tracking-wider">Subtotal</p>
                <p className="font-extrabold text-3xl text-primary">₹{selectedSeats.length * show.price}</p>
              </div>
              <button 
                onClick={handleCheckout} 
                className="bg-primary text-white px-10 py-4 rounded-lg hover:bg-blue-900 font-black text-lg transition-all hover:shadow-xl active:scale-95"
              >
                BOOK TICKETS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
