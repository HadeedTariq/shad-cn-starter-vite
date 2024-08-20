import { useDesign } from "@/hooks/useDesign";
import {
  setCurrentDesignType,
  updateDrawingStyle,
} from "@/reducers/designReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Pen() {
  const { drawindStyle } = useDesign();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentDesignType("drawing"));
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold my-2">Stroke Width</p>
      <input
        type="range"
        min="0"
        max="10"
        value={drawindStyle.width}
        onChange={(e) =>
          dispatch(
            updateDrawingStyle({ styleName: "width", value: e.target.value })
          )
        }
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-lg font-semibold my-1">Stroke Color</p>
      <input
        className="mx-auto w-[40px] h-[40px]"
        type="color"
        color={drawindStyle.color}
        onChange={(e) =>
          dispatch(
            updateDrawingStyle({ styleName: "color", value: e.target.value })
          )
        }
      />
    </div>
  );
}
