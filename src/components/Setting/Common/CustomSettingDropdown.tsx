import React, { useState } from "react";
import { LocationMore } from "../../../assets/images";
import { Dropdown, MenuProps } from "antd";
import "./CustomSettingDropdown.scss";
import { NavLink } from "react-router-dom";

export const DropDownForSetting = (props: any) => {
  const { showEditModal, showDeleteModal, link, editData, SetId , id ,SetEditData } = props
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  const GetIdHandler = (id: number) => {
    SetId(id)
  }
  const GetEditHandler = (data: number) => {
    SetEditData(data)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span
        onClick={() => {
          props.setShowEditModal(!showEditModal), setVisible(false);
        }}
      >
        <NavLink
          onClick={()=>{GetEditHandler(editData)}}
          className="text-primary-color hover:text-[#454545] font-normal"
          to={link}
        >
          Edit
        </NavLink>
      </span>,
    },
    {
      key: '2',
      label: <span
      className="font-normal"
        onClick={() => {
          props.setShowDeleteModal(!showDeleteModal),
            setVisible(false), GetIdHandler(id);
        }}
      >
        Delete
      </span>,
    },

  ];

  return (
    <Dropdown menu={{ items }}
      className="setting-custom-dropdown"
      open={visible}
      onOpenChange={handleVisibleChange}
      trigger={["click"]}
    >
      <div style={{ cursor: "pointer" }}>
        <LocationMore width="24px" />
      </div>
    </Dropdown>
  );
};

export default DropDownForSetting;
