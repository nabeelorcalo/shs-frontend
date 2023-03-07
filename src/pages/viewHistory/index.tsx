
import { Col, Divider, Dropdown, Row, Space } from "antd";
import type { MenuProps } from 'antd';
import BoxWrapper from "../../components/BoxWrapper/boxWrapper"
import GlobalTable from "../../components/Table/Table"
import "./style.scss"
import { MoreIcon } from "../../assets/images";
import { Button, SearchBar } from "../../components";
interface DataType {
  key: string,
  requestDate: string,
  dateFrom: string,
  dateTo: string,
  leaveType: string,
  description: string,
  status: string,
  Actions: string,
}
const items: MenuProps['items'] = [
  {
    label: <p >View Details</p>,
    key: '0',
  },
  {
    label: <p>Edit</p>,
    key: '1',
  },
  {
    label: <p>Cancle</p>,
    key: '3',
  },
];
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
    dataIndex: 'dateFrom',
    key: 'dateFrom',

  },
  {
    title: 'Date  To',
    dataIndex: 'dateTo',
    key: 'dateTo',
    width: 200,

  },
  {
    title: 'Leave Type',
    dataIndex: 'leaveType',
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
    render: (_: any, data: any) => (
      <div
        className="status_container px-[10px] py-[3px] rounded-lg "
        style={{
          backgroundColor: data.status === "Pending" ?
            "#FFC15E" : data.status === "Declined" ?
              "#D83A52" : "#4ED185",
              color:"#fff"
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
        <Dropdown menu={{ items }} trigger={['click']} overlayClassName='menus_dropdown_main' placement="bottomRight">
          <MoreIcon className=" cursor-pointer " />
        </Dropdown>
        {/* <a onClick={() => alert(`Id For The Editabel record is  ${data.key} `)}></a> */}
        {/* <a onClick={()=>alert(`deleted record id  ${data.key} `)}>Delete</a> */}
      </Space>
    ),
  },
];
const data: DataType[] = [
  {
    key: '01',
    requestDate: '01/07/2022',
    dateFrom: '01/07/2022',
    dateTo: '01/07/2022',
    leaveType: 'Sick',
    description: "High fever",
    status: "Pending",
    Actions: "fduhguisd",
  },
  {
    key: '02',
    requestDate: '01/07/2022',
    dateFrom: '01/07/2022',
    dateTo: '01/07/2022',
    leaveType: 'Sick',
    description: "High fever",
    status: "Approved",
    Actions: "fduhguisd",
  },
  {
    key: '01',
    requestDate: '01/07/2022',
    dateFrom: '01/07/2022',
    dateTo: '01/07/2022',
    leaveType: 'Sick',
    description: "High fever",
    status: "Declined",
    Actions: "fduhguisd",
  },
  

];

const index = () => {
  return (
    <div className="main_view_detail">
      <Row className=' items-center'>
        <Col xs={24} md={12} lg={12}>
          <SearchBar className="SearchBar" handleChange={(e:any)=>{console.log(e);
          }}/>
        </Col>
        <Col xs={24} md={12} lg={12} >
          <div className='flex items-center justify-end view_history_button_wrapper'>
            <Button label="hello" type="primary" onClick={()=>{console.log("heloo");
            }}/>
          </div>
        </Col>
        <Divider />
      </Row>
      <BoxWrapper>
        <GlobalTable columns={columns} tableData={data} pagination={true} />
      </BoxWrapper>

    </div>
  )
}

export default index