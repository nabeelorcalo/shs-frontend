import { atom, selector } from "recoil";
import api from "../../api";

export const allListingsState = selector({
  key: 'allListingsState',
  get: async () => {
    try {
      const {response} = await api.get('https://reqres.in/api/users');
      return response
    } catch (error) {
      console.error(`allListingsState -> get properties() ERROR: \n${error}`);
      return [];
    } 
  }
});

export const listingsState = atom({
  key: 'listingsState',
  default: allListingsState
});
