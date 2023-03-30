import { Divider, Row, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FC } from "react";
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
    title: "Internships",
    dataIndex: "internships",
    key: "internships",
    render: (obj) => (
      <div className="text-left my-[-8px]">
        <p className="font-semibold text-secondary-color text-[18px] leading-6">{obj?.designation}</p>
        <span>Total Candidates: </span>
        <span className="font-semibold">{obj?.candidates}</span>
      </div>
    ),
  },
  {
    title: "Applied",
    dataIndex: "applied",
    key: "applied",
    render: (text) => (
      <div className="primary-bg-color mx-[-11px] my-[-8px] p-2">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white"> Candidates</span>
      </div>
    ),
  },
  {
    title: "Interviewed",
    dataIndex: "interviewed",
    key: "interviewed",
    render: (text) => (
      <div className="light-blue-bg mx-[-11px] my-[-8px] p-2">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white"> Candidates</span>
      </div>
    ),
  },
  {
    title: "Recommended",
    dataIndex: "recommended",
    key: "recommended",
    render: (text) => (
      <div className="purple-bg mx-[-11px] my-[-8px] p-2 min-w-[131px]">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white"> Candidates</span>
      </div>
    ),
  },
  {
    title: "Offer Letter",
    dataIndex: "offerLetter",
    key: "offerLetter",
    render: (text) => (
      <div className="light-purple-bg mx-[-11px] my-[-8px] p-2">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white"> Candidates</span>
      </div>
    ),
  },
  {
    title: "Contract",
    dataIndex: "contract",
    key: "contract",
    render: (text) => (
      <div className="line-bg  mx-[-11px] my-[-8px] p-2">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white"> Candidates</span>
      </div>
    ),
  },
  {
    title: "Hired",
    dataIndex: "hired",
    key: "hired",
    render: (text) => (
      <div className="teriary-bg-color mx-[-11px] my-[-8px] p-2">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white"> Candidates</span>
      </div>
    ),
  },
  {
    title: "Rejected",
    dataIndex: "rejected",
    key: "rejected",
    render: (text) => (
      <div className="page-header-secondary-bg-color  mx-[-11px] my-[-8px] p-2">
        <span className="font-bold text-white">{text}</span>
        <span className="text-white"> Candidates</span>
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    internships: { designation: "UI UX Designer", candidates: "07" },
    applied: 32,
    interviewed: 50,
    recommended: 25,
    offerLetter: 25,
    contract: 25,
    hired: 25,
    rejected: 10,
  },
  {
    key: "1",
    internships: { designation: "UI UX Designer", candidates: "07" },
    applied: 32,
    interviewed: 50,
    recommended: 25,
    offerLetter: 25,
    contract: 25,
    hired: 25,
    rejected: 10,
  },
  {
    key: "1",
    internships: { designation: "UI UX Designer", candidates: "07" },
    applied: 32,
    interviewed: 50,
    recommended: 25,
    offerLetter: 25,
    contract: 25,
    hired: 25,
    rejected: 10,
  },
];

const PiplineTable: FC<{ handleSelect: (value: any) => void }> = (props) => {

  const { handleSelect } = props;
  const navigate = useNavigate();
  
  return (
    <div className="bg-white p-5 rounded-2xl wrapper-shadow">
      <Row className="gap-5" align="middle" justify="space-between">
        <Row className="gap-5" align="middle">
          <p className="text-[20px] leading-[28px] text-secondary-color font-medium">Pipeline</p>
          <Select
            className="min-w-[170px] text-input-bg-color rounded-xl"
            size="small"
            placeholder="Select"
            style={{ width: 120 }}
            onChange={(e) => handleSelect(e)}
            options={[
              { value: "design", label: "Design" },
              { value: "Business Analysis", label: "Business Analysis" },
              { value: "Research", label: "Research" },
              { value: "Accounting", label: "Accounting" },
              { value: "Human Resources", label: "Human Resources" },
              { value: "Administration", label: "Administration" },
              { value: "Project Management", label: "Project Management" },
            ]}
          />
        </Row>
        <p className="cursor-pointer text-teriary-color text-base" onClick={()=>navigate('/internships')}>View All</p>
      </Row>
      <Divider className="mt-[14px] mb-[20px]" />
      <GlobalTable bgWhiteTable columns={columns} tableData={data} pagination={false} height={200} />
    </div>
  );
};

export default PiplineTable;
