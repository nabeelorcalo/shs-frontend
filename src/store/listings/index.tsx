import { atom, selector } from "recoil";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
const { GET_AGENT_PROPERTIES } = apiEndpints;

export const loadingState = atom({
  key: 'loadingState',
  default: false
})

export const propertiesListState = atom({
  key: 'propertiesListState',
  default: []
})

export const listingsState = atom({
  key: 'listingsState',
  default: selector({
    key: 'allListingsState',
    get: async () => {
      try {
        const {data} = await api.get(GET_AGENT_PROPERTIES);
        return data
      } catch (error) {
          console.error(`allListingsState -> get properties() ERROR: \n${error}`);
        return [];
      } 
    }
  })
});
