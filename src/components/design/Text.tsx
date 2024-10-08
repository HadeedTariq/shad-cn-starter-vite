import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import {
  setCurrentDesignType,
  updateCurrentTexts,
  updateTextRecord,
} from "@/reducers/designReducer";

export default function Text() {
  const dispatch = useDispatch();
  const createTextBox = (type: string, value: string) => {
    switch (type) {
      case "heading":
        const id = uuid();
        dispatch(
          updateCurrentTexts({
            id,
            value,
            type: "heading",
            color: "black",
            fontSize: 30,
            fontStyle: "bold",
            position: "center",
            width: 200,
            fontFamily: "lato",
          })
        );
        dispatch(
          updateTextRecord({
            id,
            texts: [value],
          })
        );
        break;
      case "sub-heading":
        dispatch(
          updateCurrentTexts({
            id: uuid(),
            value,
            type: "sub-heading",
            color: "black",
            fontSize: 20,
            fontStyle: "400",
            position: "center",
            width: 170,
            fontFamily: "lato",
          })
        );
        break;
      case "paragraph":
        dispatch(
          updateCurrentTexts({
            id: uuid(),
            value,
            type: "paragraph",
            color: "black",
            fontSize: 14,
            fontStyle: "200",
            position: "center",
            width: 150,
            fontFamily: "lato",
          })
        );
        break;
    }
  };
  useEffect(() => {
    dispatch(setCurrentDesignType("text"));
    return () => {
      dispatch(setCurrentDesignType("select"));
    };
  }, []);
  return (
    <div className="flex flex-col px-[3px] gap-2">
      <h4 className="font-bold">Text</h4>
      <p className="text-[14px]">Add Text to your canvas</p>
      <Button>Add a text box</Button>
      <Button
        className="text-2xl h-[60px] hover:bg-slate-300 bg-slate-200 text-black font-bold"
        onClick={() => createTextBox("heading", "Heading")}
      >
        Add a heading
      </Button>
      <Button
        className="text-[18px] h-[60px] hover:bg-slate-300 bg-slate-200 text-black font-semibold"
        onClick={() => createTextBox("sub-heading", "Sub-Heading")}
      >
        Add a sub heading
      </Button>
      <Button
        onClick={() => createTextBox("paragraph", "Paragraph")}
        className="text-[14px] h-[60px] hover:bg-slate-300 bg-slate-200 text-black "
      >
        Add a paragraph
      </Button>
    </div>
  );
}
