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
const agentDashboardWidgetsSelector = selector({
  key: "",
  get: async () => await api.get(endpoints?.AGENT_DASHBOARD_WIDGETS, {}, "eyJraWQiOiI1alZvM0tDMUwzSDM1ckZTTU43TmRTc3phM2ZkdHE2VUFteFo0aW82ZmxnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwMzk2OTYwMi03MmM4LTQwMmUtOTY4NS00YjQ0YjczZDNhZmEiLCJjb2duaXRvOmdyb3VwcyI6WyJQUk9QRVJUWV9BR0VOVCJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9FeURMRmloVFoiLCJjbGllbnRfaWQiOiI3YW1raGYwczRtdWpvaHZybHNoZGNhZXVmbiIsIm9yaWdpbl9qdGkiOiJiMGVmZjdlMy1lZTQwLTRkYzktYTc1Ny1hMDMwMGFjZDYxNmMiLCJldmVudF9pZCI6ImFmNTk5ZGFhLTdiYTQtNGQ5MC1iZWM1LTVkMDNlYTYyYzkxYiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODExMDk0NjYsImV4cCI6MTY4MTExMzA2NiwiaWF0IjoxNjgxMTA5NDY2LCJqdGkiOiJhN2U0ZGFiNC0zMTU1LTRmYTgtOTcwMC00YTE2OGJkZjVlNmQiLCJ1c2VybmFtZSI6IjAzOTY5NjAyLTcyYzgtNDAyZS05Njg1LTRiNDRiNzNkM2FmYSJ9.Ti-TSWqhsQRku-id0t8N6qGoGVsBiCmBDC2ykBcoSRZNJzSWPVwvvqQ5uJMK4kGumZikBYhUuwzuPHLAYc7exP3T6L6JZ23EViBAKjJgmGwjvxzWau2P5yG0QOjDSVjOJdEVuat9KlOrR3-BCM_yu-2Rmxy_u_Vc3s9mcHl2aFhYIXQvDmxqsOg6CvxmRY6DKwbuMvD2rTHB4g_JznLYdBRi7kVV3I7ciNTwjHwhgZgtOk4GOS_JQBlvvCNs1w_bBt2ul0pEYMajY1_4jWNAlMhsZxVRd8p5R5w6g05ngxw7MtcdzT1sh2zZ1UTdBhUP_CO9iwQ_m206Tsl-vEcOZg")
})
export const agent_dashboard_widgets = atom({
  key: "agent_dashboard_widgets",
  default: agentDashboardWidgetsSelector ?? {
    totalProperties: 0,
    totalVacantProperties: 0,
    totalReservedProperties: 0,
    totalOccupiedProperties: 0
  }
}) 