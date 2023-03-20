
import { Col, Divider, Drawer, Dropdown, Form, Row, Select, Space } from "antd";
import type { MenuProps } from 'antd';
import {BoxWrapper} from "../../components/BoxWrapper/BoxWrapper"
import {GlobalTable} from "../../components"
import "./style.scss"
import { CalendarWhiteIcon, ChevronRight, DownloadIconLeave, FilterIconLeave, MoreIcon } from "../../assets/images";
import { Button, SearchBar } from "../../components";
import { useState } from "react";
import { CloseCircleFilled } from "@ant-design/icons";
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
          color: "#fff"
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
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
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
            <Button
              icon={<FilterIconLeave className="mr-2" />}
              label="Filters"
              upcomingIcon={<ChevronRight className="ml-2" />}
              onClick={showDrawer}
              shape="default"
              size="large"
              type="default"
              style={{ color: "#A0A3BD", background: "#E6F4F9", display: "flex", alignItems: "center", }}
              className="button_request_leave mr-5"
            />
            {/* <Dropdown menu={{ items }} trigger={['click']}> */}
            <Button
              icon={<DownloadIconLeave />}
              onClick={() => { }}
              shape="default"
              size="large"
              type="default"
              className="button_request_leave mr-5"
              style={{ background: "#E6F4F9", display: "flex", alignItems: "center", justifyContent: "center" }}
            />
            {/* </Dropdown> */}
            <Button
              icon={<CalendarWhiteIcon className="mr-1" />}
              label="Request Leave"
              onClick={() => { }}
              shape="default"
              size="large"
              type="default"
              style={{ color: "#fff", background: "#4A9D77", display: "flex", alignItems: "center", justifyContent: "center" }}
              className="button_request_leave"
            />
          </div>
        </Col>
        <Divider />
      </Row>
      <BoxWrapper>
        <GlobalTable columns={columns} tableData={data} pagination={true} />
      </BoxWrapper>
      <Drawer title="Filters" className="drawar_main" placement="right" onClose={onClose} open={open} closeIcon={<CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px', right: "0" }} />}>
        <div className="data_container">
          <Form
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Leave Type"
              name="Leave Type"
            >
              <Select
                defaultValue="sick"
                onChange={handleChange}
                size="large"
                options={[
                  { value: 'sick', label: 'Sick' },
                  { value: 'casual', label: 'Casual' },
                  { value: 'work from home', label: 'Work From Home' },
                  { value: 'medicale', label: 'Medicale'},
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Time Frame"
              name="time frame"
            >
            <Select
                defaultValue="lucy"
                onChange={handleChange}
                size="large"
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
            >
            <Select
                defaultValue="Pending"
                onChange={handleChange}
                size="large"
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'declined', label: 'Declined' },
                  { value: 'approved', label: 'Approved' },
                ]}
              />
            </Form.Item>
          </Form>

        </div>
        <div className='flex items-center justify-end view_history_button_wrapper'>
          <Button
            label="Reset"
            htmlType="button"
            onClick={showDrawer}
            shape="default"
            size="large"
            type="default"
            style={{ color: "#4A9D77", background: "#fff", display: "flex", alignItems: "center", border: "1px solid #4A9D77" }}
            className="button_request_leave  mr-5"
          />
          <Button
            label="Apply"
            htmlType="submit"
            onClick={() => { }}
            shape="default"
            size="large"
            type="default"
            style={{ color: "#fff", background: "#4A9D77", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #4A9D77" }}
            className="button_request_leave"
          />
        </div>
      </Drawer>

    </div>
  )
}

export default index