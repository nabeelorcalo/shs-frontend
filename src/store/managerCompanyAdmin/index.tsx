import React from "react";
import { atom, selector } from "recoil";

export const addManagerDetailState = atom({
    key: "addManagerDetail",
    default: {},
});
  
export const getManagerDetailState = atom({
  key: "getManagerDetail",
  default:[],
})