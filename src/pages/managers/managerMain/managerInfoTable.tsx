import React from "react";
import { EllipsisOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { GlobalTable } from "../../../components";
import { Pf } from "../../../assets/images";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";

const tableData = [
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    img: (
      <div>
        <Pf />
      </div>
    ),
    status: "Approved",
    desgination: "Data Research Manager",
    Email: "michael.mitc@example.com",
    no: "01",
    PhoneNumber: "070 3397 6621 ",
    name: "Amelia Clark",
    noOfInterns: "03",
  },
  {
    Actions: (
      <span>
        <EllipsisOutlined />
      </span>
    ),
    img: (
      <div>
        <Pf />
      </div>
    ),
    noOfInterns: "08",
    status: "Approved",
    desgination: "Data Research Manager",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "02",
    name: "Andrea Hiyahiya",
  },
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    img: (
      <div>
        <Pf />
      </div>
    ),
    status: "Rejected",
    desgination: "Data Research Manager",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "03",
    noOfInterns: "01",
    name: "Andrea Hiyahiya",
    city: "London",
    hired: "No",
  },
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    img: (
      <div>
        <Pf />
      </div>
    ),
    status: "Pending",
    desgination: "Data Research Manager",
    PhoneNumber: "070 3397 6621 ",
    Email: "jackson.graham@example.com",
    no: "04",
    noOfInterns: "05",
    name: "Jenny Wilson",
    city: "London",
    hired: "No",
  },
];

const ManagerInfoTable = () => {
  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No",
    },
    {
      dataIndex: "img",
      key: "img",
      title: "Avatar",
    },

    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },

    {
      dataIndex: "desgination",
      key: "desgination",
      title: "Desgination",
    },

    {
      dataIndex: "noOfInterns",
      key: "noOfInterns",
      title: "Assigned Interns",
    },

    {
      dataIndex: "status",
      render: (_: any, data: any) => (
        <div
          className="table-status-style text-center rounded white-color"
          style={{
            backgroundColor:
              data.status === "Pending"
                ? "#FFC15D"
                : data.status === "Approved"
                  ? "#3DC475"
                  : data.status === "Rejected"
                    ? "#D83A52"
                    : "",
            padding: " 2px 3px 2px 3px",
          }}
        >
          {data.status}
        </div>
      ),
      key: "status",
      title: "Status",
    },

    {
      render: (_: any, data: any) => (
        <span>
          <CustomDroupDown menu1={menu2} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const menu2 = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="3">Password Reset</Menu.Item>
    </Menu>
  );
  return (
    <div className="manager-info-table">
      <div className="card-style p-2">
        <GlobalTable tableData={tableData} columns={columns} />
      </div>
    </div>
  );
};

export default ManagerInfoTable;
