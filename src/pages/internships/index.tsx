import React, { useState } from "react";
import {
  DropDown,
  SearchBar,
  GlobalTable,
  PageHeader,
  BoxWrapper,
  FiltersButton
} from "../../components";
import Drawer from "../../components/Drawer";
import "./style.scss";
import "../../scss/global-color/Global-colors.scss"
import { Avatar, Button, Divider, Dropdown } from "antd";
import { InternshipsIcon, More } from "../../assets/images";
import type { MenuProps } from 'antd';
import { STATUS_CONSTANTS } from "../../config/constants";
import { useNavigate, Link } from "react-router-dom";

const { ACTIVE, PENDING, CLOSED, REJECTED } = STATUS_CONSTANTS;

const tableData = [
  {
    no: "01",
    title: "Research Analyst",
    department: "Business Analyst",
    posting_date: "01/07/2022",
    closing_date: "01/07/2022",
    location: "virtual",
    status: 'pending',
    posted_by: 'T',

  },
  {
    no: "02",
    title: "Business Analyst",
    department: "Scientist Analyst",
    posting_date: "01/07/2023",
    closing_date: "01/07/2021",
    location: "Onsite",
    status: 'active',
    posted_by: 'U',

  },
  {
    no: "03",
    title: "Business Analyst",
    department: "Scientist Analyst",
    posting_date: "01/07/2023",
    closing_date: "01/07/2021",
    location: "Onsite",
    status: 'rejected',
    posted_by: 'U',

  }
]
const Internships = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  const [showDrawer, setShowDrawer] = useState(false)
  const [state, setState] = useState(false)
  const PopOver = () => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() => { navigate("view-internship-details") }}>
            View details
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Duplicate
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
  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
    },
    {
      dataIndex: "department",
      key: "department",
      title: "Department",
    },
    {
      dataIndex: "posting_date",
      key: "posting_date",
      title: "Posting Date",
    },
    {
      dataIndex: "closing_date",
      key: "closing-_date",
      title: "Closing Date",
    },
    {
      dataIndex: "location",
      key: "location",
      title: "Location",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
    },
    {
      dataIndex: "posted_by",
      key: "posted_by",
      title: "Posted By",
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      title: 'Actions'
    }
  ]
  const newTableData = tableData.map((item, idx) => {
    return (
      {
        no: item.no,
        title: item.title,
        department: item.department,
        posting_date: item.posting_date,
        closing_date: item.closing_date,
        location: item.location,
        status:
          <Button
            size="small"
            className={
              `${item.status === ACTIVE ?
                `text-success-bg-color`
                :
                item.status === PENDING ?
                  `text-warning-bg-color`
                  :
                  item.status === CLOSED ?
                    `text-info-bg-color`
                    :
                    item.status === REJECTED ?
                      `text-error-bg-color`
                      :
                      `light-sky-blue-bg`
              }  
                text-[#fff]`
            }
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Button>,
        posted_by: <Avatar
          src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
        />,
        actions: <PopOver />
      }
    )
  })
  console.log(value)
  return (
    <>
      <PageHeader title="Internships" />
      <Divider />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <SearchBar
            className=""
            handleChange={() => { }}
            name="search bar"
            placeholder="search"
            size="middle"
          />
          <div className="flex flex-row gap-4">
            <FiltersButton
              label="Filters"
              onClick={() => {
                setShowDrawer(true);
              }}
            />
            <Drawer
              closable
              open={showDrawer}
              onClose={() => {
                setShowDrawer(false);
              }}
              title="Filters"
            >
              <React.Fragment key=".0">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-2">
                    <p>Location</p>
                    <DropDown
                      name="name"
                      options={["EidinBurg", "Glasgow", "London", "Virtual"]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Department</p>
                    <DropDown
                      name="name"
                      options={[
                        "Business analyst",
                        "Research analyst",
                        "Accountant",
                        "Administrator",
                        "HR Cordinator",
                      ]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button
                      size="middle"
                      className="flex gap-2 white-bg-color teriary-color"
                      onClick={() => {
                        navigate("new-internship");
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      size="middle"
                      className="flex gap-2 teriary-bg-color white-color"
                      onClick={() => {
                        navigate("new-internship");
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            </Drawer>
            <Button
              size="middle"
              className="flex gap-2 teriary-bg-color white-color"
              onClick={() => {
                navigate("new-internship");
              }}
            >
              <InternshipsIcon />
              New Internship
            </Button>
          </div>
        </div>
        <BoxWrapper>
          <div className="pt-3">
            <GlobalTable
              columns={columns}
              expandable={{
                expandedRowRender: () => { },
                rowExpandable: function noRefCheck() { },
              }}
              tableData={newTableData}
            />
          </div>
        </BoxWrapper>
      </div>
    </>
  );
};

export default Internships;
