import { createSlice } from "@reduxjs/toolkit";

export type DrawingType = {
  width: number;
  color: string;
  id: string;
  points: number[];
};

export type DrawingState = {
  drawings: DrawingType[];
  drawindStyle: {
    color: string;
    width: number;
  };
  currentUndoRedoDrawingIndex: number;
  undoDrawingArray: DrawingType[];
  canvasBackground: string;
};
const drawingState: DrawingState = {
  drawings: [],
  undoDrawingArray: [],
  drawindStyle: {
    color: "black",
    width: 2,
  },
  currentUndoRedoDrawingIndex: 0,
  canvasBackground: "#e3e0e0",
};
export const drawingReducer = createSlice({
  name: "drawingReducer",
  initialState: drawingState,
  reducers: {
    createDrawings(state, { payload }: { payload: DrawingType[] }) {
      state.drawings = payload;
    },
    setCanvasBackground(state, { payload }: { payload: string }) {
      state.canvasBackground = payload;
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
    deleteSelectedDrawing(state, { payload }: { payload: string }) {
      const drawingsClone = [...state.drawings];
      const newDrawings = drawingsClone.filter(
        (drawing) => drawing.id !== payload
      );
      state.drawings = newDrawings;
      if (state.currentUndoRedoDrawingIndex !== 0) {
        state.currentUndoRedoDrawingIndex -= 1;
      }
    },
    undoRedoDrawing(
      state,
      { payload }: { payload: { type: "undo" | "redo" } }
    ) {
      switch (payload.type) {
        case "undo":
          const drawingsClone = [...state.drawings];
          const drawing = drawingsClone[drawingsClone.length - 1];
          state.undoDrawingArray.push(drawing);
          const newDrawings = drawingsClone.filter((d) => d.id !== drawing.id);
          state.drawings = newDrawings;
          if (newDrawings.length === 0) {
            state.currentUndoRedoDrawingIndex = 0;
          }
          break;
        case "redo":
          const lastDrawing = state.undoDrawingArray.pop();
          if (lastDrawing) {
            state.drawings.push(lastDrawing);
          }
          break;
      }
    },
    increaseDrawingUndoRedoIndex(state) {
      state.currentUndoRedoDrawingIndex += 1;
    },
  },
});
