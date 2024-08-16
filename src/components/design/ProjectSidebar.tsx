import { useState } from "react";
import DrawingSheet from "./DrawingSheet";
import Pen from "./Pen";
import Text from "./Text";

const ProjectSidebar = () => {
  const [tools, setTools] = useState({
    pen: false,
    text: false,
  });
  return (
    <div className="flex gap-1 w-fit">
      <div className="relative transition-all duration-[450ms] ease-in-out w-16 h-[92.5vh]">
        <article className="border border-solid border-gray-700 w-full ease-in-out duration-500 h-full left-0 rounded-[3px] inline-block shadow-lg shadow-black/15 bg-white ">
          <DrawingSheet open={tools} setOpen={setTools} />
        </article>
      </div>
      {tools.pen && (
        <div
          className={`flex flex-col gap-2 ease-in-out duration-300 border-r-2 ${
            tools.pen ? "translate-x-0 w-[250px]" : "translate-x-[-200px] w-0"
          }`}
          onBlur={() => setTools({ pen: false, text: false })}
        >
          <Pen />
        </div>
      )}
      {tools.text && (
        <div
          className={`flex flex-col gap-2 ease-in-out duration-300 border-r-2 ${
            tools.text ? "translate-x-0 w-[250px]" : "translate-x-[-200px] w-0"
          }`}
        >
          <Text />
        </div>
      )}
    </div>
  );
};

export default ProjectSidebar;
