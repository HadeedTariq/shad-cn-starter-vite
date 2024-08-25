import { displayfonts, realFonts } from "@/lib/fonts";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { changeSelectedTextFont } from "@/reducers/designReducer";

const FontsHandler = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-2">
      <h4 className="my-2 font-open-sans text-xl font-bold text-center">
        Select Font
      </h4>
      {displayfonts.map((font, key) => (
        <Button
          key={key}
          variant={"outline"}
          onClick={() =>
            dispatch(changeSelectedTextFont({ font: realFonts[key] }))
          }
        >
          {font}
        </Button>
      ))}
    </div>
  );
};

export default FontsHandler;
