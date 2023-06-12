/// <reference path="../../../jspdf.d.ts" />
import { useState } from "react";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { applicationDataState, applicationDetailState } from "../../store";
import csv from '../../helpers/csv';
import dayjs from "dayjs";


// Chat operation and save into store
const useCustomHook = () => {
  const { GET_APPLICATIONS, GET_APPLICATIONS_DETAILS } = apiEndpints;
  const [applicationsData, setApplicationsData] = useRecoilState(applicationDataState);
  const [applicationDetailsState, setapplicationDetailsState] = useRecoilState(applicationDetailState);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getApplicationsData = async (state: any = null, 
    searchValue: any = null, 
    timeFrame: any, 
    startDate: any = null, 
    endDate: any = null) => {
    const params: any = {
      limit: 100,
      page: 1,
      locationType: state.natureOfWork === 'All' ? '' : state.natureOfWork,
      stage: state.stage === 'All' ? '' : state.stage,
      search: searchValue ? searchValue : null,
      filterType: state.timeFrame??null,
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD')
    }
    if (state.typeOfWork === "PAID" || state.typeOfWork === "UNPAID") {
      params["salaryType"] = state.typeOfWork === 'All' ? '' : state.typeOfWork
    } else {
      params["internType"] = state.typeOfWork === 'All' ? '' : state.typeOfWork
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    setIsLoading(true);
    const { data } = await api.get(GET_APPLICATIONS, query);
    if (data) {
      setIsLoading(false)
      setApplicationsData(data)
    }
  };

  // get application details list 
  const getApplicationsDetails = async (val: any) => {
    const { data } = await api.get(GET_APPLICATIONS_DETAILS, { id: val });
    setapplicationDetailsState(data)
  };

  //Search applications 
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);


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

    const body = data.map(({ no, date_applied, company, type_of_work, internship_type, nature_of_work, position, status }: any) =>
      [no, date_applied, company, type_of_work, internship_type, nature_of_work, position, status]
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
    getApplicationsData,
    getApplicationsDetails,
    downloadPdfOrCsv,
    applicationDetailsState,
    debouncedSearch,
    applicationsData,
    isLoading
  };
};

export default useCustomHook;