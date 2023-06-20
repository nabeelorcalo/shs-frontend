import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import constants from "../config/constants";

// Disables future dates from current date
export const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  return current && current > dayjs().endOf("day");
};

export const getUserAvatar = (item: any) => {
  return item.profileImage
    ? `${constants.MEDIA_URL}/${item?.profileImage?.mediaId}.${item?.profileImage?.metaData?.extension}`
    : null
}

export const byteToHumanSize = (bytes: any, decimals = 2) => {
  let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  let i = 0
  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }
  return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]
}