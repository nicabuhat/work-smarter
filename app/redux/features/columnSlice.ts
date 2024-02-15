import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Column from "@/models/Column";

type ColumnState = Column[];

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
    banner_volume: {
      value: 0,
      cpm: 0,
    },
    video_volume: {
      value: 0,
      cpm: 0,
    },
    native_volum: {
      value: 0,
      cpm: 0,
    },
  },
] as ColumnState;

export const column = createSlice({
  name: "column",
  initialState,
  reducers: {
    reset: () => initialState,
    setInitialId: (state) => {
      state[0].id = 1;
    },
    updateCategory: (
      state,
      action: PayloadAction<{
        category: { name: string; id: number };
        type: string;
      }>
    ) => {
      const col = state.find((s) => s.id === 1);
      col![action.payload.type] = action.payload.category;
      return state;
    },
    updateVolume: (
      state,
      action: PayloadAction<{
        volume: { value: number; cpm: number };
        type: string;
      }>
    ) => {
      const col = state.find((s) => s.id === 1);
      col![action.payload.type] = action.payload.volume;
      return state;
    },
  },
});

export const { setInitialId, updateCategory, updateVolume } = column.actions;
export default column.reducer;
