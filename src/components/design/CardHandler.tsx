import { useDesign } from "@/hooks/useDesign";
import { setCanvasBackground } from "@/reducers/designReducer";
import { useDispatch } from "react-redux";
const CardHandler = () => {
  const dispatch = useDispatch();
  const { canvasBackground } = useDesign();
  return (
    <div>
      <input
        type="color"
        className="w-[40px] h-[40px]"
        value={canvasBackground}
        onChange={(e) => dispatch(setCanvasBackground(e.target.value))}
      />
    </div>
  );
};

export default CardHandler;
