import { useDesign } from "@/hooks/useDesign";
import {
  changeSelectedTextColor,
  changeSelectedTextPosition,
} from "@/reducers/designReducer";
import { AlignCenter, ListStart } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

type CustomEditorProps = {
  elemId: string;
};

const CustomEditor = ({ elemId }: CustomEditorProps) => {
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
    </div>
  );
};

export default CustomEditor;
