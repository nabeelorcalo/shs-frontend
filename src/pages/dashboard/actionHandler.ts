import { useState } from 'react';
import api from '../../api';
import endpoints from '../../config/apiEndpoints';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  agentDashboardListingGraphState,
  agentDashboardWidgetsState,
  agentReservationState,
  attendanceState,
  attendenceAverageState,
  attendenceClockinState,
  studentProfileCompletionState,
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
} from '../../store';
import {
  dashboardWidgetState,
  recentJobState,
} from '../../store/dashboard/student';
import constants from '../../config/constants';
import dayjs from 'dayjs';
import { Notifications } from '../../components';
import { getUserAvatar } from '../../helpers';
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
  ANNOUNCEMENT_FINDALL, POST_NEW_ANNOUNCEMENT,
  CREATE_NOTIFICATION
} = endpoints;

const useCustomHook = () => {
  // ============================== common states ================================== //
  //logged in user DATA
  const currentUser = useRecoilValue(currentUserState);
  const [isLoading, setIsLoading] = useState(false);
  // dashboard leaves count
  const [dashboardLeavesCount, setDashBoardLeavesCount] = useRecoilState<any>(
    dashboardLeavesCountState
  );

  // birthday list
  const [usersBirthdaysList, setUsersBirthdaysList] = useRecoilState<any>(
    usersBirthdaysListState
  );
  // INTERN working stats state
  const [internWorkingStats, setinternWorkingStats] = useRecoilState<any>(
    internWorkingStatsState
  );
  //top performers list
  const [topPerformerList, setTopPerformersList] = useRecoilState<any>(
    topPerformersListState
  );
  // manager and companies university list
  const [managerCompanyUniversitiesList, setManagerCompanyUniversitiesList] = useRecoilState<any>(universityWidgetsState);
  // attendance graph
  const [attendance, setAttendance] = useRecoilState<any>(attendanceState);
  // department list for pipline table filter
  const [departmentList, setDepartmentList] = useRecoilState<any>(departmentListState);
  // performance graph analytics
  const [performanceGraphAnalytics, setperformanceGraphAnalytics] = useRecoilState<any>(performanceGraphAnalyticsState);
  // ANNOUNCEMENT
  const [announcementData, setAnnouncementDataData] = useRecoilState(
    announcementDataState
  );
  // ===============XXXX=========== common states ==============XXXX================ //

  // ============================== Intern Dashboard states ================================== //
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
  // =============XXXX============ Intern Dashboard states ================XXXX============== //

  // ============================== property agent Dashboard states ================================== //
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
  // ================XXXX========= property agent Dashboard states ==============XXXX================ //

  // ============================== company admin Dashboard states ================================== //
  // internsh list
  const [internshipsList, setInternshipsList] = useRecoilState<any>(internshipsListState);
  // internsh summery graph
  const [internshipsSummeryGraph, setInternshipsSummeryGraph] = useRecoilState<any>(internshipsSummeryGraphState);
  // company dashboard counting card
  const [companyWidgets, setCompanyWidgets] = useRecoilState<any>(companyWidgetsState)
  // ================XXXX========= company admin Dashboard states ==============XXXX================ //

  // ============================== company manager Dashboard states ================================== //
  // manager dashboard counting card
  const [managerWidgets, setManagerWidgets] = useRecoilState<any>(managerWidgetsState);
  // ================XXXX========= company manager Dashboard states ==============XXXX================ //

  // ============================== university Dashboard states ================================== //
  // all companies list
  const [universityCompanies, setUniversityCompanies] = useRecoilState<any>(
    universityCompaniesState
  );
  // university dashboard counting card
  const [universityWidgets, setUniversityWidgets] = useRecoilState<any>(
    universityWidgetsState
  );
  // ================XXXX========= university Dashboard states ==============XXXX================ //

  // ============================== student Dashboard states ================================== //
  const [studentWidget, setStudentWidget] =
    useRecoilState(dashboardWidgetState);
  const [getProfile, setGetProfile] = useRecoilState(
    studentProfileCompletionState
  );
  const [getjOB, setGetJob] = useRecoilState(recentJobState);
  // ================XXXX========= student Dashboard states ==============XXXX================ //

  // ============================== common functions ================================== //
  // get users birthdays list
  const getUsersBirthdaysList = async () => {
    await api.get(TODAY_USERS_BIRTH_DAYS_LIST).then((res: any) => {
      setUsersBirthdaysList(
        res?.data?.map(({ userDetail,isWished }: any) => ({
          avatar: getUserAvatar({ profileImage: userDetail?.profileImage }),
          date: dayjs(userDetail?.DOB).format('DD MMMM'),
          id: userDetail?.id,
          name: `${userDetail?.firstName} ${userDetail?.lastName}`,
          isWished
        })) ?? []
      );
    });
  };
  // WISH birthday
  const wishBirthdayToUser = async (body: any) => {
    await api.post(CREATE_NOTIFICATION, body).then((res: any) => { })
  };
  // get dashboard leaves count
  const getDashboardLeavesCount = async () => {
    await api.get(DASHBOARD_LEAVES_COUNT).then((res: any) => {
      const handleModification = (leavesData: any) => {
        // check param type
        const isArray = typeof leavesData === "object"
        // return data on the base of type
        return isArray ? leavesData.map((obj: any) => {
          const { intern: { userDetail: { firstName = "", lastName = "", profileImage } } }: any = obj;
          return {
            firstName: firstName,
            lastName: lastName,
            internImage: getUserAvatar({ profileImage })
          }
        }) : leavesData

      }
      setDashBoardLeavesCount({
        casual: handleModification(res?.data?.casual) ?? 0,
        medical: handleModification(res?.data?.medical) ?? 0,
        sick: handleModification(res?.data?.sick) ?? 0,
        wfh: handleModification(res?.data?.wfh) ?? 0,
      })
    })
  }
  // get announcement data
  const getAnnouncementData = async () => {
    const { data } = await api.get(ANNOUNCEMENT_FINDALL);
    setAnnouncementDataData(data);
  };
  // Post announcement data
  const addNewAnnouncement = async (description: string) => {
    const res = await api.post(POST_NEW_ANNOUNCEMENT, {
      description: description,
    });
    if (res) {
      await getAnnouncementData();
      Notifications({
        title: "Success",
        description: "Announcement added successfully",
        type: "success",
      });
    }
  };
  // get Attendance graph data
  const getAttendance = async () => {
    await api.get(ATTENDANCE_OVERVIEW).then((res: any) => {
      setAttendance(res?.attendanceOver ?? []);
    });
  };
  // get top performers list
  const getTopPerformerList = async (query?: any) => {
    setIsLoading(true);
    const date = new Date();
    let params: any = {
      limit: query?.limit ?? 4,
      sortByPerformance: true,
    };
    query?.limit === 0 && delete params.limit;
    params.filterType = 'DATE_RANGE';
    params.startDate = dayjs(new Date(date.getFullYear(), query?.month ?? date.getMonth(), 1)).format("YYYY-MM-DD");
    params.endDate = dayjs(new Date(date.getFullYear(), (query?.month ?? date.getMonth()) + 1, 0)).format("YYYY-MM-DD");
    await api.get(GET_PERFORMANCE_LIST, params).then((res) => {
      setTopPerformersList(
        res?.data?.map((obj: any) => ({
          image: getUserAvatar({ profileImage: obj?.userImage }),
          name: obj?.userName,
          designation: obj?.department,
          progress: `${obj?.sumOverallRating?.toFixed(2)}%`,
        }))
      );
    });
    setIsLoading(false)
  };
  // get users get Performance Graph Analytics list
  const getPerformanceGraphAnalytics = async () => {
    await api.get(PERFORMANCE_GRAPH_ANALYTICS,
      currentUser?.role === constants.UNIVERSITY && { userUniversityId: currentUser?.userUniversity?.university?.id })
      .then((res: any) => {
        setperformanceGraphAnalytics(res?.data ?? [])
      })
  }
  // get universities list for company admin and company manager
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
            internImage: getUserAvatar({ profileImage: interItem?.userDetail?.profileImage }),
          })),
        }))
      );
    });
  };
  // get department list for filter
  const getDepartmentList = async () => {
    let params = {
      page: 1,
      limit: 0,
    };
    api.get(DEPARTMENT, params).then(({ data }: any) => {
      setDepartmentList(data);
    });
  };
  // ==============XXXX============ common functions ==============XXXX================ //

  // ============================== Intern Dashboard functions ================================== //
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
        {
          ...res?.data?.clocking[res?.data?.clocking?.length - 1],
          clockIn: res?.data?.clocking[0]?.clockIn,
          clockOut: res?.data?.clocking[res?.data?.clocking?.length - 1]?.clockIn,
          totalHoursToday: res?.data?.totalHoursToday,
          totalMinutesToday: res?.data?.totalMinutesToday
        }
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
      await api.post(DASHBOARD_ATTENDANCE_CLOCKIN, params);
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
        .post(`${DASHBOARD_ATTENDANCE_CLOCKOUT}/${id}`, params);
    }
  };
  // get attendance average
  const getAttendanceAverage = async () => {
    await api.get(DASHBOARD_ATTENDANCE_AVERAGE).then((res: any) => {
      setAttendenceAverage(res);
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
  // ================XXXX=========== Intern Dashboard functions =================XXXXX=========== //

  // ============================== property agent Dashboard functions ================================== //
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
      setAgentReservation(res?.data?.map((obj: any) => ({
        key: obj?.id,
        name: `${obj?.tenant?.firstName} ${obj?.tenant?.lastName}`,
        bookingDates: `${dayjs(obj?.bookingStartDate).format('DD/MM/YYYY')} - ${dayjs(obj?.bookingEndDate).format('DD/MM/YYYY')}`,
        rent: `£${obj?.rent}`,
      })));
    });
    setIsLoading(false);
  };
  // =============XXXX============= property agent Dashboard functions ==============XXXX================ //

  // ============================== company admin Dashboard functions ================================== //
  // internships api data modification for Internships Summary and pipline table
  const getInternShipList = async (departmentId?: any) => {
    // setIsLoading(true)
    await api.get(GET_LIST_INTERNSHIP, departmentId && { departmentId: departmentId }).then((res: any) => {
      // pipline table
      setInternshipsList(res?.data?.map(({ id, title, interns }: any) => (
        {
          key: id,
          internships: { designation: title, candidates: interns?.length ?? 0 },
          applied: interns?.filter((item: any) => (item?.stage === "applied")).length ?? 0,
          interviewed: interns?.filter((item: any) => (item?.stage === "interviewed")).length ?? 0,
          recommended: interns?.filter((item: any) => (item?.stage === "recommended")).length ?? 0,
          offerLetter: interns?.filter((item: any) => (item?.stage === "offerLetter")).length ?? 0,
          contract: interns?.filter((item: any) => (item?.stage === "contract")).length ?? 0,
          hired: interns?.filter((item: any) => (item?.stage === "hired")).length ?? 0,
          rejected: interns?.filter((item: any) => (item?.stage === "rejected")).length ?? 0,
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
  // get company counting card data
  const getCompanyWidgets = async () => {
    api.get(COMPANY_DASHBOARD_WIDGETS).then(({ data }: any) => setCompanyWidgets(data));
  };
  // =============XXXX============= company admin Dashboard functions ==============XXXX================ //

  // ============================== company manager Dashboard functions ================================== //
  // get manager counting card data
  const getManagerWidgets = async () => {
    api.get(MANAGER_DASHBOARD_WIDGETS).then(({ data }: any) => setManagerWidgets(data));
  };
  // =============XXXX============= company manager Dashboard functions ==============XXXX================ //

  // ============================== university Dashboard functions ================================== //
  // university dashboard
  const getUniversityDashboardWidget = async () => {
    await api.get(UNIVERSITY_DASHBOARD_WIDGETS).then((res: any) => {
      setUniversityWidgets(res)
    })
  }
  // getting all companies data
  const getAllCompaniesData = async () => {
    setIsLoading(true);
    const params = { userUniversityId: currentUser?.userUniversity?.id };
    const { data } = await api.get(GET_ALL_COMAPANIES, params);
    const companyData = data?.map((obj: any) => ({
      companyId: obj?.id,
      logo: getUserAvatar({ profileImage: obj?.logo }),
      title: obj?.businessName,
      agency: obj?.businessSector,
      peopleList: obj?.interns?.map((item: any) => ({
        internProfile: getUserAvatar({ profileImage: item?.userDetail?.profileImage }),
        firstName: item?.userDetail?.firstName,
        lastName: item?.userDetail?.lastName,
      })),
    }));
    setUniversityCompanies(companyData);
    setIsLoading(false);
    return companyData;
  };
  // =============XXXX============= university Dashboard functions ==============XXXX================ //

  // ============================== student Dashboard functions ================================== //
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
  // =============XXXX============= student Dashboard functions ==============XXXX================ //

  return {
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
    wishBirthdayToUser,
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
    // student
    verifcationStudentData,
    getStudentProfile,
    getStudentWidget,
    getStudentJob,
  };
};

export default useCustomHook;
