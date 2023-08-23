import { atom } from "recoil";

// get all companies
export const universityCompaniesState = atom({
  key: "universityCompaniesState",
  default: [],
});
export const companyFilterState = atom({
  key: "companyFilterState",
  default: {
    search: "",
    limit: 10,
    page: 1,
  },
});
export const companyPaginationState = atom({
  key: "companyPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});