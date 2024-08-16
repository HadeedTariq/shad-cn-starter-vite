import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useDesign = () => {
  const designReducer = useSelector((state: StoreState) => state.designReducer);
  return { ...designReducer };
};
