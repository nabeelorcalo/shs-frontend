import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import organization from "./org.json";
import {
  StructureMinus,
  StructureAdd,
} from "../../../assets/images";

import "../style.scss";
import Node from "./Node";
import { PageHeader } from "../../../components";

export default function Structure(props: any) {
  const [scale, setScale] = useState(1);
  const [marginTop , setMarginTop] = useState("20%")
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const style = {
    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
    marginTop:marginTop
  };
  function handleZoomIn() {
    setScale(scale * 1.2);
  }
  function handleZoomOut() {
    setScale(scale * 0.8);
  }

  return (
    <>
      <PageHeader title="Struture" actions bordered />
      <div className="w-[100%] struture-wrapper ">
        <div className="flex flex-col justify-center w-[40px] h-[80px] white-bg-color float-right ml-5 ">
          <div className="m-2">
            <StructureAdd onClick={handleZoomIn} />
          </div>
          <div className="m-2">
            <StructureMinus onClick={handleZoomOut} />
          </div>
        </div>
        <div className="structure h-[150vh] relative pt-4 ">
          <div style={style}>
            <DndProvider backend={HTML5Backend}>
              <div >
                <Node o={organization} setMarginTop={setMarginTop} />
              </div>
            </DndProvider>
          </div>
        </div>
      </div>
    </>
  );
}
