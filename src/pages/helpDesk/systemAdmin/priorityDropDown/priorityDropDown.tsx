import { useState } from "react";
import { Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Menu from "antd/es/menu";
import useCustomHook from "../../actionHandler";

const PriorityDropDown = (props?: any) => {
  const { activeValue, priorityOptions, activeId, show } = props;
  const [priorityValue, setPriorityValue] = useState(activeValue);
  const priority = priorityValue?.toLowerCase()
  const { EditHelpDeskDetails } = useCustomHook();
  const opriorityOption = (
    <Menu>
      {priorityOptions.map((item: any) => {
        return (
          <Menu.Item
            onClick={() => {
              setPriorityValue(item.value);
              if (show) {
                EditHelpDeskDetails(activeId, null, item.value);
              }
              else {
                EditHelpDeskDetails(activeId, item.value);
              }
            }}
            key={item.key}
          >
            {item.value}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
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
          className={`cursor-pointer flex items-center justify-center h-[26px capitalize border-[2px] rounded-[8px] 
          ${priority === "medium" && "border-solid border-[#4A9D77] text-[#4A9D77]"}
             ${priority === "highest" && "border-solid border-[#363565] primary-color"}
             ${priority === "low" && "border-solid border-[#9BD5E8] text-[#9BD5E8]"}
            ${priority === "high" && "border-solid border-[#E94E5D] text-[#E94E5D]"}
            ${priority === "pending" && "bg-[#9797a7] ] white-color"}
            ${priority === "inprogress" && "text-warning-bg-color ] white-color"}
            ${priority === "resolved" && "bg-[#4ED185] ] white-color"}
            `}
        >
          {priority}
          <span>
            <CaretDownOutlined className="text-sm ml-2" />
          </span>
        </div>
      </Dropdown >
    </div >
  );
};

export default PriorityDropDown;
