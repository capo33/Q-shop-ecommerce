import axios from "axios";

const API = "http://localhost:5000";

// Get all products
const getProducts = async () => {
  const { data } = await axios.get(`${API}/api/v1/products`);
  return data
};

// Get a single product
const getProductDetails = async (id) => {
  const { data } = await axios.get(`${API}/api/v1/products/${id}`);
  return data
};

const productServices = {
  getProducts,
  getProductDetails,
};

export default productServices;
