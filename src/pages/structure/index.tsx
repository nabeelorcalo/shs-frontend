import "./style.scss";
import React, { useRef, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import organization from "./org.json";

import {
  StructureCompanyAdminAvater,
  StructureCompanyAdminDownward,
  StructureCompanyAdminProfile2user,
  StructureMinus,
  StructureAdd,
} from "../../assets/images";
import { Avatar, Button } from "antd";
import { UpOutlined } from "@ant-design/icons/lib/icons";

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
    <div className="w-[200px] mx-auto lg:w-[100%]">
      <div className="struture-card center flex justify-center mt-5 h-[100px]">
        <div className="card white-bg-color shadow-sm relative rounded-lg w-[150px] lg:w-[200px]">
          <div
            className="borderLeft absolute w-[80px] lg:w-[115px] "
            style={{ border: `1px solid ${org.color}` }}
          ></div>
          <div className="avater-content absolute left-[30%] lg:left-[35%] ">
            <Avatar
              className=""
              size={48}
              icon={<StructureCompanyAdminAvater />}
            />
          </div>
          <div className="content pt-3 ">
            <div className="pt-5 font-semibold text-base">
              {" "}
              {org.tradingName}
            </div>
            <span className="my-5 text-sm font-normal">{org.title}</span>
            {hideFooterButton && (
              <div className="lg:w-[100px] lg:h-[30px] flex white-bg-color justify-center absolute card-footer rounded-full">
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
          nodePadding={"10px"}
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
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleZoomIn() {
    setScale(scale * 1.2);
  }
  function handleZoomOut() {
    setScale(scale * 0.8);
  }

  const style = {
    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
  };
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
