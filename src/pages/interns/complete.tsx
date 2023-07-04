import React, { useState } from "react";
import {
  SearchBar,
  PageHeader,
  GlobalTable,
  BoxWrapper,
  InternsCard,
  ListAndGridViewButton,
  DropDown,
  ToggleButton,
} from "../../components";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Space } from "antd";
import { CardViewIcon, More, TableViewIcon } from "../../assets/images";
import type { MenuProps } from "antd";

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
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight" overlayStyle={{ width: 180 }}>
      <More />
    </Dropdown>
  );
};

const Complete = () => {
  const [listandgrid, setListandgrid] = useState(false);
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
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      title: "Date of Birth",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
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
      name: "Naveed Khatak",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
      status: "Completed",
    },
    {
      no: "02",
      name: "Atzazz khan",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Completed",
    },
    {
      no: "02",
      name: "Ismail Inayat",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Completed",
    },
    {
      no: "01",
      name: "Naveed Khatak",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
      status: "Completed",
    },
    {
      no: "02",
      name: "Atzazz khan",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Completed",
    },
    {
      no: "02",
      name: "Ismail Inayat",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Completed",
    },
    {
      no: "01",
      name: "Naveed Khatak",
      department: "Business Analyst",
      joining_date: "01/07/2022",
      date_of_birth: "01/07/2022",
      status: "Completed",
    },
    {
      no: "02",
      name: "Atzazz khan",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Completed",
    },
    {
      no: "02",
      name: "Ismail Inayat",
      department: "Scientist Analyst",
      joining_date: "01/07/2023",
      date_of_birth: "01/07/2021",
      status: "Completed",
    },
  ];
  const newTableData = tableData.map((item, idx) => {
    return {
      no: item.no,
      posted_by: <Avatar src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} />,
      name: item.name,
      department: item.department,
      joining_date: item.joining_date,
      date_of_birth: item.date_of_birth,
      status: (
        <Button size="small" className="bg-[#e2e2e2]">
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Button>
      ),
      actions: <PopOver />,
    };
  });
  console.log(listandgrid);
  return (
    <>
      <PageHeader title="Interns" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar className="" handleChange={() => {}} name="search bar" placeholder="search" size="middle" />
          </div>
          <div className="flex flex-row gap-4">
            <ToggleButton
              isToggle={listandgrid}
              onTogglerClick={() => {
                setListandgrid(!listandgrid);
              }}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className="w-[88px]"
            />
          </div>
        </div>

        <div className="pt-3">
          {listandgrid ? (
            <div className="flex flex-row flex-wrap max-sm:flex-col">
              {newTableData.map((item, idx) => {
                return (
                  <InternsCard
                    posted_by={item.posted_by}
                    title={item.name}
                    department={item.department}
                    joining_date={item.joining_date}
                    date_of_birth={item.date_of_birth}
                  />
                );
              })}
            </div>
          ) : (
            <BoxWrapper>
              <GlobalTable
                columns={columns}
                expandable={{
                  expandedRowRender: () => {},
                  rowExpandable: function noRefCheck() {},
                }}
                tableData={newTableData}
              />
            </BoxWrapper>
          )}
        </div>
      </div>
    </>
  );
};

export default Complete;
