
import React, { useState } from "react";
import {  LocationMore } from "../../../assets/images";
import {  Dropdown, Menu, } from "antd";



const DropDownForPerformance = (props: any) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  console.log("props" , props)

  return (
    <Dropdown
      className="dropdown"
      overlay={
        <Menu>
          <Menu.Item key="1"><span onClick={() => { props.setShowEditModal(!props.showEditModal), setVisible(false) }}>Edit</span></Menu.Item>
          <Menu.Item key="2"><span onClick={() => { props.setShowDeleteModal(!props.showDeleteModal), setVisible(false) }} >Delete</span></Menu.Item>
        </Menu>
      }
      visible={visible}
      onVisibleChange={handleVisibleChange}
      trigger={["click"]}
    >
      <div style={{ cursor: "pointer" }}>
        <LocationMore width="24px" />
      </div>
    </Dropdown>
  );
};

export default DropDownForPerformance