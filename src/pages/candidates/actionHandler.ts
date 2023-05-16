import api from "../../api";
import { useRecoilState } from "recoil";
import { cadidatesListState } from "../../store/candidates";
import { Notifications } from "../../components";
import endpoints from "../../config/apiEndpoints";
import { useState } from "react";
import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';
const { UPDATE_CANDIDATE_DETAIL, CANDIDATE_LIST, GET_LIST_INTERNSHIP, GET_COMMENTS, ADD_COMMENT } = endpoints;

// Chat operation and save into store
const useCustomHook = () => {
  let params: any = {
    companyId: 1,
    userType: "candidate",
    limit: 10,
    page: 1,
  };
  // candidates list data
  const [cadidatesList, setCadidatesList] = useRecoilState<any>(cadidatesListState);
  const [selectedCandidate, setSelectedCandidate] = useState<any>({})
  // internship list
  const [internShipList, setInternShipList] = useState<any>([])
  //rating 
  const [rating, setRating] = useState<number | string>(0);
  // comments list
  const [commentsList, setCommentsList] = useState<any>([])
  // hiring process list
  const [hiringProcessList, setHiringProcessList] = useState([""]);
  // filter states
  const [timeFrame, setTimeFrame] = useState("");
  const [internship, setInternship] = useState("");
  const [download, setDownload] = useState("");
  //modal states
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openRejectModal, setOpenRejectModal] = useState(false);
  // get cadidates data
  const getCadidatesData = async (params: any) => {
    await api.get(CANDIDATE_LIST, params).then((res) => setCadidatesList(res?.data));
  };

  //user id for update methods
  let id: string | number = "";
  const getUserId = (userId: string | number) => {
    id = userId
  }

  //search 
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
    console.log(value);
    if (value) {
      params.internshipId = value
    } else {
      delete params.internshipId
    }
    getCadidatesData(params)
    setInternship(value)
  }

  // funtion for update rating
  const handleRating = (id: string | number, rating: string | number) => {
    api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, { rating }, { id }).then((res) => {
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

  // get comments
  const getComments = async (candidateId: number | string) => {
    console.log(candidateId, "candidateId ");
    candidateId && await api.get(GET_COMMENTS, { candidateId }).then(({ data }) => setCommentsList(data))
  }

  // create comment
  const handleCreateComment = async (candidateId: string | number, comment: string) => {
    comment ? await api.post(ADD_COMMENT, { candidateId, comment }).then(({ data }) =>
      setCommentsList([...commentsList, data])) : Notifications({ title: "Error", description: "Comment can't empity", type: "error" })
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
  const handleStage = (id: string | number, stage: string | number) => {
    api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, { stage }, { id }).then((res) => {
      setCadidatesList(
        cadidatesList?.map((item: any) => (item?.id === id ? { ...item, stage: res?.data?.stage } : item))
      );
    });
  };
  return {
    cadidatesList, setCadidatesList, handleRating, rating, setRating, getUserId, getCadidatesData, handleSearch, timeFrame, handleTimeFrameFilter, internship, handleInternShipFilter, download, setDownload, openDrawer, setOpenDrawer, openRejectModal, setOpenRejectModal, selectedCandidate, getInternShipList, internShipList, setSelectedCandidate, hiringProcessList, setHiringProcessList, getComments, handleCreateComment, commentsList, handleInitialPiple, handleStage, params
  };
};

export default useCustomHook;