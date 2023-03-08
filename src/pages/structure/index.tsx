import "./style.scss";
import React, { useRef, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import organization from "./org.json";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import SwipeableViews from "react-swipeable-views";




import {
  StructureCompanyAdminAvater,
  StructureCompanyAdminDownward,
  StructureCompanyAdminProfile2user,
} from "../../assets/images";
import { Avatar, Button } from "antd";
import { UpOutlined } from "@ant-design/icons/lib/icons";

const Controls = ({ zoomIn, zoomOut, resetTransform }: any) => (
  <>
    <button onClick={() => zoomIn()}>+</button>
    <button onClick={() => zoomOut()}>-</button>
    <button onClick={() => resetTransform()}>x</button>
  </>
);

function Organization({ org, onCollapse, collapsed }: any) {
  const [iconChagne, setIconChagne] = useState<boolean>(true);

  const [hideFooterButton, setHideFooterButton] = useState<any>(
    `${_.size(org.organizationChildRelationship)}` > "0"
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  console.log("event", hideFooterButton);

  return (
    <div className="struture-card flex justify-center mt-5 h-[100px]">
      <div className="card white-bg-color shadow-sm relative rounded-lg lg:w-[200px]">
        <div
          className="borderLeft absolute "
          style={{ border: `1px solid ${org.color}` }}
        ></div>
        <div className="avater-content absolute ">
          <Avatar
            className=""
            size={48}
            icon={<StructureCompanyAdminAvater />}
          />
        </div>
        <div className="content pt-3 ">
          <div className="pt-5 font-semibold text-base"> {org.tradingName}</div>
          <span className="my-5 text-sm font-normal">{org.title}</span>
          {hideFooterButton && (
            <div className="w-[81px] h-[30px] flex white-bg-color justify-center absolute card-footer rounded-full">
              <span className="pt-1 ">
                <StructureCompanyAdminProfile2user />
              </span>
              <span className="font-medium text-sm mx-2 mt-0.5">{`${_.size(
                org.organizationChildRelationship
              )}`}</span>
              <span
                onClick={() => {
                  setIconChagne(!iconChagne), onCollapse();
                }}
                className="cursor-pointer "
              >
                {iconChagne ? (
                  <StructureCompanyAdminDownward />
                ) : (
                  <UpOutlined style={{ fontSize: "10px" }} />
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Node({ o, parent }: any) {
  const [collapsed, setCollapsed] = React.useState(!o.collapsed);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    o.collapsed = !collapsed;
  });
  const T = parent
    ? TreeNode
    : (props: any) => (
      <Tree
        {...props}
        lineWidth={"1px"}
        lineColor={"#bbc"}
        // lineBorderRadius={"12px"}
        nodePadding={"20px"}
        lineStyle={"dotted"}
      >
        {props.children}
      </Tree>
    );
  return collapsed ? (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    />
  ) : (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    >
      {_.map(o.organizationChildRelationship, (c) => (
        <Node o={c} parent={o} />
      ))}
    </T>
  );
}

export default function Structure(props: any) {




  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const transformOptions = {
    initialScale: 1,
    minScale: 0.5,
    maxScale: 0.5
  }
  return (
    <TransformWrapper
    initialScale={500}
    initialPositionX={200}
    initialPositionY={100}
    centerZoomedOut={false}
   
  >
    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
      <React.Fragment> <div className="structure w-full h-[100vh] ">
        <div className="tools">
          <button onClick={() => zoomIn()}>+</button>
          <button onClick={() => zoomOut()}>-</button>
          
        </div>
        <TransformComponent>
      
        <DndProvider backend={HTML5Backend}>
        <div className="structure w-full h-[100vh] ">
        <Node o={organization} />
        </div>
     </DndProvider>
     
        </TransformComponent>
        </div>
      </React.Fragment>
    )}
  </TransformWrapper>
  //   <SwipeableViews enableMouseEvents>
  //   <PinchZoomPan>
  //     <img alt="Test Image" src="http://picsum.photos/750/750" />
  //   </PinchZoomPan>
  //   {/* <PinchZoomPan>
  //     <img alt="Test Image" src="http://picsum.photos/750/750" />
  //   </PinchZoomPan> */}
  // </SwipeableViews>
   
  //   <TransformWrapper 
  //   initialScale={1}
  //   minScale={8}
  //   maxScale={7}
  //   initialPositionX={200}
  //   initialPositionY={100}
  // >
  //   {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
  //     <React.Fragment>
  //       <div className="tools">
  //         <button onClick={() => zoomIn()}>+</button>
  //         <button onClick={() => zoomOut()}>-</button>
  //         <button onClick={() => resetTransform()}>x</button>
  //       </div>
        
  //       <TransformComponent>
  //         <div style={{height:"100vh"}}>
  //         <img src="image.jpg" alt="test" />
  //         <div>Example text</div>
  //         </div>
  //       </TransformComponent>
  //     </React.Fragment>
  //   )}
  // </TransformWrapper>
  
    // <div className="structure w-[100%] h-[100vh] ">
    //        <TransformWrapper
    //     initialScale={1}
    //     initialPositionX={1000}
    //     initialPositionY={1000}
    //     ref={transformComponentRef}
    //   >
    //     {(utils) => (
    //       <React.Fragment>
    //         <Controls {...utils} />
    //         <TransformComponent>
    //         <DndProvider backend={HTML5Backend}>
    //     <Node o={organization} />
    //   </DndProvider>
    //         </TransformComponent>
    //       </React.Fragment>
    //     )}
    //   </TransformWrapper>
    


    // </div>
  );
}
