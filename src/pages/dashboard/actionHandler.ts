import { useMemo, useState } from 'react';
import api from '../../api';
import endpoints from '../../config/apiEndpoints';
import { useRecoilState, useRecoilValue } from 'recoil';
import { debounce } from "lodash";

// import { agentDashboardWidgetsState, currentUserRoleState, , studentProfileState } from "../../store";
import {
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
  feelingTodayMoodState,
  performanceGraphAnalyticsState,
  topPerformersListState,
  universityCompaniesState,
  universityWidgetsState,
  usersBirthdaysListState,
  internshipsListState,
  internshipsSummeryGraphState,
  companyWidgetsState,
  departmentListState,
  managerWidgetsState,
  internWorkingStatsState,
  announcementDataState,
  // internshipsSummaryState,
} from '../../store';
// import constants from "../../config/constants";
import {
  dashboardWidgetState,
  recentJobState,
} from '../../store/dashboard/student';
// import { agent_dashboard_widgets } from "../../store";

// const { SYSTEM_ADMIN_DASHBOARD, AGENT_DASHBOARD_WIDGETS } = endpoints;
//   topPerformersListState,
// } from "../../store";
import constants from '../../config/constants';
import dayjs from 'dayjs';
import { Notifications } from '../../components';

// Chat operation and save into store

//api's endpoints
const {
  AGENT_DASHBOARD_WIDGETS,
  GET_PERFORMANCE_LIST,
  GET_ALL_COMAPANIES,
  ATTENDANCE_OVERVIEW,
  TODAY_USERS_BIRTH_DAYS_LIST,
  PERFORMANCE_GRAPH_ANALYTICS,
  DASHBOARD_LEAVES_COUNT,
  DASHBOARD_ATTENDANCE_MOOD,
  DASHBOARD_ATTENDANCE_CLOCKIN,
  DASHBOARD_ATTENDANCE_CLOCKOUT,
  DASHBOARD_ATTENDANCE_AVERAGE,
  AGENT_DASHBOARD_LISTING_GRAPH,
  GET_RESERVATIONS,
  COMPANY_DASHBOARD_WIDGETS,
  MANAGER_DASHBOARD_WIDGETS,
  GET_LIST_INTERNSHIP,
  MANAGER_COMPANY_UNIVERSITIES,
  DEPARTMENT,
  VERIIFCATION_STUDENT,
  STUDENT_PROFILE_COMPLETION,
  STUDENT_DASHBOARD_WIDGET,
  STUDENT_RECENT_JOB,
  INTERN_WORKING_STATS,
  GET_INTERN_TODAY_INTERN_ATTENDANCE,
  UNIVERSITY_DASHBOARD_WIDGETS,
  ANNOUNCEMENT_FINDALL, POST_NEW_ANNOUNCEMENT
} = endpoints;

const { AGENT } = constants;

