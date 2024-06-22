const host = "3000";
export const loginAPI = `${host}/api/login`;
export const registerAPI=`${host}/api/register`;
export const statusAPI = `${host}/api/status`;

export const checkBackendConnection = async () => {
    try {
      const response = await fetch(statusAPI);
      if (!response.ok) {
        throw new Error('Backend not reachable');
      }
      return true;
    } catch (error) {
      console.error('Error checking backend connection:', error);
      return false;
    }
  };