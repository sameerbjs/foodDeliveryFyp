import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUser: true,
    resturantAuth: [],
    userAuth: [],
    restToken: null,
    userToken: null,
    isLogin : false
};

const authUserSlice = createSlice({
    name: "selectedtabindex",
    initialState,
    reducers: {
        handleRestAuth: (state, action) => {
            state.isUser = action.payload.isUser;
            state.resturantAuth = action.payload.resturant;
            state.isLogin = action.payload.isLogin
        },

        handleRestToken: (state, action) => {
            state.restToken = action.payload.token
        },

        handleRestLogout: (state, action) => {
            state.isUser = action.payload.isUser
            state.resturantAuth = action.payload.resturant;
            state.restToken = action.payload.token
            state.isLogin = action.payload.isLogin
        },

        handleUserAuth: (state, action) => {
            state.isUser = action.payload.isUser;
            state.userAuth = action.payload.user;
            state.isLogin = action.payload.isLogin
        },

        handleUserToken: (state, action) => {
            state.userToken = action.payload.token
        },

        handleUserLogout: (state, action) => {
            state.isUser = action.payload.isUser
            state.userAuth = action.payload.user;
            state.userToken = action.payload.token
            state.isLogin = action.payload.isLogin
        },
    },
});

export const { handleRestAuth, handleRestLogout, handleUserAuth, handleUserLogout,handleRestToken,handleUserToken } = authUserSlice.actions;
export default authUserSlice.reducer;
