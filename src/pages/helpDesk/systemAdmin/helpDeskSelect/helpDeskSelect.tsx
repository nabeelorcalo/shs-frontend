import { CaretDownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

const { Option } = Select;

const HelpDeskSelect = (props: any) => {
  const { priorityOption } = props;

  const defaultValue = priorityOption[0].value;

  console.log("=-=-=-=-", priorityOption[0].value);

  return (
    <div>
      <Select
        defaultValue={defaultValue}
        size="small"
        style={{ width: "100%" }}
        suffixIcon={<CaretDownOutlined />}
      >
        {priorityOption.map((option: any) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default HelpDeskSelect;
