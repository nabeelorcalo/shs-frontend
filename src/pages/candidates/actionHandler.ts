import api from "../../api";
import { useRecoilState, useRecoilValue } from "recoil";
import { cadidatesAPICallStatus, cadidatesInterviewListState, cadidatesListState, candidateFilterParam, selectedCandidateState } from "../../store/candidates";
import { Notifications } from "../../components";
import endpoints from "../../config/apiEndpoints";
import { useState } from "react";
import dayjs from "dayjs";
import { currentUserState } from "../../store";
import csv from "../../helpers/csv";
import jsPDF from "jspdf";
import type { TablePaginationConfig } from "antd/es/table";
import { getUserAvatar } from "../../helpers";
import { filterTypes, hiringList } from "./data";

// end points for api calls
const { UPDATE_CANDIDATE_DETAIL, CANDIDATE_LIST, GET_LIST_INTERNSHIP,
  GET_COMMENTS, ADD_COMMENT, GET_SINGLE_COMPANY_MANAGER_LIST,
  CREATE_MEETING, ADMIN_MEETING_LIST, UPDATE_MEETING,
  DELETE_MEETING, GET_ALL_TEMPLATES, STUDENT_PROFILE,
  DOCUMENT_REQUEST, REJECT_CANDIDATE, EDIT_CONTRACT, CONTRACT_OFFERLETTER_STAGE } = endpoints;
