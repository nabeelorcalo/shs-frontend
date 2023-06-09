import { useEffect, useState } from "react";
import { GlobalTable, SearchBar, PageHeader, BoxWrapper, InternsCard, FiltersButton, DropDown, StageStepper, DrawerWidth, TextArea, PopUpModal } from "../../../components";
import { useNavigate } from 'react-router-dom';
import { WarningIcon, More } from "../../../assets/images"
import { Button, Menu, MenuProps } from 'antd';
import { Dropdown, Avatar } from 'antd';
import Drawer from "../../../components/Drawer";
import useCustomHook from "./actionHandler";
import '../../../scss/global-color/Global-colors.scss'
import "./style.scss";
import { useRecoilState } from "recoil";
import { studentSystemAdminState } from "../../../store/studentSystemAdmin";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { ROUTES_CONSTANTS } from "../../../config/constants";

const statuses: any = {
  'Pending': "#FFC15D",
  'ACTIVE': '#3DC475',
  'inACTIVE': '#D83A52',
};

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const StudentSystemAdmin = () => {
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [showStageStepper, setShowStageStepper] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const studentSubAdmin = useRecoilState<any>(studentSystemAdminState);
  const [state, setState] = useState({
    timeFrame: "",
    natureOfWork: "",
    typeOfWork: "",
    stage: "",
    terminate: false
  })

  const action = useCustomHook()
  const csvAllColum = [
    "No",
    "Date Applied",
    "Company",
    "Type of Work",
    "Internship Type",
    "Nature of Work",
    "Position",
    "Status"
  ]
  const mainDrawerWidth = DrawerWidth();

  useEffect(() => {
    action.getSubAdminStudent()
  }, [])

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any) => (
        <div>
          {item?.id}
        </div>
      ),
      key: "no",
      title: "Sr.No",
    },
    {
      dataIndex: "name",
      render: (_: any, item: any) => (
        <div>
          {item?.userDetail?.firstName} {item?.userDetail?.lastName}
        </div>
      ),
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "email",
      render: (_: any, item: any) => (
        <div>
          {item?.userDetail?.email}
        </div>
      ),
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phone_number",
      render: (_: any, item: any) => (
        <div>
          {item?.userDetail?.phoneNumber}
        </div>
      ),
      key: "phone_number",
      title: "Phone Number",
    },
    {
      dataIndex: "university",
      render: (_: any, item: any) => (
        <div>
          {item?.userUniversity?.university?.name}
        </div>
      ),
      key: "university",
      title: "University",
    },
    {
      dataIndex: "city",
      render: (_: any, item: any) => (
        <div>
          {item?.userDetail?.city}
        </div>
      ),
      key: "city",
      title: "City",
    },
    {
      dataIndex: "hired",
      render: (_: any, item: any) => (
        <div>
          {item?.stage === 'hired' ? 'Yes' : 'No'}
        </div>
      ),
      key: "hired",
      title: "Hired",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center rounded white-color"
          style={{
            backgroundColor:statuses[item?.userDetail?.status],
            padding: " 2px 3px 2px 3px",
            borderRadius:"8px"
          }}
        >
          {item?.userDetail?.status}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, data: any) => (
        <span>
          <CustomDroupDown menu1={menu2} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const menu2 = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          navigate({ pathname: `/${ROUTES_CONSTANTS.PROFILE}` })
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          // updateTerminate(event)
        }}
      >
        Block
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          updateTerminate(event)
        }}
      >
        Password Reset</Menu.Item>
    </Menu>
  );
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
                action.downloadPdfOrCsv(event, csvAllColum, studentSubAdmin, "Students Applications")
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
                  pagination={true}
                  tableData={studentSubAdmin[0]}
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
