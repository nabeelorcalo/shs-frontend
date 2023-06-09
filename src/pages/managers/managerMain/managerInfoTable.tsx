import React, { useEffect } from "react";
import { Menu } from "antd";
import { GlobalTable } from "../../../components";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import useCustomHook from "../actionHandler";
import { useRecoilState } from "recoil";
import { getManagerDetailState } from "../../../store/managerCompanyAdmin";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";

const ManagerInfoTable = () => {
  const action = useCustomHook();
  const managerCardData = useRecoilState<any>(getManagerDetailState);
  const navigate = useNavigate();

  useEffect(() => {
    action.getManagerCompanyAdmin()
  }, [])

  const columns = [
    {
      dataIndex: "No",
      render: (_: any, data: any) => (
        <div>
          {data?.managerId}
        </div>
      ),
      key: "no",
      title: "No",
    },
    {
      dataIndex: "img",
      render: (_: any, data: any) => (
        <div >
          <img src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
            alt="userImage"
            style={{ width: "45px" }} />
        </div>
      ),
      key: "img",
      title: "Avatar",
    },
    {
      dataIndex: "Name",
      render: (_: any, data: any) => (
        <div>
          {data?.companyManager.firstName}  {data?.companyManager.lastName}
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
              data.department?.status === "Pending"
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
