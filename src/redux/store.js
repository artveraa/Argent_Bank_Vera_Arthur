import loginReducer from "../features/Login/loginSlice";
import storageSession from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import userReducer from "../features/User/userSlice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

/* Combining the reducers into one reducer. */
const rootReducer = combineReducers({
    login   : loginReducer,
    user    : userReducer,
});

/* Creating a configuration object for the persistReducer, setting the storage on sessionStorage. */
const persistConfig = {
    key       : "root",
    storage   : storageSession,
};

/* Creating a persistedReducer. */
const persistedReducer = persistReducer(persistConfig, rootReducer);


/* Creating a store with the persistedReducer and thunk middleware. */
export const store = configureStore({
    middleware    : [thunk],
    reducer       : persistedReducer,
});
