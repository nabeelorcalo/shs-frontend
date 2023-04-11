import React, { useState } from "react";
import {
  GlobalTable,
  SearchBar,
  ListAndGridViewButton,
  PageHeader,
  BoxWrapper,
  InternsCard,
  ToggleButton,
  FiltersButton,
  Alert,
  DropDown,
  AttendanceCardDetail
} from "../../components";
import "./style.scss";
import { Link, useNavigate } from 'react-router-dom';
import Drawer from "../../components/Drawer";
import { CardViewIcon, DownloadDocumentIcon, More, TableViewIcon } from "../../assets/images"
import { Button, Menu, MenuProps, Space } from 'antd';
import { Dropdown, Avatar } from 'antd';
import useCustomHook from "./actionHandler";

const PopOver = () => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            navigate("payroll-details");
          }}
        >
          View Details
        </a>
      ),
    }
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <More />
    </Dropdown>
  );
};

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7]
const departmentOptions = ["Business analyst", "Research analyst", "Accountant", "Administrator", "HR Cordinator",]
const timeframeOptions = ["This Week", "Last Week", "This Month", "Last Month", "Date Range"]
const payrollCycleOptions = ["3 Months", "6 Months", "9 Months", "12 Months"]

const Payroll = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  const [showDrawer, setShowDrawer] = useState(false)
  const [state, setState] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)

  const action = useCustomHook()
  const csvAllColum = ["No", "Name", "Department", "Joining Date", "Payroll Cycle"]

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "avatar",
      key: "avatar",
      title: "Avatar",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "department",
      key: "department",
      title: "Department",
    },
    {
      dataIndex: "joining_date",
      key: "joining_date",
      title: "Joining Date",
    },
    {
      dataIndex: "payroll_cycle",
      key: "payroll_cycle",
      title: "Payroll Cycle",
    },
    {
      dataIndex: "actions",
      key: "actions",
      title: "Actions",
    },
  ];
  const tableData = [
    {
      no: "01",
      name: "Mino Marina",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      payroll_cycle: "Jan-July",
    },
    {
      no: "02",
      name: "Julia Johns",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
    },
    {
      no: "03",
      name: "Joseph Gonzalex",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
    },
    {
      no: "02",
      name: "Julia Johns",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
    },
    {
      no: "03",
      name: "Joseph Gonzalex",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
    },
    {
      no: "02",
      name: "Julia Johns",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
    },
  ];
  const DownloadPopOver = () => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            PDF
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Excel
          </a>
        ),
      },
    ];
    return (
      <Dropdown menu={{ items }} placement="bottomRight">
        <DownloadDocumentIcon />
      </Dropdown>
    )
  }
  const newTableData = tableData.map((item, idx) => {
    return (
      {
        no: item.no,
        avatar:
          <Avatar
            src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
          />,
        name: item.name,
        department: item.department,
        joining_date: item.joining_date,
        payroll_cycle: item.payroll_cycle,
        actions: <PopOver />
      }
    )
  })
  console.log(listandgrid)

  const [isToggle, setIsToggle] = useState(false)
  console.log(isToggle)
  return (
    <div className="payroll-wrapper-main">
      <PageHeader
        title="Payroll"
        bordered
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar
              handleChange={() => { }}
              name="search bar"
              placeholder="Search"
              size="middle"
            />
          </div>
          <div className="flex flex-row gap-4 flex-wrap">
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
                    <p>Department</p>
                    <DropDown
                      name="select"
                      options={departmentOptions}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Time Frame</p>
                    <DropDown
                      name="select"
                      options={timeframeOptions}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div> 
                  <div className="flex flex-col gap-2">
                    <p>Payroll Cycle</p>
                    <DropDown
                      name="select"
                      options={payrollCycleOptions}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button
                      size="middle"
                      className="flex justify-center gap-2 white-bg-color teriary-color"
                      onClick={() => {
                        navigate("new-internship");
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      size="middle"
                      className="flex justify-center gap-2 teriary-bg-color white-color"
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
            <ToggleButton
              isToggle={isToggle}
              onTogglerClick={() => { setIsToggle(!isToggle) }}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className='w-[88px]'
            />
            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                action.downloadPdfOrCsv(event, csvAllColum, tableData, "Company Admin Payroll")
              }}
              value=""
            />
          </div>
        </div>
        <div className="pt-3">
          {
            isToggle ? <div className="flex flex-row flex-wrap max-sm:flex-col">
              {
                cardDummyArray.map((items: any, idx: any) => {
                  return (
                    <AttendanceCardDetail
                      index={1}
                      item={{
                        avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
                        id: 1,
                        name: 'Mino Marina',
                        profession: 'Data Researcher',

                      }}
                      payrollCycle="Jun-Sept"
                      menu={<Menu><Link to="payroll-details">View Details</Link></Menu>}
                    />
                  )
                })
              }
            </div>
              :
              <BoxWrapper>
                <GlobalTable
                  columns={columns}
                  expandable={{
                    expandedRowRender: () => { },
                    rowExpandable: function noRefCheck() { }
                  }}
                  tableData={newTableData}
                />
              </BoxWrapper>
          }
        </div>
      </div>
    </div>
  );
};

export default Payroll;
