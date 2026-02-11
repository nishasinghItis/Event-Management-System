import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-12 max-w-2xl mx-auto text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">Thank you for your order. You can track your order status in the orders section.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/user/orders" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              View Orders
            </Link>
            <Link to="/user/products" className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
