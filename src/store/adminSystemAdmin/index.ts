import { atom } from "recoil";

export const adminSystemAdminState = atom({
    key: "adminSystemAdminState",
    default: [],
});

export const addAdminSystemAdminState = atom({
    key: "addAdminSystemAdminState",
    default: {},
});
  
export const adminFilterState = atom({
    key: "adminFilterState",
    default: {
      page: 1,
      limit: 10,
      date:"",
      search: "",
      status: "",
    },
  });
  
  export const adminPaginationState = atom({
    key: "adminPaginationState",
    default: {
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: false,
      },
    },
  });
  