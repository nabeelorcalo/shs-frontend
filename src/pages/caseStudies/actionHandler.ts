import { useState } from 'react';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';
import 'jspdf-autotable';
import { useRecoilState, useRecoilValue } from 'recoil';
import type { TablePaginationConfig } from "antd/es/table";
import api from "../../api";
import csv from '../../helpers/csv';
import endpoints from '../../config/apiEndpoints';
import { caseStudiesFilterParam, caseStudiesTableData } from '../../store/case-studies';
import { Notifications } from '../../components';
import { currentUserRoleState } from '../../store';
import { getUserAvatar, urlToFile } from '../../helpers';
import { ROUTES_CONSTANTS } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

const learningCategories: any = {
  TECHNICAL: "Technical Skills",
  WWO: "Working with Others",
  SM: "Self-Management",
  CA: "Commercial Awarenesss",
  PPD: "Personal and Professional Development",
}

// alis endpoints
const { CASE_STUDIES, DEPARTMENT, INTERN_LIST, MEDIA_UPLOAD, GET_SINGLE_COMPANY_MANAGER_LIST } = endpoints
//signature object
let signPad: any;
let uploadFile: any;
let signature: any;
const useCustomHook = () => {
  const navigate = useNavigate();
  const currentUserRole = useRecoilValue(currentUserRoleState)
  //table data 
  const [caseStudyData, setCaseStudyData] = useRecoilState<any>(caseStudiesTableData)
  // loader
  const [isLoading, setISLoading] = useState(false);
  const [selectedCasStudyData, setSelectedCasStudyData] = useState<any>([])
  // departments list 
  const [departmentList, setDepartmentList] = useState<any>([])
  // intern list 
  const [internList, setInternList] = useState<any>([])
  // company manager list 
  const [companyManagerList, setCompanyManagerList] = useState<any>([])
  // signature modal state
  const [openModal, setOpenModal] = useState(false);
  // manager feedback
  const [feedbackFormData, setfeedbackFormData] = useState<any>({
    assessmentForm: [],
    supervisorSig: "",
    supervisorStatus: "",
    feedback: "",
  });

  const [signatureText, setSignatureText] = useState(signature ?? "");
  const [files, setFile] = useState<any>(null);
  // get data api params
  let params: any = {
    limit: 10,
    page: 1,
  };
  // global set params for filter ans search
  const [filterParams, setFilterParams] = useRecoilState<any>(caseStudiesFilterParam)
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
      params = { ...filterParams, ...params }
    }
    await api.get(CASE_STUDIES, query === "resetFilter" ? { page: 1, limit: 10 } : params).then((
      { count, data, pagination }
    ): any => {
      setCaseStudyData({
        count,
        data: data?.map((obj: any, index: number) => ({
          id: obj?.id,
          no: index + 1,
          avatar: getUserAvatar({ profileImage: obj?.intern?.userDetail?.profileImage }),
          name: `${obj?.intern?.userDetail?.firstName} ${obj?.intern?.userDetail?.lastName}`,
          ReportName: obj?.title,
          department: obj?.intern?.internship?.department?.name,
          assessmentDate: dayjs(obj?.createdAt).format("DD/MM/YYYY"),
          reportingManager: `${obj?.remarked?.firstName} ${obj?.remarked?.lastName}`,
          status: obj?.supervisorStatus,
          assessmentForm: obj?.assessmentForm
        })),
        pagination: {
          current: pagination?.page,
          pageSize: 10,
          showSizeChanger: false,
          total: pagination?.totalResult,
        }
      })
    });
    setISLoading(false)
  };
  // handle pagination
  const handleTableChange = (pagination: TablePaginationConfig) => {
    params.page = pagination?.current
    getData(params)
  };

  // get single case-study object
  const getSelectedCasStudyData = async (id: string) => {
    setISLoading(true)
    await api.get(`${CASE_STUDIES}/${id}`).then(({ data }) => {
      setSelectedCasStudyData(data)
      setfeedbackFormData({
        ...feedbackFormData, assessmentForm: data?.assessmentForm?.map((obj: any) =>
          ({ id: obj?.id, supervisorRemarks: obj?.supervisorRemarks }))
      })
    })
    setISLoading(false)
  }

  // get department list
  const getDepartmentList = async () => {
    await api.get(DEPARTMENT, { page: 1, limit: 10 }).then(({ data }) => {
      setDepartmentList(data?.map(({ id, name }: any) => ({ value: id, label: name })))
    })
  }

  // get intern list
  const getInternList = async () => {
    await api.get(INTERN_LIST).then(({ data }) => setInternList(data?.map(({ userDetail }: any) => userDetail)))
  }

  // get company manager list for schedule interview form attendees
  const getCompanyManagerList: any = async (search?: string) => {
    setISLoading(true)
    await api.get(GET_SINGLE_COMPANY_MANAGER_LIST, { search })
      .then((res: any) => {
        setCompanyManagerList(res?.data?.map((res: any) => (res?.companyManager)))
      })
    setISLoading(false)
  }
  // media upload
  const formData = new FormData();
  const setFiles = (value: any) => {
    setFile(value)
    const reader = new FileReader();
    reader.onload = async () => {
      const dataURL = reader.result;
      setfeedbackFormData((pre: any) => ({
        ...pre,
        supervisorSig: dataURL,
      }));
    };
    if (value)
      reader?.readAsDataURL(value);
    else
      setfeedbackFormData((pre: any) => ({
        ...pre,
        supervisorSig: '',
      }));
  }
  // custom header for "multipart/form-data"
  let headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
  //upload manager signature and update feedback form data state to get signature s3 URL  
  const handleSignatureUpload = async (file: any) => {
    let url = "";
    if (file) {
      formData.append('file', file);
      await api.post(MEDIA_UPLOAD, formData, headerConfig).then(({ data }) => {
        setOpenModal(false)
        url = (data?.url)
      })
    }
    return url
  }
  // get upload file form data
  const handleUploadFile = (value: any) => {
    uploadFile = value
  }

  // update signpad object
  const getSignPadValue = (value: any) => {
    signPad = value
  }

  // clear signpad canvas
  const HandleCleare = () => {
    signPad && signPad?.clear();
    uploadFile = undefined;
    signature = undefined
    setSignatureText("")
    setFile(null)
    setfeedbackFormData({ ...feedbackFormData, supervisorSig: "" })
  };
  //handle manager signature
  const handleSignature = () => {
    let dataURL: any = signPad?.getTrimmedCanvas()?.toDataURL("image/png");
    // for text-signature 
    if (signature) {
      setfeedbackFormData({ ...feedbackFormData, supervisorSig: signature })
      setOpenModal(false)
    } else {
      // signature canvas and upload
      if (!signPad?.isEmpty() || files) {
        !files &&
          setfeedbackFormData({ ...feedbackFormData, supervisorSig: dataURL })
        setOpenModal(false)
      } else {
        Notifications({ title: "Validation Error", description: "Signature required", type: "error" })
      }
    }
  };

  // text signature funtion to update signature value
  const handleTextSignature = (text: string) => {
    setSignatureText(text)
    signature = text
  }
  // main manager handle submit btn
  const handleManagerSignature = async (id: string | number, type: string) => {
    setISLoading(true)
    let file: any = null
    if (signPad?.isEmpty() && !files || signatureText) {
      file = null
    } else {
      file = urlToFile(feedbackFormData?.supervisorSig)
    }
    let data: any = feedbackFormData;
    if (file) {
      const sig = await handleSignatureUpload(file ? file : uploadFile)
      data.supervisorSig = sig
    }
    type && (data.supervisorStatus = type)
    await api.patch(`${CASE_STUDIES}/${id}`, data).then(() => {
      Notifications({ title: "Success", description: `Case Study ${type}` })
      navigate(`/${ROUTES_CONSTANTS.CASE_STUDIES}`);
    })
    getData()
    setISLoading(false)
  }



  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    if (data?.length > 0) {
      const columns = header?.filter((item: any) => item?.key !== "Action")
      if (event?.toLowerCase() === "pdf") {
        pdf(`${fileName}`, columns, data);
      }
      else {
        let columsData = columns?.filter((item: any) => (item !== "Avatar"));
        let bodyData = data?.map((item: any) => {
          let row = { ...item }
          delete row.id;
          delete row.avatar;
          delete row.assessmentForm
          return row
        });
        csv(`${fileName}`, columsData, bodyData, false); // csv(fileName, header, data, hasAvatar)
      }
    } else Notifications({ title: "No Data", description: "No data found to download", type: "error" })
  }

  const pdf = (fileName: string, header: any, data: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;

    const body = fileName?.toLowerCase() === "case studies" ? data?.map(({ no, avatar, name, ReportName, department, assessmentDate, reportingManager, status }: any) =>
      [no, '', name, ReportName, department, assessmentDate, reportingManager, status]
    ) : data?.map(({ learningCategories, learningObjectives, evidenceOfProgress, managerRemarks }: any) => [learningCategories, learningObjectives, evidenceOfProgress, managerRemarks]);
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

          if (fileName?.toLowerCase() === "case studies") {
            doc.addImage(img, xPos + 10, yPos, dim, dim);
          }
        }
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  const getParamId = (value: string) => {
    return value?.substring(value?.lastIndexOf("/") + 1, value?.length);
  };

  return {
    currentUserRole,
    downloadPdfOrCsv,
    isLoading,
    //table data
    getData,
    handleTableChange,
    caseStudyData,
    getSelectedCasStudyData,
    selectedCasStudyData,
    handleFilterParams,
    // department
    getDepartmentList,
    departmentList,
    //internList
    internList,
    getInternList,
    getParamId,
    getSignPadValue,
    HandleCleare, handleSignature, setfeedbackFormData,
    feedbackFormData, openModal, setOpenModal,
    handleManagerSignature, uploadFile,
    handleUploadFile, handleTextSignature,
    signatureText, setSignatureText, signature, signPad,
    files,
    setFiles,
    // company manager list 
    companyManagerList,
    getCompanyManagerList,
    learningCategories
  };
};

export default useCustomHook;