import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import constants from "../../config/constants";

const { persistAtom } = recoilPersist();

export const currentUserState = atom({
  key: "currentUserState",
  default: {},   // {} || [] 
  effects_UNSTABLE: [persistAtom],
});
