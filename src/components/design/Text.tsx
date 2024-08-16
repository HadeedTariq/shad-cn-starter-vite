import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { updateCurrentTexts } from "@/reducers/designReducer";
import { v4 as uuid } from "uuid";

export default function Text() {
  const dispatch = useDispatch();
  const createTextBox = (type: string, value: string) => {
    switch (type) {
      case "heading":
        dispatch(
          updateCurrentTexts({
            id: uuid(),
            value,
          })
        );
        break;
      case "sub-heading":
        break;
      case "paragraph":
        break;
    }
  };
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
      <Button className="text-[18px] h-[60px] hover:bg-slate-300 bg-slate-200 text-black font-semibold">
        Add a sub heading
      </Button>
      <Button className="text-[14px] h-[60px] hover:bg-slate-300 bg-slate-200 text-black ">
        Add a paragraph
      </Button>
    </div>
  );
}
