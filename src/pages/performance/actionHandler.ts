///<reference path="../../../jspdf.d.ts" />
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import endPoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allPerformanceState,
  internEvaluationHistoryState,
  topPerformersState,
  performanceDetailState,
  evaluatedByState,
  allDepartmentsState,
  singlePerformanceState,
  currentUserState
} from "../../store";

const usePerformanceHook = () => {
  const {
    GET_PERFORMANCE,
    GET_PERFORMANCE_LIST,
    GET_INTERN_EVALUATION_HISTORY,
    GET_PERFORMANCE_DETAIL,
    GET_COMPANY_MANAGERS_LIST,
    SETTING_DAPARTMENT,
    PERFORMANCE_EVALUATION
  } = endPoints;
  const [singlePerformance, setsinglePerformance]:any = useRecoilState(singlePerformanceState);
  const [allPerformance, setAllPerformance] = useRecoilState(allPerformanceState);
  const [internEvalHistory, setInternEvalHistory] = useRecoilState(internEvaluationHistoryState);
  const [topPerformers, setTopPerformers] = useRecoilState(topPerformersState);
  const [performanceDetail, setPerformanceDetail]:any = useRecoilState(performanceDetailState);
  const [evaluatedByList, setEvaluatedByList]:any = useRecoilState(evaluatedByState);
  const [departmentsList, setDepartmentsList] = useRecoilState(allDepartmentsState);
  const currentUser = useRecoilValue(currentUserState)
  console.log('currentUser::: ', currentUser)

  // Get Single Performance
  const getPerformance = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>, params:any) => {
    setLoading(true);
    try {
      const {data} = await api.get(GET_PERFORMANCE, params);
      setsinglePerformance(data);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Get All Performance
  const getAllPerformance = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>, params:any) => {
    setLoading(true);
    try {
      const {data} = await api.get(GET_PERFORMANCE_LIST, params);
      setAllPerformance(data);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Get Top Performers
  const getTopPerformers = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const response = await api.get(GET_PERFORMANCE_LIST, {sortByPerformance: true});
      const { data } = response;
      setTopPerformers(data);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Get Performance Detail
  const getPerformanceDetail = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>, id:any) => {
    setLoading(true);
    try {
      const response = await api.get(`${GET_PERFORMANCE_DETAIL}/${id}`);
      const { data } = response;
      setPerformanceDetail(data);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Get Intern Evaluation History
  const getInternEvaluationHistory = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>, id:any) => {
    setLoading(true);
    try {
      const { data } = await api.get(`${GET_INTERN_EVALUATION_HISTORY}/${id}`);
      setInternEvalHistory(data);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Get Evaluated By
  const getEvaluatdBy = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const { data }:any = await api.get(GET_COMPANY_MANAGERS_LIST);
      setEvaluatedByList([
        {
          id: currentUser.id,
          companyManager: {
            ...currentUser
          }
        },
        ...data
      ]);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // setManagerList((prev: any) => [
  //   {
  //     id: user.id,
  //     companyManager: {
  //       ...user
  //     }

  //   },
  //   ...data
  // ]);

  // Get Departments
  const getDepartments = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const { data } = await api.get(SETTING_DAPARTMENT, params);
      setDepartmentsList(data);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Post Performance Evaluation
  const postPerformanceEvaluation = async (reqBody:any) => {
    const response = await api.post(PERFORMANCE_EVALUATION, reqBody);
    return response
  }

  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const downloadPdf = (header: any, data: any) => {
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = 'Table with Pagination';
    doc.text(title, marginLeft, 40);
    const body = data.map(({ no, avatar, name, department, date, evaluatedBy, totalEvaluations, performance }: any) =>
      [no, '', name, department, date, evaluatedBy, totalEvaluations, performance]
    );
    const detailHistoryBody = data.map(({ date, performance }: any) =>
      [date, performance]
    );

    doc.autoTable({
      head: [header.map((h: any) => h.header)],
      body: body,
      margin: { top: 50 },
      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: 'normal',
        fontSize: 16,
      },
      styles: {
        fillColor: false,
      },
      didDrawCell: async (item: any) => {
        if (item.row.section === "head") {
          item.cell.styles.fillColor = [230, 244, 249];
        } else {
          item.cell.styles.fillColor = false;
        }
        if (item.column.dataKey === 1 && item.section === "body") {
          var dim = 20;
          const img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3QAIAA4AFgAoAB1hY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABgAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABwYI/8QAJxAAAQMEAQMDBQAAAAAAAAAAAQIDBAAFBhEhEiIxBxNBFjJRYXH/xAAZAQACAwEAAAAAAAAAAAAAAAAAAwEEBQb/xAAjEQABAwMDBQEAAAAAAAAAAAABAAIDBAUREjHBITJBUWHR/9oADAMBAAIRAxEAPwDbTM5x+0YE5lYlx7hEZ6W1JhyEOkvK8NbBICufn4BNS+7et31DZJlonW6Lbo01Pt+83KJcbTvfIOgeBo615qNYplFvhTDCessNmySnEiWw2pXU5pCkpWVkk7T1E8Ac7/NVbJIuGW7DlS4NsTCQ5BLSAqO2tEpSk9ijvvQrz3A62N6oqbjI7DCN1bp7fGdUgcOiy8eEJLYmwVbbcOkFKu0jyRz92tUpiubWGBbXrbd8MiSYpTpo2+c7HU0oAd/QSpClk8lSgfNKNZyoGMbKRpRw4jWlAbT+q6Q9EfTy85RhMJN7aadQ06JVvZkOnpcaI0UqPI6SeQn+71ulKWWhz2tPn8KZTjuPocrO5xYo87KH3I9si2dMhKBHaRFUlKhyknpA7TxsnQApSlZVRVyQENaustVvpauMulYMj6Rzhf/Z";
          doc.addImage(img, item.cell.x, item.cell.y, dim, dim);
        }
        if (item.column.dataKey === 7 && item.section === "body") {
          const xPos = item.cell.x;
          const yPos = item.cell.y;
          doc.setFillColor(74, 157, 119);
          doc.roundedRect(xPos - 25, yPos + 6, 100, 10, 5, 5, 'F'); //doc.roundedRect(xPos,yPos, width, height, radius, radius, 'F');
        }
      },
    });
    doc.save('table.pdf');
  };
  const downloadHistoryDataPdf = (header: any, data: any) => {
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = 'Table with Pagination';
    doc.text(title, marginLeft, 40);
    const detailHistoryBody = data.map(({ date, performance }: any) =>
      [date, performance]
    );

    doc.autoTable({
      head: [header.splice(0, 2).map((h: any) => h.title)],
      body: detailHistoryBody,
      margin: { top: 50 },
      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: 'normal',
        fontSize: 16,
      },
      styles: {
        fillColor: false,
      },
      didDrawCell: async (item: any) => {
        if (item.row.section === "head") {
          item.cell.styles.fillColor = [230, 244, 249];
        } else {
          item.cell.styles.fillColor = false;
        }
        if (item.column.dataKey === 1 && item.section === "body") {
          const xPos = item.cell.x;
          const yPos = item.cell.y;
          doc.setFillColor(74, 157, 119);
          doc.roundedRect(xPos + 25, yPos + 6, 100, 10, 5, 5, 'F'); //doc.roundedRect(xPos,yPos, width, height, radius, radius, 'F');
        }
      },
    });
    doc.save('table.pdf');
  };

  return {
    getPerformance,
    singlePerformance,
    getAllPerformance,
    allPerformance,
    getTopPerformers,
    topPerformers,
    getInternEvaluationHistory,
    getPerformanceDetail,
    performanceDetail,
    getEvaluatdBy,
    evaluatedByList,
    getDepartments,
    departmentsList,
    downloadPdf,
    downloadHistoryDataPdf,
    postPerformanceEvaluation
  };
};

export default usePerformanceHook;