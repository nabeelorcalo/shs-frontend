import { useEffect, useState } from "react";

import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
// import { agentDashboardWidgetsState, currentUserRoleState, , studentProfileState } from "../../store";
import {
  adminDashboardMembersDataState,
  adminDashboardRegionAnalyticsState,
  agentDashboardListingGraphState,
  agentDashboardWidgetsState,
  agentReservationState,
  attendanceState,
  attendenceAverageState,
  attendenceClockinState,
  studentProfileCompletionState,
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
  universityWidgetsState,
  usersBirthdaysListState,
  // internshipsSummaryState,
} from "../../store";
// import constants from "../../config/constants";
import apiEndpoints from "../../config/apiEndpoints";
import { dashboardWidgetState, recentJobState } from "../../store/dashboard/student";
// import { agent_dashboard_widgets } from "../../store";

// const { SYSTEM_ADMIN_DASHBOARD, AGENT_DASHBOARD_WIDGETS } = endpoints;
//   topPerformersListState,
// } from "../../store";
import constants from "../../config/constants";
import { getRecentActivities } from "../../store/getListingState";
import { Notifications } from "../../components";
import dayjs from "dayjs";

// Chat operation and save into store

//api's endpoints
const { AGENT_DASHBOARD_WIDGETS, GET_PERFORMANCE_LIST, GET_ALL_COMAPANIES, ATTENDANCE_OVERVIEW, TODAY_USERS_BIRTH_DAYS_LIST, PERFORMANCE_GRAPH_ANALYTICS, DASHBOARD_LEAVES_COUNT, DASHBOARD_ATTENDANCE_MOOD, DASHBOARD_ATTENDANCE_CLOCKIN, DASHBOARD_ATTENDANCE_CLOCKOUT, DASHBOARD_ATTENDANCE_AVERAGE, AGENT_DASHBOARD_LISTING_GRAPH, GET_RESERVATIONS, UNIVERSITY_DASHBOARD_WIDGETS, COMPANY_DASHBOARD_UNIVERSITIES, COMPANY_DASHBOARD_WIDGETS, COMPANY_DASHBOARD_INTERSHIP_SUMMERY_GRAPH, COMPANY_DASHBOARD_PIPLINE_TABLE, VERIIFCATION_STUDENT, STUDENT_PROFILE_COMPLETION, STUDENT_DASHBOARD_WIDGET, STUDENT_RECENT_JOB } = endpoints;

const {
  AGENT,
} = constants;

const useCustomHook = () => {

  //logged in user role
  const role = useRecoilValue(currentUserRoleState);
  const currentUser = useRecoilValue(currentUserState)

  const [isLoading, setIsLoading] = useState(false)

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
  const [attendenceAverage, setAttendenceAverage] = useRecoilState<any>(attendenceAverageState)
  // dashboard attendence Average
  const [agentDashboardWidgets, setAgentDashboardWidget] = useRecoilState<any>(agentDashboardWidgetsState)
  // agent Dashboard Listing Graph
  const [agentListingGraph, setAgentListingGraph] = useRecoilState<any>(agentDashboardListingGraphState)
  // agent reservation table data
  const [agentReservation, setAgentReservation] = useRecoilState<any>(agentReservationState)
  // university dashboard counting card
  const [universityWidgets, setuniversityWidgets] = useRecoilState<any>(universityWidgetsState)

  const [studentWidget, setStudentWidget] = useRecoilState(dashboardWidgetState);
  const [getProfile, setGetProfile] = useRecoilState(studentProfileCompletionState);
  const [getjOB, setGetJob] = useRecoilState(recentJobState);
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
      peopleList: obj?.interns?.map((item: any) => ({
        internProfile: `${constants?.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`,
        firstName: item?.userDetail?.firstName,
        lastName: item?.userDetail?.lastName,
      }))
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
      setAttendenceAverage(res);
    })
  }
  // agent dashboard
  const getAgentDashboardWidget = async () => {
    await api.get(AGENT_DASHBOARD_WIDGETS).then((res: any) => {
      setAgentDashboardWidget(res?.data[0])
    })
  }
  // get agent Dashboard Listing Graph  
  const getAgentListingGraph = async () => {
    await api.get(AGENT_DASHBOARD_LISTING_GRAPH).then((res: any) => {
      setAgentListingGraph(res?.data?.map((obj: any) => ({
        status: obj?.type,
        month: obj?.city,
        value: obj?.value
      })))
    })
  }

  // get reservation table data
  const getReservationTableData = async () => {
    setIsLoading(true)
    await api.get(GET_RESERVATIONS).then((res: any) => {
      setAgentReservation(res?.data);
      setIsLoading(false)
    })
    setIsLoading(false)
  }
  // university dashboard
  const getUniversityDashboardWidget = async () => {
    // await api.get(UNIVERSITY_DASHBOARD_WIDGETS).then((res: any) => {
    //   setuniversityWidgets(res?.data)
    // })
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


  const verifcationStudentData: any = async (body: any, query: {
    skip: boolean,
    step: number
  }): Promise<any> => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const { data } = await api.post(`${VERIIFCATION_STUDENT}?step=${query.step}&skip=${query.skip}`, body, config);
    return data;
  };

  const getStudentProfile = async () => {
    const { data } = await api.get(STUDENT_PROFILE_COMPLETION);
    setGetProfile(data);
  };

  const getStudentWidget = async () => {
    const { data } = await api.get(STUDENT_DASHBOARD_WIDGET);
    setStudentWidget(data);
  };

  const getStudentJob = async () => {
    const { data } = await api.get(STUDENT_RECENT_JOB);
    setGetJob(data);
  };

  return {
    loadMoreData,
    isLoading,
    // top performer list
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
    // agent dashboard widgets
    getAgentDashboardWidget,
    agentDashboardWidgets,
    // agent Dashboard Listing Graph 
    getAgentListingGraph,
    agentListingGraph,
    // agent reservation table
    getReservationTableData,
    agentReservation,
    // university dashboard
    universityWidgets,
    getUniversityDashboardWidget,
    verifcationStudentData,
    getStudentProfile,
    getStudentWidget,
    getStudentJob,
  };
};

export default useCustomHook;
