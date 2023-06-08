import { atom } from "recoil";

export const caseStudiesFilterParam = atom({
  key: "caseStudiesFilterParam",
  default: {},
});

export const caseStudiesTableData = atom({
  key: "caseStudiesTableData",
  default: { count: 0, data: [], pagination: {} },
});

export const caseStudiesAPICallStatus = atom({
  key: 'caseStudiesAPICallStatus',
  default: false
});