import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Ticket, Trash2, User, Mail, Calendar, MapPin } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get('http://localhost:5001/api/bookings/mybookings', config);
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleCancelBooking = async (bookingId, totalAmount) => {
    const charge = (totalAmount * 0.20).toFixed(2);
    if (window.confirm(`Are you sure you want to cancel? A 20% cancellation charge of ₹${charge} applies.`)) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.delete(`http://localhost:5001/api/bookings/${bookingId}`, config);
        alert(`Booking cancelled successfully!\nRefund Amount: ₹${data.refundAmount.toFixed(2)}\nCancellation Charge (20%): ₹${data.cancellationCharge.toFixed(2)}`);
        fetchBookings();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  if (loading) return <div className="text-center mt-20 text-primary font-bold text-xl animate-pulse">Loading profile data...</div>;

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="bg-surface border-2 border-gray-100 p-10 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 bg-primary text-white rounded-2xl flex items-center justify-center text-5xl font-black shadow-2xl transform -rotate-3">
                {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left flex-1">
                <h2 className="text-5xl font-black mb-4 text-primary tracking-tight">{user?.name}</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-text-muted font-bold uppercase tracking-widest text-sm">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                        <Mail size={16} className="text-primary" />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                        <User size={16} className="text-primary" />
                        <span>{user?.isAdmin ? 'Administrator' : 'Verified Member'}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-10 pb-4 border-b-4 border-primary/10">
        <h3 className="text-3xl font-black flex items-center gap-4 text-primary tracking-tight">
            <div className="bg-primary p-2 rounded-lg text-white shadow-lg">
                <Ticket size={28} />
            </div>
            Booking History
        </h3>
        <div className="bg-gray-100 px-4 py-1 rounded-full text-xs font-black text-text-muted uppercase tracking-tighter">
            {bookings.length} Orders
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-surface p-16 rounded-3xl text-center border-4 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ticket className="text-gray-300" size={40} />
            </div>
            <p className="text-text-muted text-xl font-bold mb-6">No active bookings found.</p>
            <button onClick={() => window.location.href = '/'} className="bg-primary text-white px-8 py-3 rounded-xl font-black shadow-lg hover:shadow-2xl transition-all active:scale-95">
                DISCOVER MOVIES
            </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-surface rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row overflow-hidden border border-gray-100 group">
              <div className="md:w-64 relative overflow-hidden">
                <img src={booking.movieId?.poster} alt={booking.movieId?.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Confirmed
                </div>
              </div>
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-3xl font-black text-primary leading-tight tracking-tight">{booking.movieId?.title}</h4>
                        <button 
                            onClick={() => handleCancelBooking(booking._id, booking.totalAmount)}
                            className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center gap-2 text-xs font-black px-5 py-3 rounded-xl transition-all shadow-sm active:scale-95 uppercase tracking-widest"
                        >
                            <Trash2 size={16} /> Cancel
                        </button>
                    </div>
                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-text-dark font-bold text-lg">
                            <MapPin size={20} className="text-primary" />
                            <span>{booking.theaterId?.theaterName}, {booking.theaterId?.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-text-muted font-semibold">
                            <Calendar size={20} className="text-primary" />
                            <span>{new Date(booking.showId?.showTime).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                        <span className="text-[10px] text-text-muted font-black uppercase tracking-widest block mb-1">Seats</span>
                        <span className="font-black text-lg text-primary">{booking.seats.join(', ')}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                        <span className="text-[10px] text-text-muted font-black uppercase tracking-widest block mb-1">Total Paid</span>
                        <span className="font-black text-lg text-green-600">₹{booking.totalAmount}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center col-span-2 md:col-span-1">
                        <span className="text-[10px] text-text-muted font-black uppercase tracking-widest block mb-1">Order ID</span>
                        <span className="font-mono text-sm font-bold text-gray-500">{booking._id.substring(0, 10).toUpperCase()}</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
