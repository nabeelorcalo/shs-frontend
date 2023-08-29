import { FC } from "react";
import { Row } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GlobalTable } from "../../../components";

interface DataType {
  key: string;
  name: string;
  bookingDates: string | number;
  rent: string | number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name/Ref",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Booking Dates",
    dataIndex: "bookingDates",
    key: "bookingDates",
  },
  {
    title: "Rent",
    dataIndex: "rent",
    key: "rent",
    render: (_, data) => <div className="text-left">
      <span>{data?.rent}</span>
    </div>
  },
];

const ReservationsTable: FC<{ agentReservation: any; loading: boolean }> = ({ agentReservation, loading }) => {
  return (
    <div className="xs:p-2 md:p-3 lg:p-5 rounded-2xl min-h-[648px] bg-white wrapper-shadow">
      <Row className="gap-5" align="middle">
        <p className="text-[20px] leading-[28px] text-secondary-color font-medium pb-5">Reservations</p>
      </Row>
      <GlobalTable columns={columns} tableData={agentReservation} pagination={false} height={500} loading={loading} hideTotal />
    </div>
  );
};

export default ReservationsTable;
