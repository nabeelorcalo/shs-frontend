import { atom } from "recoil";

export const companySystemAdminState = atom({
    key: "companySystemAdminState",
    default: [], 
});
  
export const systemCompanyFilterState = atom({
  key: "systemCompanyFilterState",
  default: {
    limit: 10,
    page: 1,
    city: "",
    status: "",
    search: "",
  },
});

export const systemCompanyPaginationState = atom({
  key: "systemCompanyPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});