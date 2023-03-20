import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import constants from "../../config/constants";

// Chat operation and save into store
const useCustomHook = () => {
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };
  // Submit Leave Request Function For Intrnee
  const submitLeaveRequest = ()=>{
    alert("Submit Leave Function goes here");
  }
  // const SelectLeaveTypeVlaue =(e:any)=>{
  //   console.log(e.target.value, "value  of checkbox");
    
  // }
  return {
    getData,
    submitLeaveRequest,
    // SelectLeaveTypeVlaue,
    
  };
};

export default useCustomHook;