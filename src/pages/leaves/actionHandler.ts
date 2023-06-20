/// <reference path="../../../jspdf.d.ts" />
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';
import api from "../../api";
import csv from '../../helpers/csv';
import endpoints from '../../config/apiEndpoints';
import { Notifications } from '../../components';
import {
  currentUserState,
  geCalanderLeaveStateAtom,
  holidayListStateAtom,
  leaveStateAtom,
  viewHistoryLeaveStateAtom,
  filterState,
  pendingLeaveState,
} from '../../store';

/* Custom Hook For Functionalty 
 -------------------------------------------------------------------------------------*/

const useCustomHook = () => {
  const cruntUserState = useRecoilValue(currentUserState);
  const internID = cruntUserState?.intern?.id;
  const comapnyID = cruntUserState?.intern?.company?.id;

  const [leaveStats, setLeaveStats] = useRecoilState(leaveStateAtom);
  const [pendingLeaves, setPendingLeaves] = useRecoilState(pendingLeaveState);
  const [leaveHistory, setLeaveHistory] = useRecoilState(viewHistoryLeaveStateAtom);
  const [getCalanderLeaveState, setCalanderLeaevState] = useRecoilState(geCalanderLeaveStateAtom);
  const [upcomingHolidays, setUpcomingHolidays] = useRecoilState(holidayListStateAtom ?? []);
  const [filter, setfilter] = useRecoilState(filterState);

  const formate = (value: any, format: string) => dayjs(value).format(format);

  const {
    CALANDER_LEAEV_LIST,
    CREATE_LEAVE,
    HOLIDAY_LIST,
    LEAVE_STATE,
    GET_LEAVE_LIST,
    PENDING_LEAVES,
    UPDATE_LEAVE_STATUS,
  } = endpoints;

  // Need to remove the below two useState
  const [filterValues, setFilterValues] = useState<any>();
  // Till here

    /*  View History Leave List Functionalty 
-------------------------------------------------------------------------------------*/
  const getPendingLeaves = async () => {
    const {data}: any = await api.get(PENDING_LEAVES);
    setPendingLeaves(data);
  }

  /*  View History Leave List Functionalty 
-------------------------------------------------------------------------------------*/
  const getLeaveHistoryList = async (args: any = {}) => {
    const response: any = await api.get(GET_LEAVE_LIST, args);
    setLeaveHistory(response?.data);
  }

  /* To Get Data For Leave Status Cards 
   -------------------------------------------------------------------------------------*/
  const getLeaveStats = async (startDate: string, endDate: string) => {
    const params = { startDate: startDate, endDate: endDate };
    const { data } = await api.get(LEAVE_STATE, params);
    setLeaveStats(data);
  }

  /* Get Data For Leave Calander 
   -------------------------------------------------------------------------------------*/
  const getCalendarLeaveList = async (data: any = {}) => {
    const param = { startDate: "2023-05-04", endDate: "2023-06-05", internId: 1 }
    const response: any = await api.get(CALANDER_LEAEV_LIST, param)
    setCalanderLeaevState(response?.data)
  }

  /* Approve or Decline pending leaves request
   -------------------------------------------------------------------------------------*/
   const approveDeclineLeaveRequest = async (params: any = {}) => {
    let headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
    const response: any = await api.patch(UPDATE_LEAVE_STATUS, params, headerConfig);
    
    if(response?.message === "Success")
      Notifications({ title: response?.message, description: "Action done successfully", type: "success" })
    else
      Notifications({ title: response?.message, description: "Something went wrong. Please try again", type: "error" })
  }

  const onsubmitLeaveRequest = async (values: any, setIsAddModalOpen: any) => {
    const formData = new FormData();
    let headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
    const initailVal: any = {
      internId: internID,
      companyId: comapnyID,
      type: values?.type,
      durationType: values?.durationType,
      dateFrom: formate(values?.dateFrom, "YYYY-MM-DD"),
      dateTo: formate(values?.dateTo, "YYYY-MM-DD"),
      timeFrom: values?.timeFrom,
      timeTo: values?.timeTo,
      reason: values?.reason,
      media: values?.media?.file
    }

    formData.append('media', values?.media?.fileList);
    const updatedVal = {
      ...initailVal,
      media: formData
    };

    const response: any = await api.post(CREATE_LEAVE, updatedVal, headerConfig);

    if (response) {
      Notifications({ title: "Success", description: "Request for leave has been submitted", type: "success" })
      setIsAddModalOpen(false);
    }
    console.log(response, "response Create Leave");
  }

  /*  Holiday Leave List
-------------------------------------------------------------------------------------*/
  const getUpcomingHolidaysList = async () => {
    const { data }: any = await api.get(HOLIDAY_LIST);
    setUpcomingHolidays(data)
  }

  const onFilterLeaevHistory = (value: any, filterValue: any,) => {
    let valToUpperCase = filterValue.toUpperCase().trim().split(' ').join('_')
    // .replace(" ", "_");
    let parmValues;
    // console.log(valToUpperCase);

    if (valToUpperCase !== 'SELECT') {
      if (valToUpperCase === "THIS_WEEK" || valToUpperCase === "LAST_WEEK" || valToUpperCase === "THIS_MONTH" || valToUpperCase === "LAST_MONTH") {
        parmValues = { ...value, timeFrame: valToUpperCase }
        setFilterValues(parmValues);
      }
      else {
        var newDate = valToUpperCase.split("_");
        var isQumaIndex = newDate.indexOf(",");
        newDate.splice(isQumaIndex, 1);
        let [filterStartDate, filterEndDate] = newDate
        parmValues = { ...value, timeFrame: "DATE_RANGE", startDate: filterStartDate, endDate: filterEndDate }
        setFilterValues(parmValues);
      }
    }
  }

  /*  Download PDF Or CSV File InHIstory Table 
-------------------------------------------------------------------------------------*/

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    const type = event?.target?.innerText;
    if (type === "pdf" || type === "Pdf")
      pdf(`${fileName}`, header, data);
    else
      csv(`${fileName}`, header, data, true); // csv(fileName, header, data, hasAvatar)
  }

  const pdf = (fileName: string, header: any, data: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;
    const body = data.map(({ key, requestDate, start, end, leaveType, description, status }: any) =>
      [key, requestDate, start, end, leaveType, description, status]
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
          item.cell.styles.fillColor = [230, 244, 249];
        else
          item.cell.styles.fillColor = false;
      },

      didDrawCell: async (item: any) => {
        if (item.column.dataKey === 2 && item.section === "body") {
          const xPos = item.cell.x;
          const yPos = item.cell.y;
          var dim = 20;

          // const img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3QAIAA4AFgAoAB1hY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABgAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABwYI/8QAJxAAAQMEAQMDBQAAAAAAAAAAAQIDBAAFBhEhEiIxBxNBFjJRYXH/xAAZAQACAwEAAAAAAAAAAAAAAAAAAwEEBQb/xAAjEQABAwMDBQEAAAAAAAAAAAABAAIDBAUREjHBITJBUWHR/9oADAMBAAIRAxEAPwDbTM5x+0YE5lYlx7hEZ6W1JhyEOkvK8NbBICufn4BNS+7et31DZJlonW6Lbo01Pt+83KJcbTvfIOgeBo615qNYplFvhTDCessNmySnEiWw2pXU5pCkpWVkk7T1E8Ac7/NVbJIuGW7DlS4NsTCQ5BLSAqO2tEpSk9ijvvQrz3A62N6oqbjI7DCN1bp7fGdUgcOiy8eEJLYmwVbbcOkFKu0jyRz92tUpiubWGBbXrbd8MiSYpTpo2+c7HU0oAd/QSpClk8lSgfNKNZyoGMbKRpRw4jWlAbT+q6Q9EfTy85RhMJN7aadQ06JVvZkOnpcaI0UqPI6SeQn+71ulKWWhz2tPn8KZTjuPocrO5xYo87KH3I9si2dMhKBHaRFUlKhyknpA7TxsnQApSlZVRVyQENaustVvpauMulYMj6Rzhf/Z";
          // doc.addImage(img, xPos+10, yPos, dim, dim);

          // doc.setFillColor(255, 0, 0);
          // doc.roundedRect(xPos,yPos+6, 100, 20, 5, 5, 'F'); //doc.roundedRect(xPos,yPos, width, height, radius, radius, 'F');

          // const img = new Image();
          // img.src = svg;
          // item.cell.padding('vertical', 0);
          // doc.addImage(img, 'PNG', xPos+10, yPos, 20, 20);
        }
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  return {
    formate,
    leaveStats,
    getCalanderLeaveState,
    upcomingHolidays,
    pendingLeaves,
    leaveHistory,
    onFilterLeaevHistory,
    getCalendarLeaveList,
    onsubmitLeaveRequest,
    downloadPdfOrCsv,
    getLeaveStats,
    getUpcomingHolidaysList,
    getPendingLeaves,
    approveDeclineLeaveRequest,
    getLeaveHistoryList,
    filterValues,
    setFilterValues
  };
};

export default useCustomHook;