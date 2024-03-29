/// <reference path="../../../jspdf.d.ts" />
import { useRecoilState, useRecoilValue } from "recoil";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import api from "../../api";
import csv from "../../helpers/csv";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import {
  currentUserState,
  geCalanderLeaveStateAtom,
  holidayListStateAtom,
  leaveStateAtom,
  viewHistoryLeaveStateAtom,
  filterState,
  pendingLeaveState,
  leaveDetailState,
  leaveTypesState,
  managerResourceState,
  managerEventState,
  currentUserRoleState,
} from "../../store";
import constants from "../../config/constants";

/* Custom Hook For Functionalty 
 -------------------------------------------------------------------------------------*/

const useCustomHook = () => {
  const cruntUserState = useRecoilValue(currentUserState);
  const role = useRecoilValue(currentUserRoleState);
  const [leaveStats, setLeaveStats] = useRecoilState(leaveStateAtom);
  const [pendingLeaves, setPendingLeaves] = useRecoilState(pendingLeaveState);
  const [filter, setfilter] = useRecoilState(filterState);
  const [leaveHistory, setLeaveHistory]: any = useRecoilState(viewHistoryLeaveStateAtom);
  const [getCalanderLeaveState, setCalanderLeaevState] = useRecoilState(geCalanderLeaveStateAtom);
  const [upcomingHolidays, setUpcomingHolidays] = useRecoilState(holidayListStateAtom ?? []);
  const [leaveDetail, setleaveDetail] = useRecoilState<any>(leaveDetailState);
  const [leaveTypes, setLeaveTypes] = useRecoilState(leaveTypesState);
  const [managerResource, setManagerResource] = useRecoilState(managerResourceState);
  const [managerEvents, setManagerEvents] = useRecoilState(managerEventState);
  const utcOffsetInMinutes = new Date().getTimezoneOffset();
  const startOfMonth = dayjs().locale("en").startOf("month").format("YYYY-MM-DD");
  const endOfMonth = dayjs().locale("en").endOf("month").format("YYYY-MM-DD");
  let body = [];

  const formate = (value: any, format: string) => dayjs(value).format(format);

  const {
    CALANDER_LEAEV_LIST,
    DELETE_LEAVE,
    CREATE_LEAVE,
    HOLIDAY_LIST,
    LEAVE_STATE,
    GET_LEAVE_LIST,
    PENDING_LEAVES,
    UPDATE_LEAVE_STATUS,
    LEAVE_DETAIL,
    GET_LEAVE_POLICY,
    LEAVE_WHO_AWAY,
    IP_API,
  } = endpoints;

  /*  View History Leave List Functionalty 
-------------------------------------------------------------------------------------*/
  const getPendingLeaves = async () => {
    const { data }: any = await api.get(PENDING_LEAVES);
    setPendingLeaves(data);
  };

  /*  View History Leave List Functionalty 
-------------------------------------------------------------------------------------*/
  const getLeaveHistoryList = async (args: any = {}, tableParams: any, setTableParams: any, setLoading: any = () => { }) => {
    setLoading(true);

    await api.get(GET_LEAVE_LIST, args).then((res: any) => {
      const { pagination } = res;

      setLeaveHistory(res);
      setTableParams((pre: any) => ({
        ...pre,
        pagination: {
          ...pre.pagination,
          total: pagination?.totalResult,
        },
      }));

    });

    setLoading(false);
  }

  /* To Get Data For Leave Status Cards 
   -------------------------------------------------------------------------------------*/
  const getLeaveStats = async (startDate: string = startOfMonth, endDate: string = endOfMonth) => {
    const params = { startDate: startDate, endDate: endDate };
    const { data } = await api.get(LEAVE_STATE, params);
    setLeaveStats(data);
  };

  /* Get Data For Leave Calander 
   -------------------------------------------------------------------------------------*/
  const getCalendarLeaveList = async (data: any = {}) => {
    const param = { startDate: data?.startOfMonth, endDate: data?.endOfMonth };
    const response: any = await api.get(CALANDER_LEAEV_LIST, param);
    setCalanderLeaevState(response?.data);
  };

  /* Get all leave types
 -------------------------------------------------------------------------------------*/
  const getLeaveTypes = async () => {
    const params = { page: 1, limit: 500 };
    const { data }: any = await api.get(GET_LEAVE_POLICY, params);

    setLeaveTypes(data);
  };

  /* Approve or Decline pending leaves request
   -------------------------------------------------------------------------------------*/
  const approveDeclineLeaveRequest = async (params: any = {}) => {
    let headerConfig = { headers: { "Content-Type": "multipart/form-data" } };
    const response: any = await api.patch(UPDATE_LEAVE_STATUS, params, headerConfig);

    if (response?.message === "Success") Notifications({ title: response?.message, description: "Action done", type: "success" });
    else Notifications({ title: response?.message, description: "Something went wrong. Please try again", type: "error" });
  };

  /* Get a leave details by its id
   -------------------------------------------------------------------------------------*/
  const getLeaveDetailById = async (id: number, onSuccess?: () => void) => {
    const { data }: any = await api.get(`${LEAVE_DETAIL}/${id}`);

    setleaveDetail(data);
    if (onSuccess) onSuccess();
    return data;
  };

  const onsubmitLeaveRequest = async (values: any, setIsAddModalOpen: any, onSuccess?: () => void) => {
    const formData = new FormData();
    let headerConfig = { headers: { "Content-Type": "multipart/form-data" } };
    formData.append("leavePolicyId", values.type);
    formData.append("durationType", values?.durationType);
    formData.append("dateFrom", formate(values?.dateFrom, "YYYY-MM-DD"));
    formData.append("dateTo", formate(values?.dateTo, "YYYY-MM-DD"));
    formData.append("duration", values?.duration);
    if (values?.timeFrom && values?.timeFrom) {
      let timeFrom = `${formate(values?.dateFrom, "YYYY-MM-DD")}T${values?.timeFrom.split('T')[1]}`;
      let timeTo = `${formate(values?.dateFrom, "YYYY-MM-DD")}T${values?.timeTo.split('T')[1]}`;
      formData.append("timeFrom", timeFrom);
      formData.append("timeTo", timeTo);
    }
    formData.append("reason", values?.reason);

    if (values?.media) {
      values?.media?.fileList.forEach((file: any) => {
        formData.append("media", file.originFileObj);
      });
    }
    if (values?.id) {
      // initailVal["leaveId"] = values?.id;
      formData.append("leaveId", values?.id);
    }
    if (!values?.edit) {
      const response: any = await api.post(CREATE_LEAVE, formData, headerConfig);

      if (response) {
        Notifications({ title: "Success", description: "Request for leave has been submitted", type: "success" });
        getLeaveStats();
        setIsAddModalOpen(false);
        if (onSuccess) onSuccess();
      }
    } else {
      const response: any = await api.patch(UPDATE_LEAVE_STATUS, formData, headerConfig);

      if (response) {
        Notifications({ title: "Success", description: "Update request for leave has been submitted", type: "success" });
        setIsAddModalOpen(false);
        if (onSuccess) onSuccess();
      }
    }
  };

  /*  Holiday Leave List
-------------------------------------------------------------------------------------*/
  const getUpcomingHolidaysList = async (setLoading: any) => {
    const { country }: any = await api.get(IP_API);
    const { data }: any = await api.get(HOLIDAY_LIST, { countryCode: country }) || [];
    setUpcomingHolidays(data);
    setLoading((prev: any) => ({
      ...prev,
      loading: false,
    }));
  };

  /*  Delete a Leave Request
-------------------------------------------------------------------------------------*/
  const deleteLeave = (leaveId: string, onSuccess?: () => void) => {
    api.delete(`${DELETE_LEAVE}/${leaveId}`).then((result) => {
      Notifications({ title: "Success", description: "Request for leave has been cancelled", type: "success" });
      if (onSuccess) onSuccess();
      return result;
    });
  };

  /*  Download PDF Or CSV File of History Table 
-------------------------------------------------------------------------------------*/

  const downloadPdfOrCsv = async (event: any, header: any, data: any, fileName: any) => {
    const type = event?.target?.innerText;
    let args = removeEmptyValues(filter);

    delete args["limit"];

    await api.get(GET_LEAVE_LIST, args).then((res: any) => {
      const { data } = res;

      // Body for INTERN
      if (role === constants.INTERN) {
        body = data.map(({ key, createdAt, dateFrom, dateTo, type, reason, status }: any, index: number) => {
          return [
            index + 1,
            formate(createdAt, "DD/MM/YYYY"),
            formate(dateFrom, "DD/MM/YYYY"),
            dayjs.utc(dateTo).utcOffset(utcOffsetInMinutes).format("DD/MM/YYYY"),
            type,
            reason,
            status,
          ]
        });
      } else {
        // Body for COMPANY_ADMIN & Manager
        body = data.map(({ key, intern, createdAt, dateFrom, dateTo, timeFrom, timeTo, type, duration, durationType, status }: any, index: number) => {
          let finalDuration;
          const { userDetail: { firstName, lastName } } = intern;

          if (durationType === "HALF_DAY") {
            const leaveFrom = dayjs(timeFrom);
            const leaveTo = dayjs(timeTo);

            finalDuration = leaveTo.diff(leaveFrom, "hours");
            finalDuration = `${finalDuration} hour${finalDuration > 1 ? 's' : ''}`;
          } else {
            finalDuration = `${duration} day${duration != 1 ? "s" : ""}`;
          }

          return [
            index + 1,
            `${firstName} ${lastName}`,
            formate(createdAt, "DD/MM/YYYY"),
            formate(dateFrom, "DD/MM/YYYY"),
            dayjs.utc(dateTo).utcOffset(utcOffsetInMinutes).format("DD/MM/YYYY"),
            type,
            finalDuration,
            status,
          ]
        });
      }

      if (type === "pdf" || type === "Pdf") pdf(`${fileName}`, header, body);
      else csv(`${fileName}`, header, body, true);
    });
  };

  // Make pdf
  const pdf = (fileName: string, header: any, data: any) => {
    const unit = "pt";
    const size = "A4";
    const marginLeft = 40;
    const title = fileName;
    const orientation = "landscape";
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);

    doc.autoTable({
      head: [header],
      body: data,
      margin: { top: 50 },

      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: "normal",
        fontSize: 12,
      },

      didParseCell: async (item: any) => {
        if (item.row.section === "head") item.cell.styles.fillColor = [230, 244, 249];
        else item.cell.styles.fillColor = false;
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  const handleCalendarData = async (payload: any = {}) => {
    const { data }: any = await api.get(LEAVE_WHO_AWAY, payload);
    const calendarData: any = [];
    const resources = data?.map((user: any, index: any) => {
      const leaves = user?.leaves?.map((leave: any) => ({
        id: leave?.id,
        resourceIds: [String(index + 1)],
        title: leave?.type,
        eventType: leave?.type?.toLowerCase(),
        start: leave?.dateFrom,
        end: leave?.dateTo,
        timeFrom: leave?.timeFrom,
        timeTo: leave?.timeTo,
        leaveTypeDay: leave?.durationType === "FULL_DAY" ? "full day" : "half day",
        dur: `${leave?.duration} day${leave?.duration != 1 ? "s" : ""}`,
        hours: dayjs.duration(dayjs(leave?.timeTo).diff(dayjs(leave?.timeFrom))).format("HH:mm"),
        img: user?.profileImage ? `${constants.MEDIA_URL}/${user?.profileImage?.mediaId}.${user?.profileImage?.metaData?.extension}` : null,
        name: user?.name,
        designation: "Senior React web dev",
        email: user?.email,
        aprover: "Amelia Clark",
        ApprovedBy: "Amelia Clark",
        status: leave?.status,
        description: leave?.description,
      }));
      calendarData.push(...leaves);
      return {
        id: String(index + 1),
        title: user?.name,
        img: user?.profileImage ? `${constants.MEDIA_URL}/${user?.profileImage?.mediaId}.${user?.profileImage?.metaData?.extension}` : null,
        designation: user?.designation || "React Web Dev",
      };
    });
    setManagerResource(resources);
    setManagerEvents(calendarData);
  };

  const calculateTimeDifference = () => {
    let difference;

    if (leaveDetail.durationType === "HALF_DAY") {
      let hours, mints;
      const hoursFrom = dayjs(leaveDetail.timeFrom);
      const hoursTo = dayjs(leaveDetail.timeTo);

      const minutesFrom = hoursFrom.minute();
      const minutesTo = hoursTo.minute();

      hours = String(hoursTo.diff(hoursFrom, "hours")).padStart(2, '0');
      mints = minutesTo - minutesFrom;

      mints = mints > 1 ? `${String(mints).padStart(2, '0')} mints` : `${String(mints).padStart(2, '0')} mint`;
      difference = Number(hours) > 1 ? `${hours} hours ${mints}` : `${hours} hour ${mints}`;
    } else {
      difference = leaveDetail.duration > 1 ? `${leaveDetail.duration} days` : `${leaveDetail.duration} day`;
    }

    return difference;
  };

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== "" && value !== "Select"));
  };

  return {
    formate,
    leaveStats,
    getCalanderLeaveState,
    upcomingHolidays,
    pendingLeaves,
    leaveHistory,
    getCalendarLeaveList,
    onsubmitLeaveRequest,
    downloadPdfOrCsv,
    getLeaveStats,
    getUpcomingHolidaysList,
    getPendingLeaves,
    approveDeclineLeaveRequest,
    getLeaveHistoryList,
    leaveDetail,
    getLeaveDetailById,
    getLeaveTypes,
    deleteLeave,
    handleCalendarData,
    managerEvents,
    managerResource,
    calculateTimeDifference,
  };
};

export default useCustomHook;
