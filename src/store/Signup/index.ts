import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const companyStepperData = atom({
  key: "companyStepperData",
  default: {},
});
