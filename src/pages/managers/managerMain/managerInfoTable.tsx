import React, { useEffect } from "react";
import { EllipsisOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { GlobalTable } from "../../../components";
import { Pf } from "../../../assets/images";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import useCustomHook from "../actionHandler";
import { useRecoilState } from "recoil";
import { getManagerDetailState } from "../../../store/managerCompanyAdmin";

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
  const action = useCustomHook();
  const managerCardData = useRecoilState<any>(getManagerDetailState);
  console.log(managerCardData,'managerCardData');

  useEffect(() => {
    action.getManagerCompanyAdmin(1)
  }, [])
  const columns = [
    {dataIndex: "No",
      render: (_: any, data: any) => (
        <div>
          {data.managerId}
        </div>
      ),
      key: "no",
      title: "No",
    },
    {
      dataIndex: "img",
      render: (_: any, data: any) => (
        <div >
          <img src= {`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} alt="userImage"  style={{width:"45px"}}/>
        </div>
      ),
      key: "img",
      title: "Avatar",
    },

    {
      dataIndex: "Name",
      render: (_: any, data: any) => (
        <div>
          {data.companyManager.firstName}   {data.companyManager.lastName}
        </div>
      ),
      key: "firstName",
      title: "Name",
    },

    {
      dataIndex: "desgination",
      render: (_: any, data: any) => (
        <div>
          {data.title}   
        </div>
      ),
      key: "desgination",
      title: "Desgination",
    },

    {
      dataIndex: "assignedInterns",
      key: "assignedInterns",
      title: "Assigned Interns",
    },

    {
      dataIndex: "status",
      render: (_: any, data: any) => (
        <div
          className="table-status-style text-center rounded white-color"
          style={{
            backgroundColor:
              data.department?.status=== "Pending"
                ? "#FFC15D"
                : data.department?.status === "ACTIVE"
                  ? "#3DC475"
                  : data.department?.status === "inACTIVE"
                    ? "#D83A52"
                    : "",
            padding: " 2px 3px 2px 3px",
          }}
        >
          {data.department?.status}
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
        <GlobalTable tableData={managerCardData[0]} columns={columns} />
      </div>
    </div>
  );
};

export default ManagerInfoTable;
