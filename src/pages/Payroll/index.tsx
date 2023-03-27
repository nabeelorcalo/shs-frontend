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
  DropDown
} from "../../components";
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import Drawer from "../../components/Drawer";
import { CardViewIcon, DownloadDocumentIcon, More, TableViewIcon } from "../../assets/images"
import { Button, MenuProps, Space } from 'antd';
import { Dropdown, Avatar } from 'antd';

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

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Payroll = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState("")
  const [showDrawer, setShowDrawer] = useState(false)
  const [state, setState] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
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
      location: "virtual",
      status: "Pending",
      posted_by: "T",
    },
    {
      no: "02",
      name: "Julia Johns",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
      location: "Onsite",
      status: "Active",
      posted_by: "U",
    },
    {
      no: "03",
      name: "Joseph Gonzalex",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
      location: "Onsite",
      status: "Rejected",
      posted_by: "U",
    },
    {
      no: "02",
      name: "Julia Johns",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
      location: "Onsite",
      status: "Active",
      posted_by: "U",
    },
    {
      no: "03",
      name: "Joseph Gonzalex",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
      location: "Onsite",
      status: "Rejected",
      posted_by: "U",
    },
    {
      no: "02",
      name: "Julia Johns",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      payroll_cycle: "Jan-July",
      location: "Onsite",
      status: "Active",
      posted_by: "U",
    },
  ];
  const DownloadPopOver = () => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() => { navigate("view-internship-details") }}>
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
        location: item.location,
        actions: <PopOver />
      }
    )
  })
  console.log(listandgrid)
  const isToggle = true
  return (
    <>
      <PageHeader
        title="Payroll"
        bordered
      />
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
                    <p>Department</p>
                    <DropDown
                      name="select"
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
                  <div className="flex flex-col gap-2">
                    <p>Time Frame</p>
                    <DropDown
                      name="select"
                      options={["This Week", "Last Week" ,"This Month", "Last Month", "Date Range"]}
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
                      options={["3 Months", "6 Months" ,"9 Months", "12 Months"]}
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
            <ToggleButton isToggle={isToggle} onTogglerClick={(isToggle: any) => { isToggle = !isToggle; }}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className='w-[88px]'
            />
            <Space wrap>
              <div className='p-2  border-solid border-2 bg-[#E6F4F9] border-[#E6F4F9] rounded-lg hover:border-2 hover:border-[#e2e2e2]'>
                <DownloadPopOver />
              </div>
            </Space>
          </div>

        </div>
        <BoxWrapper>
          <div className="pt-3">
            {
              listandgrid ? <div className="flex flex-row flex-wrap gap-6">
                {
                  cardDummyArray.map((items: any, idx: any) => {
                    return (
                      <InternsCard />
                    )
                  })
                }
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
  );
};

export default Payroll;
