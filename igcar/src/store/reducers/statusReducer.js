// src/store/reducers/statusReducer.js
const initialState = {
    isConnected: true,
  };
  
  const statusReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CONNECTION_STATUS':
        return { ...state, isConnected: action.payload };
      default:
        return state;
    }
  };
  
  export default statusReducer;
  