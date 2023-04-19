import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import organization from "./org.json";
import {
  StructureMinus,
  StructureAdd,
} from "../../../assets/images";
import Node from "./node";
import "../style.scss";
import { PageHeader } from "../../../components";
import { Col, Row } from "antd";

export default function Structure(props: any) {
  const [scale, setScale] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const style = {
    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
  };

  const handlerClicked = (data: any) => {
    setClicked(data)
  }

  return (
    <div>
      <PageHeader title="Structure" actions bordered />
      <Row>
        <div className="w-[100%] structure-wrapper ">
          <Col span={24} className="flex justify-end fixed bottom-20 right-10 z-50">
            <div className="w-[40px] h-[80px] white-bg-color  mr-5 mt-5 ">
              <div className="m-2">
                <StructureAdd onClick={() => setScale(scale * 1.2)} />
              </div>
              <div className="m-2">
                <StructureMinus onClick={() => setScale(scale * 0.8)} />
              </div>
            </div>
          </Col>
          <Col >
            <div className={`structure  ${clicked ? 'h-[100vh]' : 'h-[70vh]'}  relative pt-4 card ${clicked ? 'clicked' : 'undo'}`}>
              <DndProvider backend={HTML5Backend}>
                <div style={style} >
                  <Node o={organization}
                    handlerClicked={handlerClicked}
                    clicked={clicked} />
                </div>
              </DndProvider>
            </div>
          </Col>
        </div>
      </Row>
    </div>
  );
}
