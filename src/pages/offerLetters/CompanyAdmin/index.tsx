import { useEffect, useState } from "react";
import { Row, Col, Menu } from "antd";
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
import { Alert, BoxWrapper, DropDown, GlobalTable, PageHeader, SearchBar } from "../../../components";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";

// const tableData = [
//   {
//     No: "01",
//     Title: "Stenna Freddi",
//     address: "118-127 Park Ln, London W1K 7AF, UK",
//     initiatedOn: "22/09/2022 - 22/09/2022",
//     signedOn: "£ 200",
//     contracts: false,
//     status: "pending",
//   },
//   {
//     No: "02",
//     Title: "Keith Thompson",
//     address: "118-127 Park Ln, London W1K 7AF, UK",
//     initiatedOn: "22/09/2022 - 22/09/2022",
//     signedOn: "£ 170",
//     contracts: true,
//     status: "Signed",
//   },
//   {
//     No: "03",
//     Title: "John Emple",
//     address: "118-127 Park Ln, London W1K 7AF, UK",
//     initiatedOn: "22/09/2022 - 22/09/2022",
//     signedOn: "£ 178",
//     contracts: false,
//     status: "rejected",
//   },
//   {
//     No: "04",
//     Title: "John Emple",
//     address: "118-127 Park Ln, London W1K 7AF, UK",
//     initiatedOn: "22/09/2022 - 22/09/2022",
//     signedOn: "£ 178",
//     contracts: false,
//     status: "Changes requested",
//   },
// ];

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

const timeFrameDropdownData = ['This Week', 'Last Week', 'This Month', 'Last Month', 'Date Range']
const statusDropdownData = ['New', 'Pending', 'Rejected', 'Signed']

const CompanyAdmin = () => {
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [valueStatus, setValueStatus] = useState("");
  const [valueDatePacker, setValueDatePacker] = useState("");
  const { getData, contractList } = useCustomHook();
  useEffect(() => {
    getData()
  }, [])
  const renderDropdown = (status: any) => {
    switch (status) {
      case 'rejected':
        return <CustomDroupDown menu1={rejected} />
        break;
      case 'pending':
        return <CustomDroupDown menu1={pending} />
        break;
      case 'Changes requested':
        return <CustomDroupDown menu1={ChangesRequested} />
        break;
      case 'Signed':
        return <CustomDroupDown menu1={signed} />
        break;
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
  const signed = (
    <Menu>
      <Menu.Item onClick={() => navigate("/signed-company-admin-offer")} key="1">View Details</Menu.Item>
      <Menu.Item onClick={() => navigate("/edit-offer-letter")} key="2">Initiate Contract</Menu.Item>
    </Menu>
  );

  const ChangesRequested = (
    <Menu>
      <Menu.Item onClick={() => navigate("/edit-offer-letter")} key="1">Edit</Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setShowDelete(!showDelete);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const pending = (
    <Menu>
      <Menu.Item onClick={() => navigate("/pending-view-details-offer")} key="1">View Details</Menu.Item>
      <Menu.Item key="2">Resend</Menu.Item>
      <Menu.Item onClick={() => navigate("/edit-offer-letter")} key="3">Edit</Menu.Item>
      <Menu.Item
        key="4"
        onClick={() => {
          setShowDelete(!showDelete);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  const rejected = (
    <Menu>
      <Menu.Item onClick={() => navigate("/rejected-company-admin-offer")} key="1">View Details</Menu.Item>
      <Menu.Item onClick={() => navigate("/edit-offer-letter")} key="2">Edit</Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          setShowDelete(!showDelete);
        }}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="offer-letter-company-admin">
      <Alert
        width="570px"
        state={showDelete}
        setState={setShowDelete}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
      >
        <p>Are you sure you want to delete this? Once deleted, you will not be able to recover it.</p>
      </Alert>
      <PageHeader title="Offer Letters" bordered={true} />
      <Row gutter={[20, 20]}>
        {
          ContractsCard.map((item) => {
            return (
              <Col xl={6} lg={12} md={12} xs={24}>
                <BoxWrapper className="p-6 rounded-[16px]">
                  <div className="flex">
                    {item.img}
                    <div className="flex flex-col items-center pl-4">
                      <p className=" text-xl font-semibold mt-2 text-primary-color">{item.title}</p>
                      <div className="text-[38px] font-medium mt-4">{item.num}</div>
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
          <SearchBar handleChange={() => { }} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex gap-4 justify-end offer-right-sec" >
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
      </Row>

      <div className="mt-4">
        <BoxWrapper>
          <GlobalTable
            columns={tableColumns}
            tableData={newTableData}
          />
        </BoxWrapper>
      </div>
    </div>
  )
}
export default CompanyAdmin