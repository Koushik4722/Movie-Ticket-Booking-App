import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Film, Search, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?keyword=${searchQuery}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-primary p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center text-white">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <Film size={32} className="text-secondary" />
          <span>booking.com</span>
        </Link>
        
        <form onSubmit={handleSearch} className="hidden md:flex relative flex-1 max-w-md mx-8">
          <input 
            type="text" 
            placeholder="Search for movies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-4 pr-10 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-primary">
            <Search size={20} />
          </button>
        </form>

        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:text-secondary transition-colors font-semibold">Movies</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              {user.isAdmin && (
                <Link to="/admin" className="hover:text-secondary transition-colors font-semibold">Admin</Link>
              )}
              <Link to="/profile" className="flex items-center gap-1 hover:text-secondary transition-colors font-semibold">
                <User size={20} />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={() => { logout(); navigate('/'); }} 
                className="flex items-center gap-1 hover:text-secondary transition-colors font-semibold"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-secondary transition-colors font-semibold">Login</Link>
              <Link to="/register" className="bg-white text-primary font-bold px-4 py-2 rounded hover:bg-gray-100 transition-colors">Sign Up</Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="md:hidden mt-4 relative w-full">
        <input 
          type="text" 
          placeholder="Search for movies..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 pl-4 pr-10 rounded-full text-gray-900 focus:outline-none"
        />
        <button type="submit" className="absolute right-3 top-2.5 text-gray-500">
          <Search size={20} />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
