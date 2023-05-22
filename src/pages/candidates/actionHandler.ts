import api from "../../api";
import { useRecoilState, useRecoilValue } from "recoil";
import { cadidatesListState } from "../../store/candidates";
import { Notifications } from "../../components";
import endpoints from "../../config/apiEndpoints";
import { useState } from "react";
import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';
import { currentUserState } from "../../store";
const { UPDATE_CANDIDATE_DETAIL, CANDIDATE_LIST, GET_LIST_INTERNSHIP, GET_COMMENTS, ADD_COMMENT, GET_SINGLE_COMPANY_MANAGER_LIST, CREATE_MEETING, ADMIN_MEETING_LIST, GET_ALL_TEMPLATES, STUDENT_PROFILE, DOCUMENT_REQUEST } = endpoints;

// Chat operation and save into store
const useCustomHook = () => {
  // geting current logged-in user company
  const { company: { id: companyId } } = useRecoilValue(currentUserState)

  // candidates list params
  let params: any = {
    companyId: companyId,
    userType: "candidate",
    limit: 10,
    page: 1,
  };
  // loader
  const [loading, setLoading] = useState(false);
  // candidates list data
  const [cadidatesList, setCadidatesList] = useRecoilState<any>(cadidatesListState);
  const [studentDetails, setStudentDetails] = useState<any>();
  const [selectedCandidate, setSelectedCandidate] = useState<any>({})
  // internship list
  const [internShipList, setInternShipList] = useState<any>([])
  //rating 
  const [rating, setRating] = useState<number | string>(0);
  // comments list
  const [commentsList, setCommentsList] = useState<any>([])
  // create comment State
  const [comment, setComment] = useState<string>("");
  // hiring process list
  const [hiringProcessList, setHiringProcessList] = useState([""]);
  // filter states
  const [timeFrame, setTimeFrame] = useState("");
  const [internship, setInternship] = useState("");
  const [download, setDownload] = useState("");
  // company manager list
  const [companyManagerList, setCompanyManagerList] = useState<any>([])
  //interview event list
  const [interviewList, setInterviewList] = useState<any>([])
  //interview event list
  const [templateList, setTemplateList] = useState<any>([])
  //modal states
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);

  // get cadidates data
  const getCadidatesData = async (params: any) => {
    setLoading(true)
    await api.get(CANDIDATE_LIST, params).then((res) => { setCadidatesList(res?.data); setLoading(false) });
  };
  // get student details
  const getStudentDetails = async (userId: any) => {
    await api.get(STUDENT_PROFILE, { userId }).then(({ data }) => { setStudentDetails(data) })
  }
  //user id for update methods
  let id: string | number = "";
  const getUserId = (userId: string | number) => {
    id = userId
  }

  //search for candidates
  const handleSearch = (search: string) => {
    if (search) {
      params.search = search
    } else {
      delete params.search
    }
    getCadidatesData(params)
  }

  // time frame
  const handleTimeFrameFilter = (value: string) => {
    setTimeFrame(value)
    const date = dayjs(new Date()).format("YYYY-MM-DD");
    const handleStartDate = (value: number) => dayjs().weekday(value).format("YYYY-MM-DD")
    switch (value) {
      case "This Week": {
        params.startDate = handleStartDate(0);
        params.endDate = date;
        return getCadidatesData(params);
      }
      case "Last Week": {
        params.startDate = handleStartDate(-6);
        params.endDate = date;
        return getCadidatesData(params);
      }
      case "This Month": {
        params.startDate = dayjs().date(1).format("YYYY-MM-DD")
        params.endDate = date;
        return getCadidatesData(params);
      }
      case "Last Month": {
        const date: any = new Date();
        params.startDate = dayjs(new Date(date.getFullYear(), date.getMonth() - 1, 1)).format("YYYY-MM-DD");
        params.endDate = dayjs(new Date(date.getFullYear(), date.getMonth() - 1 + 1, 0)).format("YYYY-MM-DD");
        return getCadidatesData(params);
      }
      default: {
        const [startDate, endDate] = value.split(",")
        if (startDate && endDate) {
          params.startDate = handleStartDate(-6);
          params.endDate = date;
          return getCadidatesData(params);
        }
      }
        break;
    }

  }

  // time frame
  const handleInternShipFilter = (value: string) => {
    if (value) {
      params.internshipId = value
    } else {
      delete params.internshipId
    }
    getCadidatesData(params)
    setInternship(value)
  }

  // funtion for update rating
  const handleRating = async (selectedId: string | number, rating: string | number) => {
    console.log(id, "iddd");

    await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${selectedId ? selectedId : id}`, { rating }, { id }).then((res) => {
      setCadidatesList(
        cadidatesList?.map((item: any) => (item?.id === id ? { ...item, rating: res?.data?.rating } : item))
      );
      setRating(rating)
      Notifications({ title: "Rating", description: "Rating updated successfully" });
    });
  };

  // internship List
  const getInternShipList = async () => {
    await api.get(GET_LIST_INTERNSHIP).then(({ data }: any) => {
      setInternShipList(data?.map(({ id, title }: { id: string, title: string }) => ({ value: id, label: title })))
    }
    )
  }

  // request documents
  const handleRequestDocument = async (body: any) => {
    const res = await api.post(DOCUMENT_REQUEST, body).then((res) => console.log("res", res))
    console.log("resres", res);
  }

  // get comments
  const getComments = async (candidateId: number | string) => {
    candidateId && await api.get(GET_COMMENTS, { candidateId }).then(({ data }) => setCommentsList(data))
  }

  // create comment
  const handleCreateComment = async (candidateId: string | number, comment: string) => {
    comment ? await api.post(ADD_COMMENT, { candidateId, comment }).then(({ data }) => {
      setComment("")
      setCommentsList([...commentsList, selectedCandidate])
    })
      : Notifications({ title: "Error", description: "Comment can't be empty", type: "error" })
  }
  // intial pipline array
  const handleInitialPiple = (stage: string) => {
    let hiringProcessList: string[] = []
    switch (stage) {
      case "applied":
        return (hiringProcessList = ["applied"]);
      case "interviewed":
        return (hiringProcessList = ["applied", "interviewed"]);
      case "recommended":
        return (hiringProcessList = ["applied", "interviewed", "recommended"]);
      case "offer letter":
        return (hiringProcessList = ["applied", "interviewed", "recommended", "offer letter"]);
      case "contract":
        return (hiringProcessList = ["applied", "interviewed", "recommended", "offer letter", "contract"]);
      case "hired":
        return (hiringProcessList = ["applied", "interviewed", "recommended", "offer letter", "contract", "hired"]);
      default:
        break;
    }
    return hiringProcessList
  }

  // funtion for update stage
  const handleStage = async (id: string | number, stage: string) => {
    await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, { stage }, { id }).then((res) => {
      setCadidatesList(
        cadidatesList?.map((item: any) => (item?.id === id ? { ...item, stage: res?.data?.stage } : item))
      );
    });
  };

  // funtion for update stage
  const HandleAssignee = async (id: string | number, assignedManager: string) => {
    await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, { assignedManager }).then((res) => {
      res?.data && Notifications({ title: "Manager Assign", description: "Manager Assigned successfully!" })
    });
  };

  // get company manager list for schedule interview form attendees
  const getCompanyManagerList: any = async (search?: string) => {
    await api.get(GET_SINGLE_COMPANY_MANAGER_LIST, { search })
      .then((res) => {
        setCompanyManagerList(res?.data)
      })
  }

  // schedule interview
  const scheduleInterview = async (values: any) => {
    values.companyId = companyId;
    values.title = "interview";
    values.recurrence = "DOES_NOT_REPEAT";
    values.reapeatDay = 0;
    values.address = "";
    values.eventType = "INTERVIEW";
    await api.post(CREATE_MEETING, values).then(({ data }) => {
      Notifications({ title: "Interview Schedule", description: "Interview Schedule successfully" })
    })
  }

  // get schedule interview list
  const getScheduleInterviews = async (userId: string | number) => {
    let params: any = {
      companyId: companyId,
      userId,
      currentDate: dayjs(new Date()).format("YYYY-MM-DD"),
      filterType: "THIS_MONTH",
    }
    await api.get(`${ADMIN_MEETING_LIST}/${userId}`, params).then((res) => {
      setInterviewList(res?.data)
    })
  }

  // get templates
  const getTemplates = async (query: string) => {
    let params: any = {
      page: 1,
      limit: 0
    }
    query && (params.q = query)
    await api.get(GET_ALL_TEMPLATES, params).then((res) => { setTemplateList(res?.data) })
  }
  return {
    loading, setLoading, cadidatesList, setCadidatesList, studentDetails, getStudentDetails, handleRating, rating, setRating, getUserId, getCadidatesData, handleSearch, timeFrame, handleTimeFrameFilter, internship, handleInternShipFilter, handleRequestDocument, download, setDownload, openDrawer, setOpenDrawer, openRejectModal, setOpenRejectModal, selectedCandidate, getInternShipList, internShipList, setSelectedCandidate, hiringProcessList, setHiringProcessList, HandleAssignee, getComments, comment, setComment, handleCreateComment, commentsList, handleInitialPiple, handleStage, companyManagerList, setCompanyManagerList, getCompanyManagerList, scheduleInterview, getScheduleInterviews, interviewList, getTemplates, templateList, params
  };
};

export default useCustomHook;