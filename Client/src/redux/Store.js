import { configureStore } from '@reduxjs/toolkit';
import CartSlice from './slices/CartSlice';
import changesReducer from './slices/changesSlice';

const Store = configureStore({
    reducer: {
        cart: CartSlice,
        changes: changesReducer,
    },
});

export default Store;