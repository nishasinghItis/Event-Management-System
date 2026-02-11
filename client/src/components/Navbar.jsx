import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ProJEMS</Link>
        <div className="flex gap-4 items-center">
          <Link to="/flowchart" className="hover:underline">Chart</Link>
          {user && (
            <>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
                  <Link to="/admin/maintenance" className="hover:underline">Maintenance</Link>
                  <Link to="/admin/reports" className="hover:underline">Reports</Link>
                  <Link to="/admin/transactions" className="hover:underline">Transactions</Link>
                </>
              )}
              {user.role === 'vendor' && (
                <>
                  <Link to="/vendor/dashboard" className="hover:underline">Dashboard</Link>
                  <Link to="/vendor/products" className="hover:underline">Your Items</Link>
                  <Link to="/vendor/add-product" className="hover:underline">Add Item</Link>
                  <Link to="/vendor/orders" className="hover:underline">Orders</Link>
                </>
              )}
              {user.role === 'user' && (
                <>
                  <Link to="/user/portal" className="hover:underline">Portal</Link>
                  <Link to="/user/products" className="hover:underline">Products</Link>
                  <Link to="/user/cart" className="hover:underline">Cart</Link>
                  <Link to="/user/orders" className="hover:underline">Orders</Link>
                  <Link to="/user/guest-list" className="hover:underline">Guest List</Link>
                  <Link to="/user/membership" className="hover:underline">Membership</Link>
                  <Link to="/user/reports" className="hover:underline">Reports</Link>
                  <Link to="/user/transactions" className="hover:underline">Transactions</Link>
                </>
              )}
              <span className="text-sm">{user.name}</span>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
