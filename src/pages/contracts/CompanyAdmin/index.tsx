import { useEffect, useState } from "react";
import { Row, Col, Menu } from "antd";
import {
  NewImg, PendingImg, RejectedImg, SignedImg, Rejected, Signed, Recevied,
  GreenErrow, GreenEye, GreenLock, RedLock, PendingLock, PendingView
} from "../../../assets/images";
import { Alert, BoxWrapper, DropDown, GlobalTable, Loader, Notifications, PageHeader, SearchBar } from "../../../components";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import "./style.scss";

const timeFrameDropdownData = ['All', 'This week', 'Last week', 'This month', 'Last Month', 'Date Range']
const statusDropdownData = ['All', 'New', 'Pending', 'Rejected', 'Signed']

const CompanyAdmin = () => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState({ isToggle: false, id: '' });
  const [state, setState] = useState<any>({
    search: null,
    status: null,
    datePicker: null,
  })
  const {
    contractDashboard,
    contractList,
    loading,
    getContractDashboard,
    getContractList,
    deleteContractHandler,
    editContractDetails
  } = useCustomHook();

  useEffect(() => {
    getContractList(state.status, state.search, state?.datePicker?.toUpperCase().replace(" ", "_"));
    getContractDashboard()
  }, [state.search])

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
      case 'RECEIVED':
        return <CustomDroupDown menu1={ChangesRequested(item.id)} />
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
          setShowDelete({ isToggle: true, id: val });
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
    </Menu >
  };
  const news = (val: any) => {
    return <Menu>
      <Menu.Item
        onClick={() => navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`, { state: val })}
        key="1">View Details</Menu.Item>
      <Menu.Item key="2"
        onClick={() => resendDetails(val)}>
        Resend</Menu.Item>
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
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`, { state: val })} key="2">Edit</Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          setShowDelete({ isToggle: true, id: val.id });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  };

  const statusValueHandle = (val: any) => {
    setState({ ...state, status: val });
    getContractList(val, state.search, state?.datePicker?.toUpperCase()?.replace(" ", "_"));
  }
  const handleTimeFrameValue = (val: any) => {
    setState({ ...state, datePicker: val });
    const item = timeFrameDropdownData.some(item => item === val)
    if (item) {
      getContractList(state?.status, state.search, val?.toUpperCase()?.replace(" ", "_"))
    }
    else {
      const [startDate, endDate] = val.split(",")
      getContractList(state?.status, state.search, "DATE_RANGE", startDate, endDate)
    }
  }

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
      align: "center",
    },
  ];
  const newTableData = contractList?.map((item: any, index: number) => {
    const signedDate = dayjs(item.singedOn).format("DD/MM/YYYY");
    const signedTime = dayjs(item.singedOn).format("hh:mm A");
    const initiatedDate = dayjs(item.initiatedOn).format("DD/MM/YYYY");
    const initiateTime = dayjs(item.initiatedOn).format("hh:mm A");
    return (
      {
        key: index,
        No: contractList?.length < 10 && `0${index + 1}`,
        Title: <div className="flex items-center justify-center">
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
            <div>{item.status === 'PENDING' || item.status === 'NEW'
              ? <PendingView /> : <GreenEye />}</div>
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
          className={`contract-company-admin-status-bage ${item.status === "REJECTED" || item.status === "RECEIVED"
            ? "REJECTED"
            : item.status === "PENDING"
              ? "PENDING"
              : "SUCCESS"
            }`}
        >
          {item.status === "REJECTED"
            ? "REJECTED"
            : item.status === "PENDING"
              ? "PENDING" : item.status === "NEW"
                ? "NEW"
                : item.status === "SIGNED"
                  ? "SIGNED" : "CHANGE REQUEST"}
        </div>,
        actions: renderDropdown(item)
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

  return (
    <div className="contract-company-admin">
      <Alert
        state={showDelete.isToggle}
        setState={setShowDelete}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
        okBtnFunc={() => deleteContractHandler(showDelete?.id)}
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
          <SearchBar placeholder="Search by reciever name" handleChange={(e: any) => setState({ ...state, search: e })} />
        </Col>
        <Col xl={17} lg={15} md={24} sm={24} xs={24} className="flex gap-4 justify-end contract-right-sec" >
          <DropDown name="Time Frame" options={timeFrameDropdownData}
            showDatePickerOnVal={'Date Range'}
            requireRangePicker placement="bottom"
            value={state.datePicker}
            setValue={(e: any) => handleTimeFrameValue(e)}
          />
          <DropDown name="Status" options={statusDropdownData}
            placement="bottom"
            value={state.status}
            setValue={(e: any) => statusValueHandle(e)}
          />
        </Col>
        <Col xs={24}>
          {loading ? <Loader /> :
            <BoxWrapper>
              <GlobalTable columns={tableColumns} tableData={newTableData} />
            </BoxWrapper>
          }
        </Col>
      </Row>
    </div>
  );
};
export default CompanyAdmin;