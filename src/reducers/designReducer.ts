import { combineReducers } from "@reduxjs/toolkit";
import { drawingReducer, DrawingType } from "./drawingReducer";
import {
  DesignText,
  DesignType,
  headingReducer,
  UndoRedoTextType,
} from "./headingReducer";
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
  undoDrawingArray: DrawingType[];
};

const designReducer = combineReducers({
  heading: headingReducer.reducer,
  drawing: drawingReducer.reducer,
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
} = headingReducer.actions;
export const {
  createDrawings,
  updateDrawingStyle,
  changeSelectedDrawingWidth,
  changeSelectedDrawingColor,
  deleteSelectedDrawing,
  undoRedoDrawing,
  increaseDrawingUndoRedoIndex,
} = drawingReducer.actions;
export default designReducer;
