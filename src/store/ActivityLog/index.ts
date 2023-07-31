import { atom } from "recoil";

export const generalActivityDetails = atom({
  key: "generalActivityDetails",
  default: [],
});

export const filterLogState = atom({
  key: "filterLogState",
  default: {
    search: "",
    userRole: '',
    activity: '',
    performerRole: "",
    page: 1,
    limit: 10,
    date: "",
    active:''
  },
});

export const paginationLogState = atom({
  key: "paginationLogState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});