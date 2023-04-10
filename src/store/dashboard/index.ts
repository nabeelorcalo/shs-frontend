import { recoilPersist } from "recoil-persist";
import {
  atom,
  selector,
} from 'recoil';
import constants from "../../config/constants";
import api from "../../api";

const { persistAtom } = recoilPersist();

export const timeTrackingState = atom({
  key: 'timeTrackingState', // unique ID (with respect to other atoms/selectors)
  default: '00:00:00', // default value
  effects_UNSTABLE: [persistAtom],
});
const agentDashboardWidgetsSelector = selector({
  key:"",
  get:async()=>await api.get('')
})
export const agent_dashboard_widgets = atom({
  key: "agent_dashboard_widgets",
  default: {
    totalProperties: 0,
    totalVacantProperties: 0,
    totalReservedProperties: 0,
    totalOccupiedProperties: 0
  }
}) 