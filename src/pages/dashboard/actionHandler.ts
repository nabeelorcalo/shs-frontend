import { useEffect, useState } from "react";

import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  adminDashboardMembersDataState,
  adminDashboardRegionAnalyticsState,
  agentDashboardWidgetsState,
  attendanceState,
  attendenceAverageState,
  attendenceClockinState,
  currentUserRoleState,
  currentUserState,
  dashboardLeavesCountState,
  delegateAgenetMembersState,
  delegateAgentDashbaordState,
  feelingTodayMoodState,
  growthAnalyticsDashboardState,
  performanceGraphAnalyticsState,
  topPerformersListState,
  universityCompaniesState,
  usersBirthdaysListState,
} from "../../store";
import constants from "../../config/constants";
import { getRecentActivities } from "../../store/getListingState";
import { Notifications } from "../../components";
import dayjs from "dayjs";

// Chat operation and save into store

//api's endpoints
const { AGENT_DASHBOARD_WIDGETS, GET_PERFORMANCE_LIST, GET_ALL_COMAPANIES, ATTENDANCE_OVERVIEW, TODAY_USERS_BIRTH_DAYS_LIST, PERFORMANCE_GRAPH_ANALYTICS, DASHBOARD_LEAVES_COUNT, DASHBOARD_ATTENDANCE_MOOD, DASHBOARD_ATTENDANCE_CLOCKIN, DASHBOARD_ATTENDANCE_CLOCKOUT, DASHBOARD_ATTENDANCE_AVERAGE } = endpoints;

const {
  AGENT,
} = constants;

