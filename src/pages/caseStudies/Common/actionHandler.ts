/// <reference path="../../../../jspdf.d.ts" />
import React, { useRef, useState } from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../../api";
import csv from "../../../helpers/csv";

// Chat operation and save into store
let signPad: any = {};
const useCustomHookforAssment = () => {
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    const type = event?.target?.innerText;

    if (type === "csv" || type === "CSV")
      csv(`${fileName}`, header, data, true); // csv(fileName, header, data, hasAvatar)
    else
      pdf(`${fileName}`, header, data);
  }

  const pdf = (fileName: string, header: any, data: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;

    const body = data.map(({ learningCategories, learningObjectives, evidenceOfProgress, content }: any) =>
      [learningCategories, learningObjectives, evidenceOfProgress, content]
    );

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);

    doc.autoTable({
      head: [header],
      body: body,
      margin: { top: 50 },
      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: 'normal',
        fontSize: 12,
      },

      didParseCell: async (item: any) => {
        if (item.row.section === "head")
          item.cell.styles.fillColor = false;
        else
          item.cell.styles.fillColor = false;
      }
    });

    doc.save(`${fileName}.pdf`);
  };

  const [signature, setSignature] = useState("");
  const getSignPadValue = (value: any) => {
    console.log(value);
    signPad = value
  }

  const urlToFile = (url: any) => {
    let arr = url.split(",");
    // console.log(arr) 
    let mime = arr[0].match(/:(.*?);/)[1];
    let data = arr[1];
    let dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);
    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }
    let file = new File([dataArr], `File(${new Date().toLocaleDateString("en-US")}).png`, { type: mime, });
    return file;
  };
  // const formatIntoPng = (isClear: boolean) => {
  //   if (isClear) { return null; }
  //   else {
  //     if (sigCanvas.current) {
  //       const dataURL = sigCanvas.current.toDataURL();

  //     }
  //   }
  // };

  const cancelDrawaSign = () => {
    signPad?.clear();
    setSignature("")
  };
  const handleSignatue = () => {
    // setState({ trimmedDataURL: sigPad.getTrimmedCanvas().toDataURL("image/png") });
    let dataURL: any = signPad?.getTrimmedCanvas()?.toDataURL("image/png");
    let file = signPad?.isEmpty() ? null : urlToFile(dataURL);
    console.log(file, "fileee");

    // return file;
    setSignature(signPad?.getTrimmedCanvas()?.toDataURL("image/png"))
  };

  return {
    getData,
    downloadPdfOrCsv,
    getSignPadValue,
    cancelDrawaSign, handleSignatue, signature
  };
};

export default useCustomHookforAssment;