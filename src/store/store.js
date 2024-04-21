import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../feature/authentication/authSlice';

export const store = configureStore({
    reducer:authSlice
});

export default store;