import { atom, selector } from "recoil";

export const withDrawalRequestState = atom({
    key: "withDrawalRequestState",
    default: []
});

export const withDrawalFilterState = atom({
    key: "withDrawalFilterState",
    default: {
      page: 1,
      limit: 10,
      q: "",
      status: "",
    },
  });
  
  export const withDrawalPaginationState = atom({
    key: "withDrawalPaginationState",
    default: {
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: false,
      },
    },
  });