import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import countryReducer from "@/redux/features/countrySlice";
import columnsReducer from "@/app/redux/features/columnsSlice";

export const store = configureStore({
  reducer: { countryReducer, columnsReducer },
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
