import { atom } from "recoil";

// get all applications data
export const universityDataState = atom({
  key: "universityDataState",
  default: [],
});

export const universityIntersDataState = atom({
  key: "universityIntersDataState",
  default: [],
});

// system admin
export const universitySystemAdminState = atom({
  key: "universitySystemAdminState",
  default:[],
})

// UNIVERISTY mAIN

export const universityState = atom({
  key: "universityState",
  default:[]
 })