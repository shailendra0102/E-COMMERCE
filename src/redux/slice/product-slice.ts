import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../components/ProductList";
import {fetchProducts} from './thunks';
import { RootState } from "../store";

const initialState = {
    data: [] as Product[],
    isLoading: false,
    error: null as any
    
}

export const ProductSlice = createSlice({
    name: 'productlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
})

export default ProductSlice.reducer;

export const productListSelector = (state: RootState) => state.productListReducer;