import { useEffect, useState } from 'react';
import { orderAPI } from '../services/api';
import Navbar from '../components/Navbar';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received': return 'bg-blue-100 text-blue-600';
      case 'Ready for Shipping': return 'bg-yellow-100 text-yellow-600';
      case 'Out for Delivery': return 'bg-orange-100 text-orange-600';
      case 'Delivered': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">Order #{order._id.slice(-8)}</h3>
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

                <div>
                  <span className="font-bold mr-2">Status:</span>
                  <span className={`px-3 py-1 rounded ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
