import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'Invited' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get('/api/guests', { withCredentials: true });
      setGuests(response.data.guests);
    } catch (error) {
      console.error('Error fetching guests:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.phone) {
      setError('All fields are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email format');
      return;
    }

    if (!/^\d+$/.test(formData.phone)) {
      setError('Phone must be numeric');
      return;
    }

    try {
      if (editingGuest) {
        await axios.put(`/api/guests/${editingGuest._id}`, formData, { withCredentials: true });
        setSuccess('Guest updated successfully');
      } else {
        await axios.post('/api/guests', formData, { withCredentials: true });
        setSuccess('Guest added successfully');
      }
      fetchGuests();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (guest) => {
    setEditingGuest(guest);
    setFormData({ name: guest.name, email: guest.email, phone: guest.phone, status: guest.status });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      try {
        await axios.delete(`/api/guests/${id}`, { withCredentials: true });
        setSuccess('Guest deleted successfully');
        fetchGuests();
      } catch (err) {
        setError(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', status: 'Invited' });
    setEditingGuest(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Guest List</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            {showForm ? 'Cancel' : 'Add Guest'}
          </button>
        </div>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 rounded mb-4">{success}</div>}

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">{editingGuest ? 'Edit Guest' : 'Add Guest'}</h2>
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
                <label className="block text-gray-700 mb-2">Phone *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="Invited">Invited</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  {editingGuest ? 'Update' : 'Add'}
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
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{guest.name}</td>
                  <td className="px-4 py-3">{guest.email}</td>
                  <td className="px-4 py-3">{guest.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      guest.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                      guest.status === 'Declined' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {guest.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleEdit(guest)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(guest._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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

export default GuestList;
