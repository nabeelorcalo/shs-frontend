import React, { useEffect, useState } from "react";
import {
  GlobalTable,
  SearchBar,
  PageHeader,
  BoxWrapper,
  ToggleButton,
  FiltersButton,
  DropDown,
  AttendanceCardDetail
} from "../../components";
import "./style.scss";
import { Link, useNavigate } from 'react-router-dom';
import Drawer from "../../components/Drawer";
import { CardViewIcon, More, TableViewIcon } from "../../assets/images"
import { Avatar, Button, Menu, MenuProps } from 'antd';
import { Dropdown } from 'antd';
import useCustomHook from "./actionHandler";
import dayjs from "dayjs";

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
    <Dropdown className="cursor-pointer" menu={{ items }} placement="bottomRight" trigger={['click']} overlayStyle={{ width: 180 }}>
      <More />
    </Dropdown>
  );
};

const departmentOptions = ["Business analyst", "Research analyst", "Accountant", "Administrator", "HR Cordinator",]
const timeframeOptions = ["This Week", "Last Week", "This Month", "Last Month", "Date Range"]
const payrollCycleOptions = ["3 Months", "6 Months", "9 Months", "12 Months"]

const Payroll = () => {
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [isToggle, setIsToggle] = useState(false)

  const { payrollData, downloadPdfOrCsv,changeHandler } = useCustomHook();

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
  const newTableData = payrollData?.map((item: any, index: number) => {
    const monthFrom = dayjs(item.from).format("MMM");
    const monthTo = dayjs(item.to).format("MMM");
    return (
      {
        key: index,
        no: payrollData?.length < 10 && `0 ${index + 1}`,
        avatar:
          <Avatar
            src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
          />,
        name: item.name,
        // department: item.department,
        joining_date: dayjs(item.createdAt).format("DD/MM/YYYY"),
        payroll_cycle: `${monthFrom} - ${monthTo}`,
        actions: <PopOver />
      }
    )
  })

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
              handleChange={changeHandler}
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
                    <Button type="default" size="middle" className="button-default-tertiary" onClick={() => { }}>Reset</Button>
                    <Button type="primary" size="middle" className="button-tertiary" onClick={() => { }}>Apply</Button>
                  </div>
                </div>
              </React.Fragment>
            </Drawer>
            <ToggleButton
              isToggle={isToggle}
              onTogglerClick={() => { setIsToggle(!isToggle) }}
              FirstIcon={TableViewIcon}
              LastIcon={CardViewIcon}
              className='w-[88px]'
            />
            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(event, csvAllColum, newTableData, "Company Admin Payroll")
              }}
              value=""
            />
          </div>
        </div>
        <div className="pt-3">
          {
            isToggle ? <div className="flex flex-row flex-wrap max-sm:flex-col">
              {
                newTableData.map((items: any, index: number) => {
                  const monthFrom = dayjs(items.from).format("MMM");
                  const monthTo = dayjs(items.to).format("MMM");
                  return (
                    <AttendanceCardDetail
                      key={index}
                      index={1}
                      item={{
                        avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
                        id: 1,
                        name: items?.name,
                        profession: 'Data Researcher',
                      }}
                      payrollCycle={`${monthFrom} - ${monthTo}`}
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

