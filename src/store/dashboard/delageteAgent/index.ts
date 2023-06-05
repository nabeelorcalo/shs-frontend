import { atom } from "recoil";

export const currentBalanceState = atom({
  key: "currentBalanceState",
  default: 0,
});
export const bankAccountListState = atom({
  key: "bankAccountListState",
  default: [],
});
