import { Col, Row, Dropdown, Button, MenuProps } from "antd";
import React, { useState } from "react";
import { Documentcard, IconAngleDown } from "../../../assets/images";
import { GlobalTable, PageHeader, SearchBar } from "../../../components";
import type { ColumnsType } from "antd/es/table";
import { EyeFilled } from "@ant-design/icons";
import { BoxWrapper } from "../../../components";
import BookingModal from "./BookingModal";
import "./style.scss";

interface DataType {
  key: React.Key;
  agentTitle: string;
  address: string;
  durationBooking: string;
  rent: string;
  contracts: any;
  status: string;
}

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

const ReservationsAgent = () => {
  const [isOpen, setISOpen] = useState(false);

  const tableColumns: ColumnsType<DataType> = [
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
      title: "Contracts",
      dataIndex: "contracts",
      align: "center",
      render: (_, row, index) => (row.contracts ? <Documentcard /> : "-"),
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
          <div onClick={() => setISOpen(true)}>
            <EyeFilled className=" cursor-pointer text-2xl light-grey-color"
            />
          </div>
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
    <div className="reservations">
      <BookingModal open={isOpen} setOpen={setISOpen}/>
      <PageHeader title="Reservations" bordered={true} />

      <Row gutter={[0, 20]} justify={"space-between"}>
        <Col xxl={6} xl={6} lg={8} md={9} sm={10} xs={24}>
          <SearchBar handleChange={() => {}} />
        </Col>

        <Col xxl={2} xl={3} lg={4} md={5} sm={4} xs={24} className="reservation-right">
          <Dropdown
            menu={{ items: statusItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button className="button-sky-blue main-btn">
              Status
              <IconAngleDown />
            </Button>
          </Dropdown>
        </Col>

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            <GlobalTable
              pagination={false}
              columns={tableColumns}
              tableData={tableData}
            />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default ReservationsAgent;
