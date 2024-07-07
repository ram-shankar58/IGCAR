import { checkBackendConnection } from '../../utils/APIRequest';

export const checkConnection = () => async (dispatch) => {
  const isConnected = await checkBackendConnection();
  dispatch({ type: 'SET_CONNECTION_STATUS', payload: isConnected });
};
