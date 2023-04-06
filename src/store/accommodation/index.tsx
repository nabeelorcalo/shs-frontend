import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();


export const availablePropertiesState = atom({
  key: 'availablePropertiesState',
  default: []
});
