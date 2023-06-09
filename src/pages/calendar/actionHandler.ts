import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import constants from "../../config/constants";
import { useRecoilState } from "recoil";
import { calendarListState } from "../../store";
import endpoints from "../../config/apiEndpoints";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);
  const [listCalendar, setListCalendar] = useRecoilState(calendarListState);
  const { GET_ALL_MEETINGS } = endpoints;
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const getCalenderData = (params: any) => {
    api.get(GET_ALL_MEETINGS, params).then((result) => {
      if (result?.data)
        setListCalendar(
          result?.data?.map((task: any, index: number) => {
            return {
              ...task,
              start: dayjs(task.startTime).toISOString(),
              end: dayjs(task.endTime).toISOString(),
              category: task.eventType?.toLowerCase(),
              location: { link: task.address, type: task?.locationType?.toLowerCase() },
              userName: task?.organizer,
              status: "accept",
            };
          })
        );
    });
  };

  return {
    getData,
    getCalenderData,
    listCalendar,
  };
};

export default useCustomHook;
