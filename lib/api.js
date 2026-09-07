/**
 * Zubyte REST API Client with JWT Bearer token management & error handling
 */

let rawBase = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
).trim().replace(/\/+$/, '');

// Ensure /api suffix is present if not already included
if (!rawBase.endsWith('/api')) {
  rawBase = `${rawBase}/api`;
}

export const API_BASE_URL = rawBase;


/**
 * Generic API request wrapper
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  // Attach token from localStorage if in browser
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('zubyte_token') : null;

  const headers = {
    ...options.headers,
  };

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  // If body is not FormData, set JSON Content-Type
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || `API Error: ${res.status} ${res.statusText}`);
    }

    return data;
  } catch (error) {
    console.error(`[API Request Error] ${endpoint}:`, error.message);
    throw error;
  }
}

/**
 * API Service Modules
 */
export const api = {
  // Auth
  auth: {
    login: (identifier, password) =>
      apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password }),
      }),
    getMe: () => apiRequest('/auth/me'),
    getUsers: () => apiRequest('/auth/users'),
  },

  // Admin Dashboard
  admin: {
    getStats: () => apiRequest('/admin/stats'),
  },

  // Inquiries / Contact
  inquiries: {
    getAll: (params = '') => apiRequest(`/contact?${params}`),
    getById: (id) => apiRequest(`/contact/${id}`),
    submit: (formData) =>
      apiRequest('/contact', {
        method: 'POST',
        body: formData instanceof FormData ? formData : JSON.stringify(formData),
      }),
    updateStatus: (id, payload) =>
      apiRequest(`/contact/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    delete: (id) =>
      apiRequest(`/contact/${id}`, {
        method: 'DELETE',
      }),
  },

  // Services
  services: {
    getAll: () => apiRequest('/services'),
    getBySlug: (slug) => apiRequest(`/services/${slug}`),
    create: (data) =>
      apiRequest('/services', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      apiRequest(`/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      apiRequest(`/services/${id}`, {
        method: 'DELETE',
      }),
  },

  // Products
  products: {
    getAll: () => apiRequest('/products'),
    getById: (id) => apiRequest(`/products/${id}`),
    create: (data) =>
      apiRequest('/products', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      apiRequest(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      apiRequest(`/products/${id}`, {
        method: 'DELETE',
      }),
  },

  // Portfolio / Case Studies
  portfolio: {
    getAll: (params = '') => apiRequest(`/portfolio?${params}`),
    getById: (id) => apiRequest(`/portfolio/${id}`),
    create: (data) =>
      apiRequest('/portfolio', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id, data) =>
      apiRequest(`/portfolio/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id) =>
      apiRequest(`/portfolio/${id}`, {
        method: 'DELETE',
      }),
  },

  // Demos & Newsletter
  demos: {
    getAll: () => apiRequest('/demo'),
    book: (data) =>
      apiRequest('/demo', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateStatus: (id, payload) =>
      apiRequest(`/demo/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    delete: (id) =>
      apiRequest(`/demo/${id}`, {
        method: 'DELETE',
      }),
    getSubscribers: () => apiRequest('/newsletter'),
    deleteSubscriber: (id) =>
      apiRequest(`/newsletter/${id}`, {
        method: 'DELETE',
      }),
  },

  // Cloudinary Upload
  upload: {
    uploadImage: async (file, folder = 'zubyte/portfolio') => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      return apiRequest('/upload/image', {
        method: 'POST',
        body: formData,
      });
    },
    deleteImage: (publicId) =>
      apiRequest(`/upload/image/${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
      }),
  },

  // Company Information, Clients Marquee, Values, Leadership & FAQs
  company: {
    getInfo: () => apiRequest('/company'),
    updateInfo: (data) =>
      apiRequest('/company', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    getClients: () => apiRequest('/company/clients'),
    updateClients: (clientLogos) =>
      apiRequest('/company/clients', {
        method: 'PUT',
        body: JSON.stringify({ clientLogos }),
      }),
    addClient: (client) =>
      apiRequest('/company/clients', {
        method: 'POST',
        body: JSON.stringify(client),
      }),
    deleteClient: (id) =>
      apiRequest(`/company/clients/${id}`, {
        method: 'DELETE',
      }),
    updateStats: (stats) =>
      apiRequest('/company/stats', {
        method: 'PUT',
        body: JSON.stringify({ stats }),
      }),
    updateLeadership: (leadership) =>
      apiRequest('/company/leadership', {
        method: 'PUT',
        body: JSON.stringify(leadership),
      }),
    updateCoreValues: (coreValues) =>
      apiRequest('/company/values', {
        method: 'PUT',
        body: JSON.stringify({ coreValues }),
      }),
    updateStoryMilestones: (storyMilestones) =>
      apiRequest('/company/milestones', {
        method: 'PUT',
        body: JSON.stringify({ storyMilestones }),
      }),
    updateOffices: (offices) =>
      apiRequest('/company/offices', {
        method: 'PUT',
        body: JSON.stringify({ offices }),
      }),
    getFaqs: () => apiRequest('/faqs'),
    updateFaqs: (faqs) =>
      apiRequest('/company/faqs', {
        method: 'PUT',
        body: JSON.stringify({ faqs }),
      }),
    updateProcessSteps: (processSteps) =>
      apiRequest('/company/process', {
        method: 'PUT',
        body: JSON.stringify({ processSteps }),
      }),
  },
};



