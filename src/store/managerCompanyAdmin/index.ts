import React from "react";
import { atom, selector } from "recoil";

export const addManagerDetailState = atom({
  key: "addManagerDetail",
  default: {},
});

export const getManagerDetailState = atom({
  key: "getManagerDetail",
  default: [],
})

export const companyAdminManagerFilterState = atom({
  key: "companyAdminManagerFilterState",
  default: {
    limit: 10,
    page: 1,
    department: "",
    status: "",
    search: "",
  },
});

export const companyAdminManagerPaginationState = atom({
  key: "companyAdminManagerPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});