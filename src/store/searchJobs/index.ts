import { atom } from "recoil";

export const searchJobsState = atom({
    key: "searchJobsState",
    default: [],
});
export const detailsSearchJobsState = atom({
    key: "detailsSearchJobsState",
    default: [],
});