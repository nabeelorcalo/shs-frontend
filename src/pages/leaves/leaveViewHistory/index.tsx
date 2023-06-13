
import { useState } from "react";
import { Col, Row } from "antd";
import { useRecoilValue } from "recoil";
import { currentUserRoleState, currentUserState } from "../../../store";
import { CloseCircleFilled } from "@ant-design/icons";
import { BoxWrapper, DrawerWidth } from "../../../components";
import { CalendarWhiteIcon } from "../../../assets/images";
import { Alert, Button, DropDown, SearchBar, FiltersButton, LeaveRequest, PageHeader, Breadcrumb } from "../../../components";
import FilterDrawerForm from "./FilterDrawerForm";
import { data } from "./LeaveMockData";
import DrawerComp from "../../../components/DrawerComp";
import CalendarDrawerInnerDetail from "../../../components/CalanderDrawerInner/calendarDrawerInnerDetail";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import LeaveHistoryTable from "./leaveHistoryTable";
import "./style.scss"
import Divider from "antd/es/divider";


const index = () => {
  const cruntUserState = useRecoilValue(currentUserState);
  const role = useRecoilValue(currentUserRoleState);
  const { downloadPdfOrCsv, onsubmitLeaveRequest } = useCustomHook();
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [openDrawer, setOpenDrawer] = useState({ open: false, type: '' })
  const [openModal, setOpenModal] = useState({ open: false, type: '' })
  const [filterValue, setFilterValue] = useState("Select");
  const [state, setState] = useState({
    searchValue: '',
  });
  const CsvImportData = ['No', 'RequestDate', 'DateFrom', 'DateTo', 'LeaveType', 'Description', 'Status'];
  const mainDrawerWidth = DrawerWidth();
  const LeaveViewHistoryData = [
    { name: 'Leaves History' },
    { name: "Leaves", onClickNavigateTo: `/${ROUTES_CONSTANTS.LEAVES}` },
  ];

  const renderSpanBG: any = {
    "SICK": "rgba(76, 164, 253, 1)",
    "CASUAL": "rgba(255, 193, 93, 1)",
    "WORK FROM HOME": "rgba(233, 111, 124, 1)",
    "MEDICAL": "rgba(106, 173, 142, 1)",
  };

  const handleSearch = (val: any) => {
    setState((prevState) => ({
      ...prevState,
      searchValue: val,
    }));
  }

  return (
    <div className="main_view_detail">
      <Breadcrumb breadCrumbData={LeaveViewHistoryData} />

      <Divider />

      <Row className='items-center' gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleSearch} />
        </Col>

        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="gap-4 flex justify-end view_history_button_wrapper">
          <FiltersButton
            label="Filters"
            onClick={() => setOpenDrawer({ type: 'filters', open: true })}
          />

          <div>
            <DropDown
              options={['pdf', 'excel']}
              requiredDownloadIcon
              setValue={() => downloadPdfOrCsv(event, CsvImportData, data, "Leave History")}
            />
          </div>

          {
            role === constants.INTERN &&
            <Button
              size="middle"
              label="Request Leave"
              className="Request_leave"
              icon={<CalendarWhiteIcon className="mr-1" />}
              onClick={() => setOpenModal({ open: true, type: "addLeav" })}
            />
          }
        </Col>

        <Col xs={24}>
          <BoxWrapper>
            <LeaveHistoryTable
              id="LeaveHistoryTable"
              setOpenDrawer={setOpenDrawer}
              setOpenModal={setOpenModal}
              setSelectedRow={setSelectedRow}
            />
          </BoxWrapper>
        </Col>
      </Row>

      {openDrawer.open &&
        <DrawerComp
          width={mainDrawerWidth > 1400 ? 380 : 300}
          title={openDrawer.type === 'filters' ? "Filters" : ""}
          open={openDrawer.open}
          className={openDrawer.type === 'filters' ? "" : "Record_data"}
          closeIcon={openDrawer.type === 'filters' ? <CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px', right: "0" }} /> : false}
          onClose={() => setOpenDrawer({ type: '', open: false })}
        >
          <div>
            {
              openDrawer.type === 'filters' ?
                <FilterDrawerForm filterValue={filterValue} setFilterValue={setFilterValue} setOpenDrawer={setOpenDrawer} />
                :
                <CalendarDrawerInnerDetail
                  img={selectedRow?.img}
                  name={`${cruntUserState?.firstName} ${cruntUserState?.lastName}`}
                  designation={"UI UX Designer"}
                  email={cruntUserState?.email}
                  requestedOn={selectedRow?.createdAt}
                  aprover={selectedRow?.aprover}
                  ApprovedBy={selectedRow?.ApprovedBy ? selectedRow?.ApprovedBy : "-"}
                  backgroundColor={selectedRow?.type === "SICK" ?
                    "rgba(76, 164, 253, 0.25)" : selectedRow?.type === "CASUAL" ?
                      "rgba(255, 193, 93, 0.25)" : selectedRow?.type === "WORK FROM HOME" ? "rgba(233, 111, 124, 0.25)" : "rgba(106, 173, 142, 0.25)"}
                  spanBG={renderSpanBG[selectedRow?.type]}
                  title={selectedRow?.type.toLowerCase()}
                  dateFrom={selectedRow?.dateFrom}
                  dateTo={selectedRow?.dateTo}
                  timeFrom={selectedRow?.start}
                  timeTo={selectedRow?.end}
                  leaveTypeDay={selectedRow?.leaveTypeDay === "half day"}
                  hours={selectedRow?.hours}
                  dur={selectedRow?.durationType}
                  reqStatus={selectedRow?.status.toLowerCase()}
                  description={selectedRow?.reason}
                />
            }
          </div>
        </DrawerComp>
      }

      {openModal.open && openModal.type !== 'cancel' &&
        <LeaveRequest
          title="Leave Request"
          open={openModal.open}
          data={selectedRow}
          setIsAddModalOpen={setOpenModal}
          subMitLeaveBtn={onsubmitLeaveRequest}
          changeLeaveTyp={(() => (alert("On Change To half or Full Day Concept goes here ")))}
        />
      }

      {openModal.open && openModal.type === 'cancel' &&
        <Alert
          type='warning'
          state={openModal.open}
          setState={() => setOpenModal({ ...openModal, open: !openModal.open })}
          cancelBtntxt={"No"}
          okBtntxt={"Yes"}
          children={<p>Are you sure you want to Cancel this Request ?</p>}
        />
      }
    </div>
  )
}
export default index