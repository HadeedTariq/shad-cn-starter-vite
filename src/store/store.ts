import fullAppReducer, { FullAppState } from "@/reducers/fullAppReducer";
import designReducer, { DesignState } from "@/reducers/designReducer";
import { configureStore } from "@reduxjs/toolkit";

// ! All reducers types are defined here to use in selectors
export interface StoreState {
  fullAppReducer: FullAppState;
  designReducer: DesignState;
}

export const store = configureStore({
  reducer: {
    fullAppReducer,
    designReducer,
  },
});
