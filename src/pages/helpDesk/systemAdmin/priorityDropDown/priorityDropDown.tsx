import { useState } from "react";
import { Dropdown } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import Menu from "antd/es/menu";

const PriorityDropDown = (props: any) => {
  const { activeValue, priorityOptions } = props;
  const [priorityValue, setPriorityValue] = useState(activeValue);
  const priority = priorityValue.toLowerCase()

  const opriorityOption = (
    <Menu>
      {priorityOptions.map((item: any) => {
        return (
          <Menu.Item
            onClick={() => setPriorityValue(item.value)}
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
          className={`cursor-pointer capitalize flex items-center justify-center h-[26px] border-[2px] rounded-[8px] 
          ${priority === "medium" &&
            "border-solid border-[#4A9D77] text-[#4A9D77]"
            }
             ${priority === "highest" &&
            "border-solid border-[#363565] primary-color"
            }
             ${priority === "low" &&
            "border-solid border-[#9BD5E8] text-[#9BD5E8]"
            }
              ${priority === "high" &&
            "border-solid border-[#E94E5D] text-[#E94E5D]"
            }
            `}
        >
          {priority}
          <span>
            <CaretDownOutlined className="text-sm ml-2" />
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default PriorityDropDown;
