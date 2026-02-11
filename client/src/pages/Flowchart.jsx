import { Link } from 'react-router-dom';

const Flowchart = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">System Flowchart</h1>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <h2 className="text-xl font-bold mb-2">START → Index → Login → Role Selection</h2>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-600 mb-3">Admin Flow</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Admin Dashboard</li>
                <li>Maintenance Menu → User Management, Vendor Management</li>
                <li>Membership Management → Add/Update Membership</li>
                <li>Reports → Total Users, Vendors, Orders, Revenue</li>
                <li>Transactions → View all transactions</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-green-600 mb-3">Vendor Flow</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Vendor Dashboard</li>
                <li>Your Items → View all products</li>
                <li>Add New Item → Create product</li>
                <li>Orders → View and update order status</li>
                <li>Product Status → Manage product approval status</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-purple-600 mb-3">User Flow</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>User Portal</li>
                <li>Products → Browse available products</li>
                <li>Cart → Add/Remove items</li>
                <li>Checkout → Select payment method (Cash/UPI)</li>
                <li>Order Status → Track orders (Received → Ready for Shipping → Out for Delivery → Delivered)</li>
                <li>Membership → Add/Update/Cancel membership</li>
                <li>Reports & Transactions</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flowchart;
