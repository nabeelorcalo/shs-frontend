import React, { useEffect, useState } from "react";
import { Avatar, Menu } from "antd";
import { GlobalTable, Notifications } from "../../../components";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import useCustomHook from "../actionHandler";
import { useRecoilState } from "recoil";
import { getManagerDetailState } from "../../../store/managerCompanyAdmin";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
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
      render: (_: any, item: any) => (
        <div>
          <Avatar
            size={30}
            src={`${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`}>
            {item?.companyManager?.firstName.charAt(0)}
            {item?.companyManager?.lastName.charAt(0)}
          </Avatar>
        </div>
      ),
      key: "img",
      title: "Avatar",
    },
    {
      dataIndex: "Name",
      render: (_: any, data: any) => (
        <div>
          {data?.companyManager.firstName || 'N/A'}  {data?.companyManager.lastName || 'N/A'}
        </div>
      ),
      key: "firstName",
      title: "Name",
    },
    {
      dataIndex: "desgination",
      render: (_: any, data: any) => (
        <div>
          {data.title || 'N/A'}
        </div>
      ),
      key: "desgination",
      title: "Desgination",
    },
    {
      dataIndex: "assignedInterns",
      render: (_: any, data: any) => (
        <div>
          {data?.assignedInterns || 'N/A'}
        </div>
      ),
      key: "assignedInterns",
      title: "Assigned Interns",
    },
    {
      dataIndex: "status",
      render: (_: any, data: any) => (
        <div
          className="table-status-style text-center white-color rounded-lg w-[100px] py-[1px]"
          style={{
            backgroundColor: statuses[data.department?.status],
          }}
        >
          {data.department?.status || 'N/A'}
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
