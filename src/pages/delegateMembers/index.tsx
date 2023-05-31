import React, { useState, useEffect } from "react"
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd';
import { Table, Space, Dropdown, Button, Row, Col, Select } from 'antd'
import { IconAngleDown } from '../../assets/images'
import { SearchBar, PageHeader } from "../../components";
import "./style.scss";
import useDelegateHook from './actionHandler'
import { useRecoilValue } from "recoil";
import { delegateMembersState } from "../../store";

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
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState({})
  const {getDelegateMembers} = useDelegateHook();
  const delegateMembers = useRecoilValue(delegateMembersState);

  const typeItems: MenuProps['items'] = [
   
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
    getDelegateMembers(filterParams, setLoading)
  }, [filterParams])

console.log('delegateMembers:: ', delegateMembers)
console.log('filterparams:: ', filterParams)

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleSearch = (value:any) => {
    setFilterParams((prev:any) => {
      return {
        ...prev,
        q: value
      }
    })
  }

  const handleFilterStatus = (value:any) => {
    setFilterParams((prev:any) => {
      return {
        ...prev,
        status: value
      }
    })
  }

  const handleFilterType = (value:any) => {
    setFilterParams((prev:any) => {
      return {
        ...prev,
        type: value
      }
    })
  }



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="delegate-members">
      <PageHeader title="Delegate Members" bordered  />
      <Row gutter={[20, 20]} className="page-filterbar">
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleSearch} />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className="flex justify-end gap-4 main-filter-btns">
          <div className="members-filterby-status">
            <Select
              className="filled"
              placeholder="Status"
              onChange={handleFilterStatus}
              placement="bottomRight"
              suffixIcon={<IconAngleDown />}
            >
              <Select.Option value="ACTIVE">Active</Select.Option>
              <Select.Option value="INACTIVE">Inactive</Select.Option>
            </Select>
          </div>
          <div className="members-filterby-status">
            <Select
              className="filled"
              placeholder="Type"
              onChange={handleFilterType}
              placement="bottomRight"
              suffixIcon={<IconAngleDown />}
            >
              <Select.Option value="COMPANY_ADMIN">Company Admin</Select.Option>
              <Select.Option value="COMPANY_MANAGER">Manager</Select.Option>
              <Select.Option value="STUDENT">Student</Select.Option>
              <Select.Option value="INTERN">Intern</Select.Option>
              <Select.Option value="UNIVERSITY">University</Select.Option>
              <Select.Option value="DELEGATE_AGENT">Delegate Agent</Select.Option>
            </Select>
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