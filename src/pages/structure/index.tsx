import "./style.scss";
import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import organization from "./org.json";
import avaterImg from "../../assets/images/structure/avatar-img.svg";
import {
  DownOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";

function Organization({ org, onCollapse, collapsed }: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    console.log("event", event);
  };

  return (
    <div className="struture flex justify-center mt-3">
      <div className="card shadow-sm relative rounded-lg lg:w-[200px]">
        <div className="borderLeft absolute"></div>
        <div className="avater-content absolute">
          {" "}
          <Avatar className="" size={48} src={avaterImg} />
        </div>
        <div className="content pt-3">
          <div className="pt-5"> {org.tradingName}</div>
          <span className="my-5">{org.title}</span>
          <div className="w-[50px]  absolute card-footer rounded-full" ><DownOutlined onClick={onCollapse} size={12} /></div>
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
