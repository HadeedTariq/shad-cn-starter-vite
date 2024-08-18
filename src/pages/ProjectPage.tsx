import { useDesign } from "@/hooks/useDesign";

import { useRef, useState } from "react";
import { Layer, Rect, Stage, Text, Transformer } from "react-konva";
import HeadingEditor from "./components/HeadingEditor";
import CustomEditor from "@/components/design/CustomEditor";

const ProjectPage = () => {
  const { currentTexts } = useDesign();
  const [styleElem, setStyleElem] = useState({
    id: "",
  });
  const [selectedElem, setSelectedElem] = useState({
    elemId: "",
    elemValue: "",
  });
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const onClick = (e: any, elemId: string) => {
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
    setStyleElem({ id: elemId });
  };

  const onDblClick = (id: string, value: string) => {
    setSelectedElem({
      elemId: id,
      elemValue: value,
    });
  };

  return (
    <div className="flex flex-col w-full">
      {styleElem.id && <CustomEditor elemId={styleElem.id} />}
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
                setStyleElem({ id: "" });
              }}
            />
            {currentTexts?.map((text) => (
              <Text
                key={text.id}
                id={text.id}
                x={200}
                y={240}
                text={text.value}
                onDblClick={() => onDblClick(text.id, text.value)}
                onClick={(e) => onClick(e, text.id)}
                draggable
                fontSize={text.fontSize}
                fontStyle={text.fontStyle}
                fill={text.color}
                align={text.position}
                wrap="word"
                width={text.width}
              />
            ))}

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
    </div>
  );
};

export default ProjectPage;
