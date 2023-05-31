import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: localStorage.getItem("token") !== null,
    userToken: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    isEmailVerified: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.userToken = action.payload.token;
            state.email = action.payload.email;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("email", action.payload.email);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userToken = "";
            state.email = "";
            localStorage.removeItem("token");
            localStorage.removeItem("email");
        },
        verifyEmail(state, action) {
            state.isEmailVerified = action.payload;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
