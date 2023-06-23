import { atom } from 'recoil';

// get interns attendance stat
export const internsAttendanceStat = atom({
  key: 'internsAttendanceStat',
  default: [],
});

export const todayAttendanceList = atom({
  key: 'todayAttendanceList',
  default: [],
});

export const depAttendanceList = atom({
  key: 'depAttendanceList',
  default: [],
});

// add clockin
export const internsClockInData = atom({
  key: 'internsClockInData',
  default: {},
});

// add clockOut
export const internsClockOutData = atom({
  key: 'internsClockOutData',
  default: {},
});

// today's mood data
export const todayMoodData = atom({
  key: 'todayMoodData',
  default: {},
});

// Get attendance average data
export const attAverageData = atom({
  key: 'attAverageData',
  default: {},
});

// Get intern attendance detail data
export const internAttDetailData = atom({
  key: 'internAttDetailData',
  default: {
    attendanceRecord: [],
    averageClocking: {
      actualWorkingDays: 0,
      averageClockIn: 'N/A',
      averageClockOut: 'N/A',
      averageHours: 0,
      totalWorkingDays: 0,
    },
    internDetails: {},
  },
});

export const filterDataAtt = atom({
  key: 'filterDataAtt',
  default: {},
});

export const employeeAttData = atom({
  key: 'employeeAttData',
  default: [],
});
