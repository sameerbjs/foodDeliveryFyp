import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartProducts: [],
    totalCartProducts: 0,
    totalPrice: 0
}

const addToCartSlice = createSlice({
    name: "addToCart",
    initialState,
    reducers: {
        addToCartProduct: (state, action) => {
            const existingProduct = state.cartProducts.find(el => el.id === action.payload.id);
            if (existingProduct) {
                toast.warn('Product already exsist');
            } else {
                state.cartProducts.push(action.payload);
                toast.success('Product added to cart');
            }
            state.totalCartProducts = state.cartProducts.length;
        },
        removeToCartProduct: (state, action) => {
            const filteredArray = state.cartProducts.filter((el) => el.id !== action.payload.id);
            state.cartProducts = filteredArray;
            state.totalCartProducts = state.cartProducts.length;
            toast.success('Product remove from cart');
        },
        increaseQuantity: (state, action) => {
            const { id } = action.payload;
            const product = state.cartProducts.find((item) => item.id === id);
            product.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const { id } = action.payload;
            const product = state.cartProducts.find((item) => item.id === id);
            product.quantity -= 1;
        },
        handleTotalPrice: (state, action) => {
            state.totalPrice = action.payload.price
        }
    },
})

export const {
    addToCartProduct, removeToCartProduct, increaseQuantity, decreaseQuantity,handleTotalPrice
} = addToCartSlice.actions;
export default addToCartSlice.reducer;