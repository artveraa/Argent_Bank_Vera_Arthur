import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    message: null,
    status: null,
    token: null,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {

        loginPending: {
            reducer: (draft) => {
                draft.error   = null;
                draft.message = "Loading...";
                draft.status  = "pending";
                draft.token   = null;
            },
        },

        loginFailed: {
            prepare: (data) => ({
                payload: { data },
            }),
            reducer: (draft, action) => {
                draft.error   = action.payload.data;
                draft.message = "Login failed";
                draft.status  = 400;
            },
        },

        loginCompleted: {
            prepare: (data) => ({
                payload: { data },
            }),
            reducer: (draft, action) => {
                draft.message   = action.payload.data.message;
                draft.status    = action.payload.data.status;
                draft.token     = action.payload.data.body.token;
            },
        },

        logout: {
            reducer: (draft) => {
                draft.message   = null;
                draft.status    = null;
                draft.token     = null;
            },
        },
    },
});

export const { loginPending, loginFailed, loginCompleted, logout } =
    loginSlice.actions;

export default loginSlice.reducer;