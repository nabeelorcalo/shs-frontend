import { CaretDownOutlined } from "@ant-design/icons";
import { Select } from "antd";

const { Option } = Select;

const HelpDeskSelect = (props: any) => {
  const { priorityOption } = props;

  const defaultValue = priorityOption[0].value;

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
