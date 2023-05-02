import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const initialState = {
    cartProducts : [],
    totalCartProducts : 0,
}

const addToCartSlice =createSlice({
    name: "addToCart",
    initialState,
    reducers: {
        addToCartProduct: (state, action) => {
            
        },
        removeAddToCart: (state, action) => {
    
        },
    },
})

export const {
    addToCartProduct,
    removeAddToCart,
} = addToCartSlice.actions;
export default addToCartSlice.reducer;