import { atom } from "recoil";

// get all applications data
export const applicationDataState = atom({
  key: "applicationDataState",
  default: [],
});

// get all application Details data
export const applicationDetailState = atom({
  key: "applicationDetailState",
  default: [],
});

export const applicationFilterState = atom({
  key: "applicationFilterState",
  default: {
    limit: 10,
    page: 1,
    search: "",
    currentDate: "",
    filterType: "",
    startDate: "",
    endDate: "",
    locationType: undefined,
    salaryType: undefined,
    stage: undefined,
    internType: undefined, 
  },
});

export const applicationPaginationState = atom({
  key: "applicationPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});