import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartProducts: [],
    totalCartProducts: 0,
    totalPrice: 0,
    restCity : '',
};

const addToCartSlice = createSlice({
    name: "addToCart",
    initialState,
    reducers: {
        addToCartProduct: (state, action) => {
            const existingProduct = state.cartProducts.find(
                (el) => el._id === action.payload._id
            );
            if (existingProduct) {
                toast.warn("Product already exsist");
            } else {
                state.restCity = action.payload.restCity;
                state.cartProducts.push(action.payload.product);
                toast.success("Product added to cart");
            }
            state.totalCartProducts = state.cartProducts.length;
        },
        removeToCartProduct: (state, action) => {
            const filteredArray = state.cartProducts.filter(
                (el) => el._id !== action.payload.id
            );
            state.cartProducts = filteredArray;
            state.totalCartProducts = state.cartProducts.length;
            toast.success("Product remove from cart");
        },
        increaseQuantity: (state, action) => {
            const { id } = action.payload;
            const product = state.cartProducts.find((item) => item._id === id);
            product.quantity += 1;
        },
        decreaseQuantity: (state, action) => {
            const { id } = action.payload;
            const product = state.cartProducts.find((item) => item._id === id);
            product.quantity -= 1;
        },
        handleTotalPrice: (state, action) => {
            state.totalPrice = action.payload.price;
        },
        handleDeleteProductOrderPlace: (state, action) => {
            state.cartProducts = state.cartProducts.filter(item => !action.payload.itemToDelete.includes(item._id));
            state.totalCartProducts = state.cartProducts.length;
        }
    },
});

export const {
    addToCartProduct,
    removeToCartProduct,
    increaseQuantity,
    decreaseQuantity,
    handleTotalPrice,
    handleDeleteProductOrderPlace
} = addToCartSlice.actions;
export default addToCartSlice.reducer;
