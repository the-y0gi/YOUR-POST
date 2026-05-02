import api from "./axios";

export const authAPI = {
  signup: (data) => api.post("/user/signup", data),
  verifyOTP: (data) => api.post("/user/verify-otp", data),
  login: (data) => api.post("/user/login", data),
};

export const uploadAPI = {
  uploadAvatar: (formData) =>
    api.post("/upload/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
