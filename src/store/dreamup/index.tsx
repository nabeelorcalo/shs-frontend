import { atom } from "recoil";

// get all applications data
export const goalsDataState = atom({
  key: "goalsDataState",
  default: [],
});

// get all application Details data
export const tasksDataState = atom({
  key: "tasksDataState",
  default: [],
});
