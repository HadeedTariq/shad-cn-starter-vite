import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import {
  changeSelectedTextValue,
  updateCurrentSelectedTextInChangeText,
} from "@/reducers/designReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";

type HeadingEditorProps = {
  textId: string;
  textValue: string;
  setSelectedElem: (
    value: React.SetStateAction<{
      elemId: string;
      elemValue: string;
    }>
  ) => void;
};
const HeadingEditor = ({
  textId,
  textValue,
  setSelectedElem,
}: HeadingEditorProps) => {
  const dispatch = useDispatch();
  const [elemVal, setElemVal] = useState(textValue);
  const saveElemVal = () => {
    dispatch(
      changeSelectedTextValue({
        id: textId,
        value: elemVal,
      })
    );
    dispatch(
      updateCurrentSelectedTextInChangeText({
        id: textId,
        value: elemVal,
      })
    );
    setSelectedElem({
      elemId: "",
      elemValue: "",
    });
  };
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Your text</AlertDialogTitle>
          <Input value={elemVal} onChange={(e) => setElemVal(e.target.value)} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              setSelectedElem({
                elemId: "",
                elemValue: "",
              })
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={saveElemVal}>Done</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HeadingEditor;
