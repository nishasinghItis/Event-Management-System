import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'vendor') navigate('/vendor/dashboard');
      else if (user.role === 'user') navigate('/user/portal');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Welcome to ProJEMS</h1>
          <p className="text-xl text-gray-700">Professional Event Management System</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Admin</h2>
            <p className="text-gray-600 mb-6">Manage users, vendors, and system settings</p>
            <div className="space-y-3">
              <Link to="/admin/login" className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center">
                Login
              </Link>
              <Link to="/admin/signup" className="block w-full bg-blue-100 text-blue-600 py-2 rounded hover:bg-blue-200 text-center">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Vendor</h2>
            <p className="text-gray-600 mb-6">Manage your products and orders</p>
            <div className="space-y-3">
              <Link to="/vendor/login" className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center">
                Login
              </Link>
              <Link to="/vendor/signup" className="block w-full bg-blue-100 text-blue-600 py-2 rounded hover:bg-blue-200 text-center">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">User</h2>
            <p className="text-gray-600 mb-6">Browse products and place orders</p>
            <div className="space-y-3">
              <Link to="/user/login" className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-center">
                Login
              </Link>
              <Link to="/user/signup" className="block w-full bg-blue-100 text-blue-600 py-2 rounded hover:bg-blue-200 text-center">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/flowchart" className="text-blue-600 hover:underline text-lg">
            View System Flowchart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
