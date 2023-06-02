import { atom } from "recoil";

// get all Goals data
export const goalsDataState = atom({
  key: "goalsDataState",
  default: [],
});

export const dashGoalsDataState = atom({
  key: "dashGoalsDataState",
  default: [],
});

export const barsDataState = atom({
  key: "barsDataState",
  default: [],
});

export const lifeAssessmentState = atom({
  key: "lifeAssessmentState",
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
