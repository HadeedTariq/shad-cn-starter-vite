import { useEffect, useRef, useState } from "react";
import { Layer, Line, Rect, Stage, Transformer } from "react-konva";
import HeadingEditor from "./components/HeadingEditor";
import CustomEditor from "@/components/design/CustomEditor";
import HeadingHandler from "./components/HeadingHandler";
import { useDesign } from "@/hooks/useDesign";
import { KonvaEventObject } from "konva/lib/Node";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { createDrawings, setCurrentDesignType } from "@/reducers/designReducer";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const [styleElem, setStyleElem] = useState({
    id: "",
  });
  const { drawings, currentDesignType, drawindStyle } = useDesign();
  const [selectedElem, setSelectedElem] = useState({
    elemId: "",
    elemValue: "",
  });
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const currentShapeRef = useRef<any>(null);
  const isPainting = useRef<any>(null);
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
  const onPointerDown = (e: KonvaEventObject<PointerEvent>) => {
    if (currentDesignType === "drawing" || currentDesignType === "shapes") {
      const stage = stageRef.current;
      const { x, y } = stage.getPointerPosition();
      const id = uuid();
      isPainting.current = true;
      currentShapeRef.current = id;
      switch (currentDesignType) {
        case "drawing":
          dispatch(
            createDrawings([
              ...drawings,
              {
                color: drawindStyle.color,
                id,
                points: [x, y],
                width: drawindStyle.width,
              },
            ])
          );
          break;
      }
    } else {
      return;
    }
  };
  const onPointerMove = (e: KonvaEventObject<PointerEvent>) => {
    if (!isPainting.current) return;
    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = currentShapeRef.current;
    switch (currentDesignType) {
      case "drawing":
        const newDrawings = drawings.map((drawing) => {
          if (drawing.id === id) {
            return {
              ...drawing,
              points: [...drawing.points, x, y],
            };
          }
          return drawing;
        });
        dispatch(createDrawings(newDrawings));
    }
  };
  const onPointerUp = () => {
    isPainting.current = false;
  };

  const onClickDrawing = (e: any, drawingId: string) => {
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
    dispatch(setCurrentDesignType("select"));
  };

  return (
    <div className="flex flex-col w-full">
      {styleElem.id && (
        <CustomEditor
          ref={transformerRef}
          elemId={styleElem.id}
          setStyleElem={setStyleElem}
        />
      )}
      <div className="flex items-center justify-center w-full h-[93vh] bg-gray-200">
        <Stage
          height={window.innerHeight - 100}
          width={window.innerWidth - 840}
          className={`w-[40%] bg-white h-[90%] ${
            (currentDesignType === "drawing" && "cursor-crosshair") ||
            (currentDesignType === "shapes" && "cursor-cell")
          }`}
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
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
                draggable={currentDesignType === "select"}
                onClick={(e) => onClickDrawing(e, drawing.id)}
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
