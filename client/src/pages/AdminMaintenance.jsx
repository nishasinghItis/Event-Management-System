import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminMaintenance = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Maintenance Menu</h1>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <Link to="/admin/users" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Maintain Users</h2>
            <p className="text-gray-600 mb-4">Add, update, delete, and view users</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Add User</li>
              <li>Update User</li>
              <li>Delete User</li>
              <li>View Users</li>
            </ul>
          </Link>
          
          <Link to="/admin/vendors" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Maintain Vendors</h2>
            <p className="text-gray-600 mb-4">Add, update, delete, and view vendors</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Add Vendor</li>
              <li>Update Vendor</li>
              <li>Delete Vendor</li>
              <li>View Vendors</li>
            </ul>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminMaintenance;
