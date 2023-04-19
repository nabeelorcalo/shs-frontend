import react, { useState } from "react";
import {
  GlobalTable,
  SearchBar,
  PageHeader,
  BoxWrapper,
  DropDown,
} from "../../../components";
import "./style.scss";
import '../../../scss/global-color/Global-colors.scss'
import { useNavigate } from 'react-router-dom';
import { More } from "../../../assets/images"
import { MenuProps } from 'antd';
import { Dropdown, Avatar } from 'antd';
import useCustomHook from "../actionHandler";

const btnStyle = {
  "applied": "p-1 rounded-lg primary-bg-color white-color",
  "interviewed": "p-1 rounded-lg text-info-bg-color white-color",
  "shortlisted": "p-1 rounded-lg purple-bg white-color",
  "offerletter": "p-1 rounded-lg light-purple-bg white-color",
  "hired": "p-1 rounded-lg text-success-bg-color white-color",
  "rejected": "p-1 rounded-lg secondary-bg-color white-color",
}

const PopOver = ({ state }: any) => {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            navigate("profile");
          }}
        >
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={() => {
            navigate("chat");
          }}
        >
          Chat
        </a>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={[`click`]}
      overlayStyle={{ width: 180 }}
    >
      <More className="cursor-pointer" />
    </Dropdown>
  );
};

const CompanyData = ({ companyName, companyNature }: any) => {
  return (
    <div className="flex flex-row align-center gap-2">
      <Avatar
        src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
      />
      <div>
        <p className="font-medium">{companyName}</p>
        <p className="text-sm">{companyNature}</p>
      </div>
    </div>
  )
}

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const CompaniesMain = () => {
  const navigate = useNavigate()
  // const [value, setValue] = useState("")
  const [showDrawer, setShowDrawer] = useState(false)
  const [showStageStepper, setShowStageStepper] = useState(false)
  // const [state, setState] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [isToggle, setIsToggle] = useState(false)

  const action = useCustomHook()
  const csvAllColum = ["No", "Company", "Company Rep", "Email", "Phone No.", "Students Hired"]

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "company",
      key: "company",
      title: "Company",
    },
    {
      dataIndex: "company_rep",
      key: "company_rep",
      title: "Company Rep",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phone_no",
      key: "phone_no",
      title: "Phone No.",
    },
    {
      dataIndex: "students_hired",
      key: "students_hired",
      title: "Students Hired",
    },
    {
      dataIndex: "actions",
      key: "actions",
      title: "Actions",
    },
  ];
  const tableData = [
    {
      no: "01",
      company: { name: "Alphabet Inc.", details: "Software Agency" },
      company_rep: "Deing Jim M",
      email: "deing.jing@gmail.com",
      phone_no: "+44 5459 90872435",
      students_hired: 14,
    },
    {
      no: "02",
      company: { name: "Intuit Inc.", details: "Sports" },
      company_rep: "Robbert Patenson",
      email: "robert.patenson@gmail.com",
      phone_no: "+44 5459 90872435",
      students_hired: 4,
    },
    {
      no: "02",
      company: { name: "ServiceNOW", details: "Software Solutions" },
      company_rep: "Silwa Kreig",
      email: "silwa.kreig@gmail.com",
      phone_no: "+44 5459 90872435",
      students_hired: 12,
    },
    {
      no: "01",
      company: { name: "Alphabet Inc.", details: "Software Agency" },
      company_rep: "Deing Jim M",
      email: "deing.jing@gmail.com",
      phone_no: "+44 5459 90872435",
      students_hired: 14,
    },
    {
      no: "02",
      company: { name: "Intuit Inc.", details: "Sports" },
      company_rep: "Robbert Patenson",
      email: "robert.patenson@gmail.com",
      phone_no: "+44 5459 90872435",
      students_hired: 4,
    },
    {
      no: "02",
      company: { name: "ServiceNOW", details: "Software Solutions" },
      company_rep: "Silwa Kreig",
      email: "silwa.kreig@gmail.com",
      phone_no: "+44 5459 90872435",
      students_hired: 12,
    },
  ];
  const newTableData = tableData.map((item, idx) => {
    return (
      {
        no: item.no,
        company:
          <CompanyData
            companyName={item.company?.name}
            companyNature={item.company?.details}
          />,
        company_rep: item.company_rep,
        email: item.email,
        phone_no: item.phone_no,
        students_hired: item.students_hired,
        actions: <PopOver state={setShowStageStepper} />
      }
    )
  })
  return (
    <>
      <PageHeader title="Applications" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar
              handleChange={() => { }}
              name="search bar"
              placeholder="Search"
              size="middle"
            />
          </div>
          <div className="flex flex-row gap-4">
            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                action.downloadPdfOrCsv(event, csvAllColum, tableData, "Companies Applications")
              }}
              value=""
            />
           
          </div>
        </div>
        <BoxWrapper>
          <div className="pt-3">
            <GlobalTable
              columns={columns}
              tableData={newTableData}
            />
            {/* } */}
          </div>
        </BoxWrapper>
      </div>
    </>
  );
};

export default CompaniesMain;
