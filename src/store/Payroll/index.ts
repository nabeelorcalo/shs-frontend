import { atom } from "recoil";

export const payrollDataState = atom({
  key: "payrollDataState",
  default: [],
});

export const payrollInternState = atom({
  key: "payrollInternState",
  default: [],
});

export const payrollDetailsData = atom({
  key: "payrollDetailsData",
  default: [],
});

export const payrollFilterState = atom({
  key: "payrollFilterState",
  default: {
    page: 1,
    limit: 10,
    departmentId: "",
    currentDate: '',
    filterType: "",
    startDate: "",
    endDate: '',
    payrollStartDate: '',
    payrollEndDate: '',
    q: '',
    searchByUserName: ''
  },
});

export const payrollPaginationState = atom({
  key: "payrollPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});