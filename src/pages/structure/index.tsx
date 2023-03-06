import "./style.scss";
import React, { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import organization from "./org.json";
import {
  Icondownward,
  IconStructureAdmin,
  IconProfile2person,
} from "../../assets/images";
import { Avatar, Button } from "antd";
import { boolean } from "yargs";

function Organization({ org, onCollapse, collapsed }: any) {
  const [hideFooterButton, setHideFooterButton] = useState<any>(`${_.size(org.organizationChildRelationshi)}` == "1")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
   
  };
  console.log("event", hideFooterButton);

  return (
    <div className="struture  flex justify-center mt-3">
      <div className="card white-bg-color shadow-sm relative rounded-lg lg:w-[200px]">
        <div className="borderLeft absolute"></div>
        <div className="avater-content absolute">
          {" "}
          <Avatar className="" size={48} icon={<IconStructureAdmin />} />
        </div>
        <div className="content pt-3 ">
          <div className="pt-5 font-semibold text-base"> {org.tradingName}</div>
          <span className="my-5 text-sm font-normal">{org.title}</span>
         {hideFooterButton && <div className="w-[81px] h-[30px] flex white-bg-color justify-center absolute card-footer rounded-full">
            <span className="pt-1 ">
              <IconProfile2person />
            </span>
            <span className="font-medium text-sm mx-2 mt-0.5">{`${_.size(
              org.organizationChildRelationship
            )}`}</span>
            <span onClick={onCollapse} className="cursor-pointer ">
              <Icondownward />
            </span>
          </div>}
        </div>
      </div>
    </div>
  );
}

function Node({ o, parent }: any) {
  const [collapsed, setCollapsed] = React.useState(o.collapsed);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    o.collapsed = collapsed;
  });
  const T = parent
    ? TreeNode
    : (props: any) => (
        <Tree
          {...props}
          lineWidth={"1px"}
          lineColor={"#bbc"}
          // lineBorderRadius={"12px"}
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
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Node o={organization} />
      </DndProvider>
    </div>
  );
}
