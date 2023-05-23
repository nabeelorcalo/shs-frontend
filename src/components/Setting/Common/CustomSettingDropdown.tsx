import { useState } from "react";
import { ThreeDots } from "../../../assets/images";
import { Dropdown, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import './CustomSettingDropdown.scss'

export const DropDownForSetting = (props: any) => {
  const {
    setState,
    link,
    state,
    editData,
    SetEditData,
  } = props
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const GetEditHandler = (data: number) => {
    SetEditData(data)
  }

  const editHandler = () => {
    GetEditHandler({ ...editData, isEdit: "isEdit" });
    setState({ ...state, isEditModal: true });
    setVisible(false);
  }

  const deleteHandler = () => {
    setState({ ...state, isDeleteModal: true, id: editData?.id });
    setVisible(false)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <div>
        {
          link ?
            <div>
              <NavLink to={link}
                className="text-primary-color custom-setting-dropdown-edit-btn font-normal"
              >
                Edit
              </NavLink>
            </div>
            :
            <span onClick={editHandler}
              className="text-primary-color font-normal border-0">
              Edit
            </span>
        }
      </div>
    },
    {
      key: '2',
      label: <span
        className="font-normal custom-setting-dropdown-delete-btn"
        onClick={deleteHandler}
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
        <ThreeDots />
      </div>
    </Dropdown>
  );
};

export default DropDownForSetting;
