import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, Row, Menu, Button, TablePaginationConfig, Select } from 'antd';
import {
  DropDown,
  SearchBar,
  GlobalTable,
  BoxWrapper,
  Alert,
  PopUpModal,
  Notifications
} from "../../../../components";
import CustomDroupDown from "../../../digiVault/Student/dropDownCustom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { withDrawalFilterState, withDrawalPaginationState, withDrawalRequestState } from "../../../../store/withDrawalRequest";
import useCustomHook from "../../actionHandler";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { AlertIcon, Success, SuccessIcon, WarningIcon } from "../../../../assets/images";

const statuses: any = {
  'pending': "#FFC15D",
  'completed': '#3DC475',
  'rejected': '#D83A52',
}

const WithDrawalRequest = forwardRef((props: any, ref) => {
  const [tableParams, setTableParams]: any = useRecoilState(withDrawalPaginationState);
  const [filter, setFilter] = useRecoilState(withDrawalFilterState);
  const resetList = useResetRecoilState(withDrawalFilterState);
  const resetTableParams = useResetRecoilState(withDrawalPaginationState);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [searchItem, setSearchItem] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [accessState, setAccessState] = useState('')
  const [recieptData, setRecieptData] = useState('')
  const [openAccept, setOpenAccept] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const action = useCustomHook();
  const withDrawalAmount = useRecoilState<any>(withDrawalRequestState);

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any, index: any) => (
        <div>
          {formatRowNumber((params?.page - 1) * params?.limit + index + 1)}
        </div>
      ),
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "bankName",
      render: (_: any, item: any) => (
        <div>
          {item?.bankName || 'N/A'}
        </div>
      ),
      key: "bankName",
      title: "Bank Name",
    },
    {
      dataIndex: "datetime",
      render: (_: any, item: any) => (
        <div>
          {dayjs(item?.createdAt).format('DD/MMM/YY , HH:mm a') || 'N/A'}
        </div>
      ),
      key: "datetime",
      title: "Date/Time",
    },
    {
      dataIndex: "transactionId",
      render: (_: any, item: any) => (
        <div>
          {item?.transactionId || 'N/A'}
        </div>
      ),
      key: "transactionId",
      title: "Transaction Id",
    },
    {
      dataIndex: "amount",
      render: (_: any, item: any) => (
        <div>
          {item?.amount || '0'} GBP
        </div>
      ),
      key: "amount",
      title: "Amount",
    },
    {
      dataIndex: "Fee",
      render: (_: any, item: any) => (
        <div>
          £ {item?.fee || '0'}
        </div>
      ),
      key: "Fee",
      title: "Fee",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center white-color rounded-lg w-[100px] py-[1px] capitalize"
          style={{
            backgroundColor: statuses[item?.status],
          }}
        >
          {item?.status || 'N/A'}
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
          setOpenAccept(true)
        }}
      >
        Accept
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => setOpenReject(true)}
      >
        Reject
      </Menu.Item>
    </Menu>
  );
  const reject = (
    <Menu>
      <Menu.Item key='1'
        onClick={() => setOpenAccept(true)}
      >
        Accept
      </Menu.Item>
    </Menu>
  )
  const completed = (
    <Menu>
      <Menu.Item
        key='1'
        onClick={() => navigate(`/${ROUTES_CONSTANTS.DELEGATE_AGENT}/${recieptData}`)}
      >
        View Reciept
      </Menu.Item>
    </Menu>
  )

  const acceptHandler = () => {
    setOpenAccept(false)
    action.withDrawalAccess(accessState, { status: 'rejected' })
    Notifications({
      icon: <Success />,
      title: "Success",
      description:
        "Withdrawal amount completed",
      type: "success",
    });
  }

  const rejectHandler = () => {
    setOpenReject(false)
    action.withDrawalAccess(accessState, { status: 'rejected' })
    Notifications({
      icon: <Success />,
      title: "Success",
      description:
        "Withdrawal amount rejected",
      type: "success",
    });
  }

  useEffect(() => {
    fetchWithDrawal();
  }, [searchItem, statusFilter, filter.page, filter.limit])

  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const searchValue = (e: any) => {
    setSearchItem(e);
    setFilter({ ...filter, page: 1 })
    setTableParams((prevFilter: any) => ({
      ...prevFilter,
      pagination: {
        ...prevFilter.pagination,
        current: 1
      }
    }))
  };

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setStatusFilter('')
    },
  }));

  const fetchWithDrawal = () => {
    const param: any = {};
    if (searchItem) param['q'] = searchItem;
    if (statusFilter) param['status'] = statusFilter;
    action.getWithDrawalRequestData({
      ...params,
      page: filter.page,
      limit: filter.limit,
      q: searchItem,
      status: statusFilter
    },
      tableParams,
      setTableParams);
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  return (
    <div className="with-drawal-request">
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex justify-center md:justify-end gap-3 mt-3 md:mt-0 delegate-right-menu">
            <Select
              size="middle"
              className="w-[11%]"
              placeholder='Status'
              options={[
                { value: null, label: "All" },
                { value: "Completed", label: "Completed" },
                { value: "Pending", label: "Pending" },
                { value: "Rejected", label: "Rejected" }
              ]}
              onChange={(e: any) => {
                setStatusFilter(e)
                setFilter({ ...filter, page: 1 })
                setTableParams((prevFilter: any) => ({
                  ...prevFilter,
                  pagination: {
                    ...prevFilter.pagination,
                    current: 1
                  }
                }))
              }}
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
              <GlobalTable
                columns={columns}
                tableData={withDrawalAmount[0]}
                pagination={tableParams?.pagination}
                handleTableChange={handleTableChange}
                pagesObj={action.withDrawalpaginationObject}
              />
            </div>
          </BoxWrapper>
        </Col>
      </Row>
      <PopUpModal
        open={openAccept}
        width={500}
        close={() => setOpenAccept(false)}
        children={
          <div className="flex flex-col gap-5">
            <div className='flex flex-row items-center gap-3'>
              <div><SuccessIcon /></div>
              <div><h2>Accept</h2></div>
            </div>
            <p>Are you sure you want to complete this withdrawal request?</p>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="middle"
              className="button-default-tertiary  max-sm:w-full"
              onClick={() => setOpenAccept(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="middle"
              className="button-tertiary  max-sm:w-full"
              onClick={acceptHandler}
            >
              Confirm
            </Button>
          </div>
        }
      />
      <PopUpModal
        open={openReject}
        width={500}
        close={() => setOpenReject(false)}
        children={
          <div className="flex flex-col gap-5">
            <div className='flex flex-row items-center gap-3'>
              <div><AlertIcon /></div>
              <div><h2>Reject</h2></div>
            </div>
            <p>Are you sure you want to reject this withdrawal request?</p>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="middle"
              className="border-[#D83A52] text-error-color  max-sm:w-full"
              onClick={() => setOpenReject(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="middle"
              className="text-error-bg-color max-sm:w-full"
              onClick={rejectHandler}
            >
              Reset
            </Button>
          </div>
        }
      />
    </div>
  );
});

export default WithDrawalRequest;
