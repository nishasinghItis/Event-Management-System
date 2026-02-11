import { useState } from 'react';
import { membershipAPI } from '../services/api';
import Navbar from '../components/Navbar';

const Membership = () => {
  const [view, setView] = useState('add');
  const [duration, setDuration] = useState('6 months');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [membership, setMembership] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddMembership = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await membershipAPI.createMembership({ duration });
      setSuccess(`Membership created successfully! Your membership number is: ${response.data.membership.membershipNumber}`);
      setDuration('6 months');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create membership');
    }
  };

  const handleFetchMembership = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setMembership(null);

    if (!membershipNumber) {
      setError('Membership number is required');
      return;
    }

    try {
      const response = await membershipAPI.getMembershipByNumber(membershipNumber);
      setMembership(response.data.membership);
    } catch (err) {
      setError(err.response?.data?.message || 'Membership not found');
    }
  };

  const handleExtendMembership = async () => {
    setError('');
    setSuccess('');

    try {
      await membershipAPI.extendMembership({ membershipNumber, duration: '6 months' });
      setSuccess('Membership extended successfully');
      handleFetchMembership({ preventDefault: () => {} });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to extend membership');
    }
  };

  const handleCancelMembership = async () => {
    if (!window.confirm('Are you sure you want to cancel this membership?')) return;

    setError('');
    setSuccess('');

    try {
      await membershipAPI.cancelMembership({ membershipNumber });
      setSuccess('Membership cancelled successfully');
      handleFetchMembership({ preventDefault: () => {} });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel membership');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Membership Management</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setView('add')}
            className={`px-6 py-2 rounded ${view === 'add' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
          >
            Add Membership
          </button>
          <button
            onClick={() => setView('update')}
            className={`px-6 py-2 rounded ${view === 'update' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
          >
            Update Membership
          </button>
        </div>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 rounded mb-4">{success}</div>}

        {view === 'add' && (
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Add New Membership</h2>
            <form onSubmit={handleAddMembership} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-3">Select Duration *</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value="6 months"
                      checked={duration === '6 months'}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mr-2"
                    />
                    <span>6 Months</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value="1 year"
                      checked={duration === '1 year'}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mr-2"
                    />
                    <span>1 Year</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value="2 years"
                      checked={duration === '2 years'}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mr-2"
                    />
                    <span>2 Years</span>
                  </label>
                </div>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Create Membership
              </button>
            </form>
          </div>
        )}

        {view === 'update' && (
          <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Update Membership</h2>
            <form onSubmit={handleFetchMembership} className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Membership Number *</label>
                <input
                  type="text"
                  value={membershipNumber}
                  onChange={(e) => setMembershipNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Fetch Membership
              </button>
            </form>

            {membership && (
              <div className="border-t pt-6">
                <h3 className="font-bold mb-4">Membership Details</h3>
                <div className="space-y-2 mb-6">
                  <p><span className="font-bold">Number:</span> {membership.membershipNumber}</p>
                  <p><span className="font-bold">User:</span> {membership.userId?.name}</p>
                  <p><span className="font-bold">Duration:</span> {membership.duration}</p>
                  <p><span className="font-bold">Start Date:</span> {new Date(membership.startDate).toLocaleDateString()}</p>
                  <p><span className="font-bold">Expiry Date:</span> {new Date(membership.expiryDate).toLocaleDateString()}</p>
                  <p><span className="font-bold">Status:</span> <span className={`px-2 py-1 rounded ${
                    membership.status === 'active' ? 'bg-green-100 text-green-600' :
                    membership.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>{membership.status}</span></p>
                </div>

                {membership.status === 'active' && (
                  <div className="flex gap-4">
                    <button onClick={handleExtendMembership} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                      Extend Membership (6 months)
                    </button>
                    <button onClick={handleCancelMembership} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                      Cancel Membership
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Membership;
