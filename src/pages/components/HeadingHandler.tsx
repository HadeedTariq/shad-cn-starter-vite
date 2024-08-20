import { useDesign } from "@/hooks/useDesign";
import { Text } from "react-konva";

type HeadingHandlerProps = {
  onClick: (e: any, elemId: string) => void;
  onDblClick: (id: string, value: string) => void;
};
const HeadingHandler = ({ onClick, onDblClick }: HeadingHandlerProps) => {
  const { currentTexts, currentDesignType } = useDesign();

  return (
    <>
      {currentTexts?.map((text) => (
        <Text
          key={text.id}
          id={text.id}
          x={200}
          y={240}
          text={text.value}
          onDblClick={() => onDblClick(text.id, text.value)}
          onClick={(e) => onClick(e, text.id)}
          draggable={currentDesignType === "select"}
          fontSize={text.fontSize}
          fontStyle={text.fontStyle}
          fill={text.color}
          align={text.position}
          wrap="word"
          width={text.width}
        />
      ))}
    </>
  );
};

export default HeadingHandler;
