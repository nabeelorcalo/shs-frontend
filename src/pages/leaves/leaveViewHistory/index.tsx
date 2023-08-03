import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { Col, Row } from "antd";
import Divider from "antd/es/divider";
import { CloseCircleFilled } from "@ant-design/icons";
import { currentUserRoleState, currentUserState, filterState, leaveDetailState, paginationState } from "../../../store";
import { CalendarWhiteIcon } from "../../../assets/images";
import FilterDrawerForm from "./FilterDrawerForm";
import { data } from "./LeaveMockData";
import useCustomHook from "../actionHandler";
import LeaveHistoryTable from "./leaveHistoryTable";
import DrawerComp from "../../../components/DrawerComp";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import CalendarDrawerInnerDetail from "../../../components/CalanderDrawerInner/calendarDrawerInnerDetail";
import "./style.scss";
import {
  Alert,
  Button,
  DropDown,
  SearchBar,
  FiltersButton,
  LeaveRequest,
  PageHeader,
  Breadcrumb,
  BoxWrapper,
  DrawerWidth,
} from "../../../components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const index = () => {
  // Variable declaration & defination
  // ---------------------------------
  const utcOffsetInMinutes = new Date().getTimezoneOffset();
  const mainDrawerWidth = DrawerWidth();
  const cruntUserState = useRecoilValue(currentUserState);
  const role = useRecoilValue(currentUserRoleState);
  const searchPlaceholder = role === constants.INTERN ? "Search by leave type" : "Search by name";
  const [filter, setfilter] = useRecoilState(filterState);
  const [tableParams, setTableParams]: any = useRecoilState(paginationState);
  const leaveDetail: any = useRecoilValue(leaveDetailState);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [openDrawer, setOpenDrawer] = useState({ open: false, type: "" });
  const [openModal, setOpenModal] = useState({ open: false, type: "" });
  const [selectedId, setSelectedId] = useState("");
  const [filterValue, setFilterValue] = useState("Select");
  const internColumnNames = ["No", "Request Date", "Date From", "Date To", "Leave Type", "Description", "Status"];
  // Column names for COMPANY_ADMIN & MANAGER
  const columnNames = ["No", "Intern Name", "Request Date", "Date From", "Date To", "Leave Type", "Duration", "Status"];
  const {
    downloadPdfOrCsv,
    onsubmitLeaveRequest,
    leaveHistory,
    getLeaveHistoryList,
    approveDeclineLeaveRequest,
    getLeaveDetailById,
    getLeaveTypes,
    deleteLeave,
  } = useCustomHook();

  const LeaveViewHistoryData = [{ name: "Leaves History" }, { name: "Leaves", onClickNavigateTo: `/${ROUTES_CONSTANTS.LEAVES}` }];

  const renderSpanBG: any = {
    SICK: "rgba(76, 164, 253, 0.4)",
    CASUAL: "rgba(255, 193, 93, 0.4)",
    "WORK FROM HOME": "rgba(233, 111, 124, 0.4)",
    MEDICAL: "rgba(106, 173, 142, 0.4)",
  };

  // React Hooks
  // -----------
  useEffect(() => {
    getLeaveTypes();
  }, []);

  useEffect(() => {
    let filterParams = removeEmptyValues(filter);

    getLeaveHistoryList(filterParams, tableParams, setTableParams);
  }, [filter]);

  // Comnpnent Un-mount
  useEffect(() => {
    return () => {
      resetList();
    }
  }, []);

  // Custom functions
  // ----------------
  const resetList = useResetRecoilState(filterState);

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== "" && value !== "Select"));
  };

  const handleSearch = async (val: any) => {
    setfilter({ ...filter, search: val });
  };

  const filterBtnHandler = () => {
    setOpenDrawer({ type: "filters", open: true });
  };

  const approveDeclineRequest = (event: any) => {
    let status = event.currentTarget.className.includes("approve") ? "APPROVED" : "DECLINED";
    let params = {
      leaveId: leaveDetail.id,
      status: status,
      page: tableParams.pagination.current,
      limit: 10,
    };
    let filterParams = removeEmptyValues(filter);

    approveDeclineLeaveRequest(params).then(() => {
      getLeaveDetailById(leaveDetail.id);
      getLeaveHistoryList(filterParams, tableParams, setTableParams);
    });
  };

  const handleDownload = async () => {
    const columns = role === constants.INTERN ? internColumnNames : columnNames;

    downloadPdfOrCsv(event, columns, leaveHistory, "Leaves History");
  }

  return (
    <div className="main_view_detail">
      <Breadcrumb breadCrumbData={LeaveViewHistoryData} />

      <Divider />

      <Row className="items-center" gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar placeholder={searchPlaceholder} handleChange={handleSearch} />
        </Col>

        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="gap-4 flex justify-end view_history_button_wrapper">
          <FiltersButton label="Filters" onClick={filterBtnHandler} />

          <div>
            <DropDown
              options={["pdf", "excel"]}
              requiredDownloadIcon
              setValue={handleDownload}
            />
          </div>

          {role === constants.INTERN && (
            <Button
              size="middle"
              label="Request Leave"
              className="Request_leave"
              icon={<CalendarWhiteIcon className="mr-1" />}
              onClick={() => setOpenModal({ open: true, type: "addLeav" })}
            />
          )}
        </Col>

        <Col xs={24}>
          <BoxWrapper>
            <LeaveHistoryTable
              id="LeaveHistoryTable"
              setOpenDrawer={setOpenDrawer}
              setOpenModal={setOpenModal}
              setSelectedRow={setSelectedRow}
              setSelectedId={setSelectedId}
            />
          </BoxWrapper>
        </Col>
      </Row>

      {openDrawer.open && (
        <DrawerComp
          width={mainDrawerWidth > 1400 ? 380 : 300}
          title={openDrawer.type === "filters" ? "Filters" : ""}
          open={openDrawer.open}
          className={openDrawer.type === "filters" ? "" : "Record_data"}
          closeIcon={openDrawer.type === "filters" ? <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px", right: "0" }} /> : false}
          onClose={() => setOpenDrawer({ type: "", open: false })}
        >
          <div>
            {openDrawer.type === "filters" ? (
              <FilterDrawerForm filterValue={filterValue} setFilterValue={setFilterValue} setOpenDrawer={setOpenDrawer} />
            ) : (
              <CalendarDrawerInnerDetail
                img={`${constants.MEDIA_URL}/${leaveDetail?.intern?.userDetail?.profileImage?.mediaId}.${leaveDetail?.intern?.userDetail?.profileImage?.metaData?.extension}`}
                name={`${leaveDetail?.intern?.userDetail?.firstName} ${leaveDetail?.intern?.userDetail?.lastName}`}
                designation={leaveDetail?.intern?.internship?.title}
                email={leaveDetail?.intern?.userDetail?.email}
                requestedOn={leaveDetail?.createdAt}
                aprover={`${leaveDetail?.approver?.firstName} ${leaveDetail?.approver?.lastName}`}
                ApprovedBy={leaveDetail?.approved ? `${leaveDetail?.approved?.firstName} ${leaveDetail?.approver?.lastName}` : "N/A"}
                backgroundColor={renderSpanBG[leaveDetail?.type?.toUpperCase()]}
                spanBG={renderSpanBG[leaveDetail?.type?.toUpperCase()]}
                title={leaveDetail?.type}
                dateFrom={leaveDetail?.dateFrom}
                dateTo={dayjs.utc(leaveDetail?.dateTo).utcOffset(utcOffsetInMinutes)}
                // timeFrom={selectedRow?.start}
                // timeTo={selectedRow?.end}
                leaveTypeDay={selectedRow?.leaveTypeDay === "half day"}
                hours={selectedRow?.hours}
                dur={leaveDetail?.duration}
                reqStatus={leaveDetail?.status}
                description={leaveDetail?.reason}
                approveDeclineRequest={approveDeclineRequest}
                mediaUrl={leaveDetail?.mediaUrl}
              />
            )}
          </div>
        </DrawerComp>
      )}

      {openModal.open && openModal.type !== "cancel" && (
        <LeaveRequest
          title="Leave Request"
          open={openModal.open}
          data={
            openModal?.type !== "addLeav"
              ? {
                id: selectedRow?.id,
                dateFrom: dayjs(selectedRow?.dateFrom).startOf("day"),
                dateTo: dayjs(selectedRow?.dateTo).startOf("day"),
                timeFrom: selectedRow?.timeFrom ? dayjs(selectedRow?.timeFrom) : null,
                timeTo: selectedRow?.timeTo ? dayjs(selectedRow?.timeTo) : null,
                reason: selectedRow?.reason,
                durationType: selectedRow?.durationType,
                days: selectedRow?.duration,
                type: selectedRow?.leavePolicyId,
              }
              : null
          }
          setIsAddModalOpen={setOpenModal}
          onsubmitLeaveRequest={onsubmitLeaveRequest}
          changeLeaveTyp={() => alert("On Change To half or Full Day Concept goes here ")}
          getLeaveTypes={getLeaveTypes}
          getLeaveHistoryList={getLeaveHistoryList}
        />
      )}

      {openModal.open && openModal.type === "cancel" && (
        <Alert
          type="warning"
          state={openModal.open}
          setState={() => setOpenModal({ ...openModal, open: !openModal.open })}
          cancelBtntxt={"No"}
          okBtntxt={"Yes"}
          okBtnFunc={() =>
            deleteLeave(selectedId, () => {
              let params = removeEmptyValues(filter);
              getLeaveHistoryList(params, tableParams, setTableParams);
            })
          }
          children={<p>Are you sure you want to Cancel this Request ?</p>}
        />
      )}
    </div>
  );
};
export default index;
