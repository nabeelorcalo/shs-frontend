import { atom, selector } from "recoil";


export const availablePropertiesState = atom({
  key: 'availablePropertiesState',
  default: []
});

export const savedPropertiesState = atom({
  key: 'savedPropertiesState',
  default: []
});
