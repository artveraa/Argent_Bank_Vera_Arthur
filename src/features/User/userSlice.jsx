import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    createdAt   : "",
    email       : "",
    firstName   : "",
    id          : "",
    lastName    : "",
    status      : null,
    updatedAt   : "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        getInfosPending: {
            reducer: (draft) => {
                draft.createdAt   = "";
                draft.email       = "";
                draft.firstName   = "";
                draft.id          = "";
                draft.lastName    = "";
                draft.status      = "pending";
                draft.updatedAt   = "";
            },
        },

        getInfosFailed: {
            reducer: (draft) => {
                draft.status = 400;
            },
        },

        getInfosCompleted: {
            prepare: (data) => ({
                payload: { data },
            }),
            reducer: (draft, action) => {
                draft.createdAt   = action.payload.data.body.createdAt;
                draft.email       = action.payload.data.body.email;
                draft.firstName   = action.payload.data.body.firstName;
                draft.id          = action.payload.data.body.id;
                draft.lastName    = action.payload.data.body.lastName;
                draft.status      = action.payload.data.status;
                draft.updatedAt   = action.payload.data.body.updatedAt;
            },
        },

        updateInfos: {
            prepare: (data) => ({
                payload: { data },
            }),
            reducer: (draft, action) => {
                draft.firstName   = action.payload.data.firstName;
                draft.lastName    = action.payload.data.lastName;
                draft.updatedAt   = action.payload.data.updatedAt;
            },
        },

        resetInfos: {
            reducer: (draft) => {
                draft.createdAt   = "";
                draft.email       = "";
                draft.firstName   = "";
                draft.id          = "";
                draft.lastName    = "";
                draft.status      = null;
                draft.updatedAt   = "";
            },
        },
    },
});

export const { getInfosPending, getInfosFailed, getInfosCompleted, resetInfos, updateInfos } = userSlice.actions;

export default userSlice.reducer;