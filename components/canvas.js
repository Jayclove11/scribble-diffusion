import * as React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

import { Undo as UndoIcon, Trash as TrashIcon } from "lucide-react";

export default function Canvas({ onScribble }) {
  const canvasRef = React.useRef(null);

  const onChange = async () => {
    const paths = await canvasRef.current.exportPaths();

    // only respond if there are paths to draw (don't want to send a blank canvas)
    if (!paths.length) {
      return;
    }

    const data = await canvasRef.current.exportImage("png");
    onScribble(data);
  };

  const undo = () => {
    canvasRef.current.undo();
  };

  const reset = () => {
    canvasRef.current.resetCanvas();
  };

  // const paths = await canvasRef.current.exportPaths();

  return (
    <div>
      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square"
        strokeWidth={4}
        strokeColor="black"
        onChange={onChange}
      />

      <button className="lil-button" onClick={undo}>
        <UndoIcon className="icon" />
        Undo last stroke
      </button>

      <button className="lil-button" onClick={reset}>
        <TrashIcon className="icon" />
        Clear canvas
      </button>
    </div>
  );
}