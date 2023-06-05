import { atom } from "recoil";

export const cadidatesListState = atom({
  key: 'cadidatesListState',
  default: []
});

export const cadidatesAPICallStatus = atom({
  key: 'cadidatesAPICallStatus',
  default: false
});
