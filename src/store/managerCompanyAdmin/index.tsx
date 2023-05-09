import React from "react";
import { atom, selector } from "recoil";

export const addManagerDetail = atom({
    key: "addManagerDetail",
    default: {},
});
  
export const getManagerDetail = atom({
  key: "getManagerDetail",
  default:[],
})