import { useEffect, useState } from 'react';
import { productAPI, cartAPI } from '../services/api';
import Navbar from '../components/Navbar';

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = async (productId) => {
    setError('');
    setSuccess('');

    try {
      await cartAPI.addToCart({ productId, quantity: 1 });
      setSuccess('Product added to cart');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Products</h1>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 rounded mb-4">{success}</div>}

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
              )}
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-xl font-bold text-blue-600 mb-2">₹{product.price}</p>
              <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProducts;
