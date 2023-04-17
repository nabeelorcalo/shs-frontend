import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import Organization from "./organization";
import "../style.scss";

function Node({ o, parent ,setMarginTop }: any) {
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

      React.useEffect(() => {
        o.collapsed = !collapsed;
      });

    const handleCollapse = () => {
      setCollapsed(!collapsed);
      setMarginTop("0")
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
        {_.map(o.organizationChildRelationship, (c) => (
          <Node o={c} parent={o} />
        ))}
      </T>
    );
  }

  export default Node
  