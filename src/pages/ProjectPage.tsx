import { useRef, useState } from "react";
import { Layer, Line, Rect, Stage, Transformer } from "react-konva";
import HeadingEditor from "./components/HeadingEditor";
import CustomEditor from "@/components/design/CustomEditor";
import HeadingHandler from "./components/HeadingHandler";
import { useDesign } from "@/hooks/useDesign";

const ProjectPage = () => {
  const [styleElem, setStyleElem] = useState({
    id: "",
  });
  const { drawings } = useDesign();
  const [selectedElem, setSelectedElem] = useState({
    elemId: "",
    elemValue: "",
  });
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const onClickHeading = (e: any, elemId: string) => {
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
    setStyleElem({ id: elemId });
  };
  const onDblClickHeading = (id: string, value: string) => {
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
            <HeadingHandler
              onClick={(e: any, elemId: string) => onClickHeading(e, elemId)}
              onDblClick={(id: string, value: string) =>
                onDblClickHeading(id, value)
              }
            />
            {drawings?.map((drawing) => (
              <Line
                key={drawing.id}
                id={drawing.id}
                points={drawing.points}
                stroke={`${drawing.color}`}
                strokeWidth={drawing.width}
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
