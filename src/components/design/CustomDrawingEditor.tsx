import { useDesign } from "@/hooks/useDesign";
import {
  changeSelectedDrawingColor,
  changeSelectedDrawingWidth,
  deleteSelectedDrawing,
} from "@/reducers/designReducer";
import { Trash } from "lucide-react";
import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";

type CustomEditorProps = {
  elemId: string;
  setStyleElem: React.Dispatch<
    React.SetStateAction<{
      id: string;
      type: string;
    }>
  >;
};

const CustomDrawingEditor = (
  { elemId, setStyleElem }: CustomEditorProps,
  ref: any
) => {
  const { drawings } = useDesign();
  const dispatch = useDispatch();
  const selecteDrawing = drawings.find((drawing) => drawing.id === elemId);
  if (!selecteDrawing) return;
  const [color, setColor] = useState(selecteDrawing.color);
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    dispatch(changeSelectedDrawingColor({ id: elemId, color: e.target.value }));
  };
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeSelectedDrawingWidth({ id: elemId, width: Number(e.target.value) })
    );
  };
  const deleteText = () => {
    dispatch(deleteSelectedDrawing(elemId));
    setStyleElem({ id: "", type: "" });
    ref.current.nodes([]);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        className="rounded-full w-[30px]"
        color={color}
        onChange={handleColorChange}
      />
      <div className="flex items-center gap-1 mx-2">
        <p>Width:</p>
        <input type="range" max={"10"} onChange={handleWidthChange} />
      </div>
      <Trash
        cursor={"pointer"}
        className="w-[20px] h-[20px] text-red-600 hover:text-red-400"
        onClick={deleteText}
      />
    </div>
  );
};

export default forwardRef(CustomDrawingEditor);
