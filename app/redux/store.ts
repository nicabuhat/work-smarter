import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import countryReducer from "@/redux/features/countrySlice";
import columnReducer from "@/redux/features/columnSlice";

export const store = configureStore({
  reducer: { countryReducer, columnReducer },
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
