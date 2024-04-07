// api.jsx
const API_URL = "https://v2.api.noroff.dev/online-shop";

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data; // Assuming the API response has a "data" field containing the products
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // Rethrow to let the caller handle it
  }
};
