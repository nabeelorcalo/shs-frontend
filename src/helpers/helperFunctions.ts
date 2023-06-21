import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

// Disables future dates from current date
export const disabledDate: RangePickerProps["disabledDate"] = (current) => {  
  return current && current > dayjs().endOf("day");
};