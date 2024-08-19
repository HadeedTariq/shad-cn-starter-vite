import { setCurrentDesignType } from "@/reducers/designReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Pen() {
  const [color, setColor] = useState("#aabbcc");
  const [value, setValue] = useState(2);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };
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
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-lg font-semibold my-1">Stroke Color</p>
      <input
        className="mx-auto"
        type="color"
        color={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}