const useCustomHook = () => {

  //logged in user role
  const role = useRecoilValue(currentUserRoleState);
  const currentUser = useRecoilValue(currentUserState)

  const [isLoading, setIsLoading] = useState(false)

  const [countingCardData, setCountingCard] = useRecoilState<any>(agentDashboardWidgetsState);
  //top performers list
  const [topPerformerList, setTopPerformersList] = useRecoilState<any>(topPerformersListState)
  // all companies list
  const [universityCompanies, setUniversityCompanies] = useRecoilState<any>(universityCompaniesState);
  // attendance graph
  const [attendance, setAttendance] = useRecoilState<any>(attendanceState);
  // attendance graph
  const [usersBirthdaysList, setUsersBirthdaysList] = useRecoilState<any>(usersBirthdaysListState);
  // performance graph analytics
  const [performanceGraphAnalytics, setperformanceGraphAnalytics] = useRecoilState<any>(performanceGraphAnalyticsState);
  // dashboard leaves count
  const [dashboardLeavesCount, setDashBoardLeavesCount] = useRecoilState<any>(dashboardLeavesCountState)
  // dashboard FEELING TODAY MOOD
  const [feelingTodayMood, setFeelingTodayMood] = useRecoilState<any>(feelingTodayMoodState)
  // dashboard FEELING TODAY MOOD
  const [attendenceClockin, setAttendenceClockin] = useRecoilState<any>(attendenceClockinState)
  // dashboard attendence Average
  const [attendenceAverage, setAttendenceAveattendenceAverage] = useRecoilState<any>(attendenceAverageState)

  // get top performers list
  const getTopPerformerList = async (query?: any) => {
    let params: any = {
      limit: query?.limit ?? 4,
      sortByPerformance: true
    }
    query?.limit === 0 && (delete params.limit)
    if (query?.startDate && query?.endDate) {
      params.filterType = "DATE_RANGE";
      params.startDate = query?.startDate;
      params.endDate = query?.endDate;
    }
    await api.get(GET_PERFORMANCE_LIST, params).then(res => {
      setTopPerformersList(res?.data?.map((obj: any) => ({ image: obj?.avatar, name: obj?.userName, designation: obj?.department, progress: `${obj?.sumOverallRating?.toFixed(2)}%` })));
    }
    )
  }

  // get Internships Summary graph 
  const getAttendance = async () => {
    api.get(ATTENDANCE_OVERVIEW).then((res) => {
      setAttendance(res?.attendanceOver ?? [])
    })
  }

  // getting all companies data 
  const getAllCompaniesData = async () => {
    setIsLoading(true)
    const params = { userUniversityId: currentUser?.userUniversity?.id }
    // let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    const { data } = await api.get(GET_ALL_COMAPANIES, params);
    setUniversityCompanies(data?.map((obj: any) => ({
      logo: `${constants?.MEDIA_URL}/${obj?.logo?.mediaId}.${obj?.logo?.metaData?.extension}`,
      title: obj?.businessName,
      agency: obj?.businessSector,
      peopleList: ["a", "s", "d", "f", "", "", ""]
    })))
    setIsLoading(false)
  };

  // get users birthdays list
  const getUsersBirthdaysList = async () => {
    await api.get(TODAY_USERS_BIRTH_DAYS_LIST).then((res) => {
      setUsersBirthdaysList(res?.data?.map(({ userDetail }: any) => ({
        avatar: `${constants?.MEDIA_URL}/${userDetail?.profileImage?.mediaId}.${userDetail?.profileImage?.metaData?.extension}`,
        date: dayjs(userDetail?.DOB).format("DD MMMM"),
        id: 1,
        name: `${userDetail?.firstName} ${userDetail?.lastName}`,
      })) ?? [])
    })
  }

  // get users birthdays list
  const getPerformanceGraphAnalytics = async () => {
    await api.get(PERFORMANCE_GRAPH_ANALYTICS).then((res) => {
      setperformanceGraphAnalytics(res?.data ?? [])
    })
  }

  // get dashboard leaves count
  const getDashboardLeavesCount = async () => {
    api.get(DASHBOARD_LEAVES_COUNT, { date: "2023-05-11" }).then((res) => { setDashBoardLeavesCount(res?.data) })
  }

  // dashboard FEELING TODAY MOOD
  const addFeelingTodayMood = async (mood: string) => {
    if (mood) {
      let params = {
        trackDate: dayjs(new Date()).format("YYYY-MM-DD"),
        mood: mood.toUpperCase()
      }
      await api.post(DASHBOARD_ATTENDANCE_MOOD, params).then((res) => {
        setFeelingTodayMood(res?.data)
      })
    }
  }
  // handle attendance clockin 
  const handleAttendenceClockin = async (clockIn: string) => {
    if (clockIn) {
      let params = {
        trackDate: dayjs(new Date()).format("YYYY-MM-DD"), clockIn
      }
      await api.post(DASHBOARD_ATTENDANCE_CLOCKIN, params).then((res) => {
        setAttendenceClockin(res?.data);
        localStorage.setItem("clockin", JSON.stringify(res?.data))
      })
    }
  }

  // handle attendance clockin 
  const handleAttendenceClockout = async (clockout: string, id: string) => {
    if (clockout) {
      let params = {
        trackDate: dayjs(new Date()).format("YYYY-MM-DD"), clockout
      }
      await api.post(`${DASHBOARD_ATTENDANCE_CLOCKOUT}/${id}`, params).then((res) => {
        setAttendenceClockin(res?.data);
        localStorage.removeItem("clockin");
      })
    }
  }

  // get attendance average
  const getAttendanceAverage = async () => {
    api.get(DASHBOARD_ATTENDANCE_AVERAGE).then((res: any) => {
      setAttendenceAveattendenceAverage(res);
    })
  }

  // const getData = async (type: string): Promise<any> => {
  //   const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  // };

  const loadMoreData = () => {
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        return body.results;
      })
      .catch(() => { });
  };

  // agent dashboard
  useEffect(() => {
    // agent dashboard
    if (role === AGENT) {
      api
        .get(AGENT_DASHBOARD_WIDGETS)
        .then(({ data }) => setCountingCard(data[0]));
    }
  }, []);

  return {
    loadMoreData,
    countingCardData,
    topPerformerList,
    getTopPerformerList,
    // companies 
    universityCompanies,
    getAllCompaniesData,
    // attendance graph
    getAttendance,
    attendance,
    //birthday
    usersBirthdaysList,
    getUsersBirthdaysList,
    // performance graph analytics
    getPerformanceGraphAnalytics,
    performanceGraphAnalytics,
    // dashboard leaves count
    dashboardLeavesCount,
    getDashboardLeavesCount,
    // today feeling mood
    addFeelingTodayMood,
    feelingTodayMood,
    setFeelingTodayMood,
    // attendance clockin-out
    handleAttendenceClockin,
    attendenceClockin,
    handleAttendenceClockout,
    // attendence Average
    attendenceAverage,
    getAttendanceAverage,
  };
};

export default useCustomHook;
