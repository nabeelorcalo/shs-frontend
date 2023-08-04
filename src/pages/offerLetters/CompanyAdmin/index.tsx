import { useEffect, useState } from "react";
import { Row, Col, Menu, TablePaginationConfig } from "antd";
import {
  NewImg,
  PendingImg,
  RejectedImg,
  SignedImg,
  Rejected,
  Signed,
  Recevied,
  GreenErrow,
  GreenEye,
  GreenLock,
  RedLock,
  PendingView,
  PendingLock,
} from "../../../assets/images";
import { Alert, BoxWrapper, DropDown, GlobalTable, PageHeader, SearchBar } from "../../../components";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useRecoilState } from "recoil";
import { offerLetterFilterState, contractPaginationState } from "../../../store";

const timeFrameDropdownData = ['All', 'This week', 'Last week', 'This month', 'Last Month', 'Date Range']
const statusDropdownData = ['All', 'New', 'Pending', 'Rejected', 'Signed']

const CompanyAdmin = () => {
  const navigate = useNavigate();
  const [tableParams, setTableParams]: any = useRecoilState(contractPaginationState);
  const [filter, setFilter] = useRecoilState<any>(offerLetterFilterState);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState({ isToggle: false, id: '' });
  const {
    contractData,
    offerLetterDashboard,
    getOfferLetterList,
    getOfferLetterDashboard,
    deleteOfferLetterHandler,
    editContractDetails
  }: any = useCustomHook();

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };
  let Arguments = removeEmptyValues(filter)

  useEffect(() => {
    getOfferLetterList(Arguments, tableParams, setTableParams, setLoading);
    getOfferLetterDashboard()
  }, [filter.search, filter.status])

  const contractList = contractData?.data;
  const resendDetails = (val: any) => {
    const params = {
      content: val.content,
      status: 'NEW',
      reason: 'any'
    }
    editContractDetails(val.id, params)
  }

  const renderDropdown = (item: any) => {
    switch (item.status) {
      case 'REJECTED':
        return <CustomDroupDown menu1={rejected(item)} />
      case 'PENDING':
        return <CustomDroupDown menu1={pending(item)} />
      case 'CHANGEREQUEST':
        return <CustomDroupDown menu1={ChangesRequested(item)} />
      case 'SIGNED':
        return <CustomDroupDown menu1={signed(item)} />
      case 'NEW':
        return <CustomDroupDown menu1={news(item)} />
    }
  }
  const signed = (val: any) => {
    return <Menu>
      <Menu.Item
        onClick={() => navigate(`/${ROUTES_CONSTANTS.SIGNED_CompanyAdmin}`, { state: val })}
        key="1">View Details</Menu.Item>
    </Menu>
  };
  const ChangesRequested = (val: any) => {
    return <Menu>
      <Menu.Item
        onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`, { state: val })}
        key="1">Edit</Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setShowDelete({ isToggle: true, id: val.id });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  };
  const pending = (val: any) => {
    return <Menu>
      <Menu.Item
        onClick={() => navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`, { state: val })}
        key="1">View Details</Menu.Item>
      <Menu.Item key="2"
        onClick={() => resendDetails(val)}>Resend</Menu.Item>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`, { state: val })} key="3">Edit</Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => {
          setShowDelete({ isToggle: true, id: val.id });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  };
  const news = (val: any) => {
    return <Menu>
      <Menu.Item
        onClick={() => navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`, { state: val })}
        key="1">View Details</Menu.Item>
      <Menu.Item key="2"
        onClick={() => resendDetails(val)}>Resend</Menu.Item>
      <Menu.Item
        onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`, { state: val })}
        key="3">Edit</Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => {
          setShowDelete({ isToggle: true, id: val.id });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  };
  const rejected = (val: any) => {
    return <Menu>
      <Menu.Item
        onClick={() => navigate(`/${ROUTES_CONSTANTS.REJECTED_CompanyAdmin}`, { state: val })}
        key="1">
        View Details</Menu.Item>
      <Menu.Item
        onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`, { state: val })}
        key="2">Edit</Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          setShowDelete({ isToggle: true, id: val });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
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
      align: "center"
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
      align: "center"
    },
  ];

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const newTableData = contractList?.map((item: any, index: number) => {
    const signedDate = dayjs(item.singedOn).format("DD/MM/YYYY");
    const signedTime = dayjs(item.singedOn).format("hh:mm A");
    const initiatedDate = dayjs(item.initiatedOn).format("DD/MM/YYYY");
    const initiateTime = dayjs(item.initiatedOn).format("hh:mm A");
    return (
      {
        key: item.id,
        No: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
        // Title: <div className="flex items-center justify-center">
        //   {
        //     item.status === "REJECTED" || item.status === "CHANGEREQUEST" ?
        //       (<img src={Rejected} alt="img" width={40} height={40} />) : item.status === "SIGNED" ?
        //         (<img src={Signed} alt="img" width={40} height={40} />) :
        //         (<img src={Recevied} alt="img" width={40} height={40} />)
        //   }
        //   <div className="text-start pl-4">
        //     <div className="text-base capitalize">{item?.type?.toLowerCase()?.replace("_", " ")}</div>
        //     <div className="text-sm light-grey-color">From {item?.receiver?.company?.businessName}</div>
        //   </div>
        // </div>,
        address: <div>
          <div className="flex gap-5 items-center pb-2">
            <div>
              <GreenErrow />
            </div>
            <div>
              <GreenLock />
            </div>
            <div>{item.sender?.firstName}</div>
          </div>
          <div className="flex gap-5 items-center">
            <div>{!item.viewed ? <PendingView /> : <GreenEye />}</div>
            <div>
              {item.status === 'PENDING' || item.status === 'NEW' ?
                <PendingLock /> : item.status !== 'SIGNED' ? <RedLock /> : <GreenLock />}
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
          className={`offer-letter-company-admin-status-bage ${item.status === "REJECTED" || item.status === "CHANGEREQUEST"
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
        actions: renderDropdown(item)
      }
    )
  })
  const dashboardData = offerLetterDashboard?.map((item: any, index: number) => {
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

  const handleTimeFrameValue = (val: any) => {
    setFilter({ ...filter, filterType: val?.toUpperCase()?.replace(" ", "_") });
    const item = timeFrameDropdownData.some(item => item === val)
    if (item) {
      getOfferLetterList(Arguments, tableParams, setTableParams, setLoading, val?.toUpperCase()?.replace(" ", "_"))
    }
    else {
      const [startDate, endDate] = val.split(",")
      getOfferLetterList(Arguments, tableParams, setTableParams, setLoading, "DATE_RANGE", startDate, endDate)
    }
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter:any) => ({
      ...prevFilter,
      page: current,
    }));
  };

  return (
    <div className="offer-letter-company-admin">
      <Alert
        width="570px"
        state={showDelete.isToggle}
        setState={setShowDelete}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        okBtnFunc={() => deleteOfferLetterHandler(showDelete?.id)}
      >
        <p>Are you sure you want to delete this? Once deleted, you will not be able to recover it.</p>
      </Alert>
      <PageHeader title="Offer Letters" bordered={true} />
      <Row gutter={[20, 20]}>
        {
          dashboardData.map((item: any, index: any) => {
            return (
              <Col xl={6} lg={12} md={12} xs={24} key={index}>
                <BoxWrapper className="p-6 rounded-[16px] h-[150px]">
                  <div>
                    <div className="flex">
                      {statusImageHandler(item.title)}
                      <div className="flex flex-col items-center pl-4">
                        <p className=" text-xl font-semibold mt-2 text-primary-color capitalize">{item?.title?.toLowerCase()}</p>
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

      <Row className="mt-8" gutter={[20, 20]} >
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar
            placeholder="Search by reciever name"
            handleChange={(e: any) => setFilter({ ...filter, search: e })} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex gap-4 justify-end offer-right-sec" >
          <DropDown name="Time Frame" options={timeFrameDropdownData}
            showDatePickerOnVal={'Date Range'}
            requireRangePicker placement="bottom"
            value={filter.filterType}
            setValue={(e: any) => handleTimeFrameValue(e)}
          />
          <DropDown name="Status" options={statusDropdownData}
            placement="bottom"
            value={filter.status}
            setValue={(e: any) => setFilter({ ...filter, status: e })}
          />
        </Col>
      </Row>

      <div className="mt-4">
        <BoxWrapper>
          <GlobalTable
            id='offerLetterTable'
            loading={loading}
            pagination={tableParams?.pagination}
            columns={tableColumns}
            tableData={newTableData}
            pagesObj={contractData?.pagination}
            handleTableChange={handleTableChange}
          />
        </BoxWrapper>
      </div>
    </div>
  )
}
export default CompanyAdmin