import { atom, selector } from "recoil";

export const listingLoadingState = atom({
  key: 'listingLoadingState',
  default: false
})

export const listingsState = atom({
  key: 'listingsState',
  default: []
})
