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
export type DrawingType = {
  width: number;
  color: string;
  id: string;
  points: number[];
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
export type DesignState = {
  currentDesignType: DesignType;
  currentTexts: DesignText[];
  drawings: DrawingType[];
  drawindStyle: {
    color: string;
    width: number;
  };
  changeTexts: UndoRedoTextType[];
  currentUndoRedoTextIndex: number;
  currentUndoRedoDrawingIndex: number;
  drawingClone: DrawingType[];
};

const initialState: DesignState = {
  currentDesignType: "text",
  currentTexts: [],
  drawings: [],
  drawingClone: [],
  changeTexts: [],
  drawindStyle: {
    color: "black",
    width: 2,
  },
  currentUndoRedoTextIndex: 0,
  currentUndoRedoDrawingIndex: 0,
};

const designReducer = createSlice({
  name: "designReducer",
  initialState,
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
    undoRedoDrawing(
      state,
      { payload }: { payload: { type: "undo" | "redo"; id: string } }
    ) {
      switch (payload.type) {
        case "undo":
          const drawings = state.drawingClone.filter(
            (drawing) => drawing.id !== payload.id
          );
          state.drawings = drawings;
          break;
        case "redo":
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
    changeSelectedDrawingWidth(
      state,
      { payload }: { payload: { id: string; width: number } }
    ) {
      const drawings = [...state.drawings];
      const elem = drawings.find((drawing) => drawing.id === payload.id);
      const elemIndex = drawings.findIndex(
        (drawing) => drawing.id === payload.id
      );
      if (!elem) return;
      elem.width = payload.width;
      drawings[elemIndex] = elem;
      state.drawings = drawings;
    },
    changeSelectedDrawingColor(
      state,
      { payload }: { payload: { id: string; color: string } }
    ) {
      const drawings = [...state.drawings];
      const elem = drawings.find((drawing) => drawing.id === payload.id);
      const elemIndex = drawings.findIndex(
        (drawing) => drawing.id === payload.id
      );
      if (!elem) return;
      elem.color = payload.color;
      drawings[elemIndex] = elem;
      state.drawings = drawings;
    },
    deleteSelectedText(state, { payload }: { payload: string }) {
      const currentTextsClone = [...state.currentTexts];
      const newTexts = currentTextsClone.filter((text) => text.id !== payload);
      state.currentTexts = newTexts;
    },
    createDrawings(state, { payload }: { payload: DrawingType[] }) {
      state.drawings = payload;
      state.drawingClone = payload;
      state.currentUndoRedoDrawingIndex += 1;
    },
    updateDrawingStyle(
      state,
      { payload }: { payload: { styleName: string; value: string | number } }
    ) {
      switch (payload.styleName) {
        case "color":
          state.drawindStyle.color = payload.value as string;
          break;
        case "width":
          state.drawindStyle.width = payload.value as number;
          break;
      }
    },
    deleteSelectedDrawing(state, { payload }: { payload: string }) {
      const drawingsClone = [...state.drawings];
      const newDrawings = drawingsClone.filter(
        (drawing) => drawing.id !== payload
      );
      const newDrawingsClone = state.drawingClone.filter(
        (drawing) => drawing.id !== payload
      );
      state.drawings = newDrawings;
      state.drawingClone = newDrawingsClone;
      if (state.currentUndoRedoDrawingIndex !== 0) {
        state.currentUndoRedoDrawingIndex -= 1;
      }
    },
  },
});

export const {
  setCurrentDesignType,
  updateCurrentTexts,
  changeSelectedTextValue,
  changeSelectedTextColor,
  changeSelectedTextPosition,
  changeSelectedTextWidth,
  deleteSelectedText,
  undoRedoText,
  updateTextRecord,
  updateCurrentSelectedTextInChangeText,
  createDrawings,
  updateDrawingStyle,
  changeSelectedDrawingWidth,
  changeSelectedDrawingColor,
  deleteSelectedDrawing,
  undoRedoDrawing,
} = designReducer.actions;
export default designReducer.reducer;
