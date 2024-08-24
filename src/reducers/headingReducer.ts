import { createSlice } from "@reduxjs/toolkit";

export type DesignText = {
  id: string;
  value: string;
  type: string;
  color: string;
  fontSize: number;
  fontStyle: string;
  position: string;
  width: number;
};
export type UndoRedoTextType = {
  id: string;
  texts: string[];
};
export type UndoRedoType = {
  id: string;
  texts: string[];
};

export type DesignType = "text" | "drawing" | "shapes" | "select";
export type HeadingState = {
  currentDesignType: DesignType;
  currentTexts: DesignText[];
  changeTexts: UndoRedoTextType[];
  currentUndoRedoTextIndex: number;
};
const headinState: HeadingState = {
  currentDesignType: "text",
  currentTexts: [],
  changeTexts: [],
  currentUndoRedoTextIndex: 0,
};
export const headingReducer = createSlice({
  name: "headingReducer",
  initialState: headinState,
  reducers: {
    setCurrentDesignType(state, { payload }: { payload: DesignType }) {
      state.currentDesignType = payload;
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
    changeSelectedTextColor(
      state,
      { payload }: { payload: { id: string; color: string } }
    ) {
      const currentTexts = [...state.currentTexts];
      const elem = currentTexts.find((text) => text.id === payload.id);
      const elemIndex = currentTexts.findIndex(
        (text) => text.id === payload.id
      );
      if (!elem) return;
      elem.color = payload.color;
      currentTexts[elemIndex] = elem;
      state.currentTexts = currentTexts;
    },
    changeSelectedTextPosition(
      state,
      { payload }: { payload: { id: string; position: string } }
    ) {
      const currentTexts = [...state.currentTexts];
      const elem = currentTexts.find((text) => text.id === payload.id);
      const elemIndex = currentTexts.findIndex(
        (text) => text.id === payload.id
      );
      if (!elem) return;
      elem.position = payload.position;
      currentTexts[elemIndex] = elem;
      state.currentTexts = currentTexts;
    },
    changeSelectedTextWidth(
      state,
      { payload }: { payload: { id: string; width: number } }
    ) {
      const currentTexts = [...state.currentTexts];
      const elem = currentTexts.find((text) => text.id === payload.id);
      const elemIndex = currentTexts.findIndex(
        (text) => text.id === payload.id
      );
      if (!elem) return;
      elem.width = payload.width;
      currentTexts[elemIndex] = elem;
      state.currentTexts = currentTexts;
    },
    undoRedoText(
      state,
      { payload }: { payload: { type: "undo" | "redo"; id: string } }
    ) {
      const currentTextsClone = [...state.currentTexts];
      const changeTextClones = [...state.changeTexts];
      const changeText = changeTextClones.find((t) => t.id === payload.id);
      // const changeTextIndex = changeTextClones.findIndex((t) => t.id === payload.id);
      const currentText = currentTextsClone.find(
        (text) => text.id === payload.id
      );
      const currentTextIndex = currentTextsClone.findIndex(
        (text) => text.id === payload.id
      );
      if (!currentText || !changeText) return;
      switch (payload.type) {
        case "undo":
          currentText.value =
            changeText.texts[state.currentUndoRedoTextIndex - 1];
          state.currentUndoRedoTextIndex = state.currentUndoRedoTextIndex - 1;
          currentTextsClone[currentTextIndex] = currentText;
          state.currentTexts = currentTextsClone;
          break;
        case "redo":
          currentText.value =
            changeText.texts[state.currentUndoRedoTextIndex + 1];
          state.currentUndoRedoTextIndex = state.currentUndoRedoTextIndex + 1;
          currentTextsClone[currentTextIndex] = currentText;
          state.currentTexts = currentTextsClone;
          break;
      }
    },
    updateTextRecord(state, { payload }: { payload: UndoRedoTextType }) {
      state.changeTexts.push(payload);
    },
    updateCurrentSelectedTextInChangeText(
      state,
      { payload }: { payload: { id: string; value: string } }
    ) {
      const changeTextClones = [...state.changeTexts];
      const text = changeTextClones.find((t) => t.id === payload.id);
      const textIndex = changeTextClones.findIndex((t) => t.id === payload.id);
      if (!text) return;
      text.texts.push(payload.value);
      state.currentUndoRedoTextIndex = text.texts.length - 1;
      changeTextClones[textIndex] = text;
      state.changeTexts = changeTextClones;
    },
    deleteSelectedText(state, { payload }: { payload: string }) {
      const currentTextsClone = [...state.currentTexts];
      const newTexts = currentTextsClone.filter((text) => text.id !== payload);
      state.currentTexts = newTexts;
    },
  },
});
