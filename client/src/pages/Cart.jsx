import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../services/api';
import Navbar from '../components/Navbar';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart();
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleRemove = async (productId) => {
    setError('');
    try {
      await cartAPI.removeFromCart(productId);
      fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      setError('Cart is empty');
      return;
    }
    navigate('/user/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Shopping Cart</h1>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button onClick={() => navigate('/user/products')} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow mb-6">
              {cart.items.map((item) => (
                <div key={item.productId._id} className="flex items-center justify-between p-6 border-b last:border-b-0">
                  <div className="flex items-center gap-4">
                    {item.productId.imageUrl && (
                      <img src={item.productId.imageUrl} alt={item.productId.name} className="w-20 h-20 object-cover rounded" />
                    )}
                    <div>
                      <h3 className="font-bold">{item.productId.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-blue-600 font-bold">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold mb-2">₹{item.price * item.quantity}</p>
                    <button
                      onClick={() => handleRemove(item.productId._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">₹{cart.totalAmount}</span>
              </div>
              <button onClick={handleCheckout} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
