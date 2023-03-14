import React from 'react';
import { recoilPersist } from "recoil-persist";
import {
  atom,
  selector,
} from 'recoil';
import constants from "../../config/constants";

const { persistAtom } = recoilPersist();

export const timeTrackingState = atom({
  key: 'timeTrackingState', // unique ID (with respect to other atoms/selectors)
  default: '00:00:00', // default value
  effects_UNSTABLE: [persistAtom],
});