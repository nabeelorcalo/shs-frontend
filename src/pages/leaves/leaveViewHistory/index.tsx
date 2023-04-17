
import { useState } from "react";
import { Col, Row } from "antd";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../../store";
import { CloseCircleFilled } from "@ant-design/icons";
import { BoxWrapper } from "../../../components";
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

const LeaveViewHistoryData = [
  { name: 'Leaves History' },
  { name: "Leaves", onClickNavigateTo: `/${ROUTES_CONSTANTS.LEAVES}` },
];

const index = () => {
  const action = useCustomHook();
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [openDrawer, setOpenDrawer] = useState({ open: false, type: '' })
  const [openModal, setOpenModal] = useState({ open: false, type: '' })
  const CsvImportData = ['No', 'RequestDate', 'DateFrom', 'DateTo', 'LeaveType', 'Description', 'Status'];
  const role = useRecoilValue(currentUserRoleState);

  return (
    <div className="main_view_detail">
      <Breadcrumb breadCrumbData={LeaveViewHistoryData} />
      <Divider />

      <Row className=' items-center' gutter={[20, 20]}>
        <Col xs={24} md={24} lg={6} xl={6} xxl={6}>
          <SearchBar className="SearchBar" handleChange={(e: any) => {
            console.log(e);
          }} />
        </Col>
        <Col xs={24} md={24} lg={18} xl={18} xxl={18}>
          <div className='flex md:justify-end view_history_button_wrapper'>
            <div>
              <FiltersButton
                label="Filters"
                onClick={() => setOpenDrawer({ type: 'filters', open: true })}
              />
            </div>
            <div>
              <DropDown
                options={[
                  'pdf',
                  'excel'
                ]}
                requiredDownloadIcon
                setValue={() => { action.downloadPdfOrCsv(event, CsvImportData, data, "Leave History") }}
              />
            </div>
            {
              role === constants.INTERN &&
              <Button
                icon={<CalendarWhiteIcon className="mr-1" />}
                label="Request Leave"
                onClick={() => setOpenModal({ open: true, type: "addLeav" })}
                size="middle"
                className="Request_leave"
              />}
          </div>
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <LeaveHistoryTable setOpenDrawer={setOpenDrawer} setOpenModal={setOpenModal} setSelectedRow={setSelectedRow} id="LeaveHistoryTable" />
          </BoxWrapper>
        </Col>
      </Row>

      {openDrawer.open && <DrawerComp
        title={openDrawer.type === 'filters' ? "Filters" : ""}
        open={openDrawer.open}
        className={openDrawer.type === 'filters' ? "" : "Record_data"}
        closeIcon={openDrawer.type === 'filters' ? <CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px', right: "0" }} /> : false}
        onClose={() => setOpenDrawer({ type: '', open: false })}
      >
        <div>
          {openDrawer.type === 'filters' ? <FilterDrawerForm /> :
            <CalendarDrawerInnerDetail
              img={selectedRow?.img}
              name={selectedRow?.name}
              designation={selectedRow?.designation}
              email={selectedRow?.email}
              requestedOn={selectedRow?.requestDate}
              aprover={selectedRow?.aprover}
              ApprovedBy={selectedRow?.ApprovedBy}
              backgroundColor={selectedRow?.title === "Sick" ?
                "rgba(76, 164, 253, 0.25)" : selectedRow?.title === "Casual" ?
                  "rgba(255, 193, 93, 0.25)" : selectedRow?.title === "Work from home" ? "rgba(233, 111, 124, 0.25)" : "rgba(106, 173, 142, 0.25)"}
              spanBG={data?.title === "Sick" ?
                "rgba(76, 164, 253, 1)" : selectedRow?.title === "Casual" ?
                  "rgba(255, 193, 93, 1)" : selectedRow?.title === "Work from home" ? "rgba(233, 111, 124, 1)" : "rgba(106, 173, 142, 1)"}
              title={selectedRow?.title}
              dateFrom={selectedRow?.start}
              dateTo={selectedRow?.end}
              timeFrom={selectedRow?.start}
              timeTo={selectedRow?.end}
              leaveTypeDay={selectedRow?.leaveTypeDay === "half day"}
              hours={selectedRow?.hours}
              dur={selectedRow?.dur}
              reqStatus={selectedRow?.status}
              description={selectedRow?.fulldescription}
            />
          }
        </div>
      </DrawerComp>}
      {openModal.open && openModal.type !== 'cancel' &&
        <LeaveRequest
          title="Leave Request"
          open={openModal.open}
          data={selectedRow}
          setIsAddModalOpen={setOpenModal}
          subMitLeaveBtn={action.submitLeaveRequest}
          changeLeaveTyp={(() => (alert("On Change To half or Full Day Concept goes here ")))}
        />}
      {openModal.open && openModal.type === 'cancel' &&
        <Alert
          alertType='warning'
          state={openModal.open}
          setState={() => setOpenModal({ ...openModal, open: !openModal.open })}
          cancelBtntxt={"Cancle"}
          okBtntxt={"Submit"}
          children={<p>Are you sure you want to delete this?</p>}
        />}
    </div>
  )
}
export default index