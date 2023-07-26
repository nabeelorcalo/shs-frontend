import { useState } from "react";
import { Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Menu from "antd/es/menu";
import useCustomHook from "../../actionHandler";

const PriorityDropDown = (props?: any) => {
  const { activeValue, priorityOptions, activeId, show,activelabel } = props;
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
                EditHelpDeskDetails(activeId,activelabel, null, item.value);
              }
              else {
                EditHelpDeskDetails(activeId,activelabel, item.value); 
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
        className="px-2"
      >
        <div
          className={`cursor-pointer flex items-center justify-center 
          h-[26px capitalize border-solid border-[2px] white-color rounded-[8px] 
          ${priority === "medium" && "border-[#4A9D77] text-[#4A9D77] rounded-[40px]"}
             ${priority === "highest" && "border-[#363565] text-[#363565] rounded-[40px]"}
             ${priority === "low" && "border-[#9BD5E8] text-[#9BD5E8] rounded-[40px]"}
            ${priority === "high" && "border-[#E94E5D] text-[#E94E5D] rounded-[40px]"}
            ${priority === "pending" && "bg-[#9797a7]"}
            ${priority === "inprogress" && "text-warning-bg-color"}
            ${priority === "resolved" && "bg-[#4ED185]"}
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
