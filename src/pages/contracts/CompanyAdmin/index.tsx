import { useEffect, useState } from "react";
import { Row, Col, Menu } from "antd";
import {
  NewImg, PendingImg, RejectedImg, SignedImg, Rejected, Signed, Recevied,
  GreenErrow, GreenEye, GreenLock, RedLock
} from "../../../assets/images";
import { Alert, BoxWrapper, DropDown, GlobalTable, Notifications, PageHeader, SearchBar } from "../../../components";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import "./style.scss";

const tableData = [
  {
    No: "01",
    Title: "Stenna Freddi",
    address: "118-127 Park Ln, London W1K 7AF, UK",
    initiatedOn: "22/09/2022 - 22/09/2022",
    signedOn: "£ 200",
    contracts: false,
    status: "pending",
  },
  {
    No: "02",
    Title: "Keith Thompson",
    address: "118-127 Park Ln, London W1K 7AF, UK",
    initiatedOn: "22/09/2022 - 22/09/2022",
    signedOn: "£ 170",
    contracts: true,
    status: "Signed",
  },
  {
    No: "03",
    Title: "John Emple",
    address: "118-127 Park Ln, London W1K 7AF, UK",
    initiatedOn: "22/09/2022 - 22/09/2022",
    signedOn: "£ 178",
    contracts: false,
    status: "rejected",
  },
  {
    No: "04",
    Title: "John Emple",
    address: "118-127 Park Ln, London W1K 7AF, UK",
    initiatedOn: "22/09/2022 - 22/09/2022",
    signedOn: "£ 178",
    contracts: false,
    status: "Changes requested",
  },
];
const timeFrameDropdownData = ['This Week', 'Last Week', 'This Month', 'Last Month', 'Date Range']
const statusDropdownData = ['New', 'Pending', 'Rejected', 'Signed']
const ContractsCard = [
  {
    img: <NewImg />,
    title: "New",
    num: "07",
  },
  {
    img: <PendingImg />,
    title: "Pending ",
    num: "03",
  },
  {
    img: <SignedImg />,
    title: "Signed",
    num: "05",
  },
  {
    img: <RejectedImg />,
    title: "Rejected",
    num: "02",
  },
]
const CompanyAdmin = () => {
  const navigate = useNavigate()
  const [showDelete, setShowDelete] = useState({ isToggle: false, id: '' });
  const [valueStatus, setValueStatus] = useState("");
  const [valueDatePacker, setValueDatePacker] = useState("");
  const { getData, contractList, searchHandler, deleteContractHandler } = useCustomHook();
  
  useEffect(() => {
    getData()
  }, [])
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
    }
  }
  const signed = (val: any) => {
    return <Menu>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.SIGNED_CompanyAdmin}`)} key="1">View Details</Menu.Item>
    </Menu>
  };
  const ChangesRequested = (val: any) => {
    return <Menu>
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
  };
  const pending = (val: any) => {
    return <Menu>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.PENDING_VIEW}`)} key="1">View Details</Menu.Item>
      <Menu.Item key="2" onClick={() => Notifications({ title: 'Success', description: 'Contract sent', type: 'success' })}>Resend</Menu.Item>
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
  };
  const rejected = (val: any) => {

    <Menu>
      <Menu.Item onClick={() => navigate(`/${ROUTES_CONSTANTS.REJECTED_CompanyAdmin}`)} key="1">View Details</Menu.Item>
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
        No: contractList?.length < 10 && `0 ${index + 1}`,
        Title: <div className="flex items-center justify-center">
          {
            item.status === "rejected" || item.status === "Changes requested" ?
              (<img src={Rejected} alt="img" width={40} height={40} />) : item.status === "Signed" ?
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
          <div className="light-grey-color">{initiatedDate}</div>
        </div>,
        signedOn: <div>
          <div>{signedTime}</div>
          <div className="light-grey-color">{signedDate}</div>
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
            ? "REJECTED"
            : item.status === "PENDING"
              ? "PENDING"
              : item.status === "SIGNED"
                ? "SIGNED" : "CHANGEREQUEST"}
        </div>,
        actions: renderDropdown(item)
      }
    )
  })
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
          ContractsCard.map((item) => {
            return (
              <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                <BoxWrapper className="p-6 rounded-[16px]">
                  <div>
                    <div className="flex">
                      {item.img}
                      <div className="flex flex-col items-center pl-4">
                        <p className=" text-xl font-semibold mt-2 text-primary-color">{item.title}</p>
                        <div className="text-[38px] font-medium mt-4">{item.num}</div>
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
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={(e: any) => { searchHandler(e) }} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex gap-4 justify-end contract-right-sec" >

          <DropDown name="Time Frame" options={timeFrameDropdownData}
            showDatePickerOnVal={'Date Range'}
            requireDatePicker placement="bottom"
            value={valueDatePacker}
            setValue={setValueDatePacker}
          />
          <DropDown name="Status" options={statusDropdownData}
            placement="bottom"
            value={valueStatus}
            setValue={setValueStatus}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <GlobalTable columns={tableColumns} tableData={newTableData} />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};
export default CompanyAdmin;