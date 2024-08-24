import { DesignState } from "@/reducers/designReducer";
import { StoreState } from "@/store/store";
import { useSelector } from "react-redux";

export const useDesign = () => {
  const designReducer = useSelector((state: StoreState) => state.designReducer);
  const drawings = designReducer.drawing;
  const headings = designReducer.heading;
  return { ...drawings, ...headings } as DesignState;
};
