import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { cadidatesInterviewListState, cadidatesListState, currentUserState, internshipDataState, internshipDetailsState, selectedCandidateState } from '../../store';
import { settingDepartmentState, settingLocationState } from "../../store/Setting"
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Notifications } from "../../components";
import { ROUTES_CONSTANTS } from "../../config/constants";
import { hiringList } from "../candidates/data";

const useCustomHook = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  const [internshipData, setInternshipData] = useRecoilState(internshipDataState);
  const [internshipDetails, setInternshipDetails] = useRecoilState<any>(internshipDetailsState);
  const [departmentsData, setDepartmentsData] = useRecoilState(settingDepartmentState);
  const [locationsData, setLocationsData] = useRecoilState(settingLocationState);
  const [isLoading, setIsLoading] = useState(false);

  // pipe line states start here 

  const [cadidatesList, setCadidatesList] = useRecoilState<any>(cadidatesListState);
  const [studentDetails, setStudentDetails] = useState<any>();
  const [selectedCandidate, setSelectedCandidate] = useRecoilState<any>(selectedCandidateState);
  // comments list
  const [commentsList, setCommentsList] = useState<any>([]);
  // create comment State
  const [comment, setComment] = useState<string>("");
  // hiring process list
  const [hiringProcessList, setHiringProcessList] = useState([""]);
  // company manager list 
  const [companyManagerList, setCompanyManagerList] = useState<any>([]);
  //interview event list
  const [interviewList, setInterviewList] = useRecoilState<any>(cadidatesInterviewListState);
  //interview event list
  const [templateList, setTemplateList] = useState<any>([]);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [hiringBtnText, setHiringBtnText] = useState("Move");
  const [offerContractStatus, setOfferContractStatus] = useState("");
  const [isSelectTemplateModal, setIsSelectTemplateModal] = useState(false);
  const [selectTemplate, setSelectTemplate] = useState({ title: "offerLetter", options: [] });
  const [hiringProcessStatusList, setHiringProcessStatusList] = useState(hiringList);
  const [assignee, setAssignee] = useState<any>();
  const [templateValues, setTemplateValues] = useState({ subject: "", content: "", templateId: "", type: "" });
  const [isOfferLetterTemplateModal, setIsOfferLetterTemplateModal] = useState(false);
  const [selecteTemplate, setSelecteTemplate] = useState();


  // pipe line states end here 

  const {
    GET_LIST_INTERNSHIP, GET_INTERNSHIP_DETAILS,
    DEL_INTERNSHIP, POST_NEW_INTERNSHIP,
    DUPLICATE_INTERNSHIP, EDIT_INTERNSHIP,
    SETTING_DAPARTMENT, SETTING_LOCATION,
    ADMIN_MEETING_LIST, DELETE_MEETING, GET_ALL_TEMPLATES,
    GET_SINGLE_COMPANY_MANAGER_LIST, UPDATE_MEETING,
    CREATE_MEETING, STUDENT_PROFILE, UPDATE_CANDIDATE_DETAIL,
    DOCUMENT_REQUEST, GET_COMMENTS, ADD_COMMENT,
    REJECT_CANDIDATE, EDIT_CONTRACT, CONTRACT_OFFERLETTER_STAGE } = apiEndpints;

  // geting current logged-in user company
  const { company: { id: companyId } } = useRecoilValue<any>(currentUserState);

  // get student details
  const getStudentDetails = async (userId: any) => {
    await api.get(STUDENT_PROFILE, { userId }).then(({ data }: any) => {
      setStudentDetails(data)
    })
  }

  //Get all internship data
  const getAllInternshipsData = async (state: any = null, searchValue: any = null) => {
    let params: any = {
      limit: 100,
      page: 1,
      status: state?.status === "All" ? null : state?.status,
      locationId: state?.location === "All" ? null : state?.location,
      departmentId: state?.department === "All" ? null : state?.department,
      search: searchValue ? searchValue : null
    }

    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    const { data } = await api.get(GET_LIST_INTERNSHIP, query);
    setInternshipData(data);
    setIsLoading(true)
  };

  //Get all department data
  const getAllDepartmentData = async () => {
    const { data } = await api.get(SETTING_DAPARTMENT, { page: 1, limit: 10, });
    setDepartmentsData(data)
  };

  //Get all locations data
  const getAllLocationsData = async () => {
    const { data } = await api.get(SETTING_LOCATION, { page: 1, limit: 10 });
    setLocationsData(data)
  };

  //Post new Internship
  const postNewInternshipsData = async (values: any) => {
    const { title, description, responsibilities, requirements, typeofwork, frequency,
      amount, natureofwork, positions, closingDate, duration, amountType, salaryType,
      department, status, location, currencyType } = values
    const internshipData = {
      "title": title,
      "departmentId": department,
      "description": description,
      "responsibilities": responsibilities,
      "requirements": requirements,
      "internType": typeofwork,
      "locationType": natureofwork,
      "locationId": location,
      "salaryType": salaryType,
      "salaryFrequency": frequency,
      "salaryCurrency": currencyType,
      "salaryAmount": amount ? Number(amount) : undefined,
      "totalPositions": positions ? Number(positions) : undefined,
      "closingDate": closingDate,
      "duration": duration,
      "status": status
    }

    const { data } = await api.post(POST_NEW_INTERNSHIP, internshipData);
    if (data) {
      Notifications({ title: "Success", description: "Internship published", type: "success" })
      navigate(`/${ROUTES_CONSTANTS.INTERNSHIPS}`)
    }
  };

  // Edit internship 
  const EditNewInternshipsData = async (values: any, updateStatus?: string) => {
    const {
      title, description, responsibilities,
      requirements, typeofwork, frequency, amount, natureofwork,
      positions, closingDate, duration, internshipType, salaryAmount,
      department, status, locationId, id } = values
    const internshipData = {
      "id": state?.id ? state?.id : id,
      "title": title,
      "departmentId": Number(department),
      "description": description,
      "responsibilities": responsibilities,
      "requirements": requirements,
      "internType": typeofwork,
      "locationType": natureofwork,
      "locationId": locationId,
      "salaryType": internshipType,
      "salaryFrequency": frequency,
      "salaryCurrency": salaryAmount,
      "salaryAmount": Number(amount),
      "totalPositions": Number(positions),
      "closingDate": closingDate,
      "duration": duration,
      "status": status,
    }
    await api.put(`${EDIT_INTERNSHIP}?id=${state?.id ? state?.id : id}`, internshipData);
    getAllInternshipsData()
    navigate(`/${ROUTES_CONSTANTS.INTERNSHIPS}`)
    Notifications({ title: "Success", description: `Internship ${updateStatus ? updateStatus?.toLowerCase() : 'edited'}`, type: "success" })
  };

  //Duplicate internship
  const getDuplicateInternship = async (val: any) => {
    await api.post(`${DUPLICATE_INTERNSHIP}?id=${val}`);
    getAllInternshipsData()
    Notifications({ title: "Success", description: "Internship duplicated", type: "success" })
  }

  //Internship details
  const getInternshipDetails = async (searchValue: any) => {
    const { data } = await api.get(GET_INTERNSHIP_DETAILS, { id: state.data.id, search: searchValue ? searchValue : null });
    setInternshipDetails(data)
  };

  //Delete internship
  const deleteInternshipData = async (id: any) => {
    await api.delete(`${DEL_INTERNSHIP}?id=${id}`);
    getAllInternshipsData();
    Notifications({ title: "Success", description: "Internship deleted", type: "success" })
  }

  //Search
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  // pipeline code start here 

  //user id for update methods
  let id: string | number = "" || selectedCandidate?.id;
  const getUserId = (userId: string | number) => {
    id = userId
  }

  // request documents
  const handleRequestDocument = async (body: any) => {
    await api.post(DOCUMENT_REQUEST, body).then((res: any) => {
      res?.data && Notifications({ title: "Document Request", description: "Document Request sent successfully" })
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

  // get schedule interview list
  const getScheduleInterviews = async (userId: string | number) => {
    setIsLoading(true)
    let params: any = {
      userId,
    }
    await api.get(`${ADMIN_MEETING_LIST}/${userId}`, params).then((res: any) => {
      setInterviewList(res?.data)
    })
    setIsLoading(false)
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
    setIsLoading(true)
    await api.post(CREATE_MEETING, { ...interviewStaticBodyData, ...values }).then(({ data }: any) => {
      setInterviewList([...interviewList, data])
      Notifications({ title: "Interview Schedule", description: "Interview Schedule successfully" })
    })
    setIsLoading(false)
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


  // get company manager list for schedule interview form attendees
  const getCompanyManagerList: any = async (search?: string) => {
    setIsLoading(true)
    await api.get(GET_SINGLE_COMPANY_MANAGER_LIST, { search })
      .then((res: any) => {
        setCompanyManagerList(res?.data?.map((res: any) => (res)))
      })
    setIsLoading(false)
  }

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
  // check already processed
  const handleCheckList = (text: string) => {
    !hiringProcessList.includes(text) && setHiringProcessList([...hiringProcessList, text]);
  };

  // function for update stage
  const handleStage = async (id: string | number, payload: any) => {
    await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, payload, { id }).then((res: any) => {
      if (res?.data) {
        setSelectedCandidate({ ...selectedCandidate, stage: payload?.stage })
        setCadidatesList((prev: any) => ({
          ...prev,
          data: cadidatesList?.data?.map((item: any) => (item?.id === id ? { ...item, stage: res?.data?.stage } : item))
        }))
        handleCheckList("hired")
      }
    });
  };

  // logic for interviewed
  const handleInterviewed = () => {
    handleStage(id, { stage: "interviewed" });
    return handleCheckList("interviewed");
  };

  // logic for shortlisted
  const handleShortlisted = () => {
    handleStage(id, { stage: "shortlisted" });
    return handleCheckList("shortlisted");
  };

  // logic for recommended
  const handleRecomended = () => {
    handleStage(id, { stage: "recommended" });
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
  // check for offerLetter and contract signed
  const isOfferContractPending = selectedCandidate?.letters?.some((obj: any) =>
    ["new", "pending", "changerequest", "rejected"].includes(obj?.status.toLowerCase())
  );

  // function for handle assignee
  const HandleAssignee = async (id: string | number, assignedManager: string) => {
    await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, { assignedManager }).then((res: any) => {
      res?.data && Notifications({ title: "Manager Assign", description: "Manager Assigned successfully!" })
    });
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
  // logic for contract
  const HandleContract = () => {
    const hasOfferLetter = selectedCandidate?.letters?.some((obj: any) => obj?.type === "OFFER_LETTER");
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
        description: "Can't Intiate Contract before offerLetter signed",
        type: "error",
      });
    }
    return;
  };

  // function for send offerLetter and contract
  const handleSendOfferConract = async ({ id, subject, type, ...rest }: any) => {
    await api.put(`${CONTRACT_OFFERLETTER_STAGE}?id=${id}`, { ...rest, stage: type === "OFFER_LETTER" ? "offerLetter" : "contract" })
      .then((res: any) => {
        if (res?.data) {
          if (selectTemplate?.title === "offerLetter") {
            handleCheckList("offerLetter");
          }
          if (selectTemplate?.title === "Contract") {
            handleCheckList("contract");
          }
          setOfferContractStatus("pending");
          setIsOfferLetterTemplateModal(false);
          setHiringBtnText("Resend");
          setTemplateValues({ subject: "", content: "", templateId: "", type: "" });
          Notifications({ title: "Success", description: `${type === "OFFER_LETTER" ? "OfferLetter" : "Contract"} sent successfully` })
        }
        setCadidatesList((prev: any) => ({
          ...prev,
          data: cadidatesList?.data?.map((item: any) => (item?.id === id ? { ...item, stage: type === "OFFER_LETTER" ? "offerLetter" : "contract" } : item))
        }))
      })
  }

  const resendOfferContract = async (id: string, type?: string) => {
    await api.put(`${EDIT_CONTRACT}/${id}`, { status: "NEW" }).then(() => {
      Notifications({ title: "Success", description: `${type === "Contract" ? "Contract" : "offerLetter"} re-sent successfully`, type: "success" });
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

  // pipeline code ends here 


  return {
    postNewInternshipsData,
    EditNewInternshipsData,
    getDuplicateInternship,
    getAllDepartmentData,
    getAllInternshipsData,
    deleteInternshipData,
    getAllLocationsData,
    getInternshipDetails,
    debouncedSearch,
    departmentsData,
    internshipDetails,
    internshipData,
    locationsData,
    isLoading,
    // pipeline start 
    interviewList,
    getScheduleInterviews,
    deleteInterview,
    getCompanyManagerList,
    companyManagerList,
    handleUpdateInterview,
    scheduleInterview,
    templateList, getTemplates,
    studentDetails, getStudentDetails,
    openDrawer, setOpenDrawer,
    handleRating,
    setOpenRejectModal,
    setSelectedCandidate,
    handleRequestDocument,
    selectedCandidate,
    getUserId,
    handleCreateComment,
    commentsList, comment,
    getComments, handleInitialPiple,
    hiringProcessList, setHiringProcessList,
    setComment,
    handleRejectCandidate,
    handleHiringProcess,
    handleSelectAssignee,
    handleTemplate,
    handleOfferLetterTemplate,
    handleRejected,
    setHiringProcessStatusList,
    hiringProcessStatusList,
    setAssignee,
    setHiringBtnText,
    setOfferContractStatus,
    offerContractStatus,
    setOpen,
    open,
    hiringBtnText,
    assignee,
    isSelectTemplateModal,
    setIsSelectTemplateModal,
    selectTemplate,
    selecteTemplate,
    setSelecteTemplate,
    isOfferLetterTemplateModal,
    setIsOfferLetterTemplateModal,
    setTemplateValues,
    templateValues,
    // pipeline end 
  };
};


export default useCustomHook;