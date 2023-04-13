import { recoilPersist } from "recoil-persist";
import {
  atom,
  selector,
} from 'recoil';
import constants from "../../config/constants";
import api from "../../api";
import endpoints from "../../config/apiEndpoints";

const { persistAtom } = recoilPersist();

export const timeTrackingState = atom({
  key: 'timeTrackingState', // unique ID (with respect to other atoms/selectors)
  default: '00:00:00', // default value
  effects_UNSTABLE: [persistAtom],
});

// agent dashboard
export const agentDashboardWidgetsState = atom({
  key: "agentDashboardWidgetsState",
  default: {
    totalProperties: 0,
    totalVacantProperties: 0,
    totalReservedProperties: 0,
    totalOccupiedProperties: 0,
  }
})