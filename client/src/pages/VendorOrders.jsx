import { useEffect, useState } from 'react';
import { orderAPI } from '../services/api';
import Navbar from '../components/Navbar';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAllOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    setError('');
    setSuccess('');

    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      setSuccess('Order status updated successfully');
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Orders</h1>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 rounded mb-4">{success}</div>}

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">Order #{order._id.slice(-8)}</h3>
                  <p className="text-gray-600">Customer: {order.userId?.name}</p>
                  <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">₹{order.totalAmount}</p>
                  <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {item.productId?.name} - Qty: {item.quantity} - ₹{item.price}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">Shipping Address: {order.shippingAddress}</p>
              </div>

              <div className="flex items-center gap-4">
                <label className="font-bold">Update Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Received">Received</option>
                  <option value="Ready for Shipping">Ready for Shipping</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorOrders;
