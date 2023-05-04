import React from "react";
import { atom, selector } from "recoil";

export const changePasswordState = atom({
  key: "changePasswordState",
  default: {}, // {} || []
});
