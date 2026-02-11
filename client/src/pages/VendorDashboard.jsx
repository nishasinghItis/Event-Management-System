import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Vendor Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/vendor/products" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Your Items</h3>
            <p className="text-gray-600">View and manage your products</p>
          </Link>
          
          <Link to="/vendor/add-product" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Add New Item</h3>
            <p className="text-gray-600">Create a new product</p>
          </Link>
          
          <Link to="/vendor/orders" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Orders</h3>
            <p className="text-gray-600">View and update order status</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
