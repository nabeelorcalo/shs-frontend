/// <reference path="../../../jspdf.d.ts" />
import { useState } from "react";
import { useRecoilState } from 'recoil';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import csv from '../../helpers/csv';
import apiEndpints from "../../config/apiEndpoints";
import { payrollDataState, payrollInternState, settingDepartmentState, payrollDetailsData } from '../../store';
import { debounce } from 'lodash';
import { Notifications } from "../../components";
import dayjs from "dayjs";


// Chat operation and save into store
const useCustomHook = () => {
  //get Payroll data from BE side
  const { PAYROLL_FINDALL, DELETE_PAYROLL,
    ADD_PAYROLL, INTERN_LIST, EDIT_PAYROLL, SETTING_DAPARTMENT, GET_PAYROLL_DETAILS } = apiEndpints;
  const [departmentsData, setDepartmentsData] = useRecoilState(settingDepartmentState);
  const [payrollData, setPayrollData] = useRecoilState(payrollDataState);
  const [internsData, setInternsData] = useRecoilState(payrollInternState);
  const [payrollDetails, setPayrollDetails] = useRecoilState(payrollDetailsData);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (
    state?: any, searchValue?: any, timeFrame?: any,
    startDate?: any, endDate?: any) => {
    const params = {
      page: 1,
      limit: 10,
      q: searchValue,
      departmentId: state?.department === "All" ? null : state?.department,
      filterType: timeFrame?.toUpperCase().replace(" ", "_"),
      startDate: timeFrame === "DATE_RANGE" ? startDate?.replace("_", "") : null,
      endDate: timeFrame === " DATE_RANGE" ? dayjs(endDate)?.format("YYYY-MM-DD") : null,
      payrollStartDate: state.from ? dayjs(state.from).format("YYYY-MM-DD") : null,
      payrollEndDate: state.to ? dayjs(state.to).format("YYYY-MM-DD") : null

    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    setIsLoading(true);
    const { data } = await api.get(PAYROLL_FINDALL, query);
    setPayrollData(data)
    setIsLoading(false);
  }

  //Search
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);


  // delete payroll data 
  const deletePayroll = async (id: any) => {
    await api.delete(`${DELETE_PAYROLL}/${id}`);
    Notifications({ title: "Success", description: 'Payroll deleted', type: 'success' })
    getData()
  };

  // Post payroll data
  const postPayroll = async (values: any) => {
    const { payrollName, from, timeTo, applyToNewHires, interns } = values;
    const startDate = from.startOf('month')
    const endDate = timeTo.endOf('month')
    const payrollDetails = {
      "name": payrollName,
      "from": dayjs(startDate).format("YYYY-MM-DD"),
      "to": dayjs(endDate).format("YYYY-MM-DD"),
      "interns": interns?.map((item: any) => item?.id),
      "applyToNewHires": applyToNewHires
    }
    setIsLoading(true);
    const { data } = await api.post(ADD_PAYROLL, payrollDetails);
    if (data) {
      setIsLoading(false);
      Notifications({ title: "Success", description: "Payroll added", type: "success" })
    }
  }

  // Edit Payroll 
  const editPayroll = async (id: any, values: any) => {
    const { applyToNewHire, interns, payrollName, from, timeTo } = values;
    const params = {
      name: payrollName,
      from: dayjs(from),
      to: dayjs(timeTo),
      interns: interns.map((item: any) => item?.id),
      applyToNewHires: applyToNewHire
    }
    setIsLoading(true)
    await api.patch(`${EDIT_PAYROLL}/${id}`, params);
    setIsLoading(false)
    // Navigate(ROUTES_CONSTANTS.TEMPLATE_OFFER_LETTER, { state: templateType });
    getData()
    Notifications({ title: "Success", description: 'Payroll updated', type: 'success' })
  };


  // Getting all interns data 
  const getAllInterns = async (companyId: any) => {
    const params = {
      companyId: companyId
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    setIsLoading(true);
    const { data } = await api.get(INTERN_LIST, query);
    setInternsData(data)
    setIsLoading(false);
  };

  //Get all department data
  const getAllDepartmentData = async () => {
    const { data } = await api.get(SETTING_DAPARTMENT, { page: 1, limit: 10, });
    setDepartmentsData(data)
  };

  //Get all department data
  const getPayrollDetails = async (payrollId: any, userId: any, month?: any) => {
    const params = {
      payrollId: payrollId,
      userId: userId,
      month: month ? [dayjs(month).format("MMMM YYYY")] : null
    }
    const { data } = await api.get(GET_PAYROLL_DETAILS, params);
    setPayrollDetails(data)
  };

  //download pdf or excel functionality
  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    const type = event?.target?.innerText;

    if (type === "pdf" || type === "PDF")
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

    const body = data.map(({ no, name, department, joining_date, payroll_cycle }: any) =>
      [no, name, department, joining_date, payroll_cycle]
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
    getData,
    payrollData,
    debouncedSearch,
    getAllDepartmentData,
    setPayrollData,
    departmentsData,
    getPayrollDetails,
    payrollDetails,
    deletePayroll,
    downloadPdfOrCsv,
    postPayroll,
    getAllInterns,
    editPayroll,
    internsData,
    isLoading,
  };
};

export default useCustomHook;