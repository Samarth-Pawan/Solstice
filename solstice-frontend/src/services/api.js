import axios from "axios";

// Base URL of the FastAPI backend
const API_BASE_URL = "http://localhost:8000/api";

// Get all investors
export const getInvestors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/investors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching investors", error);
  }
};

// Get all startups
export const getStartups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/startups`);
    return response.data;
  } catch (error) {
    console.error("Error fetching startups", error);
  }
};

// Create a new investor
export const createInvestor = async (investorData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/investor`, investorData);
    return response.data;
  } catch (error) {
    console.error("Error creating investor", error);
  }
};

// Create a new startup
export const createStartup = async (startupData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/startup`, startupData);
    return response.data;
  } catch (error) {
    console.error("Error creating startup", error);
  }
};
