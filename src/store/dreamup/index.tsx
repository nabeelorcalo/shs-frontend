import { atom } from "recoil";

// get all applications data
export const goalsDataState = atom({
  key: "goalsDataState",
  default: [],
});

export const firstGoalState = atom({
  key: 'firstGoalState',
  default: {},
});

// get all application Details data
export const tasksDataState = atom({
  key: "tasksDataState",
  default: [],
});
