import dayjs from "dayjs";

export const dateValidator = (startDate: any, endDate: any) => {
  if (startDate) {
    const startMoment = dayjs(startDate);
    const endMoment = dayjs(endDate);
    if (endMoment.isAfter(startMoment) || endMoment.isSame(startMoment)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("End Date must be greater"));
    }
  } else if (endDate) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Required Field"));
  }
};

export const timeValidator = (startTime: any, endTime: any) => {
  const currentDate = dayjs();
  if (startTime) {
    const startMoment = dayjs(startTime, "HH:mm").date(currentDate.date()).month(currentDate.month()).year(currentDate.year());
    const endMoment = dayjs(endTime, "HH:mm").date(currentDate.date()).month(currentDate.month()).year(currentDate.year());
    if (endMoment.isAfter(startMoment) || endMoment.isSame(startMoment)) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("End Time must be greater"));
    }
  } else if (endTime) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Required Field"));
  }
};
