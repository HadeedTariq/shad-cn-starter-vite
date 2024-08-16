import { createSlice } from "@reduxjs/toolkit";

export type DesignText = {
  id: string;
  value: string;
};
export type DesignState = {
  currentTextType: string;
  currentTexts: DesignText[];
};

const initialState: DesignState = {
  currentTextType: "",
  currentTexts: [],
};

const designReducer = createSlice({
  name: "designReducer",
  initialState,
  reducers: {
    setCurrentTextType(state, { payload }: { payload: string }) {
      state.currentTextType = payload;
    },
    updateCurrentTexts(state, { payload }: { payload: DesignText }) {
      state.currentTexts.push(payload);
    },
    changeSelectedTextValue(
      state,
      { payload }: { payload: { id: string; value: string } }
    ) {
      const elem = state.currentTexts.find((text) => text.id === payload.id);
      // elem?.value=payload.value;
    },
  },
});

export const { setCurrentTextType, updateCurrentTexts } = designReducer.actions;
export default designReducer.reducer;
