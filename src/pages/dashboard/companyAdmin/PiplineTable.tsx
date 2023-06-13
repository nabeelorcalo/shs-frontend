import { Divider, Row, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalTable } from "../../../components";

interface DataType {
  key: string | number;
  internships: { designation: string; candidates: string | number };
  applied: string | number;
  interviewed: string | number;
  recommended: string | number;
  offerLetter: string | number;
  contract: string | number;
  hired: string | number;
  rejected: string | number;
}

const columns: ColumnsType<DataType> = [
  {
    title: <th className="text-base font-normal text-teriary-color">Internships</th>,
    dataIndex: "internships",
    key: "internships",
    render: (obj) => (
      <div className="text-left my-[-8px]">
        <p className="font-semibold text-secondary-color text-[18px] leading-6 capitalize">{obj?.designation}</p>
        <span className="text-sm font-normal light-grey-color">Total Candidates: </span>
        <span className="font-medium text-teriary-color">{obj?.candidates}</span>
      </div>
    ),
  },
  {
    title: <th className="text-base font-normal text-teriary-color">Applied</th>,
    dataIndex: "applied",
    key: "applied",
    render: (text) => (
      <div className="primary-bg-color mx-[-11px] my-[-8px] min-w-[131px] flex justify-center items-center gap-1 p-2 rounded">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white text-sm"> Candidates</span>
      </div>
    ),
  },
  {
    title: <th className="text-base font-normal text-teriary-color">Interviewed</th>,
    dataIndex: "interviewed",
    key: "interviewed",
    render: (text) => (
      <div className="light-blue-bg mx-[-11px] my-[-8px] min-w-[131px] flex justify-center items-center gap-1 p-2 rounded">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white text-sm"> Candidates</span>
      </div>
    ),
  },
  {
    title: <th className="text-base font-normal text-teriary-color">Recommended</th>,
    dataIndex: "recommended",
    key: "recommended",
    render: (text) => (
      <div className="purple-bg mx-[-11px] my-[-8px] flex justify-center items-center gap-1 p-2 rounded min-w-[131px]">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white text-sm"> Candidates</span>
      </div>
    ),
  },
  {
    title: <th className="text-base font-normal text-teriary-color">Offer Letter</th>,
    dataIndex: "offerLetter",
    key: "offerLetter",
    render: (text) => (
      <div className="light-purple-bg mx-[-11px] my-[-8px] min-w-[131px] flex justify-center items-center gap-1 p-2 rounded">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white text-sm"> Candidates</span>
      </div>
    ),
  },
  {
    title: <th className="text-base font-normal text-teriary-color">Contract</th>,
    dataIndex: "contract",
    key: "contract",
    render: (text) => (
      <div className="line-bg  mx-[-11px] my-[-8px] min-w-[131px] flex justify-center items-center gap-1 p-2 rounded">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white text-sm"> Candidates</span>
      </div>
    ),
  },
  {
    title: <th className="text-base font-normal text-teriary-color">Hired</th>,
    dataIndex: "hired",
    key: "hired",
    render: (text) => (
      <div className="teriary-bg-color mx-[-11px] my-[-8px] min-w-[131px] flex justify-center items-center gap-1 p-2 rounded">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white text-sm"> Candidates</span>
      </div>
    ),
  },
  {
    title: <th className="text-base font-normal text-teriary-color">Rejected</th>,
    dataIndex: "rejected",
    key: "rejected",
    render: (text) => (
      <div className="page-header-secondary-bg-color  mx-[-11px] my-[-8px] min-w-[131px] flex justify-center items-center gap-1 p-2 rounded">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white text-sm"> Candidates</span>
      </div>
    ),
  },
];

const PiplineTable: FC<{
  handleSelect: (value: any) => void;
  internshipsList: any;
  departmentList: any;
  loading: boolean;
}> = (props) => {
  const { handleSelect, internshipsList, departmentList, loading } = props;
  const navigate = useNavigate();
  const [value, setValue] = useState<number | string>();

  return (
    <div className="bg-white p-5 rounded-2xl wrapper-shadow">
      <Row className="gap-5" align="middle" justify="space-between">
        <Row className="gap-5" align="middle">
          <p className="text-[20px] leading-[28px] text-teriary-color font-medium">Pipeline</p>
          <Select
            className="min-w-[170px] light-grey-color pipline-select"
            size="small"
            placeholder="Select"
            value={value}
            onChange={(e) => {
              handleSelect(e);
              setValue(e === "all" ? undefined : e);
            }}
            options={[
              { value: "all", label: "All" },
              ...departmentList?.map((item: any) => ({ value: item?.id, label: item?.name })),
            ]}
          />
        </Row>
        <p className="cursor-pointer text-teriary-color text-base" onClick={() => navigate("/internships")}>
          View All
        </p>
      </Row>
      <Divider className="mt-[14px] mb-[20px]" />
      <GlobalTable
        bgWhiteTable
        columns={columns}
        tableData={internshipsList}
        pagination={false}
        height={195}
        loading={loading}
      />
    </div>
  );
};

export default PiplineTable;
