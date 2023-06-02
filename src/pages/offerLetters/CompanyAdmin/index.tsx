import { useEffect, useState } from "react";
import { Row, Col, Menu, Spin } from "antd";
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
} from "../../../assets/images";
import { Alert, BoxWrapper, DropDown, GlobalTable, Notifications, PageHeader, SearchBar } from "../../../components";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import { ROUTES_CONSTANTS } from "../../../config/constants";

const timeFrameDropdownData = ['All', 'This week', 'Last week', 'This month', 'Last Month', 'Date Range']
const statusDropdownData = ['All', 'New', 'Pending', 'Rejected', 'Signed']

const CompanyAdmin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<any>({
    search: null,
    status: null,
    datePicker: 'THIS_MONTH'
  })
  const [showDelete, setShowDelete] = useState({ isToggle: false, id: '' });
  const {
    loading,
    contractList,
    offerLetterDashboard,
    getOfferLetterList,
    getOfferLetterDashboard,
    deleteOfferLetterHandler
  } = useCustomHook();

  useEffect(() => {
    getOfferLetterList(state.status, state.datePicker.toUpperCase().replace(" ", "_"), state.search);
    getOfferLetterDashboard()
  }, [state.search])

  const renderDropdown = (item: any) => {
    switch (item.status) {
      case 'REJECTED':
        return <CustomDroupDown menu1={rejected(item.id)} />
        break;
      case 'PENDING':
        return <CustomDroupDown menu1={pending(item.id)} />
        break;
      case 'CHANGEREQUEST':
        return <CustomDroupDown menu1={ChangesRequested(item.id)} />
        break;
      case 'SIGNED':
        return <CustomDroupDown menu1={signed(item.id)} />
        break;
      case 'NEW':
        return <CustomDroupDown menu1={newStatus(item.id)} />
        break;
    }
  }
  const signed = (val: any) => (
    <Menu>
      <Menu.Item onClick={() => navigate("/signed-company-admin-offer")} key="1">View Details</Menu.Item>
      <Menu.Item onClick={() => navigate("/edit-offer-letter")} key="2">Initiate Contract</Menu.Item>
    </Menu>
  );
  const ChangesRequested = (val: any) => (
    <Menu>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`)} key="1">Edit</Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setShowDelete({ isToggle: true, id: val });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  )
  const pending = (val: any) => (
    <Menu>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`)} key="1">View Details</Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => Notifications({ title: 'Success', description: 'Contract sent', type: 'success' })}
      >Resend</Menu.Item>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`)} key="3">Edit</Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => {
          setShowDelete({ isToggle: true, id: val });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );
  const newStatus = (val: any) => (
    <Menu>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`)} key="1">View Details</Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => Notifications({ title: 'Success', description: 'Contract sent', type: 'success' })}
      >Resend</Menu.Item>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`)} key="3">Edit</Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => {
          setShowDelete({ isToggle: true, id: val });
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  )
  const rejected = (val: any) => {
    return <Menu>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`)} key="1">View Details</Menu.Item>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.EDIT_CONTRACT}`)} key="2">Edit</Menu.Item>
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
  const newTableData = contractList?.map((item: any, index: number) => {
    const signedDate = dayjs(item.singedOn).format("DD/MM/YYYY");
    const signedTime = dayjs(item.singedOn).format("hh:mm A");
    const initiatedDate = dayjs(item.initiatedOn).format("DD/MM/YYYY");
    const initiateTime = dayjs(item.initiatedOn).format("hh:mm A");
    return (
      {
        No: contractList?.length < 10 && `0 ${index + 1}`,
        Title: <div className="flex items-center justify-center">
          {
            item.status === "REJECTED" || item.status === "CHANGEREQUEST" ?
              (<img src={Rejected} alt="img" width={40} height={40} />) : item.status === "SIGNED" ?
                (<img src={Signed} alt="img" width={40} height={40} />) :
                (<img src={Recevied} alt="img" width={40} height={40} />)
          }
          <div className="text-start pl-4">
            <div className="text-base">{item.title}</div>
            <div className="text-sm light-grey-color">{item.content}</div>
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
            <div>{item.sender.firstName}</div>
          </div>
          <div className="flex gap-5 items-center">
            <div><GreenEye /></div>
            <div>
              <RedLock />
            </div>
            <div>{item.reciever.firstName}</div>
          </div>
        </div>,
        initiatedOn: <div>
          <div>{initiateTime}</div>
          <div className="light-grey-color text-sm">{initiatedDate}</div>
        </div>,
        signedOn: <div>
          <div>{signedTime}</div>
          <div className="light-grey-color text-sm">{signedDate}</div>
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
            ? "REJECTED"
            : item.status === "PENDING"
              ? "PENDING" : item.status === "NEW"
                ? "NEW"
                : item.status === "SIGNED"
                  ? "SIGNED" : "CHANGEREQUEST"}
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
      case 'REJECTD': return <RejectedImg />
      case 'SIGNED': return <SignedImg />
    }
  }

  const handleValueStatus = (val: any) => {
    getOfferLetterList(val, state.datePicker.toUpperCase().replace(" ", "_"), state.search);
    setState({ ...state, status: val })
  }
  const handleTimeFrameValue = (val: any) => {
    setState({ ...state, datePicker: val });
    getOfferLetterList(state.status, val.toUpperCase().replace(" ", "_"), state.search);
  }
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
                        <p className=" text-xl font-semibold mt-2 text-primary-color">{item.title}</p>
                        <div className="text-[38px] font-medium mt-4">{item.num > 10 ? item.num : `0${item.num}`}</div>
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
        <Col xl={7} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={(e: any) => setState({ ...state, search: e })} />
        </Col>
        <Col xl={17} lg={15} md={24} sm={24} xs={24} className="flex gap-4 justify-end offer-right-sec" >
          <DropDown name="Time Frame" options={timeFrameDropdownData}
            showDatePickerOnVal={'Date Range'}
            requireDatePicker placement="bottom"
            value={state.datePicker}
            setValue={(e: any) => handleTimeFrameValue(e)}
          />

          <DropDown name="Status" options={statusDropdownData}
            placement="bottom"
            value={state.status}
            setValue={(e: any) => handleValueStatus(e)
            }
          />
        </Col>
      </Row>

      <div className="mt-4">
        <BoxWrapper>
          {loading ? <Spin className="flex justify-center" /> :
            <GlobalTable columns={tableColumns} tableData={newTableData} />
          }
        </BoxWrapper>
      </div>
    </div>
  )
}
export default CompanyAdmin