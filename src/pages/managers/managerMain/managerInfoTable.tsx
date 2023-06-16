import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { GlobalTable, Notifications } from "../../../components";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import useCustomHook from "../actionHandler";
import { useRecoilState } from "recoil";
import { getManagerDetailState } from "../../../store/managerCompanyAdmin";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import { Success } from "../../../assets/images";

const statuses: any = {
  'Pending': "#FFC15D",
  'ACTIVE': '#3DC475',
  'inACTIVE': '#D83A52',
}

const ManagerInfoTable = (props: any) => {
  const { searchItem } = props;
  const action = useCustomHook();
  const [filterId, setFilterId] = useState("");
  const [selectEmail, setSelectEmail] = useState('');
  const managerCardData = useRecoilState<any>(getManagerDetailState);
  const navigate = useNavigate();

  useEffect(() => {
    action.getManagerCompanyAdmin({ page: 1, search: searchItem })
  }, [searchItem])

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
      render: (_: any, data: any) => (
        <div>
          {data?.assignedInterns}
        </div>
      ),
      key: "assignedInterns",
      title: "Assigned Interns",
    },
    {
      dataIndex: "status",
      render: (_: any, data: any) => (
        <div
          className="table-status-style text-center rounded white-color"
          style={{
            backgroundColor: statuses[data.department?.status],
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
        <span onClick={() => {
          setFilterId(data?.id)
          setSelectEmail(data?.companyManager?.email)
        }}>
          <CustomDroupDown menu1={menu2} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const menu2 = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() =>
          navigate(
            `/${ROUTES_CONSTANTS.MANAGER_PROFILE}/${filterId}`
          )
        }
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          action.forgotpassword({
            email: selectEmail,
          });
          Notifications({
            icon: <Success />,
            title: "Success",
            description: "Account resent link sent successfully",
            type: "success",
          });
          navigate(`/${ROUTES_CONSTANTS.MANAGERS}`);
        }}
      >
        Password Reset
      </Menu.Item>
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
