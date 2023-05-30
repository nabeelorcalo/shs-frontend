import {
  atom,
  selector,
} from 'recoil';
import { recoilPersist } from "recoil-persist";

export const allPerformanceState = atom({
  key: 'allPerformanceState',
  default: [],
});