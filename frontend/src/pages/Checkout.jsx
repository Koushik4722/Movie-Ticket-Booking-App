import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!location.state) {
    navigate('/');
    return null;
  }

  const { show, selectedSeats, totalAmount } = location.state;
  const convenienceFee = selectedSeats.length * 20;
  const grandTotal = totalAmount + convenienceFee;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await api.post('/api/bookings', {
        movieId: show.movieId._id,
        theaterId: show.theaterId._id,
        showId: show._id,
        seats: selectedSeats,
        totalAmount: grandTotal
      }, config);

      setSuccess(true);
      setTimeout(() => navigate('/profile'), 3000);
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-24 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle size={56} className="text-green-500" />
        </div>
        <h2 className="text-5xl font-black mb-4 text-primary tracking-tight">Booking Confirmed!</h2>
        <p className="text-text-muted text-xl mb-12 font-medium">Get ready for an amazing cinematic experience.</p>
        <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-text-muted font-bold uppercase tracking-widest mt-4">Navigating to your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <h1 className="text-4xl font-black mb-10 text-primary tracking-tight">Review & Pay</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-surface p-10 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex gap-8 mb-8 pb-8 border-b border-gray-100">
                    <img src={show.movieId.poster} alt={show.movieId.title} className="w-32 h-48 object-cover rounded-xl shadow-lg" />
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-black mb-2 text-primary leading-tight">{show.movieId.title}</h2>
                                <p className="text-text-dark font-bold text-xl mb-2">{show.theaterId.theaterName}</p>
                                <p className="text-text-muted font-semibold text-lg">{new Date(show.showTime).toLocaleString()}</p>
                            </div>
                            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                                <span className="text-primary font-bold text-sm uppercase tracking-wider">Confirmed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-text-dark bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                        <ShieldCheck className="text-primary" size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-text-muted font-bold uppercase tracking-wider">Selected Seats</p>
                        <p className="font-black text-2xl tracking-wide">{selectedSeats.join(', ')}</p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-1">Secure Checkout</h3>
                    <p className="text-blue-200 text-sm">Your payment information is encrypted and secure.</p>
                </div>
                <div className="hidden md:block">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 opacity-80" />
                </div>
            </div>
        </div>

        <div className="lg:col-span-1">
            <div className="bg-surface p-8 rounded-2xl shadow-2xl border border-gray-100 sticky top-32">
                <h3 className="text-2xl font-black mb-8 pb-4 border-b border-gray-100 text-primary">Payment Details</h3>
                
                <div className="space-y-5 mb-10">
                    <div className="flex justify-between text-text-dark items-center">
                        <span className="text-text-muted font-bold text-sm uppercase">Base Price</span>
                        <span className="font-extrabold text-lg">₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-text-dark items-center">
                        <span className="text-text-muted font-bold text-sm uppercase">Convenience Fee</span>
                        <span className="font-extrabold text-lg">₹{convenienceFee}</span>
                    </div>
                    <div className="pt-6 border-t-2 border-dashed border-gray-100">
                        <div className="flex justify-between font-black text-3xl items-center">
                            <span className="text-primary">Total</span>
                            <span className="text-primary">₹{grandTotal}</span>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-primary text-white font-black py-5 rounded-xl hover:bg-blue-950 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:transform-none"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-3">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>PROCESSING...</span>
                        </div>
                    ) : `MAKE PAYMENT`}
                </button>
                
                <p className="text-center text-xs text-text-muted mt-6 font-bold uppercase tracking-widest leading-relaxed">
                    By clicking pay, you agree to our <br/>Terms & Conditions
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
