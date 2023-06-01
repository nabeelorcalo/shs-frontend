import { atom } from "recoil";

export const universityReportsFilterParam = atom({
  key: "universityReportsFilterParam",
  default: {},
});

export const universityReportsTableData = atom({
  key: "universityReportsTableData",
  default: { count: 0, data: [], pagination: {} },
});

export const universityReportsAPICallStatus = atom({
  key: 'universityReportsAPICallStatus',
  default: false
});