let isInternFilter = false
const useCustomHook = () => {
  // geting current logged-in user company
  const { company: { id: companyId } } = useRecoilValue<any>(currentUserState)
  // candidates list params
  let params: any = {
    companyId: companyId,
    // userType: "candidate",
    limit: 10,
    page: 1,
  };
  // loader
  const [isLoading, setISLoading] = useRecoilState(cadidatesAPICallStatus);
  // candidates list data
  const [cadidatesList, setCadidatesList] = useRecoilState<any>(cadidatesListState);
  // global set params for filter ans search
  const [filterParams, setFilterParams] = useRecoilState<any>(candidateFilterParam)
  const [studentDetails, setStudentDetails] = useState<any>();
  const [selectedCandidate, setSelectedCandidate] = useRecoilState<any>(selectedCandidateState)
  // internship list
  const [internShipList, setInternShipList] = useState<any>([])
  // comments list
  const [commentsList, setCommentsList] = useState<any>([])
  // create comment State
  const [comment, setComment] = useState<string>("");
  // hiring process list
  const [hiringProcessList, setHiringProcessList] = useState([""]);
  // filter states
  const [timeFrame, setTimeFrame] = useState("");
  const [internship, setInternship] = useState<any>();
  const [download, setDownload] = useState("");
  // company manager list 
  const [companyManagerList, setCompanyManagerList] = useState<any>([])
  //interview event list
  const [interviewList, setInterviewList] = useRecoilState<any>(cadidatesInterviewListState)
  //interview event list
  const [templateList, setTemplateList] = useState<any>([])
  //modal states
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [isSelectTemplateModal, setIsSelectTemplateModal] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState({ title: "offerLetter", options: [] });
  const [hiringBtnText, setHiringBtnText] = useState("Move");
  const [offerContractStatus, setOfferContractStatus] = useState("");
  const [hiringProcessStatusList, setHiringProcessStatusList] = useState(hiringList);
  const [templateValues, setTemplateValues] = useState({ subject: "", content: "", templateId: "", type: "" });
  const [isOfferLetterTemplateModal, setIsOfferLetterTemplateModal] = useState(false);
  const [assignee, setAssignee] = useState<any>();
  const [selecteTemplate, setSelecteTemplate] = useState();

  // handle table pagination
  const handleTableChange = (pagination: TablePaginationConfig) => {
    params.page = pagination?.current
    getCadidatesData(params)
  };

  const handleParams = () => {
    let filter = { ...filterParams }
    if (params?.filterType !== "DATE_RANGE") {
      delete filter.startDate;
      delete filter.endDate;
      delete filter.filterType;
    }
    return filter
  }
  // get cadidates data
  const getCadidatesData = async (params: any) => {
    setISLoading(true)
    if (params.search) {
      params = { ...filterParams, ...params }
    }
    else {
      if (internship && timeFrame) {
        params = { ...handleParams(), ...params }
      } else if (internship && isInternFilter) {
        params = { internshipId: internship, ...params }
      }
      else {
        let filter = handleParams()
        delete filter.internshipId
        params = { ...filter, ...params }
      }
      delete params.search
    }
    setFilterParams(params)
    await api.get(CANDIDATE_LIST, params).then(({ data, pagination }: any) => {
      setCadidatesList({
        data, pagination: {
          current: pagination?.page,
          pageSize: 10,
          showSizeChanger: false,
          total: pagination?.totalResult,
        }
      });
    });
    setISLoading(false)
  };
  // table data modification
  const handleDataModification = (list: any) => {
    return list?.map((item: any, index: number) => ({
      id: item?.id,
      no: index + 1,
      avatar: getUserAvatar({ profileImage: item?.userDetail?.profileImage }),
      name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
      internship: item?.internship?.title ?? "",
      type: item?.internship?.departmentData?.name ?? "",
      appliedDate: dayjs(item?.createdAt).format("DD/MM/YYYY"),
      rating: item?.rating ?? 0,
      stage: item?.stage,
    }))
  }
  // get student details
  const getStudentDetails = async (userId: any) => {
    await api.get(STUDENT_PROFILE, { userId }).then(({ data }: any) => {
      // setRating(data)
      setStudentDetails(data)
    })
  }
  //user id for update methods
  let id: string | number = "" || selectedCandidate?.id;
  const getUserId = (userId: string | number) => {
    id = userId
  }
  //search for candidates
  const handleSearch = async (search: string) => {
    if (search) {
      params.search = search
    } else {
      delete params.search
    }
    await getCadidatesData(params)
  }
  // time frame
  const handleTimeFrameFilter = async (value: string) => {
    setTimeFrame(value === "All" ? "" : value)
    const date = dayjs(new Date()).format("YYYY-MM-DD");
    params.currentDate = date;
    if (filterTypes.slice(0, -1).some(ele => ele === value)) {
      value === "All" ? delete params.filterType :
        params.filterType = value.toUpperCase().replace(" ", "_")
    } else {
      const [startDate, endDate] = value.split(",")
      params.filterType = "DATE_RANGE";
      params.startDate = startDate.trim();
      params.endDate = endDate.trim();
    }
    return await getCadidatesData(params)
  }
  // INTERNSHIP filter
  const handleInternShipFilter = async (value: string) => {
    if (value) {
      params.internshipId = value
      isInternFilter = true
    } else {
      isInternFilter = false
      delete params.internshipId
    }
    await getCadidatesData(params)
    setInternship(value)
  }
  // funtion for update rating
  const handleRating = async (selectedId: string | number, rating: string | number) => {
    await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${selectedId ? selectedId : id}`, { rating }, { id }).then((res: any) => {
      setSelectedCandidate({ ...selectedCandidate, rating: res?.data?.rating })
      Notifications({ title: "Rating", description: "Rating updated successfully" });
      setCadidatesList((prev: any) => ({
        ...prev,
        data: cadidatesList?.data?.map((item: any) => (item?.id === id ? { ...item, rating: res?.data?.rating } : item))
      }));
    });
  };
  // internship List
  const getInternShipList = async () => {
    await api.get(GET_LIST_INTERNSHIP).then(({ data }: any) => {
      const publishedInternships = data?.filter(({ status }: { status: string }) => (status === "PUBLISHED"))
      setInternShipList(publishedInternships?.map(({ id, title }: { id: string, title: string, }) => ({ value: id, label: title })))
    })
  }
  // request documents
  const handleRequestDocument = async (body: any) => {
    await api.post(DOCUMENT_REQUEST, body).then((res: any) => {
      res?.statusCode === 200 && Notifications({
        title: "Document Request",
        description: "Document Request sent successfully"
      })
    })
  }
  // get comments
  const getComments = async (candidateId: number | string) => {
    candidateId && await api.get(GET_COMMENTS, { candidateId }).then(({ data }: any) => setCommentsList(data))
  }

  // create comment
  const handleCreateComment = async (candidateId: string | number, comment: string) => {
    comment ? await api.post(ADD_COMMENT, { candidateId, comment }).then(({ data }: any) => {
      setComment("")
      getComments(candidateId)
    })
      : Notifications({ title: "Error", description: "Comment can't be empty", type: "error" })
  }
  // intial pipline array
  const handleInitialPiple = (stage: string) => {
    let hiringProcessList: string[] = ['applied', "shortlisted", 'interviewed', 'recommended', 'offerLetter', 'contract']
    let currentStageIndex = hiringProcessList.findIndex(element => element === stage)
    return (["hired", "rejected"].includes(stage) ? [...hiringProcessList, stage] : hiringProcessList.slice(0, currentStageIndex + 1))
  }

  // function for update stage
  const handleStage = async (id: string | number, payload: any) => {
    await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, payload, { id }).then((res: any) => {
      if (res?.data) {
        setSelectedCandidate({ ...selectedCandidate, stage: payload?.stage })
        setCadidatesList((prev: any) => ({
          ...prev,
          data: cadidatesList?.data?.map((item: any) => (item?.id === id ? { ...item, stage: res?.data?.stage } : item))
        }))
        if (res?.data?.stage === "hired") {
          setHiringProcessList([...hiringProcessList, "hired"])
        }
      }
    });
  };

  // function for handle assignee
  const HandleAssignee = async (id: string | number, assignedManager: string) => {
    await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, { assignedManager }).then((res: any) => {
      res?.data && Notifications({ title: "Manager Assign", description: "Manager Assigned successfully!" })
      setSelectedCandidate((prev: any) => ({
        ...prev,
        assignedManager: res?.data
      }))
    });
  };

  // get company manager list for schedule interview form attendees
  const getCompanyManagerList: any = async (search?: string) => {
    setISLoading(true)
    await api.get(GET_SINGLE_COMPANY_MANAGER_LIST, { search })
      .then((res: any) => {
        setCompanyManagerList(res?.data?.map((res: any) => (res)))
      })
    setISLoading(false)
  }

  // get schedule interview list
  const getScheduleInterviews = async (userId: string | number) => {
    setISLoading(true)
    let params: any = {
      userId,
    }
    await api.get(`${ADMIN_MEETING_LIST}/${userId}`, params).then((res: any) => {
      setInterviewList(res?.data)
    })
    setISLoading(false)
  }

  const interviewStaticBodyData = {
    companyId: companyId,
    title: "interview",
    recurrence: "DOES_NOT_REPEAT",
    reapeatDay: 0,
    address: "",
    eventType: "INTERVIEW",
  }

  // schedule interview
  const scheduleInterview = async (values: any) => {
    setISLoading(true)
    await api.post(CREATE_MEETING, { ...interviewStaticBodyData, ...values }).then(({ data }: any) => {
      setInterviewList([...interviewList, data])
      Notifications({ title: "Interview Schedule", description: "Interview Schedule successfully" })
    })
    setISLoading(false)
  }
  // UPDATE interview
  const handleUpdateInterview = async (candidateId: string | number, meetingId: string | number, values: any) => {
    await api.put(`${UPDATE_MEETING}/${meetingId}`, { ...interviewStaticBodyData, ...values }).then(({ data }: any) => {
      setInterviewList(interviewList?.map((obj: any) => (obj?.id !== meetingId) ? data : obj))
      getScheduleInterviews(candidateId)
      Notifications({ title: "Interview", description: "Interview meeting updated!" })
    })
  }

  // delete interview
  const deleteInterview = async (meetingId: string | number) => {
    await api.delete(`${DELETE_MEETING}/${meetingId}`).then(() => {
      setInterviewList(interviewList?.filter(({ id }: any) => id !== meetingId))
      Notifications({ title: "Interview", description: "Interview meeting deleted!" })
    });
  }

  // get templates
  const getTemplates = async (query: string) => {
    let params: any = {
      page: 1,
      limit: 0
    }
    query && (params.searchByType = query)
    await api.get(GET_ALL_TEMPLATES, params).then((res: any) => { setTemplateList(res?.data) })
  }

  // function for table data down load in pdf or csv
  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    if (data?.length > 0) {
      const columns = header?.filter((item: any) => item?.key !== "Action")
      if (event?.toLowerCase() === "pdf")
        pdf(`${fileName}`, columns, data);
      else {
        let columsData = columns?.filter((item: any) => (item !== "Avatar"));
        let bodyData = data?.map((item: any) => { delete item?.id; delete item?.type; return item });
        csv(`${fileName}`, columsData, bodyData, true); // csv(fileName, header, data, hasAvatar)
      }
    } else Notifications({ title: "No Data", description: "No data found to download", type: "error" })
  }
  const pdf = (fileName: string, header: any, data: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;

    const body = data.map(({ no, avatar, name, internship, appliedDate, rating, stage }: any) =>
      [no, '', name, internship, appliedDate, rating, stage]
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

  // handle reject candidate
  const handleRejectCandidate = async (id: string, payload: any) => {
    await api.put(`${REJECT_CANDIDATE}?id=${id}`, payload).then(() => {
      setCadidatesList((prev: any) => ({
        ...prev,
        data: cadidatesList?.data?.map((obj: any) => obj?.id === id ? ({ ...obj, stage: "rejected" }) : obj)
      }))
      Notifications({ title: "Rejection", description: "Candidate rejected successfully!" })
    })
  }

  // resend offerLetter
  const handleResendOfferLetter = () => {
    const offerLetter = selectedCandidate?.letters?.find((obj: any) => obj?.type === "OFFER_LETTER");
    resendOfferContract(offerLetter?.id, "offerLetter");
  };

  // resend contract
  const handleResendContract = () => {
    const Contract = selectedCandidate?.letters?.find((obj: any) => obj?.type === "CONTRACT");
    resendOfferContract(Contract?.id, "Contract");
  };

  // check already processed
  const handleCheckList = (text: string) => {
    if (!hiringProcessList.includes(text)) {
      handleStage(id, { stage: text });
      setHiringProcessList([...hiringProcessList, text]);
    }
  };

  // logic for interviewed
  const handleInterviewed = () => {
    // handleStage(id, { stage: "interviewed" });
    return handleCheckList("interviewed");
  };

  // logic for shortlisted
  const handleShortlisted = () => {
    // handleStage(id, { stage: "shortlisted" });
    return handleCheckList("shortlisted");
  };

  // logic for recommended
  const handleRecomended = () => {
    // handleStage(id, { stage: "recommended" });
    return handleCheckList("recommended");
  };

  // logic for offerLetter
  const HandleOfferLetter = () => {
    if (!hiringProcessList.includes("offerLetter")) {
      setIsSelectTemplateModal(true);
      setSelectTemplate({ title: "offerLetter", options: [] });
    }
    return;
  };
  // check for offerLetter and contract signed
  const isOfferContractPending = selectedCandidate?.letters?.some((obj: any) =>
    ["new", "pending", "changerequest", "rejected"].includes(obj?.status.toLowerCase())
  );
  // logic for contract
  const HandleContract = () => {
    const hasOfferLetter = selectedCandidate?.letters?.some((obj: any) => obj?.type === "OFFER_LETTER");
    if (!hiringProcessList?.includes("contract")) {
      if (!isOfferContractPending && hasOfferLetter) {
        if (
          !hiringProcessList.includes("contract") &&
          hiringBtnText !== "Initiate Contract" &&
          !["changerequest", "rejected"].includes(offerContractStatus?.toLowerCase())
        ) {
          setOfferContractStatus("signed");
          return setHiringBtnText("Initiate Contract");
        }
        if (hiringBtnText === "Initiate Contract") {
          setSelectTemplate({ title: "Contract", options: [] });
          setIsSelectTemplateModal(true);
        }
      } else {
        Notifications({
          title: "Restriction",
          description: "Can't Intiate Contract before offer letter signed",
          type: "error",
        });
      }
    }

    return;
  };

  // function for send offerLetter and contract
  const handleSendOfferConract = async ({ id, subject, type, ...rest }: any) => {
    await api.put(`${CONTRACT_OFFERLETTER_STAGE}?id=${id}`, { ...rest, stage: type === "OFFER_LETTER" ? "offerLetter" : "contract" })
      .then((res: any) => {
        if (res?.data) {
          setHiringProcessList([...hiringProcessList, type === "OFFER_LETTER" ? "offerLetter" : "contract"])
          setOfferContractStatus("pending");
          setIsOfferLetterTemplateModal(false);
          setHiringBtnText("Resend");
          setTemplateValues({ subject: "", content: "", templateId: "", type: "" });
          Notifications({ title: "Success", description: `${type === "OFFER_LETTER" ? "Offer Letter" : "Contract"} sent successfully` })
        }
        setCadidatesList((prev: any) => ({
          ...prev,
          data: cadidatesList?.data?.map((item: any) => (item?.id === id ? { ...item, stage: type === "OFFER_LETTER" ? "offerLetter" : "contract" } : item))
        }))
      })
  }
  // 
  const resendOfferContract = async (id: string, type?: string) => {
    await api.put(`${EDIT_CONTRACT}/${id}`, { status: "NEW" }).then(() => {
      Notifications({ title: "Success", description: `${type === "Contract" ? "Contract" : "offer letter"} re-sent successfully`, type: "success" });
    })
  }

  // logic for hired
  const handleHired = () => {
    const hasContract = selectedCandidate?.letters?.some((obj: any) => obj?.type === "CONTRACT");
    if (!isOfferContractPending && hasContract) {
      if (!selectedCandidate?.assignedManager) {
        return Notifications({ title: "Restriction", description: "Can't hire before assigning manager.", type: "error" });
      }
      setOfferContractStatus("signed");
      setHiringProcessStatusList(hiringProcessStatusList?.filter((item) => item?.title !== "rejected"));
      id && handleStage(id, { stage: "hired", userId: selectedCandidate?.userId })
    } else {
      Notifications({ title: "Restriction", description: "Can't hire before contract signed.", type: "error" });
    }
  };
  // logic for rejected
  const handleRejected = () => {
    let list = hiringProcessStatusList?.filter((item) => item?.title !== "hired");
    !list.some(({ title }) => title === "rejected") &&
      list.push({
        title: "rejected",
        value: "0",
        color: "#D83A52",
      });
    setHiringProcessStatusList(list);
    setHiringProcessList(list.map(({ title }) => title));
    setOpen(false);
    return;
  };
  // move hiring process in flow
  const handleHiringProcess = (pipeline?: string) => {
    // resend offerLetter and contract
    if (!pipeline && hiringBtnText === "Resend") {
      if (hiringProcessList?.includes("contract")) {
        handleResendContract();
      } else {
        handleResendOfferLetter();
      }
      return;
    }
    // pipeline clicked flow
    if (pipeline) {
      pipeline === "shortlisted" && hiringProcessList?.includes("applied") && handleShortlisted();
      pipeline === "interviewed" && hiringProcessList?.includes("shortlisted") && handleInterviewed();
      pipeline === "recommended" && hiringProcessList?.includes("interviewed") && handleRecomended();
      pipeline === "offerLetter" && hiringProcessList?.includes("recommended") && HandleOfferLetter();
      pipeline === "contract" && hiringProcessList?.includes("offerLetter") && HandleContract();
      pipeline === "hired" && hiringProcessList?.includes("contract") && handleHired();
      pipeline === "rejected" && hiringProcessList?.includes("hired") && handleRejected();
    } else {
      // move button flow
      switch (hiringProcessList[hiringProcessList.length - 1]) {
        case "applied":
          return handleShortlisted();
        case "shortlisted":
          return handleInterviewed();
        case "interviewed":
          return handleRecomended();
        case "recommended":
          return HandleOfferLetter();
        case "offerLetter":
          return HandleContract();
        case "contract":
          return handleHired();
        case "hired":
          return handleRejected();
        default:
          break;
      }
    }
  };
  //select template for offerLetter and contract
  const handleTemplate = () => {
    if (templateValues?.subject !== "" && templateValues?.content !== "") {
      setIsOfferLetterTemplateModal(true);
      setIsSelectTemplateModal(false);
    } else {
      Notifications({ title: "Error", description: "Please select Template", type: "error" });
    }
  };
  // constomized or edit template for offerLetter and contract
  const handleOfferLetterTemplate = () => {
    handleSendOfferConract({ ...templateValues, id, userId: selectedCandidate?.userId });
  };
  // select assignee
  const handleSelectAssignee = (item: any) => {
    if (!isOfferContractPending && ["hired", "contract"].includes(selectedCandidate?.stage)) {
      HandleAssignee(id, item?.id).then(() => setAssignee(item?.companyManager));
    } else {
      Notifications({
        title: "Restriction",
        description: "Can't Assign manager before contract signed.",
        type: "error",
      });
    }
  };

  return {
    isLoading, setISLoading,
    cadidatesList, setCadidatesList,
    studentDetails, getStudentDetails,
    handleDataModification,
    handleRating,
    getUserId, getCadidatesData, handleSearch,
    handleTableChange,
    timeFrame, handleTimeFrameFilter,
    internship, handleInternShipFilter,
    handleRequestDocument, download, setDownload,
    openDrawer, setOpenDrawer,
    openRejectModal, setOpenRejectModal,
    selectedCandidate, setSelectedCandidate,
    getInternShipList, internShipList,
    hiringProcessList, setHiringProcessList,
    getComments, comment, setComment,
    handleCreateComment, commentsList,
    handleInitialPiple, handleStage,
    handleRejectCandidate,
    companyManagerList,
    setCompanyManagerList, getCompanyManagerList,
    scheduleInterview, getScheduleInterviews,
    interviewList, handleUpdateInterview,
    deleteInterview, getTemplates,
    templateList, params,
    downloadPdfOrCsv,

    setAssignee,
    offerContractStatus,
    setOfferContractStatus,
    setOpen,
    handleHiringProcess,
    hiringBtnText,
    setHiringBtnText,
    hiringProcessStatusList,
    handleSelectAssignee,
    assignee,
    isSelectTemplateModal,
    handleTemplate,
    selectTemplate,
    isOfferLetterTemplateModal,
    setIsOfferLetterTemplateModal,
    handleOfferLetterTemplate,
    setTemplateValues,
    templateValues,
    handleRejected,
    setIsSelectTemplateModal,
    setHiringProcessStatusList,
    selecteTemplate, setSelecteTemplate,
    open
  };
};

export default useCustomHook;