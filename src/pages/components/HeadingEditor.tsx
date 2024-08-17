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
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Your heading</AlertDialogTitle>
          <Input value={textValue} />
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
          <AlertDialogAction>Done</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HeadingEditor;
