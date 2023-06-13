import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import "../style.scss";
import Organization from "./organization";

function Node({ o, parent, handlerClicked, clicked }: any) {
  const [collapsed, setCollapsed] = React.useState(!o.collapsed);
  const T = parent
    ? TreeNode
    : (props: any) => (
      <Tree
        {...props}
        lineWidth={"1px"}
        lineColor={"#bbc"}
        nodePadding={"10px"}
        lineStyle={"dotted"}
        lineHeight={"30px"}
      >
        {props.children}
      </Tree>
    );

  const handleCollapse = () => {
    setCollapsed(!collapsed);
    handlerClicked(!clicked)
  };
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
      {/* {o.map((c: any, index: any) => (
        <Node key={index} o={c} parent={o} />
      ))} */}
      {_.map(o, (c, index) => (
        <Node key={index} o={c} parent={o} />
      ))}
    </T>
  );
}

export default Node
