import { ALargeSmall, Pen, RemoveFormatting, Shapes } from "lucide-react";

type TextSheetProps = {
  open: {
    pen: boolean;
    text: boolean;
    shapes: boolean;
    fonts: boolean;
  };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      pen: boolean;
      text: boolean;
      shapes: boolean;
      fonts: boolean;
    }>
  >;
};

export default function DrawingSheet({ setOpen, open }: TextSheetProps) {
  return (
    <>
      <label
        htmlFor="dashboard"
        className={`has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out z-50 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center cursor-pointer text-black rounded-xl hover:bg-blue-500 hover:bg-opacity-25 hover:scale-75 duration-500 ${
          open.fonts ? "bg-blue-300 scale-75" : ""
        }`}
        onClick={() => {
          setOpen({
            pen: false,
            text: false,
            shapes: false,
            fonts: false,
          });
          if (open.fonts) return;
          setTimeout(() => {
            setOpen({
              pen: false,
              text: false,
              shapes: false,
              fonts: true,
            });
          }, 400);
        }}
      >
        <ALargeSmall cursor={"pointer"} size={20} />
      </label>
      <label
        htmlFor="dashboard"
        className={`has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out z-50 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center cursor-pointer text-black rounded-xl hover:bg-blue-500 hover:bg-opacity-25 hover:scale-75 duration-500 ${
          open.text ? "bg-blue-300 scale-75" : ""
        }`}
        onClick={() => {
          setOpen({
            pen: false,
            text: false,
            shapes: false,
            fonts: false,
          });
          if (open.text) return;
          setTimeout(() => {
            setOpen({
              pen: false,
              text: true,
              shapes: false,
              fonts: false,
            });
          }, 400);
        }}
      >
        <RemoveFormatting cursor={"pointer"} size={20} />
      </label>
      <label
        htmlFor="profile"
        className={`has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out z-50 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center cursor-pointer text-black rounded-xl hover:bg-blue-500 hover:bg-opacity-25 hover:scale-75 duration-500 ${
          open.pen ? "bg-blue-300 scale-75" : ""
        }`}
        onClick={() => {
          setOpen({
            pen: false,
            text: false,
            shapes: false,
            fonts: false,
          });
          if (open.pen) return;
          setTimeout(() => {
            setOpen({
              pen: true,
              text: false,
              shapes: false,
              fonts: false,
            });
          }, 400);
        }}
      >
        <Pen cursor={"pointer"} size={20} />
      </label>
      <label
        htmlFor="profile"
        className={`has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out z-50 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center cursor-pointer text-black rounded-xl hover:bg-blue-500 hover:bg-opacity-25 hover:scale-75 duration-500 ${
          open.shapes ? "bg-blue-300 scale-75" : ""
        }`}
        onClick={() => {
          setOpen({
            pen: false,
            text: false,
            shapes: false,
            fonts: false,
          });
          if (open.shapes) return;
          setTimeout(() => {
            setOpen({
              pen: false,
              text: false,
              shapes: true,
              fonts: false,
            });
          }, 400);
        }}
      >
        <Shapes cursor={"pointer"} size={20} />
      </label>
    </>
  );
}
