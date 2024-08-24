import designReducer from "@/reducers/designReducer";
import { DrawingState } from "@/reducers/drawingReducer";
import fullAppReducer, { FullAppState } from "@/reducers/fullAppReducer";
import { HeadingState } from "@/reducers/headingReducer";
import { configureStore } from "@reduxjs/toolkit";

// ! All reducers types are defined here to use in selectors
export interface StoreState {
  fullAppReducer: FullAppState;
  designReducer: {
    drawing: DrawingState;
    heading: HeadingState;
  };
}

export const store = configureStore({
  reducer: {
    fullAppReducer,
    designReducer,
  },
});
