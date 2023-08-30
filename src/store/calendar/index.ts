import { atom } from "recoil";

export const calendarListState = atom({
  key: "calendarListState",
  default: [],
});

export const attendesListState = atom({
  key: "attendesListState",
  default: [],
});

export const calendarLocationState = atom({
  key: "calendarLocationState",
  default: [],
});
