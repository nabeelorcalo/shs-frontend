import React, { useEffect } from "react"
import type { ColumnsType } from 'antd/es/table'
import { Col, MenuProps, Row } from 'antd';
import { Table, Space, Dropdown, Button } from 'antd'
import { IconAngleDown } from '../../../assets/images'
import { SearchBar } from "../../../components";
import "./style.scss";

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  rewardAmount: string;
  memberType: string;
  joiningDate: string;
  location: string;
  status: string;
}


// Temporary Data
const tableData = [
  {
    key: '1',
    name: 'Ana Black',
    email: 'anablack@gmail.com',
    rewardAmount: '£15',
    memberType: 'University',
    joiningDate: '20/10/2022',
    location: 'Virtual',
    status: 'active'
  },
  {
    key: '2',
    name: 'James',
    email: 'james@gmail.com',
    rewardAmount: '£3',
    memberType: 'Student',
    joiningDate: '20/10/2022',
    location: 'Glasgow',
    status: 'inactive'
  },
  {
    key: '3',
    name: 'Elijah',
    email: 'elijah@gmail.com',
    rewardAmount: '£5',
    memberType: 'Intern',
    joiningDate: '20/10/2022',
    location: 'London',
    status: 'active'
  },
  {
    key: '4',
    name: 'Ana Black',
    email: 'mateo@gmail.com',
    rewardAmount: '£15',
    memberType: 'University',
    joiningDate: '20/10/2022',
    location: 'Virtual',
    status: 'active'
  },
  {
    key: '5',
    name: 'James',
    email: 'michael@gmail.com',
    rewardAmount: '£3',
    memberType: 'Student',
    joiningDate: '20/10/2022',
    location: 'Edinburgh',
    status: 'inactive'
  },
  {
    key: '1',
    name: 'Ana Black',
    email: 'anablack@gmail.com',
    rewardAmount: '£15',
    memberType: 'University',
    joiningDate: '20/10/2022',
    location: 'Virtual',
    status: 'active'
  },
  {
    key: '2',
    name: 'James',
    email: 'james@gmail.com',
    rewardAmount: '£3',
    memberType: 'Student',
    joiningDate: '20/10/2022',
    location: 'Glasgow',
    status: 'inactive'
  },
  {
    key: '3',
    name: 'Elijah',
    email: 'elijah@gmail.com',
    rewardAmount: '£5',
    memberType: 'Intern',
    joiningDate: '20/10/2022',
    location: 'London',
    status: 'active'
  },
  {
    key: '4',
    name: 'Ana Black',
    email: 'mateo@gmail.com',
    rewardAmount: '£15',
    memberType: 'University',
    joiningDate: '20/10/2022',
    location: 'Virtual',
    status: 'active'
  },
];



const DelegateMembers = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const statusItems: MenuProps['items'] = [
    {
      key: 'active',
      label: 'Active'
    },
    {
      key: 'inactive',
      label: 'Inactive'
    },
  ];

  const typeItems: MenuProps['items'] = [
    {
      key: 'companyAdmin',
      label: "Company Admin"
    },
    {
      key: 'manager',
      label: "Manager"
    },
    {
      key: 'student',
      label: "Student"
    },
    {
      key: 'intern',
      label: "Intern"
    },
    {
      key: 'university',
      label: "University"
    },
  ];

  const tableColumns: ColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'no.',
      align: 'center',
      render: (_, row, index) => {
        return (
          <>{index < 9 ? 0 : null}{index + 1}</>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Reward Amount',
      dataIndex: 'rewardAmount',
    },
    {
      title: 'Member Type',
      dataIndex: 'memberType',
    },
    {
      title: 'Joining Date',
      dataIndex: 'joiningDate',
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, row, index) => {
        return (
          <div className={`shs-status-badge ${row.status === 'inactive' ? 'error' : 'success'}`}>
            {row.status === 'inactive' ? 'Inactive' : 'Active'}
          </div>
        );
      },
    },
  ];



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="earnwithus-delegate-members">
        <Row gutter={[20, 20]}>
          <Col xxl={6} xl={6} md={24} sm={24} xs={24}>
            <SearchBar handleChange={() => console.log('Search')} />
          </Col>
          <Col xxl={18} xl={18} md={24} sm={24} xs={24} className="page-filterbar-right md:justify-end">
          <Space size={20} className="page-filterbar">
            <div className="requests-filterby-status">
              <Dropdown overlayClassName="shs-dropdown" menu={{ items: statusItems }} trigger={['click']} placement="bottomRight">
                <Button className="button-sky-blue">Status<IconAngleDown /></Button>
              </Dropdown>
            </div>
            <div className="dropdown-download">
              <Dropdown overlayClassName="shs-dropdown" menu={{ items: typeItems }} trigger={['click']} placement="bottomRight">
                <Button className="button-sky-blue">Type<IconAngleDown /></Button>
              </Dropdown>
            </div>
            </Space>
          </Col>
          <Col xs={24}>
            <div className="shs-table-card table-delegate-members">
              <div className="shs-table">
                <Table
                  scroll={{ x: "max-content" }}
                  columns={tableColumns}
                  dataSource={tableData}
                  pagination={{ pageSize: 5, showTotal: (total) => <>Total: <span>{total}</span></> }}
                />
              </div>
            </div>
          </Col>
        </Row>
        {/* <div className="page-filterbar">
          <div className="page-filterbar-left">
            <div className="searchbar-wrapper">
              <SearchBar handleChange={() => console.log('Search')}/>
            </div>
          </div>
          <div className="page-filterbar-right">
            <Space size={20} className="main-filter-btns">
              <div className="requests-filterby-status">
                <Dropdown overlayClassName="shs-dropdown" menu={{ items: statusItems }} trigger={['click']} placement="bottomRight">
                  <Button className="button-sky-blue">Status<IconAngleDown /></Button>
                </Dropdown>
              </div>
              <div className="dropdown-download">
                <Dropdown overlayClassName="shs-dropdown" menu={{ items: typeItems }} trigger={['click']} placement="bottomRight">
                  <Button className="button-sky-blue">Type<IconAngleDown /></Button>
                </Dropdown>
              </div>
            </Space>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default DelegateMembers