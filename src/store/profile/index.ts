import React from "react";
import { atom, selector } from "recoil";

export const changePasswordState = atom({
  key: "changePasswordState",
  default: {}, // {} || []
});

export const agentProfileInput = atom({
  key: "agentProfileInput",
  default: {}, // {} || []
});
export const agentChangePassword = atom({
  key: "agentChangePassword",
  default: {}, // {} || []
});
