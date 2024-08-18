import { useDesign } from "@/hooks/useDesign";
import { changeSelectedTextColor } from "@/reducers/designReducer";
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
  return (
    <div>
      <input
        type="color"
        className="rounded-full w-[30px]"
        color={color}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default CustomEditor;
