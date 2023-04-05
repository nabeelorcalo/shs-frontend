import React, { useState } from "react";
import "./style.scss";
import { Button, Col, Divider, Row } from "antd";
import { CommonDatePicker, DropDown, SearchBar, FiltersButton } from "../../../components";
import Drawer from "../../../components/Drawer";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import { GlobalTable } from "../../../components";
import useCustomHook from "../actionHandler"




const tableData = [
  {
    ID: "01",
    Users: "Subject kmy cc",
    UserRole: "john",
    Activity: "issue Name",
    PerformedBy: "kljdasfhuasd",
    Priority: "high",
    DateTime: "22/09/2013",
    PerformerRole: "amila clark",
  },
  {

    ID: "02",
    Users: "file2",
    UserRole: "john",
    Activity: "issue Name",
    PerformedBy: "kljdasfhuasd",
    Priority: "high",
    DateTime: "22/09/2013",
    PerformerRole: "amila clark",

  },
  {

    ID: "03",
    Users: "file3",
    UserRole: "john",
    PerformedBy: "kljdasfhuasd",
    Activity: "issue Name",
    Priority: "high",
    DateTime: "22/09/2013",
    PerformerRole: "amila clark",

  },
];



const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "key",
    minWidth: 300,
  },
  {
    title: "Users",
    dataIndex: "Users",
    key: "Users",
  },
  {
    title: "UserRole",
    dataIndex: "UserRole",
    key: "UserRole",
  },

  {
    title: "Activity",
    dataIndex: "Activity",
    key: "Activity",
  },
  {
    title: "Performed By",
    dataIndex: "PerformedBy",
    key: "PerformedBy",
  },
  {
    title: "Performer Role",
    dataIndex: "PerformerRole",
    key: "PerformerRole",
  },
  {
    title: "Date & Time",
    dataIndex: "DateTime",
    key: "Date&Time",
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

  {
    title: "Activity",
    userRole: [
      "Add User",
      "Remove User",
      "Rejected Post",
      "Performance Evaluate",
      "Updated Task",
      "Password Reset",
      "Registered University",
    ],
  },

  {
    title: "Performer Role",
    userRole: [
      "Company Admin",
      "System Admin",
      "Intern",
      "Student",
      "University Representatives",
      "Mananger",
      "Student",
    ],
  },
];



const ActivityLog = () => {

  const action = useCustomHook();

  const csvAllColum = ["Sr.No", "Name", "Email", "PhoneNumber", "University" ,"City" , "Hired","Status"]

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerDate, setOpenDrawerDate] = useState(false);

  const handleChange = () => {
    console.log("change");
  };

  const handleClick = () => {
    setOpenDrawer(true);
  };
  return (
    <div className="activity-log">
      <Drawer
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        title="Filters"
      >
        {filterData.map((item: any, index) => {
          return (
            <div key={index}>
              <div className="mb-2 text-primary-color font-medium text-base">
                {item.title}
              </div>
              <div className="flex flex-wrap mb-6">
                {item.userRole.map((items: any, index: any) => {
                  return (
                    <div className="text-input-bg-color rounded-xl text-sm font-normal p-1 mr-2 mb-2 cursor-pointer">
                      {items}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div>
          <CommonDatePicker
            label="Date"
            setOpen={setOpenDrawerDate}
            open={openDrawerDate}
          />
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
          <div className="text-2xl font-semibold text-[#363565]">
            Activity Log
          </div>
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

                      action.downloadPdfOrCsv(event, csvAllColum, tableData, "Activity Log Detail")
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
            <GlobalTable columns={columns} tableData={tableData} />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityLog;
