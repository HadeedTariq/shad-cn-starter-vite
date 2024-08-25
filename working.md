<!-- ! Features -->
=>Create Heading in the canvas card
=>Change the font,color,size of selected Text
=>Create Drawing In Canvas Card <!---done
=>Create undo and redo functionality Text
=>Create undo and redo functionality Drawing
=>Change font of selected text
=>Create Shapes In Canvas Card

<!-- ! Implementation -->
->For creating headings in canvas we push heading according to it's type and id into the current canvas heading array for editing the text we double click on it.Elem id and Elem Text goes into editable text component and when user update the text and click on save button we will change the text globally
->For changing color whenever user select any elemen the style bar appears on the top of the canvas and user can change the size,color,font of the selected elem
=>For creating undo redo functionality for heading user must change the heading then we show undo redo functionality if user click on undo he goes back to last text and if do redo he goes to next text and when there is no text further than redo is disabled and when their is no back text left then the undo is disabled for this we get currentUndoRedo text index if index is 0 then we disabled undo button and if index is last index then we disabled redo button
->For creating undo redo functionlity for drawing we need to maintain the drawing in other array and need to maintain a currentUndoRedoIndex So that when the index is zero the undo is disabled and whe index is lastIndex redo is disabled
so if we go to combine reducer then all the reducer are combine in designReducer then how does it work
->Whenever user select a text it's id is stored in the selectedTextId and when user click on font from side bar selectedTextId font will be changed to clicked font