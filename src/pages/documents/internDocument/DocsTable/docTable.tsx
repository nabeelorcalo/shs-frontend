import React from "react";
import { Dropdown, MenuProps, Rate } from "antd";
import { GlobalTable } from "../../../../components";
import { DocImage, Dots, Pdf, ThreeDotsIcon } from "../../../../assets/images";
import DropDownNew from "../../../../components/Dropdown/DropDownNew";
import { byteToHumanSize } from "../../../../helpers";
import dayjs from "dayjs";

const items = [
  {
    label: "View",
    value: "View",
  },
  {
    label: "Download",
    value: "Download",
  },
];
const columns = [
  {
    title: "No",
    dataIndex: "id",
  },
  {
    title: "Preview",
    dataIndex: "preview",
    render: (_: any, obj: any) =>
      // obj.name.includes(".pdf") ? (
        // <img src={DocImage} />
      // ) : (
        <img src={Pdf} alt="" />
      // ),
  },
  {
    title: "Name",
    dataIndex: "fileName",
  },
  {
    title: "Favourite",
    dataIndex: "favourite",
    render: (text: string) => <Rate count={1} />,
  },
  {
    title: "Date",
    dataIndex: "Date",
    render: (text: string) => dayjs(text).format('DD/MM/YYYY')
  },
  {
    title: "File Size",
    dataIndex: "size",
    render: (text: string) => byteToHumanSize(text),
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, data: any) => (
      <DropDownNew items={items}>
        <img
          className="cursor-pointer intern-document-model"
          src={Dots}
          alt=""
        />
      </DropDownNew>
    ),
  },
];
const data = [
  {
    no: "1",
    preview: "pdf",
    name: "resume.pdf",
    favourite: "",
    Date: "01/07/2022",
    fileSize: "2.3 MB",
  },
  {
    no: "2",
    preview: "doc",
    name: "resume.doc",
    favourite: "",
    Date: "01/07/2022",
    fileSize: "2.3 MB",
  },
  {
    no: "3",
    preview: "pdf",
    name: "resume.pdf",
    favourite: "",
    Date: "01/07/2022",
    fileSize: "2.3 MB",
  },
  {
    no: "4",
    preview: "doc",
    name: "resume.doc",
    favourite: "",
    Date: "01/07/2022",
    fileSize: "2.3 MB",
  },
];
const DocTable = ({ docs }: any) => {
  return (
    <div>
      <GlobalTable tableData={docs} columns={columns} pagination={false} />
    </div>
  );
};

export default DocTable;
