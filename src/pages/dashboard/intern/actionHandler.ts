import { useState } from "react";
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import {
  attendenceAverageState,
  attendenceClockinState,
  feelingTodayMoodState,
  internWorkingStatsState,
} from "../../../store";
import dayjs from "dayjs";
import { Notifications } from "../../../components";
const {
  DASHBOARD_ATTENDANCE_MOOD,
  DASHBOARD_ATTENDANCE_CLOCKIN,
  DASHBOARD_ATTENDANCE_CLOCKOUT,
  GET_ATTENDANCE_LIST,
  INTERN_WORKING_STATS,
  GET_INTERN_TODAY_INTERN_ATTENDANCE,
} = endpoints;

const useCustomHook = () => {
  // ============================== Intern Dashboard states ================================== //
  const [internLoaders, setInternLoaders] = useState({
    isaFeelingTodayMoodLoading: false,
    isAttendenceClockinLoading: false,
    isAttendenceAverageLoading: false,
    isInternWorkingStatsLoading: false
  });
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
  // INTERN working stats state
  const [internWorkingStats, setinternWorkingStats] = useRecoilState<any>(
    internWorkingStatsState
  );
  // =============XXXX============ Intern Dashboard states ================XXXX============== //
  // ============================== Intern Dashboard functions ================================== //
  // dashboard FEELING TODAY MOOD
  const addFeelingTodayMood = async (mood: string) => {
    if (mood) {
      let params = {
        trackDate: dayjs(new Date()).format("YYYY-MM-DD"),
        mood: mood.toUpperCase(),
      };
      await api.post(DASHBOARD_ATTENDANCE_MOOD, params).then((res) => {
        if (res?.statusCode === 404) {
          return Notifications({ title: "No Attendance", description: res?.message, type: "error" })
        }
        setFeelingTodayMood(res?.data);
      });
    }
  };
  // get intern today attendance
  const getInternTodayAttendance = async (isLoad?: boolean) => {
    isLoad && setInternLoaders(prev => ({ ...prev, isaFeelingTodayMoodLoading: true, isAttendenceClockinLoading: true }))
    await api.get(GET_INTERN_TODAY_INTERN_ATTENDANCE).then((res) => {
      if (res?.data) {
        setFeelingTodayMood(res?.data);
        setAttendenceClockin({
          ...res?.data?.clocking[res?.data?.clocking?.length - 1],
          clockIn: res?.data?.clocking[0]?.clockIn,
          recentClockIn: res?.data?.clocking[res?.data?.clocking?.length - 1]?.clockIn,
          clockOut:
            res?.data?.clocking[res?.data?.clocking?.length - 1]?.clockOut,
          totalHoursToday: res?.data?.totalHoursToday,
          totalMinutesToday: res?.data?.totalMinutesToday,
          totalSecondsToday: res?.data?.totalSecondsToday,
        });
      }
    });
    isLoad && setInternLoaders(prev => ({ ...prev, isaFeelingTodayMoodLoading: false, isAttendenceClockinLoading: false }))
  };
  // handle attendance clockin
  const handleAttendenceClockin = async (clockIn: string) => {
    if (clockIn) {
      let params = {
        trackDate: dayjs(new Date()).format("YYYY-MM-DD"),
        clockIn,
      };
      await api.post(DASHBOARD_ATTENDANCE_CLOCKIN, params).then((res) => {
        localStorage.setItem("clockin", JSON.stringify(res?.data));
        getInternTodayAttendance();
      });
    }
  };
  // handle attendance clockin
  const handleAttendenceClockout = async (clockout: string, id: string) => {
    if (clockout) {
      let params = {
        trackDate: dayjs(new Date()).format("YYYY-MM-DD"),
        clockOut: clockout,
      };
      await api
        .post(`${DASHBOARD_ATTENDANCE_CLOCKOUT}/${id}`, params)
        .then(() => {
          localStorage.removeItem("clockin");
        });
    }
  };
  // get attendance average
  const getAttendanceAverage = async () => {
    const attendanceListParams = {
      currentDate: dayjs(new Date()).format("YYYY-MM-DD"),
      filterType: "THIS_MONTH",
    };
    setInternLoaders(prev => ({ ...prev, isAttendenceAverageLoading: true }))
    await api
      .get(GET_ATTENDANCE_LIST, attendanceListParams)
      .then((res: any) => {
        setAttendenceAverage(res?.data?.averageClocking);
      });
    setInternLoaders(prev => ({ ...prev, isAttendenceAverageLoading: false }))
  };
  // get INTERN working stats
  const getInternWorkingStats = async () => {
    setInternLoaders(prev => ({ ...prev, isInternWorkingStatsLoading: true }))
    await api.get(INTERN_WORKING_STATS).then((res: any) => {
      setinternWorkingStats(
        res?.data?.map((obj: any) => ({
          days: dayjs(obj?.trackDate).format("ddd"),
          value: obj?.totalHours,
          type: obj?.status,
        }))
      );
    });
    setInternLoaders(prev => ({ ...prev, isInternWorkingStatsLoading: false }))
  };
  // ================XXXX=========== Intern Dashboard functions =================XXXXX=========== //
  return {
    internLoaders,
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
    // INTERN working stats state
    internWorkingStats,
    getInternWorkingStats,
  };
};

export default useCustomHook;
