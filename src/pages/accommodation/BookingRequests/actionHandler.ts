/// <reference path="../../../../jspdf.d.ts" />
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../../api";
import csv from '../../../helpers/csv';
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { bookingRequestsState } from "../../../store";


const useBookingRequests = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const bookingRequestColumns = ['No', 'Agent Name', 'Address', 'Booking Duration', 'Rent', 'Status'];
  const { GET_PROPERTY_BOOKINGS, GET_SEARCH_BOOKING_REQUEST, CANCEL_BOOKING_REQUEST } = endpoints;
  const [bookingRequests, setBookingRequests] = useRecoilState(bookingRequestsState)

  // Get Booking Requests
  const getBookingRequests = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const res = await api.get(GET_PROPERTY_BOOKINGS, params);
      if(!res.error) {
        const { data } = res;
        setBookingRequests(data)
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Get Search Booking Requests
  const getSearchBookingRequests = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const res = await api.get(GET_SEARCH_BOOKING_REQUEST, params);
      if(!res.error) {
        const { data } = res;
        setBookingRequests(data)
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Cancel Booking Request
  const cancelBookingRequest = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    await api.patch(`${CANCEL_BOOKING_REQUEST}?bookingId=${id}`)
    setLoading(false)
    setBookingRequests(
      bookingRequests.filter((request:any) => request.id !== id)
    )
  }


  const downloadCSV = (fileName: any, data: any) => {
    csv(`${fileName}`, bookingRequestColumns, data, false); // csv(fileName, header, data, hasAvatar)  
  }

  const downloadPDF = (fileName: string, data: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';

    const body = data.map(({ key, agentTitle, address, durationBooking, rent, status }: any, index:any) =>
      [index + 1, agentTitle, address, durationBooking, rent, status]
    );
  

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    doc.text(title, 40, 30);

    doc.autoTable({
      head: [bookingRequestColumns],
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
    getBookingRequests,
    bookingRequests,
    downloadCSV,
    downloadPDF,
    getSearchBookingRequests,
    cancelBookingRequest
  };
};

export default useBookingRequests;