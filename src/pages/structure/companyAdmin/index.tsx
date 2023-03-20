
import  { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import organization from "./org.json";
import {
  StructureMinus,
  StructureAdd,
} from "../../../assets/images";
import Node from "./Node";
import "./style.scss";

export default function Structure(props: any) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const style = {
    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
  };
  function handleZoomIn() {
    setScale(scale * 1.2);
  }
  function handleZoomOut() {
    setScale(scale * 0.8);
  }

  return (
    <div className="w-[100%]">
      <div className="flex flex-col justify-center w-[40px] h-[80px] white-bg-color zoom-button float-right ">
        <div className="m-2">
          <StructureAdd onClick={handleZoomIn} />
        </div>
        <div className="m-2">
          <StructureMinus onClick={handleZoomOut} />
        </div>
      </div>
      <div className="structure h-[150vh] relative ">
        <div style={style}>
          <DndProvider backend={HTML5Backend}>
            <div>
              <Node o={organization} />
            </div>
          </DndProvider>
        </div>
      </div>
    </div>
  );
}
