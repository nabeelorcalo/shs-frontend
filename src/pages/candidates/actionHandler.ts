import api from "../../api";
import { useRecoilState } from "recoil";
import { cadidatesListState } from "../../store/candidates";
import { Notifications } from "../../components";
import endpoints from "../../config/apiEndpoints";
import { useState } from "react";
import dayjs from "dayjs";
import weekday from 'dayjs/plugin/weekday';
const { UPDATE_CANDIDATE_DETAIL, CANDIDATE_LIST, GET_LIST_INTERNSHIP } = endpoints;

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
  const [internShipList, setInternShipList] = useState<any>([])
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

  };

  // intenShip type filter
  const handleInternShipFilter = (value: string) => {
    setInternship(value)
  }

  // internShip list
  const geInternShipList = async () => {
    await api.get(GET_LIST_INTERNSHIP, { companyId: 1 }).then(({ data }) => {
      setInternShipList(data?.map(({ id, title }: any) => ({ id, title })))
      console.log("datasssssssssssssssss", data)
    })
  }
  // funtion for update rating
  const handleRating = (rating: string | number) => {
    api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, { rating }, { id }).then((res) => {
      setCadidatesList(
        cadidatesList?.map((item: any) => (item?.id === id ? { ...item, rating: res?.data?.rating } : item))
      );
      Notifications({ title: "Rating", description: "Rating updated successfully" });
    });
  };

  return {
    cadidatesList, setCadidatesList, handleRating, getUserId, getCadidatesData, handleSearch, timeFrame, handleTimeFrameFilter, internship, handleInternShipFilter, download, setDownload, openDrawer, setOpenDrawer, openRejectModal, setOpenRejectModal, selectedCandidate, setSelectedCandidate, geInternShipList, internShipList, params
  };
};

export default useCustomHook;