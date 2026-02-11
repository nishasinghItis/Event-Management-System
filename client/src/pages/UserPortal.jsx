import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserPortal = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">User Portal</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/user/products" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Products</h3>
            <p className="text-gray-600">Browse available products</p>
          </Link>
          
          <Link to="/user/cart" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Cart</h3>
            <p className="text-gray-600">View your shopping cart</p>
          </Link>
          
          <Link to="/user/orders" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Orders</h3>
            <p className="text-gray-600">Track your orders</p>
          </Link>
          
          <Link to="/user/membership" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Membership</h3>
            <p className="text-gray-600">Manage your membership</p>
          </Link>
          
          <Link to="/user/reports" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Reports</h3>
            <p className="text-gray-600">View system reports</p>
          </Link>
          
          <Link to="/user/transactions" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Transactions</h3>
            <p className="text-gray-600">View your transactions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPortal;
