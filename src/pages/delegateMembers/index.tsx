import React, { useEffect } from "react"
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd';
import { Table, Space, Dropdown, Button, Row, Col } from 'antd'
import { IconAngleDown } from '../../assets/images'
import { SearchBar, PageHeader } from "../../components";
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
    <div className="delegate-members">
      <PageHeader title="Delegate Members" bordered  />
      <Row gutter={[20, 20]} className="page-filterbar">
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={() => console.log('Search')} />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className="flex justify-end gap-4 main-filter-btns">
          <div className="requests-filterby-status">
            <Dropdown overlayClassName="shs-dropdown" menu={{ items: statusItems }} trigger={['click']} placement="bottomRight">
              <Button className="button-sky-blue main-btn">Status<IconAngleDown /></Button>
            </Dropdown>
          </div>
          <div className="dropdown-download">
            <Dropdown overlayClassName="shs-dropdown" menu={{ items: typeItems }} trigger={['click']} placement="bottomRight">
              <Button className="button-sky-blue main-btn">Type<IconAngleDown /></Button>
            </Dropdown>
          </div>
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
  </div>
  )
}

export default DelegateMembers