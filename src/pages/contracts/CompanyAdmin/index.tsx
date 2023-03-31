import { Row, Col, Dropdown, Button, MenuProps, Menu } from "antd";
import { useState } from "react";
import {
  IconAngleDown,
  NewImg,
  PendingImg,
  RejectedImg,
  SignedImg,
  Rejected,
  Signed,
  Recevied,
  GreyEye,
  GreyLock,
  GreenErrow,
  GreenEye,
  GreenLock,
  RedLock,
} from "../../../assets/images";
import { Alert, BoxWrapper, GlobalTable, PageHeader, SearchBar } from "../../../components";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";

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

const CompanyAdmin = () => {
  const [showDelete, setShowDelete] = useState(false);

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
              <div className="text-base">Contract</div>
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
            <div className="flex gap-2 items-center pb-2">
              <div>
                <GreenErrow />
              </div>
              <div>
                <GreenLock />
              </div>
              <div>David Miller</div>
            </div>

            <div className="flex gap-2 items-center">
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
            className={`shs-status-badge ${row.status === "rejected" || row.status === "Changes requested"
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
            <CustomDroupDown menu1={menu2} />
          </div>

        );
      },
    },
  ];

  const menu2 = (
    <Menu>
      <Menu.Item key="1">View Details</Menu.Item>
      <Menu.Item key="2">Edit</Menu.Item>
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

  const statusItems: MenuProps["items"] = [
    {
      key: "new",
      label: "New",
    },
    {
      key: "pending",
      label: "Pending",
    },
    {
      key: "rejected",
      label: "Rejected",
    },
    {
      key: "signed",
      label: "Signed",
    },
  ];

  const TimeFrameItems: MenuProps["items"] = [
    {
      key: "thisWeek",
      label: "This Week",
    },
    {
      key: "lastWeek",
      label: "Last Week",
    },
    {
      key: "thisMonth",
      label: "This Month",
    },
    {
      key: "lastMonth",
      label: "Last Month",
    },
    {
      key: "dateRange",
      label: "Date Range",
    },
  ];
  return (
    <div className="contract-company-admin">
      <Alert
        state={showDelete}
        setState={setShowDelete}
        type="error"
        okBtntxt="Delete"
        cancelBtntxt="Cancel"
      >
        <p>Are you sure you want to delete this?</p>
      </Alert>
      <PageHeader title="Contracts" />
      <Row gutter={[20, 20]}>
        {
          ContractsCard.map((item) => {
            return (
              <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                <BoxWrapper>
                  <div>
                    <div className="flex">
                      {item.img}
                      <div className="flex flex-col items-center pl-4">
                        <p className=" text-xl font-semibold mt-2">{item.title}</p>
                        <div className="text-4xl font-medium mt-4">{item.num}</div>
                      </div>
                    </div>
                  </div>

                </BoxWrapper>
              </Col>
            )
          })
        }
      </Row>

      <Row className="mt-8" gutter={[0, 20]} >
        <Col  xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
          <SearchBar handleChange={() => { }} />
        </Col>

        <Col xxl={18} xl={8} lg={16} md={24} sm={24} xs={24} className="flex gap-4 md:justify-end offer-right-sec" >
          <Dropdown
            menu={{ items: TimeFrameItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button className="button-sky-blue">
              Time Frame
              <IconAngleDown />
            </Button>
          </Dropdown>

          <Dropdown
            menu={{ items: statusItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button className="button-sky-blue">
              Status
              <IconAngleDown />
            </Button>
          </Dropdown>
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
  );
};

export default CompanyAdmin;