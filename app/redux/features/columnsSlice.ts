import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Column, { Publisher } from "@/models/Column";

type ColumnsState = Column[];

const initialState = [
  {
    id: 0,
    parent_category: {
      name: "",
      id: 0,
    },
    subcategory: {
      name: "",
      id: 0,
    },
    urls: [],
    publishers: [],
    banner_volume: {
      value: 0,
      cpm: "0.00",
    },
    video_volume: {
      value: 0,
      cpm: "0.00",
    },
    native_volume: {
      value: 0,
      cpm: "0.00",
    },
  },
] as ColumnsState;

// const formatNumber = (numString: string) => {
//   return parseInt(numString).toFixed(2);
// };

export const columns = createSlice({
  name: "columns",
  initialState,
  reducers: {
    reset: () => initialState,
    updateCategory: (
      state,
      action: PayloadAction<{
        category: { name: string; id: number };
        type: string;
        id: number;
      }>
    ) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      state[index][action.payload.type] = action.payload.category;
      return state;
    },
    updateVolume: (
      state,
      action: PayloadAction<{
        volume: number;
        id: number;
      }>
    ) => {
      const index: number = state.findIndex((s) => s.id === action.payload.id);
      const volume = action.payload.volume;
      state[index]!.banner_volume!.value = volume;
      state[index]!.video_volume!.value = Math.round(volume * 0.5);
      state[index]!.native_volume!.value = Math.round(volume * 0.5 * 0.15);

      return state;
    },
    updateCpm: (
      state,
      action: PayloadAction<{
        cpm: { banner: string; video: string; native: string };
        id: number;
      }>
    ) => {
      console.log(action.payload.cpm);
      const index: number = state.findIndex((s) => s.id === action.payload.id);
      state[index]!.banner_volume!.cpm = `${action.payload.cpm.banner}.00`;
      state[index]!.video_volume!.cpm = `${action.payload.cpm.video}.00`;
      state[index]!.native_volume!.cpm = `${action.payload.cpm.native}.00`;
      return state;
    },
    updateUrl: (
      state,
      action: PayloadAction<{ id: number; urls: string[] }>
    ) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      state[index] = { ...state[index], urls: action.payload.urls };
      return state;
    },
    updatePublishers: (
      state,
      action: PayloadAction<{ id: number; publishers: Publisher[] }>
    ) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      state[index] = { ...state[index], publishers: action.payload.publishers };
      return state;
    },
    addColumn: (state) => {
      const id = state.length;
      state.push({ ...initialState[0], id });
      return state;
    },
  },
});

export const {
  updateCategory,
  updateVolume,
  updateCpm,
  updateUrl,
  updatePublishers,
  addColumn,
} = columns.actions;
export default columns.reducer;
