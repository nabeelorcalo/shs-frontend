/// <reference path="../../../jspdf.d.ts" />

import 'jspdf-autotable';
import api from "../../api";


const useCustomHook = () => {
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  return {
    getData,

  };
};

export default useCustomHook;