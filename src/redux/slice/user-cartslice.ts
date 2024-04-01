import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../components/ProductList";
import { RootState } from "../store";

const initialState = {
    cartItems: [] as Product[]
}

const userCartSlice = createSlice({
    name: 'userCart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            state.cartItems.push(action.payload);
        },
        changeProductQnty: (state, action: PayloadAction<Product>) => {
            state.cartItems = state.cartItems.map(item => {
                if(item.id === action.payload.id){
                    item = action.payload
                }
                return item;
            })
        }
    }
})
export const {addToCart, changeProductQnty} = userCartSlice.actions;
export default userCartSlice.reducer;
export const userCartSelector = (state: RootState) => state.userCartReducer;