const useCustomHook = () => {
  //logged in user role
  const role = useRecoilValue(currentUserRoleState);
  const currentUser = useRecoilValue(currentUserState);

  const [isLoading, setIsLoading] = useState(false);

  //top performers list
  const [topPerformerList, setTopPerformersList] = useRecoilState<any>(
    topPerformersListState
  );
  // all companies list
  const [universityCompanies, setUniversityCompanies] = useRecoilState<any>(
    universityCompaniesState
  );
  // attendance graph
  const [attendance, setAttendance] = useRecoilState<any>(attendanceState);
  // attendance graph
  const [usersBirthdaysList, setUsersBirthdaysList] = useRecoilState<any>(
    usersBirthdaysListState
  );
  // performance graph analytics
  const [performanceGraphAnalytics, setperformanceGraphAnalytics] =
    useRecoilState<any>(performanceGraphAnalyticsState);
  // dashboard leaves count
  const [dashboardLeavesCount, setDashBoardLeavesCount] = useRecoilState<any>(
    dashboardLeavesCountState
  );
  // dashboard FEELING TODAY MOOD
  const [feelingTodayMood, setFeelingTodayMood] = useRecoilState<any>(
    feelingTodayMoodState
  );
  // dashboard FEELING TODAY MOOD
  const [attendenceClockin, setAttendenceClockin] = useRecoilState<any>(
    attendenceClockinState
  );
  // dashboard attendence Average
  const [attendenceAverage, setAttendenceAverage] = useRecoilState<any>(
    attendenceAverageState
  );
  // dashboard attendence Average
  const [agentDashboardWidgets, setAgentDashboardWidget] = useRecoilState<any>(
    agentDashboardWidgetsState
  );
  // agent Dashboard Listing Graph
  const [agentListingGraph, setAgentListingGraph] = useRecoilState<any>(
    agentDashboardListingGraphState
  );
  // agent reservation table data
  const [agentReservation, setAgentReservation] = useRecoilState<any>(
    agentReservationState
  );
  // university dashboard counting card
  const [universityWidgets, setUniversityWidgets] = useRecoilState<any>(
    universityWidgetsState
  );
  // company dashboard counting card
  const [companyWidgets, setCompanyWidgets] = useRecoilState<any>(companyWidgetsState)
  // manager dashboard counting card
  const [managerWidgets, setManagerWidgets] =
    useRecoilState<any>(managerWidgetsState);
  // manager and companies university list
  const [managerCompanyUniversitiesList, setManagerCompanyUniversitiesList] =
    useRecoilState<any>(universityWidgetsState);
  // internsh list
  const [internshipsList, setInternshipsList] =
    useRecoilState<any>(internshipsListState);
  // internsh summery graph
  const [internshipsSummeryGraph, setInternshipsSummeryGraph] =
    useRecoilState<any>(internshipsSummeryGraphState);
  // department list for pipline table filter
  const [departmentList, setDepartmentList] =
    useRecoilState<any>(departmentListState);
  // INTERN working stats state
  const [internWorkingStats, setinternWorkingStats] = useRecoilState<any>(
    internWorkingStatsState
  );
  // ANNOUNCEMENT
  const [announcementData, setAnnouncementDataData] = useRecoilState(
    announcementDataState
  );

  const [studentWidget, setStudentWidget] =
    useRecoilState(dashboardWidgetState);
  const [getProfile, setGetProfile] = useRecoilState(
    studentProfileCompletionState
  );
  const [getjOB, setGetJob] = useRecoilState(recentJobState);

  const getAnnouncementData = async () => {
    const { data } = await api.get(ANNOUNCEMENT_FINDALL);
    // console.log("after post", data);
    setAnnouncementDataData(data);
  };

  // Post announcement data
  const addNewAnnouncement = async (description: string) => {
    const res = await api.post(POST_NEW_ANNOUNCEMENT, {
      description: description,
    });
    // console.log(res);

    if (res) {
      await getAnnouncementData();
      Notifications({
        title: "Success",
        description: "Announcement added successfully",
        type: "success",
      });
    }
  };

  //search vehicle
  const changeHandler = async (e: any) => {
    const { data } = await api.get(ANNOUNCEMENT_FINDALL);
    setAnnouncementDataData(data);
  };
  const debouncedResults = useMemo(() => {
    return debounce(changeHandler, 500);
  }, []);

  // get top performers list
  const getTopPerformerList = async (query?: any) => {
    setIsLoading(true);
    let params: any = {
      limit: query?.limit ?? 4,
      sortByPerformance: true,
    };
    query?.limit === 0 && delete params.limit;
    if (query?.startDate && query?.endDate) {
      params.filterType = 'DATE_RANGE';
      params.startDate = query?.startDate;
      params.endDate = query?.endDate;
    }
    await api.get(GET_PERFORMANCE_LIST, params).then((res) => {
      setTopPerformersList(
        res?.data?.map((obj: any) => ({
          image: obj?.avatar,
          name: obj?.userName,
          designation: obj?.department,
          progress: `${obj?.sumOverallRating?.toFixed(2)}%`,
        }))
      );
    });
    setIsLoading(false)
  };
  // get Internships Summary graph
  const getAttendance = async () => {
    await api.get(ATTENDANCE_OVERVIEW).then((res: any) => {
      setAttendance(res?.attendanceOver ?? []);
    });
  };
  // getting all companies data
  const getAllCompaniesData = async () => {
    setIsLoading(true);
    const params = { userUniversityId: currentUser?.userUniversity?.id };
    const { data } = await api.get(GET_ALL_COMAPANIES, params);
    const companyData = data?.map((obj: any) => ({
      companyId: obj?.id,
      logo: `${constants?.MEDIA_URL}/${obj?.logo?.mediaId}.${obj?.logo?.metaData?.extension}`,
      title: obj?.businessName,
      agency: obj?.businessSector,
      peopleList: obj?.interns?.map((item: any) => ({
        internProfile: `${constants?.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`,
        firstName: item?.userDetail?.firstName,
        lastName: item?.userDetail?.lastName,
      })),
    }));
    setUniversityCompanies(companyData);
    setIsLoading(false);
    return companyData;
  };
  // get users birthdays list
  const getUsersBirthdaysList = async () => {
    await api.get(TODAY_USERS_BIRTH_DAYS_LIST).then((res: any) => {
      setUsersBirthdaysList(
        res?.data?.map(({ userDetail }: any) => ({
          avatar: `${constants?.MEDIA_URL}/${userDetail?.profileImage?.mediaId}.${userDetail?.profileImage?.metaData?.extension}`,
          date: dayjs(userDetail?.DOB).format('DD MMMM'),
          id: 1,
          name: `${userDetail?.firstName} ${userDetail?.lastName}`,
        })) ?? []
      );
    });
  };
  // get users birthdays list
  const getPerformanceGraphAnalytics = async () => {
    await api.get(PERFORMANCE_GRAPH_ANALYTICS, currentUser?.role === constants.UNIVERSITY && { userUniversityId: currentUser?.userUniversity?.university?.id }).then((res: any) => {
      setperformanceGraphAnalytics(res?.data ?? [])
    })
  }
  // get dashboard leaves count
  const getDashboardLeavesCount = async () => {
    await api.get(DASHBOARD_LEAVES_COUNT).then((res: any) => {
      setDashBoardLeavesCount({
        casual: res?.data?.casual?.map((obj: any) => ({
          firstName: obj?.intern?.userDetail?.firstName,
          lastName: obj?.intern?.userDetail?.lastName,
          internImage: `${constants?.MEDIA_URL}/${obj?.intern?.userDetail?.profileImage?.mediaId}.${obj?.intern?.userDetail?.profileImage?.metaData?.extension
            }`,
        })) ?? [],
        medical: res?.data?.medical?.map((obj: any) => ({
          firstName: obj?.intern?.userDetail?.firstName,
          lastName: obj?.intern?.userDetail?.lastName,
          internImage: `${constants?.MEDIA_URL}/${obj?.intern?.userDetail?.profileImage?.mediaId}.${obj?.intern?.userDetail?.profileImage?.metaData?.extension
            }`,
        })) ?? [],
        sick: res?.data?.sick?.map((obj: any) => ({
          firstName: obj?.intern?.userDetail?.firstName,
          lastName: obj?.intern?.userDetail?.lastName,
          internImage: `${constants?.MEDIA_URL}/${obj?.intern?.userDetail?.profileImage?.mediaId}.${obj?.intern?.userDetail?.profileImage?.metaData?.extension
            }`,
        })) ?? [],
        wfh: res?.data?.wfh?.map((obj: any) => ({
          firstName: obj?.intern?.userDetail?.firstName,
          lastName: obj?.intern?.userDetail?.lastName,
          internImage: `${constants?.MEDIA_URL}/${obj?.intern?.userDetail?.profileImage?.mediaId}.${obj?.intern?.userDetail?.profileImage?.metaData?.extension
            }`,
        })) ?? [],
      })
    })
  }
  // dashboard FEELING TODAY MOOD
  const addFeelingTodayMood = async (mood: string) => {
    if (mood) {
      let params = {
        trackDate: dayjs(new Date()).format('YYYY-MM-DD'),
        mood: mood.toUpperCase(),
      };
      await api.post(DASHBOARD_ATTENDANCE_MOOD, params).then((res) => {
        setFeelingTodayMood(res?.data);
      });
    }
  };
  // get intern today attendance
  const getInternTodayAttendance = async () => {
    await api.get(GET_INTERN_TODAY_INTERN_ATTENDANCE).then((res) => {
      setFeelingTodayMood(res?.data);
      setAttendenceClockin(
        { ...res?.data?.clocking[0], totalHoursToday: res?.data?.totalHoursToday,totalMinutesToday:res?.data?.totalMinutesToday }
      );
    });
  };
  // handle attendance clockin
  const handleAttendenceClockin = async (clockIn: string) => {
    if (clockIn) {
      let params = {
        trackDate: dayjs(new Date()).format('YYYY-MM-DD'),
        clockIn,
      };
      await api.post(DASHBOARD_ATTENDANCE_CLOCKIN, params).then((res) => {
        setAttendenceClockin(res?.data);
        localStorage.setItem('clockin', JSON.stringify(res?.data));
      });
    }
  };
  // handle attendance clockin
  const handleAttendenceClockout = async (clockout: string, id: string) => {
    if (clockout) {
      let params = {
        trackDate: dayjs(new Date()).format('YYYY-MM-DD'),
        clockOut: clockout,
      };
      await api
        .post(`${DASHBOARD_ATTENDANCE_CLOCKOUT}/${id}`, params)
        .then((res) => {
          setAttendenceClockin(res?.data);
          localStorage.removeItem('clockin');
        });
    }
  };
  // get attendance average
  const getAttendanceAverage = async () => {
    await api.get(DASHBOARD_ATTENDANCE_AVERAGE).then((res: any) => {
      setAttendenceAverage(res);
    });
  };
  // agent dashboard
  const getAgentDashboardWidget = async () => {
    await api.get(AGENT_DASHBOARD_WIDGETS).then((res: any) => {
      setAgentDashboardWidget(res?.data[0]);
    });
  };
  // get agent Dashboard Listing Graph
  const getAgentListingGraph = async () => {
    await api.get(AGENT_DASHBOARD_LISTING_GRAPH).then((res: any) => {
      setAgentListingGraph(
        res?.data?.map((obj: any) => ({
          status: obj?.type,
          month: obj?.city,
          value: obj?.value,
        }))
      );
    });
  };

  // get reservation table data
  const getReservationTableData = async () => {
    setIsLoading(true);
    await api.get(GET_RESERVATIONS).then((res: any) => {
      setAgentReservation(res?.data);
    });
    setIsLoading(false);
  };
  // university dashboard
  const getUniversityDashboardWidget = async () => {
    await api.get(UNIVERSITY_DASHBOARD_WIDGETS).then((res: any) => {
      setUniversityWidgets(res)
    })
  }
  const getManagerCompanyUniversitiesList = async () => {
    let params: any = {
      page: 1,
      limit: 3,
    };
    api.get(MANAGER_COMPANY_UNIVERSITIES, params).then((res: any) => {
      setManagerCompanyUniversitiesList(
        res?.data?.map((obj: any) => ({
          logo: obj?.university?.logoId,
          title: obj?.university?.name,
          internList: obj?.intern?.map((interItem: any) => ({
            firstName: interItem?.userDetail?.firstName,
            lastName: interItem?.userDetail?.lastName,
            internImage: `${constants?.MEDIA_URL}/${interItem?.userDetail?.profileImage?.mediaId}.${interItem?.userDetail?.profileImage?.metaData?.extension}`,
          })),
        }))
      );
    });
  };
  // get company counting card data
  const getCompanyWidgets = async () => {
    api
      .get(COMPANY_DASHBOARD_WIDGETS)
      .then(({ data }: any) => setCompanyWidgets(data));
  };
  // get company counting card data
  const getManagerWidgets = async () => {
    api
      .get(MANAGER_DASHBOARD_WIDGETS)
      .then(({ data }: any) => setManagerWidgets(data));
  };
  // internships
  const getInternShipList = async (departmentId?: any) => {
    // setIsLoading(true)
    await api.get(GET_LIST_INTERNSHIP, departmentId && { departmentId: departmentId }).then((res: any) => {
      // pipline table
      setInternshipsList(res?.data?.map((data: any) => (
        {
          key: data?.id,
          internships: { designation: data?.title, candidates: data?.interns?.length ?? 0 },
          applied: data?.interns?.filter((item: any) => (item?.stage === "applied")).length ?? 0,
          interviewed: data?.interns?.filter((item: any) => (item?.stage === "interviewed")).length ?? 0,
          recommended: data?.interns?.filter((item: any) => (item?.stage === "recommended")).length ?? 0,
          offerLetter: data?.interns?.filter((item: any) => (item?.stage === "offerLetter")).length ?? 0,
          contract: data?.interns?.filter((item: any) => (item?.stage === "contract")).length ?? 0,
          hired: data?.interns?.filter((item: any) => (item?.stage === "hired")).length ?? 0,
          rejected: data?.interns?.filter((item: any) => (item?.stage === "rejected")).length ?? 0,
        }
      )))

      // summery graph
      setInternshipsSummeryGraph({
        totalInternships: res?.data?.length ?? 0,
        data: [
          {
            star: res?.data?.length ?? 0,
          },
          {
            name: "Close",
            star: res?.data?.filter((obj: any) => (obj?.status === "CLOSED"))?.length ?? 0,
          },
          {
            name: "Pending",
            star: res?.data?.filter((obj: any) => (obj?.status === "PENDING"))?.length ?? 0,
          },
          {
            name: "Draft",
            star: res?.data?.filter((obj: any) => (obj?.status === "DRAFT"))?.length ?? 0,
          },
          {
            name: "Active",
            star: res?.data?.filter((obj: any) => (obj?.status === "PUBLISHED"))?.length ?? 0,
          },
        ]
      })
    })
    // setIsLoading(false)
  }

  // get department list for pipline table filter
  const getDepartmentList = async () => {
    let params = {
      page: 1,
      limit: 0,
    };
    api.get(DEPARTMENT, params).then(({ data }: any) => {
      setDepartmentList(data);
    });
  };

  // get INTERN working stats
  const getInternWorkingStats = async () => {
    await api.get(INTERN_WORKING_STATS).then((res: any) => {
      setinternWorkingStats(
        res?.data?.map((obj: any) => ({
          days: dayjs(obj?.trackDate).format('ddd'),
          value: obj?.totalHours,
          type: obj?.status,
        }))
      );
    });
  };

  // Collapse
  // const getData = async (type: string): Promise<any> => {
  //   const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  // };

  const loadMoreData = () => {
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo'
    )
      .then((res: any) => res.json())
      .then((body) => {
        return body.results;
      })
      .catch(() => { });
  };

  const verifcationStudentData: any = async (
    body: any,
    query: {
      skip: boolean;
      step: number;
    }
  ): Promise<any> => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await api.post(
      `${VERIIFCATION_STUDENT}?step=${query.step}&skip=${query.skip}`,
      body,
      config
    );
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
    currentUser,
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
    getInternTodayAttendance,
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
    // manager and companies university list
    getManagerCompanyUniversitiesList,
    managerCompanyUniversitiesList,
    // internships
    getInternShipList,
    internshipsList,
    internshipsSummeryGraph,
    // department list for pipline table filter
    getDepartmentList,
    departmentList,
    //company dashboard widgets
    getCompanyWidgets,
    companyWidgets,
    // manager dashboard widgets
    getManagerWidgets,
    managerWidgets,
    // INTERN working stats state
    internWorkingStats,
    getInternWorkingStats,
    // university dashboard
    getUniversityDashboardWidget,
    universityWidgets,
    // announcement
    addNewAnnouncement,
    getAnnouncementData,

    verifcationStudentData,
    getStudentProfile,
    getStudentWidget,
    getStudentJob,
  };
};

export default useCustomHook;
