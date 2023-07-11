import { useRecoilState } from "recoil";
import {
  PersonalChatListState,
  PersonalChatMsgxState,
  PersonalChatMediaListState,
} from "../../store";
import api from "../../api";
import constants from "../../config/constants";

// Chat operation and save into store
const useCustomHook = () => {
  const [personalChatList, setPersonalChatList] = useRecoilState<any>(
    PersonalChatListState
  );
  const [personalChatMsgList, setPersonalChatMsgList] = useRecoilState<any>(
    PersonalChatMsgxState
  );
  const [personalChatMediaList, setPersonalChatMediaList] = useRecoilState<any>(
    PersonalChatMediaListState
  );
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getUsersList = async (text: any): Promise<any> => {
    return api.get(
      `${constants.APP_URL}/conversations/search-users?q=${text}&page=1&limit=5`
    );
  };

  const getData = async (id: any): Promise<any> => {
    const { data } = await api.get(
      `${constants.APP_URL}/conversations/user/${id}`
    );
    setPersonalChatList(data);
    return data;
  };

  const getCount = async (id: any): Promise<any> => {
    const { data } = await api.get(`${constants.APP_URL}/messages/count/${id}`);
    return data.count;
  };

  const getMessages = async (id: any): Promise<any> => {
    const { data } = await api.get(
      `${constants.APP_URL}/conversations/${id}/messages?seen=true`
    );
    setPersonalChatMsgList(data);
  };

  const getMedia = async (id: any): Promise<any> => {
    const { data } = await api.get(
      `${constants.APP_URL}/conversations/${id}/media`
    );
    setPersonalChatMediaList(data);
  };

  const sendMessage = async (payload: any): Promise<any> => {
    const { data } = await api.post(`${constants.APP_URL}/messages`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setPersonalChatMsgList((currList: any) => [...currList, data]);
    return data;
  };

  return {
    getData,
    getMessages,
    sendMessage,
    getMedia,
    getUsersList,
    getCount,
  };
};

export default useCustomHook;
