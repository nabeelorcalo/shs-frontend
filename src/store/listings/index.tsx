import { atom, selector } from "recoil";

export const listingLoadingState = atom({
  key: 'listingLoadingState',
  default: false
})

export const listingsState = atom({
  key: 'listingsState',
  default: []
})


// export const listingsState = atom({
//   key: 'listingsState',
//   default: selector({
//     key: 'allListingsState',
//     get: async () => {
//       try {
//         const {data} = await api.get(GET_AGENT_PROPERTIES);
//         return data
//       } catch (error) {
//           console.error(`allListingsState -> get properties() ERROR: \n${error}`);
//         return [];
//       } 
//     }
//   })
// });
