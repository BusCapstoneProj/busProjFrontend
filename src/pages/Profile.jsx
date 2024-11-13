import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Profile() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        
          setUserRole(sessionStorage.getItem("roles"));
        }
       catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    if (token) {
      fetchUserRole();
    }
  }, [token]);

  const getRoleIcon = (role) => {
    
    switch(role) {
      case 'ADMIN':
        return '👑';
      case 'OPERATOR':
        return '🚌';
      case 'PASSENGER':
        return '🎫';
      default:
        return '👤';
    }
  };

  return (
    <Card>
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">{getRoleIcon(userRole)}</div>
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Your Profile</h2>
        <p className="text-gray-600">Manage your account details</p>
      </div>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-2">
            <span className="font-semibold text-blue-900">Email:</span>
            <span className="ml-2">{email}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-blue-900">Role:</span>
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
              {userRole}
            </span>
          </p>
        </div>
        <div className="pt-4">
          <Button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('email');
              navigate('/');
              toast.success('Logged out successfully');
            }}
            fullWidth
            variant="secondary"
          >
            Logout
          </Button>
        </div>
      </div>
    </Card>
  );
}