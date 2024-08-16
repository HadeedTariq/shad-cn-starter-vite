import { useDesign } from "@/hooks/useDesign";
import { useRef, useState } from "react";
import {
  Circle,
  Group,
  Layer,
  Rect,
  Stage,
  Text,
  Transformer,
} from "react-konva";

const ProjectPage = () => {
  const { currentTexts } = useDesign();
  const [selectedId, setSelectedId] = useState("");
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const onClick = (e: any) => {
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  };

  const onDblClick = (id: string) => {
    setSelectedId(id);
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
          {currentTexts?.map((text) =>
            selectedId === text.id ? (
              <textarea
                key={text.id}
                value={text.value}
                className="text-black border-2 border-black bg-white text-lg"
              />
            ) : (
              <Text
                id={text.id}
                text={text.value}
                onDblClick={() => onDblClick(text.id)}
                onClick={onClick}
                draggable
                fontSize={24}
              />
            )
          )}

          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
};

export default ProjectPage;
