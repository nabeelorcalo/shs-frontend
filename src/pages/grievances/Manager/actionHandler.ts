/// <reference path="../../../../jspdf.d.ts" />

import jsPDF from "jspdf";
import "jspdf-autotable";
import api from "../../../api";
import csv from "../../../helpers/csv";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import {
  feedBackChartState,
  grievanceDashboardState,
  grievanceDetailLoading,
  grievanceDetailState,
  grievanceListLoading,
  grievanceListState,
  managersListState,
  resolutionFeedBackState,
  responseTimeState,
  statsGraphState,
} from "../../../store";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { Notifications } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useCustomHook = () => {
  const [grievanceList, setGrievanceList] = useRecoilState<any>(grievanceListState);
  const [managersList, setManagersList] = useRecoilState(managersListState);
  const [dashbaordData, setDashbaordData] = useRecoilState(grievanceDashboardState);
  const [responseTime, setResponseTime] = useRecoilState(responseTimeState);
  const [feedbackChart, setFeedbackkChart] = useRecoilState(feedBackChartState);
  const [resolutionFeedBack, setResolutionFeedBack] = useRecoilState(resolutionFeedBackState);
  const [grievanceDetail, setGrievanceDetail] = useRecoilState(grievanceDetailState);
  const [loading, setLoading] = useRecoilState(grievanceDetailLoading);
  const [grievanceLoading, setGrievanceLoading] = useRecoilState(grievanceListLoading);
  const [statsGraphData, setStatsGraphData] = useRecoilState(statsGraphState);
  const [replyList, setReplyList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();
  const {
    GRIEVANCE_CREATE,
    GRIEVANCE_LIST,
    GET_SINGLE_COMPANY_MANAGER_LIST,
    GRIEVANCE_DASHBOARD,
    GRIEVANCE_RESPONSE_TIME,
    GRIEVANCE_FEEDBACK_GRAPH,
    GRIEVANCE_DETAIL,
    GRIEVANCE_REPLY,
    GRIEVANCE_UPDATE,
    GRIEVANCE_GRIEVANCE_GRAPH,
    GRIEVANCE_REPLY_LIST,
    GRIEVANCE_FEEDBACK,
  } = endpoints;
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any, selectedTab: any) => {
    const type = event?.target?.innerText;

    if (type === "pdf" || type === "Pdf") pdf(`${fileName}`, header, data, selectedTab);
    else csv(`${fileName}`, header, data, true); // csv(fileName, header, data, hasAvatar)
  };

  const pdf = (fileName: string, header: any, data: any, selectedTab: any) => {
    const title = fileName;
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;

    let TableData = () => {
      if (selectedTab === "1") {
        return data.map(({ no, subject, type, date, escalatedTo, status }: any) => [no, subject, type, date, escalatedTo, status]);
      } else if (selectedTab === "2") {
        return data.map(({ no, subject, type, date, escalatedTo, status }: any) => [no, subject, type, date, escalatedTo, status]);
      } else {
        null;
      }
    };
    const body = TableData();
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

      didParseCell: async (item: any) => {
        if (item.row.section === "head") item.cell.styles.fillColor = [230, 244, 249];
        else item.cell.styles.fillColor = false;
      },

      didDrawCell: async (item: any) => {
        if (item.column.dataKey === 1 && item.section === "body") {
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

  const getGreviencesList = (params: any, tableParams: any = null, setTableParams: any = null) => {
    setGrievanceLoading(true);
    api
      .get(GRIEVANCE_LIST, params)
      .then((result) => {
        const { pagination } = result;
        setGrievanceList(result);
        if (setTableParams)
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: pagination?.totalResult,
              current: pagination?.page,
            },
          });
      })
      .finally(() => setGrievanceLoading(false));
  };

  const getManagerList = (params: any) => {
    api.get(GET_SINGLE_COMPANY_MANAGER_LIST, params).then(({ data }) => setManagersList(data));
  };

  const createGrievance = (payload: any, onSuccess?: () => void) => {
    api
      .post(GRIEVANCE_CREATE, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        Notifications({
          title: "Success",
          description: "Grievance Submitted",
          type: "success",
        });
        if (onSuccess) onSuccess();
        return result;
      });
  };
  const fetchDashbaordData = () => {
    api.get(GRIEVANCE_DASHBOARD).then(({ data }) => setDashbaordData(data));
    api.get(GRIEVANCE_RESPONSE_TIME).then(({ data }) => setResponseTime(data));
    api.get(GRIEVANCE_FEEDBACK_GRAPH).then(({ data }) => {
      if (data.graphData) {
        const convertedData: any = Object.entries(data?.graphData).map(([month, values]: any) => ({
          month: month.slice(0, 3), // Extract the first three letters of the month
          Positive: parseFloat(values.SATISFIED), // Convert the string to a floating-point number
          Negative: parseFloat(values.UNSATISFIED), // Convert the string to a floating-point number
        }));
        setFeedbackkChart(convertedData);
      }
      if (data?.resolutionFeedback) {
        const formattedData = {
          satisfiedPercentage: data?.resolutionFeedback?.satisfiedPercentage.toFixed(2),
          unsatisfiedPercentage: data?.resolutionFeedback?.unsatisfiedPercentage.toFixed(2),
        };
        setResolutionFeedBack(formattedData);
      }
    });
    api.get(GRIEVANCE_GRIEVANCE_GRAPH).then(({ data }) => {
      setStatsGraphData(data);
    });
  };

  const fetchGrievanceDetail = (id: string) => {
    setLoading(true);
    api
      .get(`${GRIEVANCE_DETAIL}/${id}`)
      .then(({ data }) => {
        if (!data) {
          Notifications({
            title: "Error",
            description: "No Data Found!!!",
            type: "error",
          });
          navigate(ROUTES_CONSTANTS.ALL_GRIEVANCES);
        }
        setGrievanceDetail(data);
      })
      .finally(() => setLoading(false));
  };

  const addReply = (payload: any, onSuccess?: () => void) => {
    api
      .post(GRIEVANCE_REPLY, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (onSuccess) onSuccess();
        return result;
      });
  };
  const updateGrievance = (payload: any, grievanceId: string, onSuccess?: () => void) => {
    api.put(`${GRIEVANCE_UPDATE}/${grievanceId}`, payload).then((result) => {
      if (onSuccess) onSuccess();
      return result;
    });
  };

  const getGrievanceReplyList = (params: any) => {
    api.get(`${GRIEVANCE_REPLY_LIST}`, params).then(({ data }) => setReplyList(data));
  };

  const addFeedBack = (payload: any, onSuccess?: () => void) => {
    api.post(GRIEVANCE_FEEDBACK, payload).then((result) => {
      if (onSuccess) onSuccess();
      return result;
    });
  };
  const getFeedbackList = (params: any) => {
    api.get(GRIEVANCE_FEEDBACK, params).then(({ data }) => setFeedbackList(data));
  };
  const navigateGrievanceList = () => {
    api.get(GRIEVANCE_LIST).then(({ data }) => {
      if (data?.length) navigate(ROUTES_CONSTANTS.ALL_GRIEVANCES);
    });
  };
  return {
    getData,
    downloadPdfOrCsv,
    getGreviencesList,
    grievanceList,
    setGrievanceList,
    managersList,
    getManagerList,
    createGrievance,
    fetchDashbaordData,
    dashbaordData,
    responseTime,
    feedbackChart,
    resolutionFeedBack,
    fetchGrievanceDetail,
    grievanceDetail,
    addReply,
    updateGrievance,
    loading,
    statsGraphData,
    grievanceLoading,
    getGrievanceReplyList,
    replyList,
    addFeedBack,
    getFeedbackList,
    feedbackList,
    navigateGrievanceList,
  };
};

export default useCustomHook;
