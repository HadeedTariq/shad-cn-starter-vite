import { useDesign } from "@/hooks/useDesign";
import {
  changeSelectedTextColor,
  changeSelectedTextPosition,
  changeSelectedTextWidth,
  deleteSelectedText,
  undoRedoText,
} from "@/reducers/designReducer";
import { AlignCenter, ListStart, Redo2, Trash, Undo2 } from "lucide-react";
import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";

type CustomEditorProps = {
  elemId: string;
  setStyleElem: React.Dispatch<
    React.SetStateAction<{
      id: string;
      type: string;
    }>
  >;
};

const CustomHeadingEditor = (
  { elemId, setStyleElem }: CustomEditorProps,
  ref: any
) => {
  const { currentTexts, changeTexts, currentUndoRedoTextIndex } = useDesign();
  const currentUndoRedoText = changeTexts.find((text) => text.id === elemId);

  const dispatch = useDispatch();
  const selectedText = currentTexts.find((text) => text.id === elemId);

  const [color, setColor] = useState(selectedText?.color);
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
      <div className="flex items-center gap-2">
        <Button
          disabled={
            currentUndoRedoText &&
            (currentUndoRedoText.texts.length < 2 ||
              currentUndoRedoTextIndex === 0)
          }
          onClick={() => dispatch(undoRedoText({ type: "undo", id: elemId }))}
          className="bg-none disabled:cursor-not-allowed"
          variant={"outline"}
        >
          <Undo2 className="cursor-pointer  hover:text-violet-500 transition-colors duration-500 " />
        </Button>
        <Button
          disabled={
            currentUndoRedoText &&
            (currentUndoRedoText.texts.length < 2 ||
              currentUndoRedoTextIndex === currentUndoRedoText.texts.length - 1)
          }
          onClick={() => dispatch(undoRedoText({ type: "redo", id: elemId }))}
          className="bg-none disabled:cursor-not-allowed"
          variant={"outline"}
        >
          <Redo2 className="cursor-pointer  hover:text-violet-500 transition-colors duration-500 " />
        </Button>
      </div>
    </div>
  );
};

export default forwardRef(CustomHeadingEditor);
