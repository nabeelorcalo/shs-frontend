import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Avatar } from "antd";
import { Col, Row } from "antd/es/grid";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import usecustomHook from "../actionHandler";
import { currentUserRoleState } from "../../../store";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { LeaveCard, PageHeader, UpcomingHolidayComp, Button, BoxWrapper, MonthChanger, Loader, ButtonThemeSecondary } from "../../../components";
import { HeartIcon, LeavesIcon, MedicalHeart, WorkFromHom } from "../../../assets/images";
import ManagerCalendar from "./ManagerCalendar";
import "./style.scss";

const index = (props: any) => {
  // Variable declaration block
  // ------------------------------------------------
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const role = useRecoilValue(currentUserRoleState);
  const [leaveStatsLoading, setLeaveStatsLoading] = useState(true);
  const [pendingLeavesLoading, setPendingLeavesLoading] = useState(true);
  const currentMonthYear = dayjs().locale("en").format("MMMM YYYY");
  const LeaveTypeData = ['Sick', 'Casual', 'Work From Home', 'Medical'];

  const {
    leaveStats,
    getLeaveStats,
    leaveHistory,
    getLeaveHistoryList,
    upcomingHolidays,
    getUpcomingHolidaysList,
    pendingLeaves,
    getPendingLeaves,
    approveDeclineLeaveRequest,
    handleCalendarData,
    managerResource,
  } = usecustomHook();
  const cardIcon = [
    { key: 'leavesIcon', Icon: <LeavesIcon />, bg: "rgba(255, 193, 93, 0.1)" },
    { key: 'medicalIcon', Icon: <MedicalHeart />, bg: "rgba(106, 173, 142, 0.1)" },
    { key: 'heartIcon', Icon: <HeartIcon />, bg: "rgba(76, 164, 253, 0.1)" },
    { key: 'wfhIcon', Icon: <WorkFromHom />, bg: "rgba(233, 111, 124, 0.1)" },
  ];

  const [state, setState] = useState({
    currentDate: dayjs().locale("en"),
    isNextBtnDisable: true,
    loading: true,
  });

  // React Hooks defination block
  // ------------------------------------------------
  useEffect(() => {
    getUpcomingHolidaysList(setState);

    if (role === constants.COMPANY_ADMIN) getPendingLeaves().then(() => setPendingLeavesLoading(false));
  }, []);

  useEffect(() => {
    let disable: boolean;
    const startOfMonth = state?.currentDate?.startOf("month")?.format("YYYY-MM-DD");
    const endOfMonth = state?.currentDate?.endOf("month")?.format("YYYY-MM-DD");

    getLeaveStats(startOfMonth, endOfMonth).finally(() => setLeaveStatsLoading(false));

    disable = state?.currentDate?.format("MMMM YYYY") === currentMonthYear ?? false;
    setState((prevState) => ({
      ...prevState,
      isNextBtnDisable: disable,
    }));
  }, [state.currentDate]);

  useEffect(() => {
    if (startDate) fetchCalendarData();
  }, [startDate]);

  // Custom functions defination block
  // ------------------------------------------------
  const changeMonth = (event: any) => {
    let newDate: any;
    let btn = event.target.parentElement.name
      ? event.target.parentElement.name
      : event.target.name
        ? event.target.name
        : event.target.parentElement.parentElement.name;

    if (btn === "next") newDate = state?.currentDate?.add(1, "month");
    else if (btn === "prev") newDate = state?.currentDate?.subtract(1, "month");

    setState((prevState) => ({
      ...prevState,
      currentDate: newDate,
    }));
  };

  const acceptDeclineLeaveRequest: any = (event: any) => {
    let id = parseInt(event.currentTarget.parentElement.id);
    let status = event.currentTarget.className.includes("Approve_btn") ? "APPROVED" : "DECLINED";

    approveDeclineLeaveRequest({ leaveId: id, status: status }).then(() => {
      getPendingLeaves();
    });
  };

  const fetchCalendarData = () => {
    handleCalendarData({ startDate: dayjs(startDate).format("YYYY-MM-DD"), endDate: dayjs(endDate).format("YYYY-MM-DD") });
  };

  // Return block
  // ------------------------------------------------
  return (
    <div className="manager_main">
      <PageHeader actions bordered title="Leaves">
        <div className="flex items-center justify-end view_history_button_wrapper">
          <ButtonThemeSecondary
            type="default"
            className="font-semibold px-8"
            onClick={() => navigate(`/${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`)}
          >
            View History
          </ButtonThemeSecondary>
        </div>
      </PageHeader>
      {role === constants.COMPANY_ADMIN && (
        <div className="Leave_request_card_wrapper mb-5 flex items-center justify-start flex-wrap gap-5">
          {pendingLeavesLoading ? (
            <div className="loader-component">
              <div className="loader-wrapper">
                <Loader />
              </div>
            </div>
          ) : (
            pendingLeaves?.map((data: any) => {
              const {
                id,
                type,
                duration,
                intern: {
                  internship: { title },
                  userDetail: { firstName, lastName, profileImage },
                },
              } = data;

              return (
                <BoxWrapper key={id} boxShadow=" 0px 0px 8px 1px rgba(9, 161, 218, 0.1)" className="LeaveRequest_card_main max-w-[100%] w-full">
                  <div className="user_intro flex items-center justify-center flex-col mb-5">
                    <div className="w-[64px] h-[64px] rounded-full mb-5">
                      {profileImage ? (
                        <img
                          className=" rounded-full w-full h-full object-cover "
                          src={`${constants.MEDIA_URL}/${profileImage?.mediaId}.${profileImage?.metaData?.extension}`}
                        />
                      ) : (
                        <Avatar size={64}>
                          {firstName[0].toUpperCase()}
                          {lastName[0].toUpperCase()}
                        </Avatar>
                      )}
                    </div>

                    <h4 className="user_name mb-1">
                      {firstName} {lastName}
                    </h4>
                    <p className="designation">{title}</p>
                  </div>

                  <div className="about_leave_info flex items-center justify-around p-3 rounded-lg mb-5 ">
                    <div className="info_inner text-center">
                      <p className="Name_of_cat text-sm font-normal capitalize ">Days</p>
                      <p className="count_of_cat text-sm font-normal capitalize">{duration}</p>
                    </div>

                    <div className="info_inner text-center">
                      <p className="Name_of_cat text-sm font-normal capitalize ">Leave Type</p>
                      <p className="count_of_cat text-sm font-normal capitalize">{type}</p>
                    </div>
                  </div>

                  <div id={id} className="LeaveAplicationCardBtns_wraper flex items-center justify-between">
                    <Button className="Declin_btn" label="Decline" size="small" type="default" onClick={acceptDeclineLeaveRequest} />
                    <Button className="Approve_btn" label="Approve" size="small" type="default" onClick={acceptDeclineLeaveRequest} />
                  </div>
                </BoxWrapper>
              );
            })
          )}
        </div>
      )}

      {role !== constants.INTERN ? (
        <MonthChanger
          hasDatePicker
          setState={setState}
          datePickerClassName="min-w-0"
          onClick={() => changeMonth(event)}
          month={state?.currentDate?.format("MMMM YYYY")}
          picker="month"
          isNextBtnDisabled={state?.isNextBtnDisable}
        />
      ) : (
        <></>
      )}

      <Row gutter={[20, 20]}>
        {leaveStatsLoading ? (
          <div className="loader-component">
            <div className="loader-wrapper">
              <Loader />
            </div>
          </div>
        ) : (
          leaveStats.map((data: any, index: number) => {
            const { type, totalCount, pending, approved, declined } = data;

            return (
              <Col key={index} className="gutter-row" xs={24} sm={12} md={12} lg={12} xl={6}>
                <LeaveCard
                  Icon={cardIcon[index]?.Icon}
                  bg={cardIcon[index]?.bg}
                  title={type}
                  total={totalCount}
                  pending={pending}
                  approved={approved}
                  declined={declined}
                />
              </Col>
            );
          })
        )}
      </Row>

      <Row className="mt-[30px] second_row h-full" gutter={[20, 20]}>
        <Col xs={24} md={24} lg={16} xl={17}>
          <BoxWrapper boxShadow=" 0px 0px 8px 1px rgba(9, 161, 218, 0.1)" className="h-full">
            <div className="how_is_away">
              <h4 className="font-medium text-[20px] capitalize">Who's Away</h4>

              <Row gutter={[10, 10]}>
                <Col xs={24} xxl={14}>
                  <p>{managerResource?.length} people are away this week</p>
                </Col>

                <Col xs={24} xxl={10}>
                  <div className="statue_highligter flex items-center justify-between flex-wrap">
                    {LeaveTypeData.map((data: any, index: number) => {
                      return (
                        <div key={index} className="flex items-center">
                          <p
                            className="w-[10px] h-[10px] rounded-full mr-[10px]"
                            style={{
                              backgroundColor:
                                data === "Sick"
                                  ? "rgba(76, 164, 253, 1)"
                                  : data === "Casual"
                                    ? "rgba(255, 193, 93, 1)"
                                    : data === "Medical"
                                      ? "rgba(74, 157, 119, 1)"
                                      : "rgba(233, 111, 124, 1)",
                            }}
                          ></p>
                          <p className="font-medium">{data}</p>
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </div>

            <ManagerCalendar setStartDate={setStartDate} setEndDate={setEndDate} fetchCalendarData={fetchCalendarData} />
          </BoxWrapper>
        </Col>

        <Col xs={24} md={24} lg={8} xl={7}>
          <UpcomingHolidayComp loading={state.loading} upcomingHolidayData={upcomingHolidays} />
        </Col>
      </Row>
    </div>
  );
};

export default index;
