import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUser: true,
    resturantAuth: [],
    userAuth: []
};

const authUserSlice = createSlice({
    name: "selectedtabindex",
    initialState,
    reducers: {
        handleRestAuth: (state, action) => {
            state.isUser = action.payload.isUser;
            state.resturantAuth = action.payload.resturant;
        },

        handleRestLogout: (state, action) => {
            state.isUser = action.payload.isUser
            state.resturantAuth = action.payload.resturant;
        },

        handleUserAuth: (state, action) => {
            state.isUser = action.payload.isUser;
            state.userAuth = action.payload.user
        },

        handleUserLogout: (state, action) => {
            state.isUser = action.payload.isUser
            state.userAuth = action.payload.resturant;
        },
    },
});

export const { handleRestAuth, handleRestLogout,handleUserAuth,handleUserLogout } = authUserSlice.actions;
export default authUserSlice.reducer;
