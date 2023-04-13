import { useEffect, useState } from "react";

import api from "../../api";
import endpoints from "../../config/apiEndpoints";
// import { agent_dashboard_widgets } from "../../store";

// Chat operation and save into store
const useCustomHook = () => {
  const { AGENT_DASHBOARD_WIDGETS } = endpoints;
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const loadMoreData = () => {
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        return body.results
      })
      .catch(() => {

      });
  };

  // agent dashboard
  const [agentDashboardWidgets, setAgentDashboardWidgets] = useState({
    totalProperties: 0,
    totalVacantProperties: 0,
    totalReservedProperties: 0,
    totalOccupiedProperties: 0,
  })

  useEffect(() => {
    api.get(AGENT_DASHBOARD_WIDGETS).then(({ data }) => setAgentDashboardWidgets(data[0]))
  }, [])

  return {
    getData,
    loadMoreData,
    agentDashboardWidgets,
  };
};

export default useCustomHook;