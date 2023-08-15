import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import constants from "../config/constants";
import jsPDF from "jspdf";

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
  return parseFloat(bytes).toFixed(decimals) + " " + units[i];
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

export const filteredText = (text: string) => {
  if (!text || text.length === 0 || text == undefined) return 'N/A'
  return text.trim()
}

export const pdf = (fileName: string, header: any, data: any, isAvatar: boolean = true) => {
  const title = fileName;
  const unit = 'pt';
  const size = 'A4';
  const orientation = 'landscape';
  const marginLeft = 40;

  const body = data.map((element: any) => {
    return (Object.entries(element).reduce((ini: any, [k, v]: any) => {
      const arr: any = [...ini, k?.toLowerCase() === "avatar" ? "" : v]
      return arr
    }, []))
  });
  const doc = new jsPDF(orientation, unit, size);
  doc.setFontSize(15);
  doc.text(title, marginLeft, 40);

  doc.autoTable({
    head: [header],
    body: body,
    margin: { top: 50 },

    headStyles: {
      fillColor: [230, 244, 249],
      textColor: [20, 20, 42],
      fontStyle: 'normal',
      fontSize: 12,
    },

    didParseCell: async (item: any) => {
      if (item.row.section === "head")
        item.cell.styles.fillColor = [230, 244, 249];
      else
        item.cell.styles.fillColor = false;
    },

    didDrawCell: async (item: any) => {
      if (item.column.dataKey === 1 && item.section === "body" && isAvatar) {
        const xPos = item.cell.x;
        const yPos = item.cell.y;
        var dim = 20;

        const img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3QAIAA4AFgAoAB1hY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABgAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABwYI/8QAJxAAAQMEAQMDBQAAAAAAAAAAAQIDBAAFBhEhEiIxBxNBFjJRYXH/xAAZAQACAwEAAAAAAAAAAAAAAAAAAwEEBQb/xAAjEQABAwMDBQEAAAAAAAAAAAABAAIDBAUREjHBITJBUWHR/9oADAMBAAIRAxEAPwDbTM5x+0YE5lYlx7hEZ6W1JhyEOkvK8NbBICufn4BNS+7et31DZJlonW6Lbo01Pt+83KJcbTvfIOgeBo615qNYplFvhTDCessNmySnEiWw2pXU5pCkpWVkk7T1E8Ac7/NVbJIuGW7DlS4NsTCQ5BLSAqO2tEpSk9ijvvQrz3A62N6oqbjI7DCN1bp7fGdUgcOiy8eEJLYmwVbbcOkFKu0jyRz92tUpiubWGBbXrbd8MiSYpTpo2+c7HU0oAd/QSpClk8lSgfNKNZyoGMbKRpRw4jWlAbT+q6Q9EfTy85RhMJN7aadQ06JVvZkOnpcaI0UqPI6SeQn+71ulKWWhz2tPn8KZTjuPocrO5xYo87KH3I9si2dMhKBHaRFUlKhyknpA7TxsnQApSlZVRVyQENaustVvpauMulYMj6Rzhf/Z";
        doc.addImage(img, xPos + 10, yPos, dim, dim);
      }
    },
  });

  doc.save(`${fileName}.pdf`);
};