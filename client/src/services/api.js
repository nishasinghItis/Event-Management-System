import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

export const authAPI = {
  adminSignup: (data) => api.post('/auth/admin/signup', data),
  adminLogin: (data) => api.post('/auth/admin/login', data),
  userSignup: (data) => api.post('/auth/user/signup', data),
  userLogin: (data) => api.post('/auth/user/login', data),
  vendorSignup: (data) => api.post('/auth/vendor/signup', data),
  vendorLogin: (data) => api.post('/auth/vendor/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me')
};

export const productAPI = {
  getProducts: () => api.get('/products'),
  getVendorProducts: () => api.get('/products/vendor'),
  getAllProducts: () => api.get('/products/all'),
  createProduct: (data) => api.post('/products', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  updateProductStatus: (id, status) => api.patch(`/products/${id}/status`, { status })
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (data) => api.post('/cart', data),
  removeFromCart: (productId) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete('/cart')
};

export const orderAPI = {
  createOrder: (data) => api.post('/orders', data),
  getUserOrders: () => api.get('/orders/user'),
  getAllOrders: () => api.get('/orders/all'),
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}/status`, { status })
};

export const membershipAPI = {
  createMembership: (data) => api.post('/memberships', data),
  getUserMembership: () => api.get('/memberships/user'),
  getAllMemberships: () => api.get('/memberships/all'),
  getMembershipByNumber: (number) => api.get(`/memberships/${number}`),
  extendMembership: (data) => api.put('/memberships/extend', data),
  cancelMembership: (data) => api.put('/memberships/cancel', data)
};

export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAllVendors: () => api.get('/admin/vendors'),
  createVendor: (data) => api.post('/admin/vendors', data),
  updateVendor: (id, data) => api.put(`/admin/vendors/${id}`, data),
  deleteVendor: (id) => api.delete(`/admin/vendors/${id}`),
  getReports: () => api.get('/admin/reports'),
  getAllTransactions: () => api.get('/admin/transactions')
};

export const guestAPI = {
  getGuests: () => api.get('/guests'),
  addGuest: (data) => api.post('/guests', data),
  updateGuest: (id, data) => api.put(`/guests/${id}`, data),
  deleteGuest: (id) => api.delete(`/guests/${id}`)
};

export default api;
