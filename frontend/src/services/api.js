const VITE_API_URL = import.meta.env.VITE_API_URL;
const USERNAME = import.meta.env.VITE_API_USERNAME;
const PASSWORD = import.meta.env.VITE_API_PASSWORD;


const generateAuthHeaders = () => {
  const encodedAuth = btoa(`${USERNAME}:${PASSWORD}`);
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${encodedAuth}`,
  };
};

const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${VITE_API_URL}${endpoint}`, {
      headers: generateAuthHeaders(),
      ...options,
    });

    console.log("Raw Response:", response);

    if (response.status === 204) {
      console.log("No content received");
      return null;
    }

    // ✅ Ler o JSON apenas uma vez
    const data = await response.json();
    console.log("Parsed JSON Response:", data);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${error.message}`);
    throw error;
  }
};

// Fetch all monitors
export const getMonitors = async () => apiRequest("/site_monitors");


// Fetch monitor by ID
export const getMonitorById = async (id) => apiRequest(`/site_monitors/${id}`);

// Create a new monitor
export const createMonitor = async (monitorData) =>
  apiRequest("/site_monitors", {
    method: "POST",
    body: JSON.stringify(monitorData),
  });

// Update an existing monitor
export const updateMonitor = async (id, monitorData) =>
  apiRequest(`/site_monitors/${id}`, {
    method: "PUT",
    body: JSON.stringify(monitorData),
  });

// Delete a monitor
export const deleteMonitor = async (id) =>
  apiRequest(`/site_monitors/${id}`, { method: "DELETE" });
