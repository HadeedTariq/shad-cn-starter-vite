import { useDesign } from "@/hooks/useDesign";

import { useRef, useState } from "react";
import { Layer, Rect, Stage, Text, Transformer } from "react-konva";
import HeadingEditor from "./components/HeadingEditor";

const ProjectPage = () => {
  const { currentTexts } = useDesign();
  const [selectedElem, setSelectedElem] = useState({
    elemId: "",
    elemValue: "",
  });
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const onClick = (e: any) => {
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  };

  const onDblClick = (id: string, value: string) => {
    setSelectedElem({
      elemId: id,
      elemValue: value,
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-[93vh] bg-gray-200">
      <Stage
        height={window.innerHeight - 100}
        width={window.innerWidth - 840}
        className="w-[40%] bg-white h-[90%]"
        ref={stageRef}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            height={window.innerHeight}
            width={window.innerWidth}
            fill="#ffffff"
            id="bg"
            onClick={() => {
              transformerRef.current.nodes([]);
            }}
          />
          {currentTexts?.map(
            (text) =>
              (text.type === "heading" && (
                <Text
                  key={text.id}
                  id={text.id}
                  text={text.value}
                  onDblClick={() => onDblClick(text.id, text.value)}
                  onClick={onClick}
                  draggable
                  fontSize={30}
                  fontStyle="bold"
                />
              )) ||
              (text.type === "sub-heading" && (
                <Text
                  key={text.id}
                  id={text.id}
                  text={text.value}
                  onDblClick={() => onDblClick(text.id, text.value)}
                  onClick={onClick}
                  draggable
                  fontSize={24}
                  fontStyle="400"
                />
              )) ||
              (text.type === "paragraph" && (
                <Text
                  key={text.id}
                  id={text.id}
                  text={text.value}
                  onDblClick={() => onDblClick(text.id, text.value)}
                  onClick={onClick}
                  draggable
                  fontSize={18}
                  fontStyle="300"
                />
              ))
          )}

          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
      {selectedElem.elemId && (
        <HeadingEditor
          setSelectedElem={setSelectedElem}
          textId={selectedElem.elemId}
          textValue={selectedElem.elemValue}
        />
      )}
    </div>
  );
};

export default ProjectPage;
