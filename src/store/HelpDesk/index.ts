import { atom } from "recoil";

export const helpDeskListState = atom({
  key: "helpDeskListState",
  default: [],
});

export const helpDeskListDetail = atom({
  key: "helpDeskListDetail",
  default: [],
});

export const getRoleBaseUsers = atom({
  key: "getRoleBaseUsers",
  default: [],
});
