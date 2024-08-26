import { CSSProperties } from "react";
import { Text } from "react-konva";
import { Html } from "react-konva-utils";

type EditableTextInputProps = {
  x: number;
  y: number;
  isEditing: boolean;
  onToggleEdit: any;
  onChange: any;
  text: string;
  width: number;
  height: number;
};
const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

function getStyle(width: number, height: number) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    colour: "black",
    fontSize: "16px",
    fontFamily: "sans-serif",
  };
  if (isFirefox) {
    return baseStyle as CSSProperties;
  }
  return {
    ...baseStyle,
    margintop: "-4px",
  } as CSSProperties;
}
const EditableTextInput = ({
  height,
  isEditing,
  onChange,
  onToggleEdit,
  text,
  width,
  x,
  y,
}: EditableTextInputProps) => {
  function handleEscapeKeys(e: any) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      onToggleEdit(e);
    }
  }

  function handleTextChange(e: any) {
    onChange(e.currentTarget.value);
  }

  if (isEditing) {
    const style = getStyle(width, height);
    return (
      <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
        <textarea onChange={onChange} style={style} />
      </Html>
    );
  }
  return <Text x={x} y={y} width={width} text={text} />;
};

export default EditableTextInput;
