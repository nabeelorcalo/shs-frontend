/// <reference path="../../../jspdf.d.ts" />

import jsPDF from "jspdf";
import api from "../../api";
import csv from "../../helpers/csv";
import "jspdf-autotable";

export const renderBg: any = {
  "design task": "#5D89F4",
  research: "#E76864",
  "outdoor activities": "#FFC200",
};

const useCustomHook = () => {
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const didParseCell = async (item: any) => {
    if (item.row.section === "head") item.cell.styles.fillColor = [230, 244, 249];
    else item.cell.styles.fillColor = false;
  };
  const didDrawCell = async (item: any) => {
    if (item.column.dataKey === 2 && item.section === "body") {
      const xPos = item.cell.x;
      const yPos = item.cell.y;
      var dim = 20;
    }
  };

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any, body: any) => {
    const type = event?.target?.innerText;
    if (type === "PDF" || type === "Pdf") pdf(`${fileName}`, header, data, body);
    else csv(`${fileName}`, header, data, false);
  };

  const pdf = (fileName: string, header: any, data: any, body: any) => {
    const title = fileName;
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
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
        fontStyle: "normal",
        fontSize: 12,
      },
      didParseCell: didParseCell,
      didDrawCell: didDrawCell,
    });

    doc.save(`${fileName}.pdf`);
  };

  const downloadNestedTable = (event: any, header: string[], innerHeader: string[], data: any, fileName: string, body: any) => {
    const type = event?.target?.innerText.toLowerCase();
    if (type === "pdf") nestedPf(fileName, header, innerHeader, data, body);
    else csv(`${fileName}`, header, data, true);
  };

  const nestedPf = (fileName: string, header: any, innerHeader: string[], data: any, body: any) => {
    const title = fileName;
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);
    doc.autoTable({
      header: [header],
      body: body,
      // didDrawCell: (data: any) => {
      //   if (data.column.dataKey === 0 && data.cell.section === 'body') {
      //     doc.autoTable({
      //       head: [innerHeader],
      //       body: [[]]
      //     })
      //   }
      // }
    });
  };

  return {
    getData,
    downloadPdfOrCsv,
    downloadNestedTable,
  };
};

export default useCustomHook;
