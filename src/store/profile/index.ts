import React from "react";
import { atom, selector } from "recoil";

export const changePasswordState = atom({
  key: "changePasswordState",
  default: {}, // {} || []
});

export const studentProfileState = atom({
  key: "studentProfileState",
  default: {},
});

export const studentProfileCompletionState = atom({
  key: 'studentProfileCompletionState',
  default: {},
})
