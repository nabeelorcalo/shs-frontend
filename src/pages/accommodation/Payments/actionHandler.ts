/// <reference path="../../../../jspdf.d.ts" />
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import csv from '../../../helpers/csv';
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { paymentsListState } from "../../../store";


const usePaymentsHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const paymentsColumns = ['No', 'Agent Name', 'Address', 'Rent Period', 'Rent Amount', 'Date', 'Status'];
  const { GET_PAYMENTS } = endpoints;
  const [paymentList, setPaymentList] = useRecoilState(paymentsListState)


  // Get All Payments
  const getPayments = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>, params:any={}) => {
    setLoading(true);
    try {
      const response = await api.get(`${GET_PAYMENTS}`, params);
      setPaymentList(response.data)
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const downloadPaymentsCSV = (fileName: any, data: any) => {
    csv(`${fileName}`, paymentsColumns, data, false); // csv(fileName, header, data, hasAvatar)  
  }

  const downloadPaymentsPDF = (fileName: string, data: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';

    const body = data.map(({ key, agentName, address, rentPeriod, rentAmount, date, status }: any, index:any) =>
      [index + 1, agentName, address, rentPeriod, rentAmount, date, status]
    );
  

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    doc.text(title, 40, 30);

    doc.autoTable({
      head: [paymentsColumns],
      body: body,
      margin: { top: 50 },

      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: 'bold',
        fontSize: 10.5,
      },
      bodyStyles: {
        textColor: [78, 75, 102],
        fontSize: 10.5
      },
      columnStyles: {
        0: {
          halign: 'center',
        }
      },

      didParseCell: async (item: any) => {
        if (item.row.section === "head") {
          item.cell.styles.fillColor = [230, 244, 249];
        } else {
          item.cell.styles.fillColor = false;
        }
        if(item.column.dataKey === 0) {

        }
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  return {
    getPayments,
    paymentList,
    downloadPaymentsCSV,
    downloadPaymentsPDF
  };
};

export default usePaymentsHook;