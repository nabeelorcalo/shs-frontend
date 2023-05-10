import { useEffect, useState } from "react";
import { GlobalTable, SearchBar, PageHeader, BoxWrapper, InternsCard, FiltersButton, DropDown, StageStepper, DrawerWidth, TextArea, PopUpModal } from "../../../components";
import { useNavigate } from 'react-router-dom';
import { WarningIcon, More } from "../../../assets/images"
import { Button, MenuProps } from 'antd';
import { Dropdown, Avatar } from 'antd';
import Drawer from "../../../components/Drawer";
import useCustomHook from "./actionHandler";
import '../../../scss/global-color/Global-colors.scss'
import "./style.scss";

const ButtonStatus = (props: any) => {
  const btnStyle: any = {
    "Active": "text-success-bg-color",
    "In Active": "secondary-bg-color",
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

const StudentSystemAdmin = () => {
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [showStageStepper, setShowStageStepper] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [state, setState] = useState({
    timeFrame: "",
    natureOfWork: "",
    typeOfWork: "",
    stage: "",
    terminate: false
  })

  const PopOver = ({ state }: any) => {
    const navigate = useNavigate();
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              // state(true);
            }}
          >
            View Details
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              // updateTerminate(event)
            }}
          >
            Block
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              updateTerminate(event)
            }}
          >
            Reset Password
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
  const action = useCustomHook()
  const csvAllColum = ["No", "Date Applied", "Company", "Type of Work", "Internship Type", "Nature of Work", "Position", "Status"]
  const mainDrawerWidth = DrawerWidth();

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "Sr.No",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phone_number",
      key: "phone_number",
      title: "Phone Number",
    },
    {
      dataIndex: "university",
      key: "university",
      title: "University",
    },
    {
      dataIndex: "city",
      key: "city",
      title: "City",
    },
    {
      dataIndex: "hired",
      key: "hired",
      title: "Hired",
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
      name: "Maria Swats",
      email: 'maria@internshipken.com',
      phone_number: "477-009-0021",
      university: "University of Birmingham",
      city: "London",
      hired: "No",
      status: "Active",

    },
    {
      no: "02",
      name: "Ronal Richards",
      email: 'Richards@internshipken.com',
      phone_number: "477-009-0021",
      university: "LSU",
      city: "Hybrid (London)",
      hired: "Yes",
      status: "Active",
    },
    {
      no: "03",
      name: "Kriston Watson",
      email: 'Kriston@internshipken.com',
      phone_number: "477-009-0021",
      university: "Oxford",
      city: "Portsmouth",
      hired: "No",
      status: "In Active",
    },
    {
      no: "04",
      name: "Jenny Wilson",
      email: 'Wilson@internshipken.com',
      phone_number: "477-009-0021",
      university: "Portsmouth University",
      city: "Portsmouth",
      hired: "Yes",
      status: "In Active",
    },
    {
      no: "05",
      name: "Kirson David",
      email: 'Kirson@internshipken.com',
      phone_number: "477-009-0021",
      university: "LSA",
      city: "London",
      hired: "No",
      status: "Active",
    },
    {
      no: "06",
      name: "David Ken",
      email: 'David@internshipken.com',
      phone_number: "477-009-0021",
      university: "UOG",
      city: "Portsmouth",
      hired: "Yes",
      status: "In Active",
    },
    {
      no: "07",
      name: "Laura Sward",
      email: 'Laura@internshipken.com',
      phone_number: "477-009-0021",
      university: "Priston",
      city: "London",
      hired: "Yes",
      status: "Active",
    },
  ];
  const newTableData = tableData.map((item: any, idx: any) => {
    return (
      {
        no: item.no,
        name: item.name,
        email: item.email,
        phone_number: item.phone_number,
        university: item.university,
        city: item.city,
        hired: item.hired,
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
      timeFrame: value
    }))
  }
  const updateNatureOfWork = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      natureOfWork: value
    }))
  }
  const updateTypeOfWork = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      typeOfWork: value
    }))
  }
  const updateStage = (event: any) => {
    const value = event.target.innerText;
    setState((prevState) => ({
      ...prevState,
      stage: value
    }))
  }
  const updateTerminate = (value: any) => {
    setState((prevState) => ({
      ...prevState,
      terminate: value
    }))
  }
  return (
    <>
      <PageHeader title="Students" />
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
                    <p>Type</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Hired",
                        "Not hired",
                        "All"
                      ]}
                      setValue={() => { updateTimeFrame(event) }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.timeFrame}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Status</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Active",
                        "In-Active",
                        "All"
                      ]}
                      setValue={() => { updateNatureOfWork(event) }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.natureOfWork}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>City</p>
                    <DropDown
                      name="Select"
                      options={[
                        "London",
                        "Lancester",
                        "Birmingham",
                        "Glasgow",
                        "Liverpool",
                        "Bristol",
                        "Leads",
                        "All"
                      ]}
                      setValue={() => { updateTypeOfWork(event) }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.typeOfWork}
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
              width={mainDrawerWidth > 1400 ? 1000 : mainDrawerWidth > 900 ? 900 : mainDrawerWidth > 576 ? 600 : 300}
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
                  hideTotal
                  pagination={false}
                  tableData={newTableData}
                />
            }
          </div>
        </BoxWrapper>
      </div>
      <PopUpModal
        open={state.terminate}
        width={500}
        close={() => { updateTerminate(false) }}
        children={
          <div>
            <div className="flex flex-col gap-5">
              <div className='flex flex-row items-center gap-3'>
                <div><WarningIcon /></div>
                <div><h2>Reset Password ?</h2></div>
              </div>
              <p>Are you sure to generate reset password request?</p>
            </div>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="small"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => updateTerminate(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-tertiary max-sm:w-full"
            >
              Reset
            </Button>
          </div>
        }
      />
    </>
  );
};

export default StudentSystemAdmin;
