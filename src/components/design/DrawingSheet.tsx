import { Pen, RemoveFormatting } from "lucide-react";

type TextSheetProps = {
  open: {
    pen: boolean;
    text: boolean;
  };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      pen: boolean;
      text: boolean;
    }>
  >;
};

export default function DrawingSheet({ setOpen }: TextSheetProps) {
  return (
    <>
      <label
        htmlFor="dashboard"
        className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out z-50 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center cursor-pointer text-black rounded-xl hover:bg-blue-500 hover:bg-opacity-25 hover:scale-75 duration-500"
        onClick={() => {
          setOpen({
            pen: false,
            text: true,
          });
        }}
      >
        <RemoveFormatting cursor={"pointer"} size={20} />
      </label>
      <label
        htmlFor="profile"
        className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out z-50 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center cursor-pointer text-black rounded-xl hover:bg-blue-500 hover:bg-opacity-25 hover:scale-75 duration-500  "
        onClick={() => {
          setOpen({
            pen: true,
            text: false,
          });
        }}
      >
        <Pen cursor={"pointer"} size={20} />
      </label>
    </>
  );
}
