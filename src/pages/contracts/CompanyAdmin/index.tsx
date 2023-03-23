import { Row, Col, Dropdown, Button, MenuProps } from "antd";
import React from "react";
import { IconAngleDown, NewImg ,PendingImg , RejectedImg , SignedImg} from "../../../assets/images";
import { BoxWrapper, GlobalTable, PageHeader, SearchBar } from "../../../components";

const tableData = [
  {
    key: "1",
    Tenant: "Stenna Freddi",
    address: "118-127 Park Ln, London W1K 7AF, UK",
    ReservedDates: "22/09/2022 - 22/09/2022",
    rent: "£ 200",
    contracts: false,
    status: "pending",
  },
  {
    key: "2",
    Tenant: "Keith Thompson",
    address: "118-127 Park Ln, London W1K 7AF, UK",
    ReservedDates: "22/09/2022 - 22/09/2022",
    rent: "£ 170",
    contracts: true,
    status: "Reserved",
  },
  {
    key: "3",
    Tenant: "John Emple",
    address: "118-127 Park Ln, London W1K 7AF, UK",
    ReservedDates: "22/09/2022 - 22/09/2022",
    rent: "£ 178",
    contracts: false,
    status: "rejected",
  },
];

const ContractsCard = [
  {
    img:<NewImg/>,
    title:"New",
    num:"07",
  },
  {
    img: <PendingImg/>,
    title:"Pending ",
    num:"03",
  },
  {
    img: <SignedImg/>,
    title:"Signed",
    num:"05",
  },
  {
    img: <RejectedImg/>,
    title:"Rejected",
    num:"02",
  },
]

const CompanyAdmin = () => {

  const tableColumns = [
    {
      title: "Tenant",
      dataIndex: "Tenant",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Reserved Dates",
      dataIndex: "ReservedDates",
    },
    {
      title: "Rent",
      dataIndex: "rent",
    },

    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (_, row, index) => {
        return (
          <div
            className={`shs-status-badge ${
              row.status === "rejected"
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
              : "Reserved"}
          </div>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      align: "center",
      render: (_, row, index) => {
        return (
          <div ></div>
          
        );
      },
    },
  ];

  const statusItems: MenuProps["items"] = [
    {
      key: "pending",
      label: "Pending",
    },
    {
      key: "reserved",
      label: "Reserved",
    },
    {
      key: "rejected",
      label: "Rejected",
    },
  ];
  return (
    <div className="contract-company-admin">
      <PageHeader title="Contracts" />
      <Row gutter={[20,20]}>
        {
          ContractsCard.map((item) => {
            return  (
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

      <Row className="mt-8" gutter={[0, 20]} justify={"space-between"}>
        <Col xxl={6} xl={6} lg={8} md={9} sm={10} xs={24}>
        <SearchBar handleChange={() => {}}/>
        </Col>

        <Col xxl={2} xl={3} lg={4} md={5} sm={4} xs={24}>
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

        <Col xxl={2} xl={3} lg={4} md={5} sm={4} xs={24}>
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

      <div>
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