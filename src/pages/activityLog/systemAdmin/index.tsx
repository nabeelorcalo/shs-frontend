import React, { useState } from "react";
import "./style.scss";
import { Button, Col, Divider, Row } from "antd";
import { CommonDatePicker, DropDown, SearchBar, FiltersButton } from "../../../components";
import Drawer from "../../../components/Drawer";
import { BoxWrapper } from "../../../components/BoxWrapper/boxWrapper";
import GlobalTable from "../../../components/Table";

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
    dataIndex: "Date&Time",
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

const options = ["pdf", "excel"];

const ActivityLog = () => {
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
            <Col xxl={7} xl={8} lg={8} md={8} sm={12} xs={24}>
              <SearchBar size="middle" handleChange={handleChange} />
            </Col>
            <Col xxl={14} xl={12} lg={8} md={8} sm={1} xs={1}></Col>

            <Col xxl={3} xl={4} lg={8} md={8} sm={11} xs={24}>
              <div className="flex">
                <div className="mr-4">
                  <FiltersButton label="Filter" onClick={handleClick} />
                </div>

                <div>
                  <DropDown requiredDownloadIcon={true} options={options} />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-8">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            <GlobalTable columns={columns} />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityLog;
