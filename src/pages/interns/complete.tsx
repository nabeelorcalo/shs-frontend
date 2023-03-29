import React, { useState } from "react";
import {
  SearchBar,
  PageHeader,
  GlobalTable,
  BoxWrapper,
  InternsCard,
  ListAndGridViewButton
} from "../../components";
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Dropdown, Space} from 'antd';
import { More } from "../../assets/images"
import type { MenuProps } from 'antd';

const PopOver = () => {
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" onClick={() => { navigate("profile") }}>
          Profile
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" onClick={() => { navigate("chat") }}>
          Chat
        </a>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <More />
    </Dropdown>
  )
}

const Complete = () => {
  const [listandgrid, setListandgrid] = useState(false)
  const columns = [
    {
      dataIndex: 'no',
      key: 'no',
      title: 'No.'
    },
    {
      dataIndex: 'posted_by',
      key: 'posted_by',
      title: 'Posted By'
    },
    {
      dataIndex: 'title',
      key: 'title',
      title: 'Title'
    },
    {
      dataIndex: 'department',
      key: 'department',
      title: 'Department'
    },
    {
      dataIndex: 'joining_date',
      key: 'joining_date',
      title: 'Joining Date'
    },
    {
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      title: 'Date of Birth'
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Status'
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      title: 'Actions'
    }
  ]
  const tableData = [
    {
      no: "01",
      title: "Research Analyst",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
      location: "virtual",
      status: 'Completed',
      posted_by: 'T',
    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      location: "Onsite",
      status: 'Completed',
      posted_by: 'U',
    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      location: "Onsite",
      status: 'Completed',
      posted_by: 'U',
    }
  ]
  const newTableData = tableData.map((item, idx) => {
    return (
      {
        no: item.no,
        posted_by:
          <Avatar
            src={`https://joesch.moe/api/v1/random?key=${idx}`}
          />,
        title: item.title,
        department: item.department,
        joining_date: item.joining_date,
        date_of_birth: item.date_of_birth,
        status: <Button
          size="small"
          className="bg-[#e2e2e2]"
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Button>,
        actions: <PopOver />
      }
    )
  })
  console.log(listandgrid)
  return (
    <>
      <PageHeader title="Interns" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <SearchBar
            className=""
            handleChange={() => { }}
            name="search bar"
            placeholder="search"
            size="middle"
          />

          <div className="flex flex-row gap-4" onClick={() => { setListandgrid(!listandgrid) }}>
            <ListAndGridViewButton />
          </div>
        </div>
        <BoxWrapper>
          <div className="pt-3">
            {
              listandgrid ? <div className="flex flex-row flex-wrap gap-6">
                {Array(5).map((item, idx) => {
                  return (
                    <InternsCard />
                  )
                })}
              </div>
                :
                <GlobalTable
                  columns={columns}
                  expandable={{
                    expandedRowRender: () => { },
                    rowExpandable: function noRefCheck() { }
                  }}
                  tableData={newTableData}
                />
            }
          </div>
        </BoxWrapper>
      </div>
    </>
  )
}

export default Complete