import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from './slice/user-cartslice';

const store = configureStore({
    reducer: {userCartReducer}
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
