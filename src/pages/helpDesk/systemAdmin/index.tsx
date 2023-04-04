import React, { useState } from "react";
import "./style.scss";
import { Button, Col, Divider, Menu, Row, Select, Space, TabsProps, Tooltip } from "antd";
import { CommonDatePicker, DropDown, SearchBar, FiltersButton, PopUpModal } from "../../../components";
import AppTabs from "../../../components/Tabs";
import ResolvedData from "./Resolved";
import AllData from "./allData";
import AssignedData from "./AssignedData";
import UnassignedData from "./UnassignedData";
import Drawer from "../../../components/Drawer";
import { CloseCircleFilled } from "@ant-design/icons";
import { Avatar } from "../../../assets/images";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import useCustomHook from '../actionHandler';

const tableDataAll = [
  {
    key: "01",
    ID: "01",
    Subject: "Subject kmy cc",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID: "02",
    Subject: "file2",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID: "03",
    Subject: "file3",
    ReportedBy: "john",
    Type: "kljdasfhuasd",
    Role: "issue Name",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
];

const tableDataUnassigned = [
  {
    key: "01",
    ID: "01",
    Subject: "SubjectUnassined",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID: "02",
    Subject: "file2",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID: "03",
    Subject: "file3",
    ReportedBy: "john",
    Type: "kljdasfhuasd",
    Role: "issue Name",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
];

const tableDataAssigned = [
  {
    key: "01",
    ID: "01",
    Subject: "SubjectAssigned",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID: "02",
    Subject: "file2",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID: "03",
    Subject: "file3",
    ReportedBy: "john",
    Type: "kljdasfhuasd",
    Role: "issue Name",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
];


const tableDataResolved = [
  {
    key: "01",
    ID: "01",
    Subject: "SubjectResoveld",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "02",
    ID: "02",
    Subject: "file2",
    ReportedBy: "john",
    Role: "issue Name",
    Type: "kljdasfhuasd",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
  {
    key: "03",
    ID: "03",
    Subject: "file3",
    ReportedBy: "john",
    Type: "kljdasfhuasd",
    Role: "issue Name",
    Priority: "high",
    Date: "22/09/2013",
    Assigned: "amila clark",
    Status: "Resolved",
    Actions: "fduhguisd",
  },
];

const filterData = [
  {
    title: "UserRole",
    userRole: [
      "Company Admin",
      "System Admin",
      "Intern",
      "Student",
      "manager",
      "Company Admin",
      "Student",
    ],
  },
];

const drawerAssignToData = [
  {
    id: "1",
    avatar: Avatar,
    name: "David Miller",
    btn: "Add",
  },
  {
    id: "2",
    avatar: Avatar,
    name: "Amelia Clark",
    btn: "Add",
  },
  {
    id: "3",
    avatar: Avatar,
    name: "Maria Sanoid",
    btn: "Add",
  },
  {
    id: "4",
    avatar: Avatar,
    name: "Jessica Alba",
    btn: "Add",
  },
];

const HelpDesk = () => {
  const action = useCustomHook();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerDate, setOpenDrawerDate] = useState(false);
  const [assignUser, setAssignUser] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<any>(1)

  const csvAllColum = ["ID", "Subject", "Type", "ReportedBy", "Role", "Priority", "Date", "Assigned", "Status"]

  const handleChange = () => {
    console.log("change");
  };

  const handleClick = () => {
    setOpenDrawer(true);
  };

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleRemoveUser = (id: string) => {
    setAssignUser(assignUser.filter((user: any) => user.id !== id));
  };

  const handleAddUser = (user: any) => {
    const filtered = assignUser.find((u: any) => u.id === user.id)
      ? true
      : false;
    if (!filtered) {
      setAssignUser([...assignUser, user]);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All`,
      children: <AllData tableData={tableDataAll} />,
    },
    {
      key: "2",
      label: `Unassigned`,
      children: <UnassignedData tableData={tableDataUnassigned} />,
    },
    {
      key: "3",
      label: `Assigned`,
      children: <AssignedData tableData={tableDataAssigned} />,
    },
    {
      key: "4",
      label: `Resolved`,
      children: <ResolvedData tableData={tableDataResolved} />,
    },
  ];

  return (
    <div className="help-desk">

      <Drawer
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        title="Filters"
      >
        <div className="mb-6">
          <label>Issue Type</label>
          <div className="mt-2">
            <Select
              className="w-[100%]"
              defaultValue=""
              onChange={handleChangeSelect}
              options={[
                { value: "Payment", label: "Payment" },
                { value: "Bug", label: "Bug" },
                { value: "Internship", label: "Internship" },
                { value: "Technical ", label: "Technical " },
                { value: "Support Support", label: "Support Support" },
                { value: "Delegate Reference", label: "Delegate Reference" },
                { value: "Wrong Information", label: "Wrong Information" },
              ]}
            />
          </div>
        </div>

        <div className="mb-6">
          <label>Priority</label>
          <div className="mt-2 ">
            <Select
              className="w-[100%]"
              defaultValue=""
              onChange={handleChangeSelect}
              options={[
                { value: "Highest", label: "Highest" },
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
              ]}
            />
          </div>
        </div>

        <div className="mb-6">
          <CommonDatePicker
            label="Date"
            setOpen={setOpenDrawerDate}
            open={openDrawerDate}
          />
        </div>

        <div className="mb-6">
          <label>Status</label>
          <div className="mt-2">
            <Select
              className="w-[100%]"
              defaultValue=""
              onChange={handleChangeSelect}
              options={[
                { value: "Pending", label: "Pending" },
                { value: "In Progress", label: "In Progress" },
                { value: "Resolved", label: "Resolved" },
              ]}
            />
          </div>
        </div>

        <div>
          {filterData.map((item: any, index) => {
            return (
              <div key={index}>
                <div className="mb-2 text-primary-color font-medium text-base">
                  {item.title}
                </div>
                <div className="flex flex-wrap mb-6">
                  {item.userRole.map((items: any, index: any) => {
                    return (
                      <div className="text-input-bg-color rounded-xl text-sm font-normal p-1 pr-3 pl-3 mr-2 mb-2 cursor-pointer">
                        {items}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="mb-2 text-teriary-color font-medium text-base">
            Assigned To
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {assignUser.map((user) => (
              <div className="flex items-center gap-2 p-2 pr-2 pl-2 text-input-bg-color rounded-[50px]">
                <span className="text-[#6E7191] font-normal text-xs">
                  {user.name}
                </span>
                <CloseCircleFilled
                  style={{ color: "#A3AED0", fontSize: "20px" }}
                  onClick={() => handleRemoveUser(user.id)}
                />
              </div>
            ))}
          </div>

          <BoxWrapper className="border-2 ">
            <div className="mb-4">
              <SearchBar size="small" handleChange={() => { }} />
            </div>
            <div className="assign-users h-52">
              {drawerAssignToData.map((item: any, index: any) => {
                return (
                  <div className="flex justify-between mb-8 ">
                    <div key={index} className="flex">
                      <div className="mr-2">
                        <img src={item.avatar} alt="icon" />
                      </div>
                      <div className="text-secondary-color text-base font-normal">
                        {item.name}
                      </div>
                    </div>
                    <div
                      onClick={() => handleAddUser(item)}
                      className="cursor-pointer light-grey-color text-xs"
                    >
                      {item.btn}
                    </div>
                  </div>
                );
              })}
            </div>
          </BoxWrapper>
        </div>

        <div className="mt-4 justify-end flex">
          <Button className="activity-log-drawer-reset-btn teriary-color hover:teriary-color mr-4 w-28">
            Reset
          </Button>
          <Button className="activity-log-drawer-apply-btn teriary-bg-color hover:white-color white-color w-28">
            Apply
          </Button>
        </div>
      </Drawer>

      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="text-2xl font-semibold primary-color">Help Desk</div>
        </Col>

        <Divider />

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={[10, 10]}>
            <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
              <SearchBar size="middle" handleChange={handleChange} />
            </Col>

            <Col className="flex justify-end " xxl={18} xl={18} lg={16} md={24} sm={24} xs={24}>
              <div className="flex">
                <div className="mr-4">
                  <FiltersButton label="Filter" onClick={handleClick} />
                </div>

                <div>
                  <DropDown
                    options={[
                      'pdf',
                      'excel'
                    ]}
                    requiredDownloadIcon
                    setValue={() => {

                      action.downloadPdfOrCsv(event, csvAllColum, selectedTab === "1" ? tableDataAll : selectedTab === "2" ? tableDataUnassigned : selectedTab === "3" ? tableDataAssigned : selectedTab === "4" ? tableDataResolved : null, "Help Desk Detail")
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-8">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            <AppTabs items={items} onChange={(selectedTab: any) => {
              setSelectedTab(selectedTab)
            }} />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default HelpDesk;
