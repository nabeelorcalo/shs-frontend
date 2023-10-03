import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from '../../api';
import apiEndpints from '../../config/apiEndpoints';
import csv from '../../helpers/csv';

import {
  internsAttendanceStat,
  internsClockInData,
  internsClockOutData,
  todayMoodData,
  attAverageData,
  internAttDetailData,
  employeeAttData,
  currentUserState,
  todayAttendanceList,
  depAttendanceList,
} from '../../store';
import constants from '../../config/constants';
import { useRecoilState, useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import _, { debounce } from 'lodash';
import { useState } from 'react';

const useCustomHook = () => {
  const [internAttStat, setInternAttStat] = useRecoilState(
    internsAttendanceStat
  );

  const [clockIndata, setClockInData] = useRecoilState(internsClockInData);
  const [clockOutdata, setClockOutData] = useRecoilState(internsClockOutData);
  const [todayAttList, setTodayAttList] = useRecoilState(todayAttendanceList);
  const [depAttList, setDepAttList] = useRecoilState(depAttendanceList);

  const [mood, setMood] = useRecoilState(todayMoodData);
  const [averageData, setAverageData] = useRecoilState(attAverageData);
  const [internDetailData, setInternDetailData] =
    useRecoilState(internAttDetailData);
  const currentUser = useRecoilValue(currentUserState);
  // const filter = useRecoilValue(filterDataAtt);
  const [employeeAtt, setemployeeAtt] = useRecoilState(employeeAttData);
  // departments list
  const [departmentList, setDepartmentList] = useState<any>([]);
  const { INTERN, DEPARTMENT } = apiEndpints;

  const getInternAttStat = async (): Promise<any> => {
    const internStats = await api.get(INTERN.GET_ATTENDANCE_STATS);
    setInternAttStat(internStats);
  };

  const getTodayAttList = async (): Promise<any> => {
    const attList = await api.get(INTERN.GET_ATTENDANCE_TODAY);
    setTodayAttList(attList);
  };

  function getMonthFromString(mon: string) {
    const d = Date.parse(mon + '1, 2023');
    if (!isNaN(d)) {
      return new Date(d).getMonth();
    }
    return -1;
  }

  const getDepAttendance = async (month: string): Promise<any> => {
    const query = {
      currentDate: dayjs()
        .month(getMonthFromString(month))
        .toISOString()
        .split('T')[0],
      filterType: 'THIS_MONTH',
    };
    const depattList = await api.get(INTERN.GET_ATTENDANCE_DEP, query);
    const convertedArray: any = [];
    depattList.forEach((item: any) => {
      const department = item?.department;
      const totalPresent = item?.totalPresent;
      const totalAbsent = item?.totalAbsent;
      const totalOnLeave = item?.totalOnLeave;

      convertedArray.push({
        city: department,
        type: 'Present',
        value: totalPresent,
      });

      convertedArray.push({
        city: department,
        type: 'Absent',
        value: totalAbsent,
      });

      convertedArray.push({
        city: department,
        type: 'Leave',
        value: totalOnLeave,
      });
    });
    setDepAttList(convertedArray);
  };

  const checkIn = async (clock: { trackDate: string; clockIn: string }) => {
    const { data } = await api.post(INTERN.ADD_ATTENDANCE_CLOCKIN, clock);
    if (!data) return;
    setClockInData(data);
  };

  const checkOut = async (
    id: any,
    clock: { trackDate: string; clockOut: string }
  ) => {
    const { data } = await api.post(
      `${INTERN.ADD_ATTENDANCE_CLOCKOUT}/${id}`,
      clock
    );
    setClockOutData(data);
  };

  const attendanceMood = async (clock: { trackDate: string; mood: string }) => {
    const attMood = await api.post(INTERN.ADD_ATTENDANCE_MOOD, clock);
    if (!attMood.data) console.log('Attendace not found');
    setMood(attMood.data);
  };

  const internAverage = async () => {
    const averageData = await api.get(INTERN.GET_ATTENDANCE_AVERAGE);
    if (!averageData) console.log('Attendace not found');
    setAverageData(averageData);
  };

  const getAttAllEmplyoees = async (val?: string, filter: any = {}) => {
    const hasValue = { search: val } ?? {};
    if (currentUser.role === constants.UNIVERSITY) {
      filter.universityId = currentUser?.userUniversity?.universityId;
    }
    if (
      currentUser.role === constants.MANAGER ||
      currentUser.role === constants.COMPANY_ADMIN
    ) {
      filter.companyId = currentUser?.company?.id;
    }
    const data = await api.get(INTERN.GET_ATTENDANCE_EMPLOYEES, {
      ...filter,
      ...hasValue,
    });
    if (data) setemployeeAtt(data);
  };

  // get department list
  const getDepartmentList = async () => {
    const depData = await api
      .get(DEPARTMENT, { page: 1, limit: 1000 })
      .then(({ data }) => {
        return data?.map(({ id, name }: any, i: any) => ({
          key: i + 1,
          value: id,
          label: name,
        }));
      });
    setDepartmentList(depData);
    return depData;
  };

  //Search User
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  const internAttDetail = async (filterType?: string, id?: number) => {
    const timeFrameOptions = [
      'This Week',
      'Last Week',
      'This Month',
      'Last Month',
    ];
    const details: any = {
      internId: id,
      currentDate: dayjs().toISOString(),
      filterType: filterType?.split(' ').join('_').toUpperCase() || 'THIS_WEEK',
    };

    if (filterType && !timeFrameOptions.includes(filterType)) {
      const [startDateStr, endDateStr] = filterType.split(',').map(str => str.trim());
      const startDate = new Date(dayjs(startDateStr).toISOString());
      const endDate = new Date(dayjs(endDateStr).toISOString());

      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 1);

      details.filterType = 'DATE_RANGE';
      details.startDate = startDate.toISOString();
      details.endDate = endDate.toISOString();
    }

    const { data } = await api.get(
      INTERN.GET_ATTENDANCE_DETAILS_INTERN,
      details
    );
    setInternDetailData(data);
  };

  const downloadPdfOrCsv = (
    event: any,
    header: any,
    data: any,
    fileName: any
  ) => {
    const type = event?.target?.innerText;

    if (type === 'pdf' || type === 'Pdf') pdf(`${fileName}`, header, data);
    else csv(`${fileName}`, header, data, true); // csv(fileName, header, data, hasAvatar)
  };

  const pdf = (fileName: string, header: any, data: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;

    const body = data.map(({ id, name, avatar, profession, status }: any) => [
      id,
      name,
      '',
      profession,
      status,
    ]);
    const historyTablebody = data.map(
      ({ date, mood, clockIn, clockOut, totalHours }: any) => [
        date,
        mood,
        clockIn,
        clockOut,
        totalHours,
      ]
    );

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);

    doc.autoTable({
      head: [header],
      body: fileName === 'historyDetail' ? historyTablebody : body,
      margin: { top: 50 },

      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: 'normal',
        fontSize: 12,
      },

      didParseCell: async (item: any) => {
        if (item.row.section === 'head')
          item.cell.styles.fillColor = [230, 244, 249];
        else item.cell.styles.fillColor = false;
      },

      didDrawCell: async (item: any) => {
        if (
          item.column.dataKey === 2 &&
          item.section === 'body' &&
          fileName !== 'historyDetail'
        ) {
          const xPos = item.cell.x;
          const yPos = item.cell.y;
          var dim = 20;

          const img =
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3QAIAA4AFgAoAB1hY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABgAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABwYI/8QAJxAAAQMEAQMDBQAAAAAAAAAAAQIDBAAFBhEhEiIxBxNBFjJRYXH/xAAZAQACAwEAAAAAAAAAAAAAAAAAAwEEBQb/xAAjEQABAwMDBQEAAAAAAAAAAAABAAIDBAUREjHBITJBUWHR/9oADAMBAAIRAxEAPwDbTM5x+0YE5lYlx7hEZ6W1JhyEOkvK8NbBICufn4BNS+7et31DZJlonW6Lbo01Pt+83KJcbTvfIOgeBo615qNYplFvhTDCessNmySnEiWw2pXU5pCkpWVkk7T1E8Ac7/NVbJIuGW7DlS4NsTCQ5BLSAqO2tEpSk9ijvvQrz3A62N6oqbjI7DCN1bp7fGdUgcOiy8eEJLYmwVbbcOkFKu0jyRz92tUpiubWGBbXrbd8MiSYpTpo2+c7HU0oAd/QSpClk8lSgfNKNZyoGMbKRpRw4jWlAbT+q6Q9EfTy85RhMJN7aadQ06JVvZkOnpcaI0UqPI6SeQn+71ulKWWhz2tPn8KZTjuPocrO5xYo87KH3I9si2dMhKBHaRFUlKhyknpA7TxsnQApSlZVRVyQENaustVvpauMulYMj6Rzhf/Z';
          doc.addImage(img, xPos + 10, yPos, dim, dim);

          // doc.setFillColor(255, 0, 0);
          // doc.roundedRect(xPos,yPos+6, 100, 20, 5, 5, 'F'); //doc.roundedRect(xPos,yPos, width, height, radius, radius, 'F');

          // const img = new Image();
          // img.src = svg;
          // item.cell.padding('vertical', 0);
          // doc.addImage(img, 'PNG', xPos+10, yPos, 20, 20);
        }
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  return {
    debouncedSearch,
    checkIn,
    checkOut,
    internAverage,
    attendanceMood,
    getInternAttStat,
    downloadPdfOrCsv,
    internAttDetail,
    getAttAllEmplyoees,
    getDepartmentList,
    getTodayAttList,
    getDepAttendance,
    pdf,
    todayAttList,
    depAttList,
    internAttStat,
    employeeAtt,
    clockIndata,
    clockOutdata,
    internDetailData,
    mood,
    departmentList,
  };
};

export default useCustomHook;
