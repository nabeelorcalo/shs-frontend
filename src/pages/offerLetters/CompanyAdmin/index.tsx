import { useState } from "react";
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
  const navigate = useNavigate()
  const [showDelete, setShowDelete] = useState(false);
  const [valueStatus, setValueStatus] = useState("")
  const [valueDatePacker, setValueDatePacker] = useState("")

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
      align: "center",
      render: (_: any, row: any, index: any) => {
        return (
          <div className="flex items-center justify-center">
            {
              row.status === "rejected" || row.status === "Changes requested" ?
                (<img src={Rejected} alt="img" width={40} height={40} />) : row.status === "Signed" ?
                  (<img src={Signed} alt="img" width={40} height={40} />) :
                  (<img src={Recevied} alt="img" width={40} height={40} />)
            }
            <div className="text-start pl-4">
              <div className="text-base">Offer Letter</div>
              <div className="text-sm light-grey-color">From Power Source</div>
            </div>
          </div>

        );
      },
    },
    {
      title: "",
      dataIndex: "address",
      render: (_: any, row: any, index: any) => {
        return (
          <div>
            <div className="flex gap-5 items-center pb-2">
              <div>
                <GreenErrow />
              </div>
              <div>
                <GreenLock />
              </div>
              <div>David Miller</div>
            </div>

            <div className="flex gap-5 items-center">
              <div><GreenEye /></div>
              <div>
                <RedLock />
              </div>
              <div>Maria Sanoid</div>
            </div>
          </div>
        )
      }
    },
    {
      title: "Initiated On",
      dataIndex: "initiatedOn",
      render: (_: any, row: any, index: any) => {
        return (
          <div>
            <div>12:18 PM</div>
            <div className="light-grey-color">06/10/2022</div>
          </div>
        )
      }
    },
    {
      title: "Signed On",
      dataIndex: "signedOn",
      render: (_: any, row: any, index: any) => {
        return (
          <div>
            <div>12:18 PM</div>
            <div className="light-grey-color">06/10/2022</div>
          </div>
        )
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (_: any, row: any, index: any) => {
        return (
          <div
            className={`offer-letter-company-admin-status-bage ${row.status === "rejected" || row.status === "Changes requested"
              ? "rejected"
              : row.status === "pending"
                ? "pending"
                : "success"
              }`}
          >
            {row.status === "rejected"
              ? "Rejected"
              : row.status === "pending"
                ? "Pending"
                : row.status === "Signed"
                  ? "Signed" : "Changes requested"}
          </div>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render: (_: any, row: any, index: any) => {
        return (
          <div>
            {
              renderDropdown(row.status)
            }
          </div>

        );
      },
    },
  ];

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
              <Col  xl={6} lg={12} md={12} xs={24}>
                <BoxWrapper className="p-10 rounded-[16px]">
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
        <Col  xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar  handleChange={() => { }} />
        </Col>
        <Col  xl={18} lg={15} md={24} sm={24} xs={24} className="flex gap-4 justify-end offer-right-sec" >
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
            tableData={tableData}
          />
        </BoxWrapper>
      </div>
    </div>
  )
}
export default CompanyAdmin