import { useEffect, useState } from "react";
import { Row, Col, TablePaginationConfig, Dropdown, MenuProps } from "antd";
import {
  NewImg, PendingImg, RejectedImg, SignedImg, Rejected, Signed, Recevied,
  GreenErrow, GreenEye, GreenLock, RedLock, PendingLock, PendingView, More
} from "../../../assets/images";
import { Alert, BoxWrapper, DropDown, GlobalTable, Loader, PageHeader, SearchBar } from "../../../components";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import "./style.scss";
import { useRecoilState, useResetRecoilState } from "recoil";
import { contractFilterState, contractPaginationState } from "../../../store";

const timeFrameDropdownData = ['All', 'This week', 'Last week', 'This month', 'Last Month', 'Date Range']
const statusDropdownData = ['All', 'New', 'Pending', 'Rejected', 'Signed']

const CompanyAdmin = () => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState({ isToggle: false, id: '' });
  const [tableParams, setTableParams]: any = useRecoilState(contractPaginationState);
  const [filter, setFilter] = useRecoilState(contractFilterState);
  const [loading, setLoading] = useState(true);
  const resetList = useResetRecoilState(contractFilterState);
  const resetTableParams = useResetRecoilState(contractPaginationState);

  const {
    contractDashboard,
    contractData,
    getContractDashboard,
    getContractList,
    deleteContractHandler,
    editContractDetails
  }: any = useCustomHook();

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };

  useEffect(() => {
    let args = removeEmptyValues(filter)
    getContractList(args, setLoading);
    getContractDashboard()
  }, [filter.page, filter.search, filter.status])

  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  const contractList = contractData?.data;

  const resendDetails = (val: any) => {
    const params = {
      content: val.content,
      status: 'NEW',
      reason: 'any'
    }
    editContractDetails(val.id, params)
  }

  const PopOver = (props: any) => {
    const { item } = props
    const viewDetailsHandler = (status: any) => {
      switch (status) {
        case 'SIGNED': return navigate(`/${ROUTES_CONSTANTS.SIGNED_CompanyAdmin}`, { state: item })
        case 'REJECTED': return navigate(`/${ROUTES_CONSTANTS.REJECTED_CompanyAdmin}`, { state: item })
        default: return navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`, { state: item })
      }
    }

    let items: MenuProps['items'] = [
      {
        key: "1",
        label: <a onClick={() => viewDetailsHandler(item?.status)}>
          View Details
        </a>
      },
      {
        key: '2',
        label: <a onClick={() => resendDetails(item)}> Resend</a>
      },
      {
        key: "3",
        label: <a onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`, { state: item })}>Edit</a>,
      },
      {
        key: "4",
        label: <a onClick={() => setShowDelete({ isToggle: true, id: item.id })}>Delete</a>
      },
    ];

    switch (item.status) {
      case 'SIGNED': items = items?.slice(0, 1)
        break;
      case 'CHANGEREQUEST': items = items?.slice(2, 4)
        break;
      case 'REJECTED': items = items?.slice(0, 1).concat(items.slice(2))
        break;
      default: items
    }

    return (
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{ width: 180 }}
      >
        <More className="cursor-pointer" />
      </Dropdown>
    )
  }

  const handleTimeFrameValue = (val: any) => {
    let args = removeEmptyValues(filter)
    setFilter({ ...filter, filterType: val?.toUpperCase()?.replace(" ", "_") });
    const item = timeFrameDropdownData.some(item => item === val)
    if (item) {
      getContractList(args, setLoading, val?.toUpperCase()?.replace(" ", "_"))
    }
    else {
      const [startDate, endDate] = val.split(",")
      getContractList(args, setLoading, "DATE_RANGE", startDate, endDate)
    }
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  const tableColumns = [
    {
      title: "No",
      dataIndex: "No",
      align: "center",

    },
    {
      title: "Title",
      dataIndex: "Title",
    },
    {
      title: "",
      dataIndex: "address"
    },
    {
      title: "Initiated On",
      dataIndex: "initiatedOn"
    },
    {
      title: "Signed On",
      dataIndex: "signedOn"
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
    },
  ];

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const newTableData = contractList?.map((item: any, index: number) => {
    const signedDate = dayjs(item.singedOn).format("DD/MM/YYYY");
    const signedTime = dayjs(item.singedOn).format("hh:mm A");
    const initiatedDate = dayjs(item.createdAt).format("DD/MM/YYYY");
    const initiateTime = dayjs(item.createdAt).format("hh:mm A");
    return (
      {
        key: index,
        No: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
        Title: <div className="flex items-center">
          {
            item.status === "REJECTED" || item.status === "CHANGEREQUEST" ?
              (<img src={Rejected} alt="img" width={40} height={40} />) : item.status === "SIGNED" ?
                (<img src={Signed} alt="img" width={40} height={40} />) :
                (<img src={Recevied} alt="img" width={40} height={40} />)
          }
          <div className="text-start pl-4">
            <div className="text-base capitalize">{item?.type?.toLowerCase()}</div>
            <div className="text-sm light-grey-color">From {item?.receiver?.company?.businessName}</div>
          </div>
        </div>,
        address: <div>
          <div className="flex gap-5 items-center pb-2">
            <div>
              <GreenErrow />
            </div>
            <div>
              <GreenLock />
            </div>
            <div>{item?.sender?.firstName} {item?.sender?.lastName}</div>
          </div>
          <div className="flex gap-5 items-center">
            <div>{!item.viewed ? <PendingView /> : <GreenEye />}</div>
            <div>
              {item.viewed ? <PendingLock /> : item.status !== 'SIGNED' ? <RedLock /> : <GreenLock />}
            </div>
            <div>{item?.receiver?.userDetail?.firstName} {item?.receiver?.userDetail?.lastName}</div>
          </div>
        </div>,
        initiatedOn: <div>
          <div>{initiateTime}</div>
          <div className="light-grey-color text-sm">{initiatedDate}</div>
        </div>,
        signedOn: <div>
          <div>{item.singedOn ? signedTime : 'N/A'}</div>
          <div className="light-grey-color text-sm">{item.singedOn ? signedDate : 'N/A'}</div>
        </div>,
        status: <div
          className={`contract-company-admin-status-bage ${item.status === "REJECTED" || item.status === "CHANGEREQUEST"
            ? "REJECTED"
            : item.status === "PENDING"
              ? "PENDING"
              : "SUCCESS"
            }`}
        >
          {item.status === "REJECTED"
            ? "Rejected"
            : item.status === "PENDING"
              ? "Pending" : item.status === "NEW"
                ? "New"
                : item.status === "SIGNED"
                  ? "Signed" : "Change Request"}
        </div>,
        actions: <PopOver item={item} />
      }
    )
  })

  const dashboardData = contractDashboard?.map((item: any, index: number) => {
    return (
      {
        key: index,
        title: item.status,
        num: item.count
      }
    )
  })
  const statusImageHandler = (status: any) => {
    switch (status) {
      case 'NEW': return <NewImg />
      case 'PENDING': return <PendingImg />
      case 'REJECTED': return <RejectedImg />
      case 'SIGNED': return <SignedImg />
    }
  }

  const deleteContract = (id: any) => {
    let args = removeEmptyValues(filter)
    deleteContractHandler(args, setLoading, id)
  }

  return (
    <div className="contract-company-admin">
      <Alert
        state={showDelete.isToggle}
        setState={setShowDelete}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        okBtnFunc={() => deleteContract(showDelete?.id)}
      >
        <p>Are you sure you want to delete this? Once deleted, you will not be able to recover it.</p>
      </Alert>
      <PageHeader title="Contracts" bordered={true} />
      <Row gutter={[20, 20]}>
        {
          dashboardData?.map((item: any, index: any) => {
            return (
              <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} key={index}>
                <BoxWrapper className="p-6 rounded-[16px] h-[150px]">
                  <div>
                    <div className="flex">
                      {statusImageHandler(item.title)}
                      <div className="flex flex-col items-center pl-4">
                        <p className=" text-xl font-semibold mt-2 text-primary-color capitalize">{item.title?.toLowerCase()}</p>
                        <div className="text-[38px] font-medium mt-4">{item.num > 9 ? item.num : `0${item.num}`}</div>
                      </div>
                    </div>
                  </div>
                </BoxWrapper>
              </Col>
            )
          })
        }
      </Row>
      <Row className="mt-8" gutter={[20, 20]}>
        <Col xl={7} lg={9} md={24} sm={24} xs={24}>
          <SearchBar
            placeholder="Search by reciever name"
            handleChange={(e: any) => setFilter({ ...filter, search: e })} />
        </Col>
        <Col xl={17} lg={15} md={24} sm={24} xs={24} className="flex gap-4 justify-end contract-right-sec" >
          <DropDown name="Time Frame" options={timeFrameDropdownData}
            showDatePickerOnVal={'Date Range'}
            requireRangePicker placement="bottom"
            value={filter?.filterType?.toLowerCase()?.replace("_", " ")}
            setValue={(e: any) => handleTimeFrameValue(e)}
          />
          <DropDown name="Status" options={statusDropdownData}
            placement="bottom"
            value={filter.status}
            setValue={(e: any) => setFilter({ ...filter, status: e })}
          />
        </Col>
        <Col xs={24}>
          {loading ? <Loader /> :
            <BoxWrapper>
              <GlobalTable
                id="contractTable"
                loading={loading}
                pagination={tableParams?.pagination}
                columns={tableColumns}
                tableData={newTableData}
                pagesObj={contractData?.pagination}
                handleTableChange={handleTableChange}
              />
            </BoxWrapper>
          }
        </Col>
      </Row>
    </div>
  );
};
export default CompanyAdmin;