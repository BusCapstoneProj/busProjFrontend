import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="bg-black shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-yellow-400 p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 20c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1m-4 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1m-4 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1m12-4H3V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10M3 16h18v2c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-2m15-7c0-.55-.45-1-1-1h-7c-.55 0-1 .45-1 1s.45 1 1 1h7c.55 0 1-.45 1-1m0-3c0-.55-.45-1-1-1h-7c-.55 0-1 .45-1 1s.45 1 1 1h7c.55 0 1-.45 1-1"/>
              </svg>
            </div>
            <div>
              <span className="text-2xl font-bold text-white tracking-wider">BusHub</span>
              <span className="text-blue-400 text-sm block">Management System</span>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            {!token ? (
              <>
                <Link to="/login" className="text-white hover:text-yellow-400 transition-colors font-medium">
                  Login
                </Link>
                <div className="flex space-x-2">
                  <Link to="/register" className="text-white hover:text-yellow-400 transition-colors font-medium">
                    Register as Passenger
                  </Link>
                 {/* <span className="text-gray-400">|</span>
                  <Link to="/operator/register" className="text-white hover:text-yellow-400 transition-colors font-medium">
                    Bus Operator
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link to="/admin/register" className="text-white hover:text-yellow-400 transition-colors font-medium">
                    Admin
                  </Link>  */}
                </div>
              </>
            ) : (
              <>
                <Link to="/profile" className="text-white hover:text-yellow-400 transition-colors font-medium">
                  Profile
                </Link>
                <Button onClick={handleLogout} variant="secondary">Logout</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;