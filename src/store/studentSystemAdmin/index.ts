import { atom } from "recoil";


export const studentSystemAdminState = atom({
    key: "studentSystemAdminState",
    default: [], 
});
  
export const studentFilterState = atom({
  key: "studentFilterState",
  default: {
    page: 1,
    limit: 10,
    city: "",
    stage:"",
    search: "",
    status: "",
  },
});

export const studentPaginationState = atom({
  key: "studentPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    },
  },
});