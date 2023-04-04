import react, { useState } from "react";
import {
  GlobalTable,
  SearchBar,
  PageHeader,
  BoxWrapper,
  InternsCard,
  ToggleButton,
  FiltersButton,
  DropDown,
  StageStepper
} from "../../components";
import "./style.scss";
import '../../scss/global-color/Global-colors.scss'
import { useNavigate } from 'react-router-dom';
import { CardViewIcon, DownloadDocumentIcon, More, TableViewIcon } from "../../assets/images"
import { Button, MenuProps, Space } from 'antd';
import { Dropdown, Avatar } from 'antd';
import Drawer from "../../components/Drawer";

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
            state(true);
          }}
        >
          View Details
        </a>
      ),
    },

  ];
  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <More />
    </Dropdown>
  );
};


const CompanyData = ({companyName, companyNature}:any) => {
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

const Application = () => {
  const navigate = useNavigate()
  // const [value, setValue] = useState("")
  const [showDrawer, setShowDrawer] = useState(false)
  const [showStageStepper, setShowStageStepper] = useState(false)
  // const [state, setState] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [isToggle, setIsToggle] = useState(false)
  console.log(isToggle)
  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "date_applied",
      key: "date_applied",
      title: "Date Applied",
    },
    {
      dataIndex: "company",
      key: "company",
      title: "Company",
    },
    {
      dataIndex: "type_of_work",
      key: "type_of_work",
      title: "Type of Work",
    },
    {
      dataIndex: "internship_type",
      key: "internship_type",
      title: "Internship Type",
    },
    {
      dataIndex: "nature_of_work",
      key: "nature_of_work",
      title: "Nature of Work",
    },
    {
      dataIndex: "position",
      key: "position",
      title: "Position",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
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
      date_applied: "01/07/2022",
      company: {name: "Alphabet Inc.", details:"Software Agency"},
      type_of_work: "Part Time",
      internship_type: "Un-Paid",
      nature_of_work: "On site",
      position: "UI/UX Designer",
      location: "virtual",
      status: "Hired",
      posted_by: "T",
    },
    {
      no: "02",
      date_applied: "01/07/2022",
      company: {name: "Intuit Inc.", details:"Sports"},
      type_of_work: "Full Time",
      internship_type: "Paid",
      nature_of_work: "Hybrid (London)",
      position: "Business Analyst",
      location: "Onsite",
      status: "Offer Letter",
      posted_by: "U",
    },
    {
      no: "02",
      date_applied: "01/07/2022",
      company: {name: "ServiceNOW", details:"Software Solutions"},
      type_of_work: "Part Time",
      internship_type: "Un-Paid",
      nature_of_work: "Virtual",
      position: "SQA",
      location: "Onsite",
      status: "Rejected",
      posted_by: "U",
    },
    {
      no: "02",
      date_applied: "01/07/2022",
      company: {name: "kla Corporation Inc.", details:"Logistics"},
      type_of_work: "Full Time",
      internship_type: "Paid",
      nature_of_work: "Hybrid (London)",
      position: "Business Analyst",
      location: "Onsite",
      status: "Short Listed",
      posted_by: "U",
    },
    {
      no: "02",
      date_applied: "01/07/2022",
      company: {name: "SnowFlake Inc.", details:"Software Tech"},
      type_of_work: "Part Time",
      internship_type: "Un-Paid",
      nature_of_work: "Virtual",
      position: "SQA",
      location: "Onsite",
      status: "Interviewed",
      posted_by: "U",
    },
    {
      no: "02",
      date_applied: "01/07/2022",
      company: {name: "WorkDay Inc.", details:"Design Tech"},
      type_of_work: "Full Time",
      internship_type: "Paid",
      nature_of_work: "Hybrid (London)",
      position: "Business Analyst",
      location: "Onsite",
      status: "Rejected",
      posted_by: "U",
    },
    {
      no: "02",
      date_applied: "01/07/2022",
      company: {name: "Fortinet Inc.", details:"Game Agency"},
      type_of_work: "Part Time",
      internship_type: "Un-Paid",
      nature_of_work: "Virtual",
      position: "SQA",
      location: "Onsite",
      status: "Applied",
      posted_by: "U",
    },
  ];
  const newTableData = tableData.map((item, idx) => {
    return (
      {
        no: item.no,
        date_applied: item.date_applied,
        company: <CompanyData companyName={item.company?.name} companyNature={item.company?.details} />,
        type_of_work: item.type_of_work,
        internship_type: item.internship_type,
        nature_of_work: item.nature_of_work,
        position: item.position,
        status:
          <p
            className={

              `text-md ${item.status === "Applied" ? btnStyle["applied"]
                :
                item.status === "Interviewed" ? btnStyle["interviewed"]
                  :
                  item.status === "Short Listed" ? btnStyle["shortlisted"]
                    :
                    item.status === "Offer Letter" ? btnStyle["offerletter"]
                      :
                      item.status === "Hired" ? btnStyle["hired"]
                        :
                        item.status === "Rejected" ? btnStyle["rejected"]
                          :
                          btnStyle["offerletter"]}`
            }
          >
            {item.status}
          </p>,
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
              className=""
              handleChange={() => { }}
              name="search bar"
              placeholder="search"
              size="middle"
            />
          </div>
          <div className="flex flex-row gap-4">
            <FiltersButton
              label="Filters"
              onClick={() => {
                setShowDrawer(true);
              }}
            />

            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              setValue={() => { }}
              value=""
            />
            <Drawer
              closable
              open={showDrawer}
              onClose={() => {
                setShowDrawer(false);
              }}
              title="Filters"
            >
              <div key=".0">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-2">
                    <p>Time Fram</p>
                    <DropDown
                      name="Select"
                      options={["This weak", "Last weak", "This month", "Last month"]}
                      setValue={() => { }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Nature of Work</p>
                    <DropDown
                      name="Select"
                      options={[
                        "All",
                        "On-site",
                        "Hybrid",
                        "Virtual",
                      ]}
                      setValue={() => { }}
                      requireCheckbox
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Type of Work</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Paid",
                        "Un-paid",
                        "Part Time",
                        "Full Time",
                      ]}
                      setValue={() => { }}
                      requireCheckbox
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Stage</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Business analyst",
                        "Research analyst",
                        "Accountant",
                        "Administrator",
                        "HR Cordinator",
                      ]}
                      setValue={() => { }}
                      requireCheckbox
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value=""
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button
                      size="middle"
                      className="flex gap-2 white-bg-color teriary-color"
                      onClick={() => {
                        navigate("new-internship");
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      size="middle"
                      className="flex gap-2 teriary-bg-color white-color"
                      onClick={() => {
                        navigate("new-internship");
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </Drawer>
            <Drawer
              closable
              width={1000}
              open={showStageStepper}
              onClose={() => {
                setShowStageStepper(false);
              }}

            >
              <StageStepper />
            </Drawer>
          </div>
        </div>
        <BoxWrapper>
          <div className="pt-3">
            {
              listandgrid ? <div className="flex flex-row flex-wrap gap-6">
                {
                  cardDummyArray.map((items: any, idx: any) => {
                    return (
                      <InternsCard />
                    )
                  })
                }
              </div>
                :
                <GlobalTable
                  columns={columns}
                  expandable={{
                    expandedRowRender: () => { },
                    rowExpandable: function noRefCheck() { }
                  }}
                  tableData={newTableData}
                />
            }
          </div>
        </BoxWrapper>
      </div>
    </>
  );
};

export default Application;
