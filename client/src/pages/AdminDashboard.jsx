import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../services/api';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await adminAPI.getReports();
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Admin Dashboard</h1>
        
        {reports && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{reports.totalUsers}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 mb-2">Total Vendors</h3>
              <p className="text-3xl font-bold text-green-600">{reports.totalVendors}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-purple-600">{reports.totalOrders}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-orange-600">₹{reports.totalRevenue}</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/admin/maintenance" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Maintenance Menu</h3>
            <p className="text-gray-600">Manage users and vendors</p>
          </Link>
          
          <Link to="/admin/memberships" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Memberships</h3>
            <p className="text-gray-600">View all memberships</p>
          </Link>
          
          <Link to="/admin/reports" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Reports</h3>
            <p className="text-gray-600">View system reports</p>
          </Link>
          
          <Link to="/admin/transactions" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Transactions</h3>
            <p className="text-gray-600">View all transactions</p>
          </Link>
          
          <Link to="/admin/products" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Products</h3>
            <p className="text-gray-600">Manage product approvals</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
