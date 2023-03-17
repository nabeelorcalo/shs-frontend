import React, { useState } from "react";
import { PageHeader, FiltersButton } from "../../components";
import { DropDown, SearchBar } from "../../components";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import GlobalTable from "../../components/Table/Table";
import { Avatar, Button, Popover, Divider } from "antd";
import { More } from "../../assets/images";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { BoxWrapper } from "../../components/BoxWrapper/BoxWrapper";
import Drawer from "../../components/Drawer";

const PopOver = () => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            navigate("profile");
          }}
        >
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            navigate("chat");
          }}
        >
          Chat
        </a>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <More />
    </Dropdown>
  );
};

const Interns = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [state, setState] = useState(false);
  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "posted_by",
      key: "posted_by",
      title: "Posted By",
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
      dataIndex: "joining_date",
      key: "joining_date",
      title: "Joining Date",
    },
    {
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      title: "Date of Birth",
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
      title: "Research Analyst",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
      location: "virtual",
      status: "Pending",
      posted_by: "T",
    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      location: "Onsite",
      status: "Active",
      posted_by: "U",
    },
    {
      no: "02",
      title: "Business Analyst",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      location: "Onsite",
      status: "Rejected",
      posted_by: "U",
    },
  ];
  const newTableData = tableData.map((item, idx) => {
    return {
      no: item.no,
      posted_by: <Avatar>{item.posted_by}</Avatar>,
      title: item.title,
      department: item.department,
      joining_date: item.joining_date,
      date_of_birth: item.date_of_birth,
      location: item.location,
      actions: <PopOver />,
    };
  });
  console.log(value);
  return (
    <>
      <PageHeader title="Interns" />
      <Divider />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <SearchBar
            className=""
            handleChange={() => {}}
            name="search bar"
            placeholder="search"
            size="middle"
          />
          <div className="flex flex-row gap-4">
            <FiltersButton
              label="View"
              onClick={() => {
                setShowDrawer(true);
              }}
            />
          </div>
        </div>
        <BoxWrapper>
          <div className="pt-3">
            <GlobalTable
              columns={columns}
              expandable={{
                expandedRowRender: () => {},
                rowExpandable: function noRefCheck() {},
              }}
              tableData={newTableData}
            />
          </div>
        </BoxWrapper>
      </div>
    </>
  );
};

export default Interns;
