import { useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const StatusDropdown = (props: any) => {
  const { StatusOptions, state, setState } = props;
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  console.log(state);

  const opriorityOption = (
    <Menu>
      {StatusOptions?.map((item: any) => {
        return (
          <Menu.Item onClick={() => {
            setState({ ...state, editStatus: item.value?.replace(" ", "") })
          }} key={item.key}>
            <span className="capitalize">{item.value?.toLowerCase()}</span>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <div>
      <Dropdown
        placement="bottomRight"
        overlay={opriorityOption}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        trigger={["click"]}
      >
        <div
          className={`cursor-pointer capitalize flex items-center justify-center h-[26px]  white-color rounded-lg ${state === "PENDING" && "bg-[#9797a7]"
            } ${state === "INPROGRESS" && "text-warning-bg-color"} ${state === "RESOLVED" && "bg-[#4ED185]"}`}
        >
          {state?.toLowerCase()}
          <span>
            <DownOutlined className="text-sm ml-2" />
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default StatusDropdown;
