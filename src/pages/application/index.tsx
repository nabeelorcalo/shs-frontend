import { useEffect, useState } from "react";
import { GlobalTable, SearchBar, PageHeader, BoxWrapper, InternsCard, FiltersButton, DropDown, StageStepper, DrawerWidth } from "../../components";
import { useNavigate } from 'react-router-dom';
import { More } from "../../assets/images"
import { Button, MenuProps } from 'antd';
import { Dropdown, Avatar } from 'antd';
import Drawer from "../../components/Drawer";
import useCustomHook from "./actionHandler";
import '../../scss/global-color/Global-colors.scss'
import "./style.scss";

const ButtonStatus = (props: any) => {
  const btnStyle: any = {
    "Applied": "primary-bg-color",
    "Interviewed": "text-info-bg-color",
    "Short Listed": "purple-bg",
    "Offer Letter": "light-purple-bg",
    "Hired": "text-success-bg-color",
    "Rejected": "secondary-bg-color",
  }
  return (
    <p>
      <span
        className={`px-2 py-1 rounded-lg white-color ${btnStyle[props.status]}`}
      >
        {props.status}
      </span>
    </p>
  )
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
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{ width: 180 }}>
      <More />
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




const Application = () => {
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [showStageStepper, setShowStageStepper] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [state, setState] = useState({
    time_frame: "",
    nature_of_work: "",
    type_of_work:"",
    stage: ""
  })

  const action = useCustomHook()
  const csvAllColum = ["No", "Date Applied", "Company", "Type of Work", "Internship Type", "Nature of Work", "Position", "Status"]
  const mainDrawerWidth = DrawerWidth();

  
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
      company: { name: "Alphabet Inc.", details: "Software Agency" },
      type_of_work: "Part Time",
      internship_type: "Un-Paid",
      nature_of_work: "On site",
      position: "UI/UX Designer",
      status: "Hired",

    },
    {
      no: "02",
      date_applied: "01/07/2022",
      company: { name: "Intuit Inc.", details: "Sports" },
      type_of_work: "Full Time",
      internship_type: "Paid",
      nature_of_work: "Hybrid (London)",
      position: "Business Analyst",
      status: "Offer Letter",
    },
    {
      no: "03",
      date_applied: "01/07/2022",
      company: { name: "ServiceNOW", details: "Software Solutions" },
      type_of_work: "Part Time",
      internship_type: "Un-Paid",
      nature_of_work: "Virtual",
      position: "SQA",
      status: "Rejected",
    },
    {
      no: "04",
      date_applied: "01/07/2022",
      company: { name: "kla Corporation Inc.", details: "Logistics" },
      type_of_work: "Full Time",
      internship_type: "Paid",
      nature_of_work: "Hybrid (London)",
      position: "Business Analyst",
      status: "Short Listed",
    },
    {
      no: "05",
      date_applied: "01/07/2022",
      company: { name: "SnowFlake Inc.", details: "Software Tech" },
      type_of_work: "Part Time",
      internship_type: "Un-Paid",
      nature_of_work: "Virtual",
      position: "SQA",
      status: "Interviewed",
    },
    {
      no: "06",
      date_applied: "01/07/2022",
      company: { name: "WorkDay Inc.", details: "Design Tech" },
      type_of_work: "Full Time",
      internship_type: "Paid",
      nature_of_work: "Hybrid (London)",
      position: "Business Analyst",
      status: "Rejected",
    },
    {
      no: "07",
      date_applied: "01/07/2022",
      company: { name: "Fortinet Inc.", details: "Game Agency" },
      type_of_work: "Part Time",
      internship_type: "Un-Paid",
      nature_of_work: "Virtual",
      position: "SQA",
      status: "Applied",
    },
  ];
  const newTableData = tableData.map((item: any, idx: any) => {
    return (
      {
        no: item.no,
        date_applied: item.date_applied,
        company: <CompanyData companyName={item.company?.name} companyNature={item.company?.details} />,
        type_of_work: item.type_of_work,
        internship_type: item.internship_type,
        nature_of_work: item.nature_of_work,
        position: item.position,
        status: <ButtonStatus status={item.status} />,
        actions:
          <PopOver
            state={setShowStageStepper}
          />
      }
    )
  })
  const updateTimeFrame = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      time_frame: value
    }))
  }
  const updateNatureOfWork = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      nature_of_work: value
    }))
  }
  const updateTypeOfWork = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      type_of_work: value
    }))
  }
  const updateStage = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      stage: value
    }))
  }
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
              setValue={() => {
                action.downloadPdfOrCsv(event, csvAllColum, tableData, "Students Applications")
              }}
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
                      setValue={() => {updateTimeFrame(event)}}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.time_frame}
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
                      setValue={() => {updateNatureOfWork(event)}}
                      requireCheckbox
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.nature_of_work}
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
                      setValue={() => {updateTypeOfWork(event)}}
                      requireCheckbox
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.type_of_work}
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
                      setValue={() => {updateStage(event)}}
                      requireCheckbox
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.stage}
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button type="default" size="middle" className="button-default-tertiary" onClick={() => { }}>Reset</Button>
                    <Button type="primary" size="middle" className="button-tertiary" onClick={() => { }}>Apply</Button>
                  </div>
                </div>
              </div>
            </Drawer>
            <Drawer
              closable
              width={mainDrawerWidth>1400 ? 1000 : mainDrawerWidth > 900 ? 900:mainDrawerWidth > 576?600:300}
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
