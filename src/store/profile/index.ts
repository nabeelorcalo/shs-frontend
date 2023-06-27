import React from "react";
import { atom, selector } from "recoil";

export const changePasswordState = atom({
  key: "changePasswordState",
  default: {},
});

export const agentProfileInput = atom({
  key: "agentProfileInput",
  default: {}, 
});
export const agentChangePassword = atom({
  key: "agentChangePassword",
  default: {}, 
});
export const studentProfileState = atom({
  key: "studentProfileState",
  default: {},
});

export const studentProfileCompletionState = atom({
  key: "studentProfileCompletionState",
  default: {},
});

export const immigrationStatusState = atom({
  key: "immigrationStatusState",
  default: [],
});

export const getImmigrationState = atom({
  key: "getImmigrationState",
  default: [],
});

export const studentDocumentState = atom({
  key: "studentDocumentState",
  default: [],
});

export const getStudentDocumentSate = atom({
  key: "getStudentDocumentSate",
  default: [],
});
