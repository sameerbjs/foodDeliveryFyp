import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isUser: true,
};

const authUserSlice = createSlice({
    name: "selectedtabindex",
    initialState,
    reducers: {
        handleUserAuth: (state, action) => {
            state.isUser = action.payload.user;
        },
    },
});

export const {handleUserAuth} = authUserSlice.actions;
export default authUserSlice.reducer;
