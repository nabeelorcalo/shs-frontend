import React, { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Col, Row, Menu } from "antd";
import { DropDown, SearchBar, GlobalTable, BoxWrapper } from "../../../../components";
import CustomDroupDown from "../../../digiVault/Student/dropDownCustom";
import { useRecoilState } from "recoil";
import { withDrawalRequestState } from "../../../../store/withDrawalRequest";
import useCustomHook from "../../actionHandler";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ROUTES_CONSTANTS } from "../../../../config/constants";

const statuses: any = {
  'pending': "#FFC15D",
  'completed': '#3DC475',
  'rejected': '#D83A52',
}
const limit = 500;

const WithDrawalRequest = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchItem, setSearchItem] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [access, setAccess] = useState<any>("")
  const [accessState, setAccessState] = useState('')
  const [recieptData, setRecieptData] = useState('')
  const action = useCustomHook();
  const withDrawalAmount = useRecoilState<any>(withDrawalRequestState);

  useEffect(() => {
    const param: any = {};
    if (searchItem) param['q'] = searchItem;
    if (statusFilter) param['status'] = statusFilter;
    action.getWithDrawalRequestData({ page: 1, q: searchItem, limit: limit, status: statusFilter });
  }, [searchItem, statusFilter])

  const searchValue = (e: any) => {
    setSearchItem(e);
  };

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any) => (
        <div>
          {item?.id}
        </div>
      ),
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "bankName",
      render: (_: any, item: any) => (
        <div>
          {item?.bankName}
        </div>
      ),
      key: "bankName",
      title: "Bank Name",
    },
    {
      dataIndex: "datetime",
      render: (_: any, item: any) => (
        <div>
          {dayjs(item?.createdAt).format('DD/MMM/YY , HH:mm a')}
        </div>
      ),
      key: "datetime",
      title: "Date/Time",
    },
    {
      dataIndex: "transactionId",
      render: (_: any, item: any) => (
        <div>
          {item?.transactionId}
        </div>
      ),
      key: "transactionId",
      title: "Transaction Id",
    },
    {
      dataIndex: "amount",
      render: (_: any, item: any) => (
        <div>
          {item?.amount} GBP
        </div>
      ),
      key: "amount",
      title: "Amount",
    },
    {
      dataIndex: "Fee",
      render: (_: any, item: any) => (
        <div>
          £ {item?.fee}
        </div>
      ),
      key: "Fee",
      title: "Fee",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center white-color rounded"
          style={{
            backgroundColor: statuses[item?.status],
            padding: " 2px 3px 2px 3px",
            textTransform: "capitalize",
            borderRadius: "8px"
          }}
        >
          {item?.status}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, item: any) => (
        <span
          onClick={() => {
            setAccessState(item?.id)
            setRecieptData(item?.transactionId)
          }
          }
        >
          <CustomDroupDown
            menu1={
              item?.status === 'completed' ?
                completed : item?.status === 'pending' ?
                  pending : reject
            }
          />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const pending = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          action.withDrawalAccess(accessState, { status: 'completed' })
        }}
      >
        Accept
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          action.withDrawalAccess(accessState, { status: 'rejected' })
        }}
      >
        Reject
      </Menu.Item>
    </Menu>
  );
  const reject = (
    <Menu>
      <Menu.Item key='1'
        onClick={() => {
          action.withDrawalAccess(accessState, { status: 'completed' })
        }}
      >
        Accept
      </Menu.Item>
    </Menu>
  )
  const completed = (
    <Menu>
      <Menu.Item key='1'
        onClick={() => navigate(`/${ROUTES_CONSTANTS.DELEGATE_AGENT}/${recieptData}`)}
      >View Reciept</Menu.Item>
    </Menu>
  )
  return (
    <div className="with-drawal-request">
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex justify-center md:justify-end gap-3 mt-3 md:mt-0 delegate-right-menu">
            <DropDown
              name="Status"
              value={statusFilter}
              options={["Completed", "Pending", "Rejected"]}
              setValue={(e: any) => setStatusFilter(e)}
            />
            <DropDown
              name="Method"
              value={value}
              options={["Bank Transfer", "Card Payment"]}
              setValue={setValue}
            />
          </div>
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
              <GlobalTable tableData={withDrawalAmount[0]} columns={columns} />
            </div>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default WithDrawalRequest;
