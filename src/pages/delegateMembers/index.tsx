import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import { Table, Space, Dropdown, Button, Row, Col } from "antd";
import { IconAngleDown } from "../../assets/images";
import { SearchBar, PageHeader } from "../../components";
import "./style.scss";
import useCustomHook from "./actionHandler";
import dayjs from "dayjs";

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  rewardAmount: string;
  memberType: string;
  joiningDate: string;
  location: string;
  status: string;
  id?: number;
  referredToUser?: any;
}

// Temporary Data
const tableData = [
  {
    key: "1",
    name: "Ana Black",
    email: "anablack@gmail.com",
    rewardAmount: "£15",
    memberType: "University",
    joiningDate: "20/10/2022",
    location: "Virtual",
    status: "active",
  },
  {
    key: "2",
    name: "James",
    email: "james@gmail.com",
    rewardAmount: "£3",
    memberType: "Student",
    joiningDate: "20/10/2022",
    location: "Glasgow",
    status: "inactive",
  },
  {
    key: "3",
    name: "Elijah",
    email: "elijah@gmail.com",
    rewardAmount: "£5",
    memberType: "Intern",
    joiningDate: "20/10/2022",
    location: "London",
    status: "active",
  },
  {
    key: "4",
    name: "Ana Black",
    email: "mateo@gmail.com",
    rewardAmount: "£15",
    memberType: "University",
    joiningDate: "20/10/2022",
    location: "Virtual",
    status: "active",
  },
  {
    key: "5",
    name: "James",
    email: "michael@gmail.com",
    rewardAmount: "£3",
    memberType: "Student",
    joiningDate: "20/10/2022",
    location: "Edinburgh",
    status: "inactive",
  },
  {
    key: "1",
    name: "Ana Black",
    email: "anablack@gmail.com",
    rewardAmount: "£15",
    memberType: "University",
    joiningDate: "20/10/2022",
    location: "Virtual",
    status: "active",
  },
  {
    key: "2",
    name: "James",
    email: "james@gmail.com",
    rewardAmount: "£3",
    memberType: "Student",
    joiningDate: "20/10/2022",
    location: "Glasgow",
    status: "inactive",
  },
  {
    key: "3",
    name: "Elijah",
    email: "elijah@gmail.com",
    rewardAmount: "£5",
    memberType: "Intern",
    joiningDate: "20/10/2022",
    location: "London",
    status: "active",
  },
  {
    key: "4",
    name: "Ana Black",
    email: "mateo@gmail.com",
    rewardAmount: "£15",
    memberType: "University",
    joiningDate: "20/10/2022",
    location: "Virtual",
    status: "active",
  },
];

const DelegateMembers = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedType, setSelectedType] = useState({ key: "", value: "" });
  const [selectedStatus, setSelectedStatus] = useState({ key: "", value: "" });
  const [search, setSearch] = useState("");
  const { getMembers, membersData, totalCount } = useCustomHook();
  const statusItems: MenuProps["items"] = [
    {
      key: "ACTIVE",
      label: "Active",
    },
    {
      key: "INACTIVE",
      label: "Inactive",
    },
  ];

  const typeItems: MenuProps["items"] = [
    {
      key: "COMPANY_ADMIN",
      label: "Company Admin",
    },
    {
      key: "COMPANY_MANAGER",
      label: "Manager",
    },
    {
      key: "STUDENT",
      label: "Student",
    },
    {
      key: "INTERN",
      label: "Intern",
    },
    {
      key: "UNIVERSITY",
      label: "University",
    },
  ];

  const tableColumns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "no.",
      align: "center",
      render: (_, row, index) => {
        return (
          <>
            {index < 9 ? 0 : null}
            {index + 1}
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <p className="min-w-[110px] text-sm">
          {record?.referredToUser?.firstName} {record?.referredToUser?.lastName}
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => (
        <p className=" text-sm">{record?.referredToUser?.email}</p>
      ),
    },
    {
      title: "Reward Amount",
      dataIndex: "rewardAmount",
      key: "rewardAmount",
    },
    {
      title: "Member Type",
      dataIndex: "memberType",
      render: (text, record) => (
        <p className=" text-sm">
          {record?.referredToUser?.role
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, (char: string) => char.toUpperCase())}
        </p>
      ),
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      render: (text, record) => (
        <p className=" text-sm">
          {dayjs(record?.referredToUser?.createdAt).format("YYYY/MM/DD")}
        </p>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (text, record) => (
        <p className=" text-sm">{record?.referredToUser?.location || "N/A"}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, row, index) => {
        return (
          <div
            className={`shs-status-badge ${
              row?.referredToUser?.status?.toLowerCase() === "active"
                ? "success"
                : "error"
            }`}
          >
            {row?.referredToUser?.status?.toLowerCase() === "active"
              ? "Active"
              : "Inactive"}
          </div>
        );
      },
    },
  ];

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getMembersData();
  }, [pageNo, selectedStatus, selectedType, search]);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleStatusClick = ({ key }: any) => {
    const clickedItem = statusItems.findIndex((sti) => sti?.key === key);
    if (clickedItem !== -1)
      setSelectedStatus({ key, value: statusItems[clickedItem]?.label });
  };
  const handleTypeClick = ({ key }: any) => {
    const clickedItem = typeItems.findIndex((sti) => sti?.key === key);
    if (clickedItem !== -1)
      setSelectedType({ key, value: typeItems[clickedItem]?.label });
  };
  const handleTableChange = (pagination: any) => {
    setPageNo(pagination);
  };
  const getMembersData = () => {
    let params: any = {
      page: pageNo,
      limit,
    };
    if (selectedStatus.key) params["status"] = selectedStatus?.key;
    if (selectedType.key) params["type"] = selectedType?.key;
    if (search) params["q"] = search;
    getMembers(params);
  };

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="delegate-members">
      <PageHeader title="Delegate Members" bordered />
      <Row gutter={[20, 20]} className="page-filterbar">
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={(word: string) => setSearch(word)} />
        </Col>
        <Col
          xl={18}
          md={24}
          sm={24}
          xs={24}
          className="flex justify-end gap-4 main-filter-btns"
        >
          <div className="requests-filterby-status">
            <Dropdown
              overlayClassName="shs-dropdown"
              menu={{ items: statusItems, onClick: handleStatusClick }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button className="button-sky-blue main-btn">
                {selectedStatus?.value ? selectedStatus?.value : "Status"}
                <IconAngleDown />
              </Button>
            </Dropdown>
          </div>
          <div className="dropdown-download">
            <Dropdown
              overlayClassName="shs-dropdown"
              menu={{ items: typeItems, onClick: handleTypeClick }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button className="button-sky-blue main-btn">
                {selectedType?.value ? selectedType?.value : "Type"}
                <IconAngleDown />
              </Button>
            </Dropdown>
          </div>
        </Col>
        <Col xs={24}>
          <div className="shs-table-card table-delegate-members">
            <div className="shs-table">
              <Table
                scroll={{ x: "max-content" }}
                columns={tableColumns}
                dataSource={membersData}
                pagination={{
                  pageSize: limit,
                  current: pageNo,
                  total: totalCount,
                  onChange: handleTableChange,
                  showTotal: (total) => (
                    <>
                      Total: <span>{total}</span>
                    </>
                  ),
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DelegateMembers;
