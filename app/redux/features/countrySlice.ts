import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Country from "@/models/Country";

type CountryState = Country;

const initialState = {
  name: {
    common: "",
    official: "",
    nativeName: {
      eng: {
        official: "",
        common: "",
      },
    },
  },
  cca2: "",
  region: "",
} as CountryState;

export const country = createSlice({
  name: "country",
  initialState,
  reducers: {
    reset: () => initialState,
    setCountry: (state, action: PayloadAction<Country>) => {
      return action.payload;
    },
  },
});

export const { setCountry, reset } = country.actions;
export default country.reducer;
