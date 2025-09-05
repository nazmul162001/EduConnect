import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { admissionApi } from "./features/admission/admissionApi";
import { apiSlice } from "./features/api/apiSlice";
import { authApi } from "./features/auth/authApi";
import { reviewApi } from "./features/review/reviewApi";
import { rootReducer } from "./reducer/rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    root: persistedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [admissionApi.reducerPath]: admissionApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      apiSlice.middleware,
      authApi.middleware,
      admissionApi.middleware,
      reviewApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
