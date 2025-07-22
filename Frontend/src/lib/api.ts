import axios from "axios";
import { backendUrl } from "../config/constants";

export const getProductsData = async () => {
  try {
    const response = await axios.get(backendUrl + '/api/product/list');
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    // Get all products and find the one that matches the slug
    const products = await getProductsData();
    
    const product = products.find((p: { _id: string; name: string; }) => {
      // Create slug from product name using the same slugify logic
      const productSlug = p.name
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
      
      return productSlug === slug;
    });
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return { ...product, id: product._id };
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(backendUrl + "/api/user/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw new Error("Registration failed");
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(backendUrl + "/api/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Login failed");
  }
};

export const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get(backendUrl + "/api/user/profile", {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to get profile");
    }
    throw new Error("Failed to get profile");
  }
};