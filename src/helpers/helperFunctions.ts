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
    : null;
};

export const byteToHumanSize = (bytes: any = 0, decimals = 2) => {
  let units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let i = 0;
  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }
  return parseFloat(bytes.toFixed(decimals)) + " " + units[i];
};

export const getDateRange = (rangeType: string) => {
  const dateFormat = "YYYY-MM-DD";
  const lastWeek = dayjs()
    .startOf("week")
    .subtract(1, "day")
    .format(dateFormat);
  const lastMonth = dayjs()
    .startOf("month")
    .subtract(1, "day")
    .format(dateFormat);
  let range: any;
  switch (rangeType) {
    case "This Week":
      range =
        dayjs().startOf("week").format(dateFormat) +
        "," +
        dayjs().endOf("week").format(dateFormat);
      break;
    case "Last Week":
      range =
        dayjs(lastWeek).startOf("week").format(dateFormat) +
        "," +
        dayjs(lastWeek).endOf("week").format(dateFormat);
      break;
    case "This Month":
      range =
        dayjs().startOf("month").format(dateFormat) +
        "," +
        dayjs().endOf("month").format(dateFormat);
      break;
    case "Last Month":
      range =
        dayjs(lastMonth).startOf("month").format(dateFormat) +
        "," +
        dayjs(lastMonth).endOf("month").format(dateFormat);
      break;
    default:
      range = null;
      break;
  }
  return range;
};
// covert base 64 url to file
export const urlToFile = (url: any) => {
  let arr = url && url.split(",");
  let mime = "";
  let dataArr: any = "";
  if (arr) {
    mime = arr[0].match(/:(.*?);/)[1];
    let data = arr[1];
    let dataStr = atob(data);
    let n = dataStr.length;
    dataArr = new Uint8Array(n);
    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }
  }
  let file = new File([dataArr], `File(${new Date().toLocaleDateString("en-US")}).png`, { type: mime, });
  return file;
};

export const checkForImage = (url: string) => {
  let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
  if (url && url.match(regex))
    return true;
  else
    return false;
}