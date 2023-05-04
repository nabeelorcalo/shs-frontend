import React from "react";
import { atom, selector } from "recoil";

export const someState = atom({
  key: "someState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value
});
export const changepasswordstate = atom({
  key: "changepasswordstate",
  default: {}, // {} || []
});
