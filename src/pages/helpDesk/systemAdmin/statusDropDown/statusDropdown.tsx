import { useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useCustomHook from "../../actionHandler";

const StatusDropdown = (props: any) => {
  const { StatusOptions, state, setState } = props;
  const [visible, setVisible] = useState(false);
  const { EditHelpDeskDetails } = useCustomHook();
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const opriorityOption = (
    <Menu>
      {StatusOptions?.map((item: any) => {
        return (
          <Menu.Item onClick={() => {
            setState({ ...state, editStatus: item.value })
            // EditHelpDeskDetails(state.details.id,null, item.value);
          }} key={item.key}>
            {item.value}
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
