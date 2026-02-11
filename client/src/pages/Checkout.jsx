import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import Navbar from '../components/Navbar';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!shippingAddress) {
      setError('Shipping address is required');
      return;
    }

    try {
      await orderAPI.createOrder({ paymentMethod, shippingAddress });
      navigate('/user/success');
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Checkout</h1>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}

        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Shipping Address *</label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-3">Payment Method *</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    checked={paymentMethod === 'Cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>UPI Payment</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                Place Order
              </button>
              <button type="button" onClick={() => navigate('/user/cart')} className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
