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
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },
  {
    key: "1",
    name: "Stenna Freddi",
    bookingDates: "22/09/2022 - 22/09/2022",
    rent: "£9,823",
  },

];

const ReservationsTable: FC<{}> = () => {

  return (
    <div className="xs:p-2 md:p-3 lg:p-5 rounded-2xl min-h-[648px] bg-white wrapper-shadow">
      <Row className="gap-5" align='middle'>
        <p className="text-[20px] leading-[28px] text-secondary-color font-medium pb-5">Reservations</p>
      </Row>
      <GlobalTable columns={columns} tableData={data} pagination={false} height={500} />
    </div>
  );
};

export default ReservationsTable;
