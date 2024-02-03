// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/Loginreducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers if needed
  },
});

// export default store;
