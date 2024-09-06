import { createAsyncThunk } from "@reduxjs/toolkit";

//Fetch data from a server endpoint

export const  fetchProducts = createAsyncThunk('products/fetch', async() => {
    console.log('fetching');
    const response = await fetch('https://fakestoreapi.com/products');
    if(!response.ok) {
        throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
})