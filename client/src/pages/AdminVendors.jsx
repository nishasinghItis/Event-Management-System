import { useEffect, useState } from 'react';
import { adminAPI } from '../services/api';
import Navbar from '../components/Navbar';

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', businessName: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await adminAPI.getAllVendors();
      setVendors(response.data.vendors);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingVendor) {
        await adminAPI.updateVendor(editingVendor._id, formData);
        setSuccess('Vendor updated successfully');
      } else {
        await adminAPI.createVendor(formData);
        setSuccess('Vendor created successfully');
      }
      fetchVendors();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setFormData({ name: vendor.name, email: vendor.email, password: '', phone: vendor.phone || '', businessName: vendor.businessName || '', address: vendor.address || '' });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await adminAPI.deleteVendor(id);
        setSuccess('Vendor deleted successfully');
        fetchVendors();
      } catch (err) {
        setError(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', phone: '', businessName: '', address: '' });
    setEditingVendor(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Manage Vendors</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            {showForm ? 'Cancel' : 'Add Vendor'}
          </button>
        </div>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 rounded mb-4">{success}</div>}

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editingVendor ? 'Edit Vendor' : 'Add Vendor'}</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password {!editingVendor && '*'}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required={!editingVendor}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  {editingVendor ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Business Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{vendor.name}</td>
                  <td className="px-4 py-3">{vendor.email}</td>
                  <td className="px-4 py-3">{vendor.businessName || 'N/A'}</td>
                  <td className="px-4 py-3">{vendor.phone || 'N/A'}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleEdit(vendor)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(vendor._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVendors;
