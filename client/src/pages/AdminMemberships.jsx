import { useEffect, useState } from 'react';
import { membershipAPI } from '../services/api';
import Navbar from '../components/Navbar';

const AdminMemberships = () => {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await membershipAPI.getAllMemberships();
      setMemberships(response.data.memberships);
    } catch (error) {
      console.error('Error fetching memberships:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">All Memberships</h1>
        
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Membership Number</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Start Date</th>
                <th className="px-4 py-3 text-left">Expiry Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((membership) => (
                <tr key={membership._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{membership.membershipNumber}</td>
                  <td className="px-4 py-3">{membership.userId?.name}</td>
                  <td className="px-4 py-3">{membership.duration}</td>
                  <td className="px-4 py-3">{new Date(membership.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{new Date(membership.expiryDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      membership.status === 'active' ? 'bg-green-100 text-green-600' :
                      membership.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {membership.status}
                    </span>
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

export default AdminMemberships;
