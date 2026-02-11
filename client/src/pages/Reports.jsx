import { useEffect, useState } from 'react';
import { adminAPI } from '../services/api';
import Navbar from '../components/Navbar';

const Reports = () => {
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
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Reports</h1>
        
        {reports && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4">User Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Users:</span>
                  <span className="font-bold text-blue-600">{reports.totalUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Vendors:</span>
                  <span className="font-bold text-green-600">{reports.totalVendors}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Order Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Orders:</span>
                  <span className="font-bold text-purple-600">{reports.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Revenue:</span>
                  <span className="font-bold text-orange-600">₹{reports.totalRevenue}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
