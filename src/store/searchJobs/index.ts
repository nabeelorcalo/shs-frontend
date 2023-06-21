import { atom } from "recoil";

export const searchJobsState = atom({
    key: "searchJobsState",
    default: [],
});
export const detailsSearchJobsState = atom({
    key: "detailsSearchJobsState",
    default: [],
});
export const jobsApplyInternship = atom({
    key: "jobsApplyInternship",
    default: [],
});
export const departmentJobsData = atom({
    key: "departmentJobsData",
    default: [],
});
