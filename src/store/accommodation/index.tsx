import { atom, selector } from "recoil";

export const propertyState = atom({
  key: 'propertyState',
  default: []
})

export const availablePropertiesState = atom({
  key: 'availablePropertiesState',
  default: []
});

export const savedPropertiesState = atom({
  key: 'savedPropertiesState',
  default: []
});

export const rentedPropertiesState = atom({
  key: 'rentedPropertiesState',
  default: []
});

export const bookingRequestsState = atom({
  key: 'bookingRequestsState',
  default: []
});
