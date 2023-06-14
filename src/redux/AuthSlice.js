import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUser: true,
    resturantAuth: [],
    userAuth: [],
    restToken: null,
    userToken: null
};

const authUserSlice = createSlice({
    name: "selectedtabindex",
    initialState,
    reducers: {
        handleRestAuth: (state, action) => {
            state.isUser = action.payload.isUser;
            state.resturantAuth = action.payload.resturant;
        },

        handleRestToken: (state, action) => {
            state.restToken = action.payload.token
        },

        handleRestLogout: (state, action) => {
            state.isUser = action.payload.isUser
            state.resturantAuth = action.payload.resturant;
            state.restToken = action.payload.token
        },

        handleUserAuth: (state, action) => {
            state.isUser = action.payload.isUser;
            state.userAuth = action.payload.user;
        },

        handleUserToken: (state, action) => {
            state.userToken = action.payload.token
        },

        handleUserLogout: (state, action) => {
            state.isUser = action.payload.isUser
            state.userAuth = action.payload.resturant;
            state.userToken = action.payload.token
        },
    },
});

export const { handleRestAuth, handleRestLogout, handleUserAuth, handleUserLogout,handleRestToken,handleUserToken } = authUserSlice.actions;
export default authUserSlice.reducer;
