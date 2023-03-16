
import { useState } from "react";
import { Col, Divider, Dropdown, Row, Space } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import "./style.scss"
import { BoxWrapper } from "../../components/BoxWrapper/BoxWrapper";
import GlobalTable from "../../components/Table/Table"
import { CalendarWhiteIcon, MoreIcon } from "../../assets/images";
import { Alert, Button, DropDown, SearchBar,FiltersButton,LeaveRequest } from "../../components";
import DrawerComp from "./DrawerComp";
import FilterDrawerForm from "./FilterDrawerForm";
import CalendarDrawerInner from "../leaves/intern/calendar/CalendarDrawerInner";
import { data } from "./LeaveMockData";
const index = () => {
  // const [actionType, setActionType] = useState({ type: '', id: '' });
  // const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [openDrawer, setOpenDrawer] = useState({ open: false, type: '' })
  const [openModal, setOpenModal] = useState({ open: false, type: '' })
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Request Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
    },
    {
      title: 'Date From',
      dataIndex: 'start',
      key: 'start',

    },
    {
      title: 'Date  To',
      dataIndex: 'end',
      key: 'end',
    },
    {
      title: 'Leave Type',
      width: 180,
      dataIndex: 'leaveType',
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] relative text-left ">
          <span className=" absolute top-0 bottom-0 left-0 w-[4px] rounded-lg " style={{
            backgroundColor: data.leaveType === "sick" ?
              "#4CA4FD" : data.leaveType === "casual" ?
                "#FFC15D" : data.leaveType === "work from home" ? "#E96F7C" : "#6AAD8E",
            color: "#fff"
          }}></span>
          {data.leaveType}
        </div>
      ),

      key: 'leaveType',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 80,
      render: (_: any, data: any) => (
        <div
          className="status_container px-[10px] py-[3px] rounded-lg "
          style={{
            backgroundColor: data.status === "Pending" ?
              "#FFC15E" : data.status === "Declined" ?
                "#D83A52" : "#4ED185",
            color: "#fff",
            textAlign: "center",
          }}>
          {data.status}
        </div>
      ),
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, data: any) => (
        <Space size="middle">
          <Dropdown
            // open={visibale}
            dropdownRender={(menu: any) => {
              return <BoxWrapper className=" action_dropDown">
                <p onClick={() => {
                  setOpenDrawer({ open: true, type: 'viewDetail' })

                }}
                  className="cursor-pointer"
                >View Details</p>
                {data.status === "Pending" &&
                  <>
                    <p onClick={() => {
                      setOpenModal({ open: true, type: 'edit' })

                    }}
                      className="my-4 cursor-pointer">
                      Edit
                    </p>
                    <p onClick={() => {
                      setOpenModal({ open: true, type: 'cancel' });
                    }}
                      className="cursor-pointer">
                      Cancel
                    </p>
                  </>
                }
              </BoxWrapper>
            }}
            trigger={['click']}
            overlayClassName='menus_dropdown_main'
            placement="bottomRight"
          // onOpenChange={setVisibale}
          >
            <MoreIcon className=" cursor-pointer " onClick={() => setSelectedRow(data)} />
          </Dropdown >
        </Space >
      ),
    },
  ];

  // const generatePDF = (data) => {
  //   const doc = new jsPDF();
  
  //   // Define the table columns
  //   const columns = ['Column 1', 'Column 2', 'Column 3'];
  
  //   // Define the table rows
  //   const rows = data.map((item) => [item.column1, item.column2, item.column3]);
  
  //   // Add the table to the PDF document
  //   doc.autoTable({
  //     head: [columns],
  //     body: rows,
  //   });
  
  //   // Save the PDF
  //   doc.save('table.pdf');
  // };

  // console.log(selectedRow);
  return (
    <div className="main_view_detail">
      <Row className=' items-center'>
        <Col xs={24} md={12} lg={12}>
          <SearchBar className="SearchBar" handleChange={(e: any) => {
            console.log(e);
          }} />
        </Col>
        <Col xs={24} md={12} lg={12} >
          <div className='flex items-center justify-end view_history_button_wrapper'>
            <div className="mr-4">
              <FiltersButton
                label="Filters"
                onClick={() => setOpenDrawer({ type: 'filters', open: true })}
              />
            </div>
            <div className="mr-4">
              <DropDown
                options={[
                  'pdf',
                  'excel'
                ]}
                requiredDownloadIcon
                setValue={() => { }}
                value=""
              />
            </div>
            <Button
              icon={<CalendarWhiteIcon className="mr-1" />}
              label="Request Leave"
              onClick={() => setOpenModal({ open: true, type: "addLeav" })}
              size="middle"
              className="Request_leave"
            />
          </div>
        </Col>
        <Divider />
      </Row>
      <BoxWrapper>
        <GlobalTable columns={columns} tableData={data} pagination={true} />
      </BoxWrapper>

      {openDrawer.open && <DrawerComp
        title={openDrawer.type === 'filters' ? "Filters" : ""}
        open={openDrawer.open}
        className={openDrawer.type === 'filters' ? "" : "Record_data"}
        closeIcon={openDrawer.type === 'filters' ? <CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px', right: "0" }} /> : false}
        onClose={() => setOpenDrawer({ type: '', open: false })}
      >
        <div>
          {openDrawer.type === 'filters' ? <FilterDrawerForm /> :
            <CalendarDrawerInner
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
          subMitLeaveBtn={() => (alert("Submit Leave Function goes here"))}
          changeLeaveTyp={(() => (alert("On Change To half or Full Day Concept goes here ")))}
        />}
      {openModal.open && openModal.type === 'cancel' &&
        <Alert type='warning' open={openModal.open}
          setOpen={() => setOpenModal({ ...openModal, open: !openModal.open })}
          cancelBtntxt={"Cancle"}
          okBtntxt={"Submit"}

        >
          <p>Are you sure you want to cancel this request?</p>
        </Alert>}
    </div>
  )
}

export default index