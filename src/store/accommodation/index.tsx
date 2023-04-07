import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import api from "../../api";

export const allAvailablePropertiesState = selector({
  key: 'allAvailablePropertiesState',
  get: async () => {
    try {
      const response = await api.get('https://reqres.in/api/users');
      return response
    } catch (error) {
      console.error(`allAvailablePropertiesState -> get properties() ERROR: \n${error}`);
      return [];
    } 
  }
});

export const availablePropertiesState = atom({
  key: 'availableProperties',
  default: allAvailablePropertiesState
});
