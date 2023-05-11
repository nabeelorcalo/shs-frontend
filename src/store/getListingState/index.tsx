import { atom, selector } from "recoil";

export const getListingState = atom({
  key: 'getListingState',
  default: []
});

export const getPropertAgents = atom({
  key: "getPropertAgents",
  default:[],
  
})