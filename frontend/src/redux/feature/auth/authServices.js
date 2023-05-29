import axios from "axios";

const API = "http://localhost:5000";

// Register User
const register = async (userData) => {
  const response = await axios.post(`${API}/api/v1/users/register`, userData);
  if (response.data) {
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(`${API}/api/v1/users/login`, userData);
  if (response.data) {
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem("userInfo");
};

// Get User Profile
const getUserProfile = async (token) => {
  const response = await axios.get(`${API}/api/v1/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update User Profile
const updateUserProfile = async (userData, token) => {
  const response = await axios.put(`${API}/api/v1/users/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.setItem("userInfo", JSON.stringify(response.data));
  return response.data;
};

const authServices = {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
};

export default authServices;