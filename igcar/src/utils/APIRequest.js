
import bcrypt from 'bcryptjs';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3001"; 
export const loginAPI = `${API_BASE_URL}/api/login`;
export const registerAPI=`${API_BASE_URL}/api/register`;


export const statusAPI = `${API_BASE_URL}/status`;

export const checkBackendConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/status`);
    if (response.status === 200 && response.data === "Server is running") {
      return true; // Server is reachable
    } else {
      return false; // Unexpected response or status
    }
  } catch (error) {
    console.error('Error checking backend connection:', error);
    return false; // Request failed or server not reachable
  }
};

export const registerUser = async (user) => {
  try { //checking if already email registered
    const response = await fetch(`${API_BASE_URL}/users?email=${user.email}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const existingUsers = await response.json();
    if (existingUsers.length > 0) {
      throw new Error('Email already exists');
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const registerResponse = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...user, password: hashedPassword })
    });
    if (!registerResponse.ok) {
      throw new Error(`Error ${registerResponse.status}: ${registerResponse.statusText}`);
    }
    return await registerResponse.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
export const fetchErrorData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/errors`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching error data:', error);
    throw error;
  }
};
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users?email=${email}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const users = await response.json();
    const user = users.find(user => bcrypt.compareSync(password, user.password));

    if (!user) {
      throw new Error('Invalid email or password');
    }

    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const fetchError = async (code) => {
  try {
    const response = await fetch(`${API_BASE_URL}/errors?code=${code}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const error = await response.json();
    return error[0];
  } catch (error) {
    console.error('Error fetching error:', error);
    throw error;
  }
};