import { Col, Row } from "antd"
import Divider from "antd/es/divider"
import { FilterIconLeave, LeaveProfileImg } from "../../../assets/images"
import { BoxWrapper, Button, GlobalTable, HorizonalLineCard, LifeAssessmentGraph, LifeBalanceGraph, SearchBar } from "../../../components"
import "./style.scss"
const LineGraphData = [
  {
    content: '10 of 10 tasks completed',
    icon: '/src/assets/images/AddEventInCalendar/icon.svg',
    progressbarColor: 'red',
    progressbarValue: 50,
    storage: '128GB',
    subTitle: 'Create Balance in Life',
    title: 'Main Goal'
  },
  {
    content: '10 of 10 tasks completed',
    icon: '/src/assets/images/AddEventInCalendar/icon.svg',
    progressbarColor: 'green',
    progressbarValue: 50,
    storage: '128GB',
    subTitle: 'Create Balance in Life',
    title: 'Last Achievement'
  }
]
const data: any = [
  {
    key: '1',
    goalName: "Create Balance in life",
    datecreated: "2023-03-04T09:22:00",
    totalTasks: "half day",
    completedTasks: "01 day",
    dueDate: "2023-03-04T09:22:00",
    status: "Pending",
    Actions: "",
  },
];
const columData = [
  {
    title: 'No.',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Goal Name',
    dataIndex: 'goalName',
    key: 'goalName',
  },
  {
    title: 'Date Created ',
    dataIndex: 'datecreated',
    key: 'datecreated',
  },
  {
    title: 'Total Tasks',
    dataIndex: "totalTasks",
    key: 'totalTasks',
  },
  {
    title: 'Completed Tasks',
    key: 'completedTasks',
    dataIndex: 'completedTasks',
  },
  {
    title: 'Due Date',
    key: 'dueDate',
    dataIndex: 'dueDate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    // render: (_: any, data: any) => (
    //   <div
    //     className="status_container px-[10px] py-[3px] rounded-lg "
    //     style={{
    //       backgroundColor: data.status === "Pending" ?
    //         "#FFC15E" : data.status === "Declined" ?
    //           "#D83A52" : "#4ED185",
    //       color: "#fff",
    //       textAlign: "center",
    //     }}>
    //     {data.status}
    //   </div>
    // ),
    key: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    // render: (_: any, data: any) => (
    //   <Space size="middle">
    //     <Dropdown
    //       // open={visibale}
    //       dropdownRender={() => {
    //         return <BoxWrapper className=" action_dropDown">
    //           <p onClick={() => {
    //             setOpenDrawer({ open: true, type: 'viewDetail' })

    //           }}
    //             className="cursor-pointer"
    //           >View Details</p>
    //           {data.status === "Pending" &&
    //             <>
    //               <p onClick={() => {setOpenModal({ open: true, type: 'edit' })}}
    //                 className="my-4 cursor-pointer">
    //                 Edit
    //               </p>
    //               <p onClick={() => {
    //                 setOpenModal({ open: true, type: 'cancel' });
    //               }}
    //                 className="cursor-pointer">
    //                 Cancel
    //               </p>
    //             </>
    //           }
    //         </BoxWrapper>
    //       }}
    //       trigger={['click']}
    //       overlayClassName='menus_dropdown_main'
    //       placement="bottomRight"
    //     // onOpenChange={setVisibale}
    //     >
    //       <MoreIcon className=" cursor-pointer " onClick={() => setSelectedRow(data)} />
    //     </Dropdown >
    //   </Space >
    // ),
  },
];


const DreamUp = () => {
  return (
    <div className="Dram_upMain">
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={8}>
          
          <HorizonalLineCard
            arraydata={LineGraphData}
          />
        </Col>
        <Col lg={8}>
          <BoxWrapper className="h-full Life_balanceGraph">
            <h4 className="">Life Balance</h4>
            <LifeBalanceGraph monthName="Jan" />
          </BoxWrapper>
        </Col>
        <Col lg={8}>
          <BoxWrapper className="h-full Life_assesment">
            <LifeAssessmentGraph monthName="Jan" />
          </BoxWrapper>
        </Col>
      </Row>
      <Row className=' items-center mt-10'>
        <Col xs={24} md={12} lg={12}>
          <SearchBar className="SearchBar" handleChange={(e: any) => {
            console.log(e);
          }} />
        </Col>
        <Col xs={24} md={12} lg={12} >
          <div className='flex items-center justify-end view_history_button_wrapper'>
          </div>
        </Col>
        <Divider />
      </Row>
      <BoxWrapper className="Table_wrapper">
        <GlobalTable
          columns={columData}
          tableData={data}
          pagination={false}
        />
      </BoxWrapper>
    </div>
  )
}

export default DreamUp