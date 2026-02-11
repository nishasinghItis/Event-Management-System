import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Index from './pages/Index';
import Flowchart from './pages/Flowchart';

// Auth Pages
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import VendorLogin from './pages/VendorLogin';
import VendorSignup from './pages/VendorSignup';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminMaintenance from './pages/AdminMaintenance';
import AdminUsers from './pages/AdminUsers';
import AdminVendors from './pages/AdminVendors';
import AdminProducts from './pages/AdminProducts';
import AdminMemberships from './pages/AdminMemberships';

// Vendor Pages
import VendorDashboard from './pages/VendorDashboard';
import AddProduct from './pages/AddProduct';
import VendorProducts from './pages/VendorProducts';
import VendorOrders from './pages/VendorOrders';

// User Pages
import UserPortal from './pages/UserPortal';
import UserProducts from './pages/UserProducts';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import UserOrders from './pages/UserOrders';
import Membership from './pages/Membership';
import GuestList from './pages/GuestList';

// Shared Pages
import Reports from './pages/Reports';
import Transactions from './pages/Transactions';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/flowchart" element={<Flowchart />} />

          {/* Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor/signup" element={<VendorSignup />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/maintenance" element={<ProtectedRoute allowedRoles={['admin']}><AdminMaintenance /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/vendors" element={<ProtectedRoute allowedRoles={['admin']}><AdminVendors /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute allowedRoles={['admin']}><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/memberships" element={<ProtectedRoute allowedRoles={['admin']}><AdminMemberships /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><Reports /></ProtectedRoute>} />
          <Route path="/admin/transactions" element={<ProtectedRoute allowedRoles={['admin']}><Transactions /></ProtectedRoute>} />

          {/* Vendor Routes */}
          <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>} />
          <Route path="/vendor/add-product" element={<ProtectedRoute allowedRoles={['vendor']}><AddProduct /></ProtectedRoute>} />
          <Route path="/vendor/products" element={<ProtectedRoute allowedRoles={['vendor']}><VendorProducts /></ProtectedRoute>} />
          <Route path="/vendor/orders" element={<ProtectedRoute allowedRoles={['vendor']}><VendorOrders /></ProtectedRoute>} />

          {/* User Routes */}
          <Route path="/user/portal" element={<ProtectedRoute allowedRoles={['user']}><UserPortal /></ProtectedRoute>} />
          <Route path="/user/products" element={<ProtectedRoute allowedRoles={['user']}><UserProducts /></ProtectedRoute>} />
          <Route path="/user/cart" element={<ProtectedRoute allowedRoles={['user']}><Cart /></ProtectedRoute>} />
          <Route path="/user/checkout" element={<ProtectedRoute allowedRoles={['user']}><Checkout /></ProtectedRoute>} />
          <Route path="/user/success" element={<ProtectedRoute allowedRoles={['user']}><Success /></ProtectedRoute>} />
          <Route path="/user/orders" element={<ProtectedRoute allowedRoles={['user']}><UserOrders /></ProtectedRoute>} />
          <Route path="/user/guest-list" element={<ProtectedRoute allowedRoles={['user']}><GuestList /></ProtectedRoute>} />
          <Route path="/user/membership" element={<ProtectedRoute allowedRoles={['user']}><Membership /></ProtectedRoute>} />
          <Route path="/user/reports" element={<ProtectedRoute allowedRoles={['user']}><Reports /></ProtectedRoute>} />
          <Route path="/user/transactions" element={<ProtectedRoute allowedRoles={['user']}><Transactions /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
