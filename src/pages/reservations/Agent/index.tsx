import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Documentcard } from "../../../assets/images";
import { DropDown, GlobalTable, PageHeader, SearchBar } from "../../../components";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { EyeFilled } from "@ant-design/icons";
import { BoxWrapper } from "../../../components";
import BookingModal from "./BookingModal";
import "./style.scss";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import { useRecoilState, useResetRecoilState } from "recoil";
import { reservationFilterState, reservationPaginationState } from "../../../store";

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
  const [state, setState] = useState<any>({
    openViewModal: false,
    viewReservations: {}
  })
  const [tableParams, setTableParams]: any = useRecoilState(reservationPaginationState);
  const [filter, setFilter] = useRecoilState(reservationFilterState);
  const [loading, setLoading] = useState(true);
  const resetList = useResetRecoilState(reservationFilterState);
  const resetTableParams = useResetRecoilState(reservationPaginationState);
  const { reservationsData, getReservationData, getStudentProfile }: any = useCustomHook();

  const reservations = reservationsData?.data;
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };

  useEffect(() => {
    let args = removeEmptyValues(filter)
    getReservationData(args, setLoading)
  }, [filter])

  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };
  const tableColumns: ColumnsType<DataType> = [
    {
      title: "Tenant",
      dataIndex: "Tenant",
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
        key: item.id,
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
        contracts: <Documentcard />,
        actions: <div onClick={() => {
          setState({ ...state, openViewModal: true, viewReservations: item });
          getStudentProfile(item?.tenantId)
        }}>
          <EyeFilled className="cursor-pointer text-2xl light-grey-color"
          />
        </div>
      }
    )
  });

  const statusItems = ["All", "Pending", "Reserved", "Rejected"];

  return (
    <div className="reservations">
      <BookingModal open={state} setOpen={setState} args={removeEmptyValues(filter)} />
      <PageHeader title="Reservations" bordered={true} />
      <Row gutter={[0, 20]} justify={"space-between"}>
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar
            placeholder="Saerch by tenant"
            handleChange={(e: any) => setFilter({ ...filter, search: e?.trim()?.replaceAll("\\s+", "") })} />
        </Col>

        <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end reservation-right">
          <DropDown name="Status" options={statusItems}
            placement="bottom"
            value={filter.status}
            setValue={(e: any) => setFilter({ ...filter, status: e })}
          />
        </Col>

        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            <GlobalTable
              id="contractTable"
              columns={tableColumns}
              tableData={reservationTableData}
              loading={loading}
              pagination={tableParams?.pagination}
              pagesObj={reservationsData?.pagination}
              handleTableChange={handleTableChange}
            />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default ReservationsAgent;