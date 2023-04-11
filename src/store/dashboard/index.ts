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

// const agentDashboardWidgetsSelector = (path: string) => 
export const getDataWrapper = (key: string, endpoint: string) => {
  const customSelector = selector({
    key: `sdgdfh _selector`,
    get: async () => {
      const intialState = {
        status: "loading",
        data: [],
        error: null
      }
      try {
        const res = await api.get(endpoint)
        return { ...intialState, status: "succeeded", data: res.data }
      }
      catch (error) {
        return { ...intialState, status: "failed", error }
      }
    }
  })
  
  return atom({
    key: `sdg _state`,
    default: customSelector
  })
}


// export const agent_dashboard_widgets = atom({
//   key: "agent_dashboard_widgets",
//   default: agentDashboardWidgetsSelector ?? {
//     totalProperties: 0,
//     totalVacantProperties: 0,
//     totalReservedProperties: 0,
//     totalOccupiedProperties: 0
//   }
// }) 