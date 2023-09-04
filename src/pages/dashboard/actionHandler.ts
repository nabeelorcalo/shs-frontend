import { useState } from "react";
import api from "../../api";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  attendanceState,
  studentProfileCompletionState,
  currentUserState,
  dashboardLeavesCountState,
  performanceGraphAnalyticsState,
  topPerformersListState,
  universityWidgetsState,
  usersBirthdaysListState,
  departmentListState,
  announcementDataState,
} from "../../store";
import {
  dashboardWidgetState,
  recentJobState,
} from "../../store/dashboard/student";
import constants from "../../config/constants";
import dayjs from "dayjs";
import { Notifications } from "../../components";
import { getUserAvatar } from "../../helpers";
const {
  GET_PERFORMANCE_LIST,
  ATTENDANCE_OVERVIEW,
  TODAY_USERS_BIRTH_DAYS_LIST,
  PERFORMANCE_GRAPH_ANALYTICS,
  DASHBOARD_LEAVES_COUNT,
  MANAGER_COMPANY_UNIVERSITIES,
  DEPARTMENT,
  VERIIFCATION_STUDENT,
  STUDENT_PROFILE_COMPLETION,
  STUDENT_DASHBOARD_WIDGET,
  STUDENT_RECENT_JOB,
  ANNOUNCEMENT_FINDALL,
  POST_NEW_ANNOUNCEMENT,
  CREATE_NOTIFICATION,
} = endpoints;

