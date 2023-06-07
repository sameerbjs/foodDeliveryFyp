import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUser: true,
    resturantAuth: [],
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
        }
    },
});

export const { handleRestAuth, handleRestLogout } = authUserSlice.actions;
export default authUserSlice.reducer;
