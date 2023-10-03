import { useEffect, useState } from "react";
import { Space, Row, Col, Empty, Table } from "antd";
import {
  ClockInCommon,
  ClockOutCommon,
  AvgHoursCommon,
  WorkingDaysCommon,
  DownlaodFileIcon,
  Emoji1st,
  Emoji2nd,
  Emoji3rd,
  Emoji4th,
  Emoji5th,
} from "../../assets/images";

import {
  BoxWrapper,
  DropDown,
  IconButton,
  PageHeader,
  AttendanceTimeCard,
  GlobalTable,
  ProfileCard,
  TimeTracking,
  Breadcrumb,
  Notifications
} from "../../components";
import constants, { ROUTES_CONSTANTS, MoodTypes } from "../../config/constants";
import "./style.scss";
import useCustomHook from "./actionHandler";
import useDashboardHook from '../dashboard/intern/actionHandler'
import { useRecoilValue } from "recoil";
import { currentUserRoleState, currentUserState, internAttDetailData } from "../../store";
import { useParams } from "react-router-dom";

const Detail = (props: any) => {
  const { internId } = props
  const role = useRecoilValue(currentUserRoleState);
  const internAttDetails: any = useRecoilValue(internAttDetailData);
  const currentUser = useRecoilValue(currentUserState);
  const { id } = useParams();
  const attendanceDetailBreadCrumb = [
    { name: `${internAttDetails?.internDetails?.userDetail?.firstName} ${internAttDetails?.internDetails?.userDetail?.lastName}` },
    { name: " Attendance ", onClickNavigateTo: `/${ROUTES_CONSTANTS.ATTENDANCE}` },
    { name: role !== constants.UNIVERSITY && "Attendance Details", onClickNavigateTo: `/${ROUTES_CONSTANTS.ATTENDANCE}/${ROUTES_CONSTANTS.DETAIL}` },
  ];
  const {
    handleAttendenceClockin,
    attendenceClockin,
    handleAttendenceClockout,
  } = useDashboardHook();
  const action = useCustomHook();
  const timeFrameOptions = [
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "Date Range",
  ];

  const tableColumns: any = [
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Mood",
      key: "mood",
      render: (_: any, data: any) => {
        return <div className="moodemoji">{data.mood}</div>;
      },
    },
    {
      title: "Clock In",
      key: "clockIn",
      dataIndex: "clockIn",
    },
    {
      title: "Clock Out",
      key: "clockOut",
      dataIndex: "clockOut",
    },
    {
      title: "Total Hours",
      key: "totalHours",
      dataIndex: "totalHours",
      align: 'left',
    },
  ];

  const [state, setState] = useState({
    timeFrameVal: "This Month",
  });

  const timeData: any[] = [
    { id: 0, heading: "Avg Clock In", time: internAttDetails?.averageClocking?.averageClockIn },
    { id: 1, heading: "Avg Clock Out", time: internAttDetails?.averageClocking?.averageClockOut },
    { id: 2, heading: "Avg Hours", time: internAttDetails?.averageClocking?.averageHours },
    { id: 3, heading: "Working Days", time: internAttDetails?.averageClocking?.actualWorkingDays, total: internAttDetails?.averageClocking?.totalWorkingDays },

  ];
  useEffect(() => {
    const getInternAtt = async (timeFrameVal: string) => {
      let internID: number = currentUser.role === constants?.INTERN ? currentUser?.intern?.id : id
      await action.internAttDetail(timeFrameVal, internID);
    }
    getInternAtt(state.timeFrameVal);
  }, [state.timeFrameVal]);

  const checkMood = (mood: string) => {
    switch (mood) {
      case MoodTypes.HAPPY:
        return <Emoji3rd />
      case MoodTypes.SAD:
        return <Emoji1st />
      case MoodTypes.NEUTRAL:
        return <Emoji2nd />
      case MoodTypes.AWESOME:
        return <Emoji4th />
      case MoodTypes.TERRIBLE:
        return <Emoji5th />
      default:
        return <Emoji2nd />;
    }
  }

  const tableData: any[] = [];
  const DowntableData: any[] = [];
  const modifyTableData = () => {
    if (internAttDetails?.attendanceRecord.length !== 0) {
      interface attData {
        [key: string]: any
        key: number,
        date: string,
        mood: any,
        clockIn: string,
        clockOut: string,
        totalHours: string,
        children?: [],
      };
      internAttDetails?.attendanceRecord.map((item: any, index: number) => {
        const aData: attData = {
          key: 0,
          date: '',
          mood: '',
          totalHours: '',
          clockIn: '',
          clockOut: '',
        }
        aData.key = index;
        aData.date = item?.trackDate || 'N/A';
        aData.totalHours = `${item?.totalHours?.toFixed(2)} hrs`;
        aData.clockIn = item.clocking.length !== 0 ? item?.clocking[0]?.clockIn : '00:00';
        aData.clockOut = item.clocking.length !== 0 ? item?.clocking[item?.clocking.length - 1]?.clockOut : '00:00';
        aData.mood = checkMood(item?.mood);
        if (item.clocking.length > 1) aData['children'] = item.clocking;
        tableData.push({ ...aData });
        aData.mood = item?.mood || 'NEUTRAL';
        DowntableData.push(aData);
      });
    }
  };
  modifyTableData();

  const getColorAndIcon = (name: string) => {
    let color: string;
    let icon: any;

    switch (name) {
      case "Avg Clock In":
        color = "#4A9D77";
        icon = <ClockInCommon />;
        return { color, icon };
      case "Avg Clock Out":
        color = "#E95060";
        icon = <ClockOutCommon />;
        return { color, icon };
      case "Avg Hours":
        color = "#4783FF";
        icon = <AvgHoursCommon />;
        return { color, icon };
      case "Working Days":
        color = "#FFC15D";
        icon = <WorkingDaysCommon />;
        return { color, icon };
      default:
        return "";
    }
  }

  return (
    <div className="company-admin-detail-container">

      <Row gutter={[20, 30]}>
        <Col xs={24}>
          <PageHeader
            title={
              <div className="font-medium">
                {
                  role === constants.INTERN ?
                    <h3 className="primary-color text-2xl font-semibold">Attendance</h3>
                    :
                    <Breadcrumb breadCrumbData={attendanceDetailBreadCrumb} />
                }
              </div>
            }
            children={
              <div className="flex flex-row gap-4">
                <DropDown
                  name="time-frame"
                  options={timeFrameOptions}
                  setValue={(e: string) => setState((prevState) => ({
                    ...prevState,
                    timeFrameVal: e,
                  }))}
                  value={state.timeFrameVal}
                  showDatePickerOnVal="Date Range"
                  requireRangePicker
                  placement="bottomRight"
                />

                <IconButton
                  size="large"
                  className="icon-btn download-btn"
                  icon={<DownlaodFileIcon />}
                  onClick={() => {
                    action.pdf('historyDetail', tableColumns, DowntableData);
                    Notifications({ title: "Success", description: "Download Done", type: 'success' })
                  }}
                />
              </div>
            }
            actions
          // bordered
          />
        </Col>
        <Col xl={5} md={24} xs={24} className="attendance-content">
          <div className="left-container">
            {role === constants.INTERN ? (
              <TimeTracking
                vartical
                handleAttendenceClockin={handleAttendenceClockin}
                attendenceClockin={attendenceClockin}
                handleAttendenceClockout={handleAttendenceClockout}
              />
            ) : (
              <ProfileCard
                name={<p className="text-primary-color font-medium">{internAttDetails?.internDetails?.userDetail?.firstName} {internAttDetails?.internDetails?.userDetail?.lastName}</p>}
                profession="Data Researcher"
                userId={internAttDetails?.internDetails?.userDetail?.id}
                internData={internAttDetails?.internDetails}
                internId={internAttDetails?.internDetails?.id}
                email={internAttDetails?.internDetails?.userDetail?.email || 'N/A'}
                phone={internAttDetails?.internDetails?.userDetail?.phoneNumber || 'N/A'}
                address={internAttDetails?.internDetails?.userDetail?.address || 'N/A'}
                avatar={internAttDetails?.internDetails?.userDetail?.profileImage
                  ? `${constants.MEDIA_URL}/${internAttDetails?.internDetails?.userDetail?.profileImage?.mediaId}.${internAttDetails?.internDetails?.userDetail?.profileImage?.metaData?.extension}`
                  : `https://eu.ui-avatars.com/api/?name=${internAttDetails?.internDetails?.userDetail?.firstName} ${internAttDetails?.internDetails?.userDetail?.lastName}&size=250`}
              />
            )}
          </div>
        </Col>
        <Col xl={19} md={24} xs={24}>
          <Row gutter={[10, 0]}>
            <Col xxl={24} md={24} xs={24}>
              <BoxWrapper className="flex mb-6 main-cards">
                {timeData.length !== 0 && timeData.map((item: any, index) => {
                  const { color, icon }: any = getColorAndIcon(item.heading);
                  return (
                    <AttendanceTimeCard
                      key={item.id}
                      Icon={icon}
                      heading={item.heading}
                      time={item.time}
                      colorClass={color}
                      total={index === timeData.length - 1 ? item?.total : ''}
                      isLast={index === timeData.length - 1}
                    />
                  );
                })}
              </BoxWrapper>
            </Col>
            <Col xxl={24} md={24} xs={24}>
              <BoxWrapper>
                {
                  tableData.length !== 0 ?
                    <Table
                      pagination={false}
                      dataSource={tableData}
                      columns={tableColumns}
                      className="attendance-detail-table"
                    />
                    :
                    <Space direction="horizontal" className="no-data">
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </Space>
                }
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
