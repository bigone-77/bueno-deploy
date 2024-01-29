import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import editUserReducer from "./slices/memberEditSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage/session';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    editUser: editUserReducer,
    product: productReducer,
    cart: cartReducer
});

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["currentUser"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch