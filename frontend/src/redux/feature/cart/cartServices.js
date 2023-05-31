import axios from "axios";

const API = "http://localhost:5000";

// Add a product to cart
const addToCart = async (id, qty) => {
  const { data } = await axios.get(`${API}/api/v1/products/${id}`);
  console.log("data_object: ", data?.data);

  localStorage.setItem("cartItems", JSON.stringify(data?.data));

  return  data?.data;
};

// Remove a product from cart
const removeFromCart = async (id) => {
  const { data } = await axios.get(`${API}/api/v1/products/${id}`);
  // console.log(data?.data);

  localStorage.setItem("cartItems", JSON.stringify(data?.data));
};

// Save shipping address
const saveShippingAddress = async (data) => {
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// Save payment method
const savePaymentMethod = async (data) => {
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

const cartServices = {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
};

export default cartServices;
