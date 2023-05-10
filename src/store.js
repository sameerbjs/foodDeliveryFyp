import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from '../src/redux/CartSlice.js'
import AsyncStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    cart: cartReducer,
})

const persistConfig = {
    key: 'foodDelivery',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store)