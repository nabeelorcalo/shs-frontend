import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Documentcard } from "../../../assets/images";
import { DropDown, GlobalTable, Loader, PageHeader, SearchBar } from "../../../components";
import type { ColumnsType } from "antd/es/table";
import { EyeFilled } from "@ant-design/icons";
import { BoxWrapper } from "../../../components";
import BookingModal from "./BookingModal";
import "./style.scss";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";

interface DataType {
  key: React.Key;
  agentTitle: string;
  address: string;
  durationBooking: string;
  rent: string;
  contracts: any;
  status: string;
}

const ReservationsAgent = () => {
  // const [isOpen, setISOpen] = useState(false);
  const [state, setState] = useState<any>({
    openViewModal: false,
    status: null,
    search: '',
    viewReservations: {}
  })
  const { reservations, getReservationData, isLoading } = useCustomHook();

  useEffect(() => {
    getReservationData(state.status, state.search)
  }, [state.search])

  const statusValueHandle = (val: any) => {
    setState({ ...state, status: val });
    getReservationData(val, state.search);
  }

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
  const reservationTableData = reservations?.map((item: any, index: number) => {
    const startDate = dayjs(item.bookingStartDate).format("DD/MM/YYYY")
    const endDate = dayjs(item.bookingEndDate).format("DD/MM/YYYY")
    return (
      {
        key: index,
        Tenant: `${item?.tenant?.firstName} ${item?.tenant?.lastName}`,
        address: item?.property?.addressOne,
        ReservedDates: `${startDate} - ${endDate}`,
        rent: item?.rent,
        status: <div
          className={`shs-status-badge ${item?.status === "rejected"
            ? "rejected"
            : item?.status === "pending"
              ? "pending"
              : "success"
            }`}
        >
          {item?.status === "rejected"
            ? "Rejected"
            : item?.status === "pending"
              ? "Pending"
              : "Reserved"}
        </div>,
        contracts: item?.contract ? <Documentcard /> : "-",
        actions: <div onClick={() => setState({ ...state, openViewModal: true, viewReservations: item })}>
          <EyeFilled className="cursor-pointer text-2xl light-grey-color"
          />
        </div>
      }
    )
  })

  const statusItems = ["All", "Pending", "Reserved", "Rejected"];

  return (
    <div className="reservations">
      <BookingModal open={state} setOpen={setState} />
      <PageHeader title="Reservations" bordered={true} />

      <Row gutter={[0, 20]} justify={"space-between"}>
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar
            placeholder="Saerch by tenant"
            handleChange={(e: any) => setState({ ...state, search: e })} />
        </Col>

        <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end reservation-right">
          <DropDown name="Status" options={statusItems}
            placement="bottom"
            value={state.status}
            setValue={(e: any) => statusValueHandle(e)}
          />
        </Col>

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            {isLoading ? <Loader /> :
              <GlobalTable
                pagination={false}
                columns={tableColumns}
                tableData={reservationTableData}
              />}
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default ReservationsAgent;