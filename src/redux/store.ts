import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./apiSlice";
import rootReducer from "./reducer/rootReducer";

// Persist the root reducer
const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    apiSlice.reducerPath, // Don't persist API cache
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: {
    ...persistedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["persist"],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// Persistor for the store
export const persistor = persistStore(store);

// Define the root state type and dispatch type based on the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
