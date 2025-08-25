import axios from 'axios';

// Cấu hình Axios cơ bản
const api = axios.create({
  baseURL: 'https://your-api-base-url.com/api', // Thay thế bằng URL API gốc của bạn
  timeout: 10000, // Thời gian chờ tối đa
});

/**
 * Hàm chung để gửi các request API.
 * @param {string} method - Phương thức HTTP (ví dụ: 'GET', 'POST', 'PUT', 'DELETE').
 * @param {string} endpoint - Đường dẫn API (ví dụ: '/users', '/products/1').
 * @param {object} [data={}] - Dữ liệu cần gửi kèm theo request.
 * @param {object} [config={}] - Cấu hình bổ sung cho Axios.
 * @returns {Promise<object>} - Promise chứa response từ server.
 */
const request = async (method, endpoint, data = {}, config = {}) => {
  let requestConfig = {
    method,
    url: endpoint,
    ...config,
  };

  // Tùy chỉnh cấu hình dựa trên phương thức
  if (method === 'POST' || method === 'PUT') {
    // Nếu là POST/PUT và dữ liệu cần gửi dưới dạng form data
    if (data instanceof FormData) {
      requestConfig.data = data;
      requestConfig.headers = {
        'Content-Type': 'multipart/form-data',
        ...config.headers,
      };
    } else {
      // Nếu là JSON
      requestConfig.data = data;
    }
  } else if (method === 'GET' || method === 'DELETE') {
    // Với GET/DELETE, dữ liệu thường được truyền dưới dạng params
    requestConfig.params = data;
  }

  try {
    const response = await api.request(requestConfig);
    return response.data;
  } catch (error) {
    // Xử lý lỗi tập trung
    console.error(`Lỗi request ${method} tới ${endpoint}:`, error);
    throw error;
  }
};

export default request;