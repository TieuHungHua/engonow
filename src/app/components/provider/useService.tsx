import request from './provider/provider.js';

const userService = {
  // Hàm để lấy danh sách người dùng
  getUsers: () => {
    return request('GET', '/users');
  },

  // Hàm để tạo người dùng mới
  createUser: (userData) => {
    return request('POST', '/users', userData);
  },

  // Hàm để cập nhật người dùng bằng id
  updateUser: (userId, userData) => {
    return request('PUT', `/users/${userId}`, userData);
  },

  // Hàm để tải file avatar lên, sử dụng FormData
  uploadAvatar: (userId, avatarFile) => {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    formData.append('userId', userId); // Có thể thêm các trường khác

    return request('POST', `/users/${userId}/avatar`, formData);
  }
};

export default userService;