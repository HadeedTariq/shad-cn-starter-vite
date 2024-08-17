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
      const currentTexts = [...state.currentTexts];
      const elem = currentTexts.find((text) => text.id === payload.id);
      const elemIndex = currentTexts.findIndex(
        (text) => text.id === payload.id
      );
      if (!elem) return;
      elem.value = payload.value;
      currentTexts[elemIndex] = elem;
      state.currentTexts = currentTexts;
    },
  },
});

export const {
  setCurrentTextType,
  updateCurrentTexts,
  changeSelectedTextValue,
} = designReducer.actions;
export default designReducer.reducer;
