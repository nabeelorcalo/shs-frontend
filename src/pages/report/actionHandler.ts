/// <reference path="../../../jspdf.d.ts" />
import { useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import csv from '../../helpers/csv';
import { useRecoilState } from "recoil";
import endpoints from '../../config/apiEndpoints';
import { universityReportsAPICallStatus, universityReportsFilterParam, universityReportsFiltersData, universityReportsTableData } from "../../store/univeristy-reports";
const { UNIVERSITY_REPORTS, UNIVERSITY_USER_REPORTS, UNIVERSITY_REPORTS_FILTER } = endpoints
const useCustomHook = () => {
  const [universityReports, setUniversityReports] = useRecoilState<any>(universityReportsTableData)
  const [selectedUniversityReportsData, setSelectedUniversityReportsData] = useState<any>([])
  const [selectedAsseessmentReport, setSelectedAsseessmentReport] = useState<any>([])
  const [universityReportsFilters, setuniversityReportsFilters] = useRecoilState<any>(universityReportsFiltersData)
  // loader
  const [isLoading, setISLoading] = useRecoilState(universityReportsAPICallStatus);
  // company manager list
  const [companyManagerList, setCompanyManagerList] = useState<any>([])
  // reports params
  let params: any = {
    limit: 10,
    page: 1,

  };
  // global set params for filter ans search
  const [filterParams, setFilterParams] = useRecoilState<any>(universityReportsFilterParam)
  // handle global filters params
  const handleFilterParams = (filter: any) => {
    params = { ...params, ...filter }
    setFilterParams({ ...params, ...filter })
  }
  // get case-studies table data
  const getData = async (query?: any) => {
    setISLoading(true)
    //search query check
    if (query?.search) {
      params.search = query?.search
    }
    if (filterParams?.intern || filterParams?.department || filterParams?.status || filterParams?.date) {
      params = { ...params, ...filterParams }
    }
    await api.get(UNIVERSITY_REPORTS, query === "resetFilter" ? { page: 1, limit: 10 } : params).then((
      { count, data, pagination }
    ): any => {
      setUniversityReports({
        count,
        data: data?.map((obj: any, index: number) => ({
          id: obj?.id,
          no: index + 1,
          avater: Image,
          firstName: obj?.userDetail?.firstName,
          lastName: obj?.userDetail?.lastName,
          department: obj?.company?.businessName ?? "",
          company: obj?.internship?.department?.name ?? "",
          reviewer: `${obj?.manager?.companyManager?.firstName} ${obj?.manager?.companyManager?.lastName}`,
        })),
        pagination
      })
      setISLoading(false)
    });
  };

  // get params id
  const getParamId = (value: string) => {
    return value?.substring(value?.lastIndexOf("/") + 1, value?.length);
  };

  // get single case-study object
  const getSelectedUniversityReportsData = async (params: any) => {
    setISLoading(true)
    await api.get(`${UNIVERSITY_USER_REPORTS}`, params).then(({ data }) => {
      setSelectedUniversityReportsData(data)
      setISLoading(false)
    })
  }

  // get single assessment report object
  const getSelectedAsseessmentReport = async (id: any) => {
    setISLoading(true)
    await api.get(`${UNIVERSITY_USER_REPORTS}/${id}`).then(({ data }) => {
      setSelectedAsseessmentReport(data)
      setISLoading(false)
    })
  }

  // to check signature is image or not 
  const checkForImage = (url: string) => {
    let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
    if (url && url.match(regex))
      return true;
    else
      return false;
  }

  // git filters values
  const getFiltersData = async () => {
    await api.get(UNIVERSITY_REPORTS_FILTER).then(({ data }) => (setuniversityReportsFilters(data)))
  }


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

    const body = data.map(({ no, avater, name, department, company, reviewer }: any) =>
      [no, '', name, department, company, reviewer]
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
        if (item.column.dataKey === 1 && item.section === "body") {
          const xPos = item.cell.x;
          const yPos = item.cell.y;
          var dim = 20;

          const img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3QAIAA4AFgAoAB1hY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABgAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABwYI/8QAJxAAAQMEAQMDBQAAAAAAAAAAAQIDBAAFBhEhEiIxBxNBFjJRYXH/xAAZAQACAwEAAAAAAAAAAAAAAAAAAwEEBQb/xAAjEQABAwMDBQEAAAAAAAAAAAABAAIDBAUREjHBITJBUWHR/9oADAMBAAIRAxEAPwDbTM5x+0YE5lYlx7hEZ6W1JhyEOkvK8NbBICufn4BNS+7et31DZJlonW6Lbo01Pt+83KJcbTvfIOgeBo615qNYplFvhTDCessNmySnEiWw2pXU5pCkpWVkk7T1E8Ac7/NVbJIuGW7DlS4NsTCQ5BLSAqO2tEpSk9ijvvQrz3A62N6oqbjI7DCN1bp7fGdUgcOiy8eEJLYmwVbbcOkFKu0jyRz92tUpiubWGBbXrbd8MiSYpTpo2+c7HU0oAd/QSpClk8lSgfNKNZyoGMbKRpRw4jWlAbT+q6Q9EfTy85RhMJN7aadQ06JVvZkOnpcaI0UqPI6SeQn+71ulKWWhz2tPn8KZTjuPocrO5xYo87KH3I9si2dMhKBHaRFUlKhyknpA7TxsnQApSlZVRVyQENaustVvpauMulYMj6Rzhf/Z";
          doc.addImage(img, xPos + 10, yPos, dim, dim);

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
    isLoading,
    getData,
    universityReports, selectedUniversityReportsData, getSelectedUniversityReportsData, handleFilterParams,
    downloadPdfOrCsv, getParamId, getSelectedAsseessmentReport, selectedAsseessmentReport, checkForImage, companyManagerList, getFiltersData, universityReportsFilters
  };
};

export default useCustomHook;