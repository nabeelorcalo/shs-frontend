import React from "react";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
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
  const submitLeaveRequest = () => {
    alert("Submit Leave Function goes here");
  }
  // DownLoad Excel Pdf 
  const handleDownloadPdfExcel = (val: string) => {
    if (val === "pdf") {
      // const quality = 1
      const input:any = document.querySelector('#LeaveHistoryTable');
      html2canvas(input).then(canvas => {
          const pdf = new jsPDF('l', 'pt','a4',true);
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 10, 900, 0);
          pdf.save("LeaveHistoryTable.pdf");
      });
    }
  }
  return {
    getData,
    submitLeaveRequest,
    handleDownloadPdfExcel
  };
};

export default useCustomHook;