const useCustomHook = () => {
  // ============================== common states ================================== //
  //logged in user DATA
  const currentUser = useRecoilValue(currentUserState);

  const [isAnnounceShowModal, setIsAnnounceShowModal] = useState<boolean>(false);

  const [commonLoaders, setCommonLoaders] = useState({
    isWidgetsLoading: false,
    isAnnouncementLoading: false,
    isAddAnnouncementLoading: false,
    isPerformanceLoading: false,
    isopPerformersLoading: false,
    isAttendanceLoading: false,
    isAwayLoading: false,
    isUniversitiesLoading: false,
    isBirthdayLoading: false,
  });
  // dashboard leaves count
  const [dashboardLeavesCount, setDashBoardLeavesCount] = useRecoilState<any>(
    dashboardLeavesCountState
  );

  // birthday list
  const [usersBirthdaysList, setUsersBirthdaysList] = useRecoilState<any>(
    usersBirthdaysListState
  );
  //top performers list
  const [topPerformerList, setTopPerformersList] = useRecoilState<any>(
    topPerformersListState
  );
  // manager and companies university list
  const [managerCompanyUniversitiesList, setManagerCompanyUniversitiesList] =
    useRecoilState<any>(universityWidgetsState);
  // attendance graph
  const [attendance, setAttendance] = useRecoilState<any>(attendanceState);
  // department list for pipline table filter
  const [departmentList, setDepartmentList] =
    useRecoilState<any>(departmentListState);
  // performance graph analytics
  const [performanceGraphAnalytics, setperformanceGraphAnalytics] =
    useRecoilState<any>(performanceGraphAnalyticsState);
  // ANNOUNCEMENT
  const [announcementData, setAnnouncementDataData] = useRecoilState(
    announcementDataState
  );
  // ===============XXXX=========== common states ==============XXXX================ //

  // ============================== student Dashboard states ================================== //
  const [studentWidget, setStudentWidget] = useRecoilState(dashboardWidgetState);
  const [getProfile, setGetProfile] = useRecoilState(studentProfileCompletionState);
  const [getjOB, setGetJob] = useRecoilState(recentJobState);
  // ================XXXX========= student Dashboard states ==============XXXX================ //

  // ============================== common functions ================================== //
  // get users birthdays list
  const getUsersBirthdaysList = async () => {
    setCommonLoaders((prev) => ({ ...prev, isBirthdayLoading: true }));
    await api.get(TODAY_USERS_BIRTH_DAYS_LIST).then((res: any) => {
      setUsersBirthdaysList(
        res?.data?.map(({ userDetail, isWished }: any) => ({
          avatar: getUserAvatar({ profileImage: userDetail?.profileImage }),
          date: dayjs(userDetail?.DOB).format("DD MMMM"),
          id: userDetail?.id,
          name: `${userDetail?.firstName} ${userDetail?.lastName}`,
          isWished,
        })) ?? []
      );
    });
    setCommonLoaders((prev) => ({ ...prev, isBirthdayLoading: false }));
  };
  // WISH birthday
  const wishBirthdayToUser = async (body: any) => {
    await api.post(CREATE_NOTIFICATION, body);
  };
  // get dashboard leaves count
  const getDashboardLeavesCount = async () => {
    setCommonLoaders((prev) => ({ ...prev, isAwayLoading: true }));
    await api.get(DASHBOARD_LEAVES_COUNT).then((res: any) => {
      const handleModification = (leavesData: any) => {
        // check param type
        const isArray = typeof leavesData === "object";
        // return data on the base of type
        return isArray
          ? leavesData.map((obj: any) => {
            if (obj?.intern) {
              const { intern: { userDetail: { firstName = "", lastName = "", profileImage } } }: any = obj;
              return {
                firstName: firstName,
                lastName: lastName,
                internImage: getUserAvatar({ profileImage }),
              };
            }
          })
          : leavesData;
      };
      setDashBoardLeavesCount({
        casual: handleModification(res?.data?.casual) ?? 0,
        medical: handleModification(res?.data?.medical) ?? 0,
        sick: handleModification(res?.data?.sick) ?? 0,
        wfh: handleModification(res?.data?.wfh) ?? 0,
      });
    });
    setCommonLoaders((prev) => ({ ...prev, isAwayLoading: false }));
  };
  // get announcement data
  const getAnnouncementData = async () => {
    setCommonLoaders((prev) => ({ ...prev, isAnnouncementLoading: true }));
    const res = await api.get(ANNOUNCEMENT_FINDALL);
    setAnnouncementDataData(res?.data);
    setCommonLoaders((prev) => ({ ...prev, isAnnouncementLoading: false }));
  };
  // Post announcement data
  const addNewAnnouncement = async (description: string) => {
    setCommonLoaders((prev) => ({ ...prev, isAddAnnouncementLoading: true }));
    const res = await api.post(POST_NEW_ANNOUNCEMENT, { description });
    if (res) {
      await getAnnouncementData();
      Notifications({
        title: "Success",
        description: "Announcement added successfully",
        type: "success",
      });
      setIsAnnounceShowModal(false)
    }
    setCommonLoaders((prev) => ({ ...prev, isAddAnnouncementLoading: false }));
  };
  // get Attendance graph data
  const getAttendance = async () => {
    setCommonLoaders((prev) => ({ ...prev, isAttendanceLoading: true }));
    await api.get(ATTENDANCE_OVERVIEW).then((res: any) => {
      setAttendance(res?.attendanceOver ?? []);
    });
    setCommonLoaders((prev) => ({ ...prev, isAttendanceLoading: false }));
  };
  // get top performers list
  const getTopPerformerList = async (query?: any) => {
    setCommonLoaders((prev) => ({ ...prev, isopPerformersLoading: true }));
    const date = new Date();
    let params: any = {
      limit: query?.limit ?? 3,
      sortByPerformance: true,
    };
    query?.limit === 0 && delete params.limit;
    params.filterType = "DATE_RANGE";
    params.startDate = dayjs(
      new Date(date.getFullYear(), query?.month ?? date.getMonth(), 1)
    ).format("YYYY-MM-DD");
    params.endDate = dayjs(
      new Date(date.getFullYear(), (query?.month ?? date.getMonth()) + 1, 0)
    ).format("YYYY-MM-DD");
    await api
      .get(
        GET_PERFORMANCE_LIST,
        currentUser?.role === constants.UNIVERSITY
          ? { ...params, userUniversityId: currentUser?.userUniversity?.id, page: 1 }
          : { ...params, page: 1 }
      )
      .then((res) => {
        setTopPerformersList(
          res?.data?.map((obj: any) => ({
            image: getUserAvatar({ profileImage: obj?.userImage }),
            name: obj?.userName,
            designation: obj?.department,
            progress: `${Math.round(obj?.sumOverallRating)}%`,
          }))
        );
      });
    setCommonLoaders((prev) => ({ ...prev, isopPerformersLoading: false }));
  };
  // get users get Performance Graph Analytics list
  const getPerformanceGraphAnalytics = async () => {
    setCommonLoaders((prev) => ({ ...prev, isPerformanceLoading: true }));
    await api
      .get(
        PERFORMANCE_GRAPH_ANALYTICS,
        currentUser?.role === constants.UNIVERSITY && {
          userUniversityId: currentUser?.userUniversity?.id,
        }
      )
      .then((res: any) => {
        setperformanceGraphAnalytics(res?.data ?? []);
      });
    setCommonLoaders((prev) => ({ ...prev, isPerformanceLoading: false }));
  };
  // get universities list for company admin and company manager
  const getManagerCompanyUniversitiesList = async () => {
    setCommonLoaders((prev) => ({ ...prev, isUniversitiesLoading: true }));
    let params: any = {
      page: 1,
      limit: 3,
    };
    await api.get(MANAGER_COMPANY_UNIVERSITIES, params).then((res: any) => {
      setManagerCompanyUniversitiesList(
        res?.data?.map((obj: any) => ({
          logo: obj?.university?.logoId,
          title: obj?.university?.name,
          internList: obj?.intern?.map((interItem: any) => ({
            firstName: interItem?.userDetail?.firstName,
            lastName: interItem?.userDetail?.lastName,
            internImage: getUserAvatar({
              profileImage: interItem?.userDetail?.profileImage,
            }),
          })),
        }))
      );
    });
    setCommonLoaders((prev) => ({ ...prev, isUniversitiesLoading: false }));
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

  // ============================== student Dashboard functions ================================== //
  const verifcationStudentData: any = async (
    body: any,
    query: {
      skip: boolean;
      step: number;
    }
  ): Promise<any> => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
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
    commonLoaders,
    currentUser,
    // top performer list
    topPerformerList,
    getTopPerformerList,
    getManagerCompanyUniversitiesList,
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
    managerCompanyUniversitiesList,
    getDepartmentList,
    departmentList,
    // announcement
    isAnnounceShowModal,
    setIsAnnounceShowModal,
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
