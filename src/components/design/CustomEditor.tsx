import { useDesign } from "@/hooks/useDesign";
import {
  changeSelectedTextColor,
  changeSelectedTextPosition,
  changeSelectedTextWidth,
  deleteSelectedText,
} from "@/reducers/designReducer";
import { AlignCenter, ListStart, Trash } from "lucide-react";
import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";

type CustomEditorProps = {
  elemId: string;
  setStyleElem: React.Dispatch<
    React.SetStateAction<{
      id: string;
    }>
  >;
};

const CustomEditor = (
  { elemId, setStyleElem }: CustomEditorProps,
  ref: any
) => {
  const { currentTexts } = useDesign();
  const dispatch = useDispatch();
  const selectedText = currentTexts.find((text) => text.id === elemId);
  if (!selectedText) return;
  const [color, setColor] = useState(selectedText.color);
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    dispatch(changeSelectedTextColor({ id: elemId, color: e.target.value }));
  };
  const handlePositionChange = (type: string) => {
    switch (type) {
      case "center":
        dispatch(
          changeSelectedTextPosition({ id: elemId, position: "center" })
        );
        break;
      case "start":
        dispatch(changeSelectedTextPosition({ id: elemId, position: "start" }));
        break;
    }
  };
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeSelectedTextWidth({ id: elemId, width: Number(e.target.value) })
    );
  };
  const deleteText = () => {
    dispatch(deleteSelectedText(elemId));
    setStyleElem({ id: "" });
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
      <ListStart
        cursor={"pointer"}
        onClick={() => handlePositionChange("start")}
        className=" hover:text-red-500 transition-colors duration-300"
      />
      <AlignCenter
        cursor={"pointer"}
        onClick={() => handlePositionChange("center")}
        className=" hover:text-red-500 transition-colors duration-300"
      />
      <div className="flex items-center gap-1 mx-2">
        <p>Width:</p>
        <input type="range" max={"300"} onChange={handleWidthChange} />
      </div>
      <Trash
        cursor={"pointer"}
        className="w-[20px] h-[20px] text-red-600 hover:text-red-400"
        onClick={deleteText}
      />
    </div>
  );
};

export default forwardRef(CustomEditor);
