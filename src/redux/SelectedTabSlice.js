import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    RegisterSelectedTab: 0,
    LoginSelectedTab: 0,
}

const selectedTabIndex = createSlice({
    name: "selectedtabindex",
    initialState,
    reducers: {
        RegisterSelectedTabHandle: (state, action) => {
            state.RegisterSelectedTab = action.payload.tab
        },
        LoginSelectedTabHandle: (state, action) => {
            state.LoginSelectedTab = action.payload.tab
        },
    }
})

export const { RegisterSelectedTabHandle, LoginSelectedTabHandle } = selectedTabIndex.actions;
export default selectedTabIndex.reducer;