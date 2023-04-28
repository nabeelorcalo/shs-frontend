import React from "react";
import { Dropdown, MenuProps, Rate } from "antd";
import { GlobalTable } from "../../../../components";
import { DocImage, Dots, Pdf, ThreeDotsIcon } from "../../../../assets/images";
import DropDownNew from "../../../../components/Dropdown/DropDownNew";

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
    dataIndex: "no",
  },
  {
    title: "Preview",
    dataIndex: "preview",
    render: (_: any, obj: any) =>
      obj.name.includes(".pdf") ? (
        <img src={DocImage} />
      ) : (
        <img src={Pdf} alt="" />
      ),
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Favourite",
    dataIndex: "favourite",
    render: (text: string) => <Rate count={1} />,
  },
  {
    title: "Date",
    dataIndex: "Date",
  },
  {
    title: "File Size",
    dataIndex: "fileSize",
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
const DocTable = () => {
  return (
    <div>
      <GlobalTable tableData={data} columns={columns} pagination={false} />
    </div>
  );
};

export default DocTable;
