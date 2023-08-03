import { Col, Row, Progress, Avatar } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { UserAvatar, Clock24Icon, ClockIcon } from "../../../assets/images";
import { BoxWrapper, DropDown, PageHeader, SearchBar } from "../../../components";
import "./style.scss";
import CommonTableCollapsible from "../commonTableCollapsible";
import { timesheetMock } from "../mockData";
import ManagerTimeSheetCustomHook from "./actionHandler";
import dayjs from "dayjs";
import constants from "../../../config/constants";
import useCustomHook from "../actionHandler";

const Manager = () => {
  const [date, setDate] = useState("this week");
  const [download, setDownload] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedHistory, setSelectedHistory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [openCollapseId, setOpenCollapseId] = useState<any>(null);

  const { fetchManagerUsers, managerUserList, fetchDateRangeTimesheet, fetchTasksInDate, taskDateRange, taskInDate, rangeFilter } =
    ManagerTimeSheetCustomHook();
  const action = useCustomHook();
  const PdfHeader = ["Date", "Total Tasks", "Total Time"];
  const PdfBody = taskDateRange?.map((task: any) => [task?.date, task?.tasks, task?.totalTime]);

  // const userLists = [
  //   {
  //     id: "1",
  //     userImg: UserAvatar,
  //     userName: "mino marina",
  //     designation: "data researcher",
  //     lastActivity: "1 day ago",
  //   },
  //   {
  //     id: "2",
  //     userImg: UserAvatar,
  //     userName: "mino marina",
  //     designation: "data researcher",
  //     lastActivity: "1 day ago",
  //   },
  //   {
  //     id: "3",
  //     userImg: UserAvatar,
  //     userName: "mino marina",
  //     designation: "data researcher",
  //     lastActivity: "1 day ago",
  //   },
  //   {
  //     id: "4",
  //     userImg: UserAvatar,
  //     userName: "mino marina",
  //     designation: "data researcher",
  //     lastActivity: "1 day ago",
  //   },
  //   {
  //     id: "5",
  //     userImg: UserAvatar,
  //     userName: "mino marina",
  //     designation: "data researcher",
  //     lastActivity: "1 day ago",
  //   },
  //   {
  //     id: "6",
  //     userImg: UserAvatar,
  //     userName: "mino marina",
  //     designation: "data researcher",
  //     lastActivity: "1 day ago",
  //   },
  //   {
  //     id: "7",
  //     userImg: UserAvatar,
  //     userName: "mino marina",
  //     designation: "data researcher",
  //     lastActivity: "1 day ago",
  //   },
  //   {
  //     id: "8",
  //     userImg: UserAvatar,
  //     userName: "mino marina",
  //     designation: "data researcher",
  //     lastActivity: "1 day ago",
  //   },
  //   {
  //     id: "9",
  //     userImg: UserAvatar,
  //     userName: "mino marina",
  //     designation: "data researcher",
  //     lastActivity: "1 day ago",
  //   },
  // ];
  useEffect(() => {
    getUserList();
  }, [date, search]);

  useEffect(() => {
    if (selectedHistory && selectedUser) {
      handleChangeDate();
    }
  }, [selectedHistory]);

  const getUserList = () => {
    const { startDate, endDate } = rangeFilter(date);

    fetchManagerUsers({ startDate, endDate, search });
    setSelectedUser(null);
    setSelectedHistory("");
  };
  const handleChangeUser = (user: any) => {
    setSelectedUser(user);
    const { startDate, endDate } = rangeFilter(date);
    fetchDateRangeTimesheet({ startDate, endDate, userId: user?.userDetail?.id });
  };

  const handleChangeDate = () => {
    fetchTasksInDate({ date: selectedHistory, userId: selectedUser?.userDetail?.id });
  };

  const handleDownload = (value: string) => {
    let pdfValue = {
      target: {
        innerText: "",
      },
    };
    pdfValue.target.innerText = value;

    action.downloadPdfOrCsv(pdfValue, PdfHeader, taskDateRange, "Timesheet-History", PdfBody);
  };

  return (
    <div className="manager-wrapper">
      <PageHeader title="Timesheets" bordered />
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={7} lg={10} xs={24} md={24} className="h-full">
          <BoxWrapper boxShadow="0px 0px 8px 1px rgba(9, 161, 218, 0.1)" className="rounded-2xl h-full">
            <SearchBar size="middle" className="mb-[10px]" handleChange={(e: any) => setSearch(e)} />
            <div className="scroller">
              {managerUserList.map((user: any) => (
                <div onClick={() => handleChangeUser(user)} key={user.id} className="user-list py-[10px]">
                  <div className="user cursor-pointer flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 capitalize">
                      <Avatar
                        size={48}
                        shape="circle"
                        src={`${constants.MEDIA_URL}/${user?.userDetail?.profileImage?.mediaId}.${user?.userDetail?.profileImage?.metaData?.extension}`}
                      >
                        {user?.userDetail?.firstName?.charAt(0)}
                        {user?.userDetail?.lastName?.charAt(0)}
                      </Avatar>
                      <div>
                        <p className="user-name text-base">{user?.userDetail?.firstName + " " + user?.userDetail?.lastName} </p>
                        <p className="user-designation text-sm">{user?.userType}</p>
                      </div>
                    </div>
                    <span className="last-activity text-xs whitespace-nowrap">{dayjs(user?.updatedAt).fromNow()}</span>
                  </div>
                </div>
              ))}
            </div>
          </BoxWrapper>
        </Col>
        <Col xxl={18} xl={17} lg={14} xs={24} className="h-full">
          <div className="flex items-center justify-end gap-3 mb-[30px]">
            <DropDown
              name="this week"
              value={date}
              setValue={setDate}
              options={["this week", "last week", "this month", "last month", "date range"]}
              requireRangePicker
              showDatePickerOnVal={"date range"}
              dateRangePlacement="bottomLeft"
            />
            <DropDown requiredDownloadIcon options={["PDF", "Excel"]} value={download} setValue={handleDownload} />
          </div>
          {selectedUser && (
            <BoxWrapper
              boxShadow="0px 0px 8px 1px rgba(9, 161, 218, 0.1)"
              className="time-progress mb-[30px] flex-wrap rounded-2xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-5 max-lg:basis-2/4">
                <img src={ClockIcon} />
                <div className="w-[150px]">
                  <p className="hours-title text-base">Total Hours</p>
                  <p className="hours text-2xl font-medium">{selectedUser?.totalTime}</p>
                </div>
              </div>
              <Progress
                percent={selectedUser?.workedPercentage}
                className="flex-1 flex items-center gap-3 max-lg:basis-2/4"
                strokeColor={"#3DC575"}
              />
              <div className="flex sm:grow md:grow-0 items-center gap-5 max-lg:basis-2/4">
                <img src={Clock24Icon} />
                <div className="w-[150px] ">
                  <p className="hours-title text-base">Worked Hours</p>
                  <p className="hours text-2xl font-medium">{dayjs(selectedUser?.workedTime, "HH:mm").format("H[h] m[m]")}</p>
                </div>
              </div>
            </BoxWrapper>
          )}
          {selectedUser && (
            <div className="time-history-scroller">
              {taskDateRange.map((data: any, index: number) => (
                <Fragment key={index}>
                  {/* {data.history?.map((history: any) => ( */}
                  <CommonTableCollapsible
                    key={index}
                    id={index}
                    dateTime={data?.date}
                    totalTasks={data?.tasks}
                    totalTime={data?.totalTime}
                    tableData={taskInDate || []}
                    setSelectedHistory={setSelectedHistory}
                    isOpen={openCollapseId === index}
                    setCollapseOpen={(isOpen: any) => setOpenCollapseId(isOpen ? index : null)}
                  />
                  {/* ))} */}
                </Fragment>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Manager;
