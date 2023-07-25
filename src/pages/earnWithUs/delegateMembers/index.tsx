import React, { useState, useEffect } from "react";
import type { ColumnsType } from 'antd/es/table';
import { Col, Row } from 'antd';
import { Table, Select } from 'antd';
import type { PaginationProps } from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import { IconAngleDown, IconCloseModal } from '../../../assets/images';
import { SearchBar } from "../../../components";
import useEarnWithUsHook from '../actionHandler';
import { useRecoilValue } from "recoil";
import { delegateMembersState, earnWithUsTabsState } from "../../../store";
import "./style.scss";
import dayjs from 'dayjs';
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


const DelegateMembers = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {getDelegateMembers , totalMembers} = useEarnWithUsHook();
  const delegateMembers:any = useRecoilValue(delegateMembersState);
  const tabKey = useRecoilValue(earnWithUsTabsState);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const initParams:any = {
    page:1,
    limit: 5,
  }
  const [filterParams, setFilterParams] = useState(initParams);


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    if(tabKey === 'earnWithUsMembers') {
      getDelegateMembers(filterParams, setLoadingMembers)
    }
  }, [tabKey, filterParams])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleFilterStatus = (value:any) => {
    setFilterParams((prev:any) => {
      return {...prev, status: value}
    })
  }

  const handleFilterType = (value:any) => {
    setFilterParams((prev:any) => {
      return {...prev, type: value}
    })
  }

  const handleSearch = (value:any) => {
    setFilterParams((prev:any) => {
      return {...prev, q: value}
    })
  }

  const handlePagination:PaginationProps['onChange'] = (page:any) => {
    setPageNo(page.current)
    setFilterParams((prev:any) => {
      return {...prev, page: page.current}
    })
  };


  /* Table Columns
  -------------------------------------------------------------------------------------*/
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
      render: (_, row:any) => (
        <>{row?.referredToUser?.firstName} {row?.referredToUser?.lastName}</>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, row:any) => (
        <>{row?.referredToUser?.email}</>
      )
    },
    {
      title: 'Reward Amount',
      dataIndex: 'rewardAmount',
      render: (_, row:any) => (
        <>£ {row?.rewardAmount ? row?.rewardAmount : 0}</>
      )
    },
    {
      title: 'Member Type',
      dataIndex: 'memberType',
      render: (_, row:any) => (
        <>{row?.referredToUser?.role.toLowerCase()}</>
      )
    },
    {
      title: 'Joining Date',
      dataIndex: 'createdAt',
      render: (_, row:any) => (
        <>{dayjs(row?.referredToUser?.createdAt).format('DD/MM/YYYY')}</>
      )
    },
    {
      title: 'Location',
      dataIndex: 'location',
      render: (_, row:any) => (
        <>{row?.referredToUser?.address}</>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, row:any, index) => {
        return (
          <div className={`shs-status-badge ${row?.referredToUser?.status === 'ACTIVE' ? 'success' : 'error'}`}>
            {row?.referredToUser?.status === 'ACTIVE' ? 'Active' : 'Inactive'}
          </div>
        );
      },
    },
  ];


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="earnwithus-delegate-members">
        <Row gutter={[20, 20]}>
          <Col xl={6} lg={9} md={24} sm={24} xs={24}>
            <SearchBar handleChange={handleSearch} />
          </Col>
          <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
            <div className="member-filterby-status">
              <Select
                className="filled"
                placeholder="Status"
                onChange={handleFilterStatus}
                placement="bottomRight"
                suffixIcon={<IconAngleDown />}
                clearIcon={<IconCloseModal />}
                allowClear
              >
                <Select.Option value="ACTIVE">Active</Select.Option>
                <Select.Option value="INACTIVE">Inactive</Select.Option>
              </Select>
            </div>

            <div className="member-filterby-type">
              <Select
                className="filled"
                placeholder="Type"
                onChange={handleFilterType}
                placement="bottomRight"
                suffixIcon={<IconAngleDown />}
                popupClassName="dropdown-membaer-type-filter"
                clearIcon={<IconCloseModal />}
                allowClear
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
                  loading={{spinning: loadingMembers, indicator: <LoadingOutlined />}}
                  columns={tableColumns}
                  dataSource={delegateMembers}
                  // pagination={{ pageSize: 5, showTotal: (total) => <>Total: {total}</> }}
                  onChange={(page:any, pageSize:any) => handlePagination(page, pageSize)}
                  pagination={{
                    pageSize: 5,
                    current: pageNo,
                    total: totalMembers,
                    showTotal: (total) => <>Total: {total}</>
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DelegateMembers