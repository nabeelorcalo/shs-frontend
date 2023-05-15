import { useEffect, useState } from "react";
import {
  GlobalTable, SearchBar, PageHeader, BoxWrapper, InternsCard,
  ToggleButton, DropDown, FiltersButton, Drawer, PopUpModal
} from "../../../components";
import { TextArea } from "../../../components";
import { AlertIcon, CardViewIcon, More, SuccessIcon, TableViewIcon, } from "../../../assets/images"
import { Dropdown, Avatar, Button, MenuProps, Row, Col, Spin, Select } from 'antd';
import useCustomHook from "./actionHandler";
import dayjs from "dayjs";

const InternsCompanyAdmin = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [assignManager, setAssignManager] = useState(false)
  const [terminate, setTerminate] = useState(false)
  const [complete, setComplete] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [state, setState] = useState({
    manager: undefined,
    status: undefined,
    department: undefined,
    university: undefined,
    dateOfJoining: undefined
  })

  const managerList = [
    { value: 'David', label: 'David miller' },
    { value: 'Amila', label: 'Amila Clark' },
    { value: 'Mino', label: 'Mino Marino' },
    { value: 'Maria', label: 'Maria sanaid' },
  ]
  const statusList = [
    { value: 'Employed', label: 'Employed' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Terminated', label: 'Terminated' },
    { value: 'All', label: 'All' },
  ]
  const departmentsList = [
    { value: 'Business analyst', label: 'Business analyst' },
    { value: 'Research analyst', label: 'Research analyst' },
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Administrator', label: 'Administrator' },
    { value: 'HR Cordinator', label: 'HR Cordinator' },
    { value: 'All', label: 'All' },
  ]
  const universityList = [
    { value: 'Power source', label: 'Power source' },
    { value: 'Dev spot', label: 'Dev spot' },
    { value: 'Abacus', label: 'Abacus' },
    { value: 'Orcalo Holdings', label: 'Orcalo Holdings' },
    { value: 'Coding Hub', label: 'Coding Hub' },
    { value: 'All', label: 'All' },
  ]

  const { getAllInternsData, getAllInters,
    changeHandler, downloadPdfOrCsv, isLoading } = useCustomHook()

  useEffect(() => {
    getAllInternsData(state.status)
  }, [])


  const csvAllColum = ["No", "Title", "Department", "Joining Date", "Date of Birth"]

  const ButtonStatus = (props: any) => {
    const btnStyle: any = {
      "completed": "primary-bg-color",
      "employed": "text-success-bg-color",
      "terminated": "secondary-bg-color",
    }
    return (
      <p>
        <span className={`px-2 py-1 rounded-lg white-color ${btnStyle[props.status]}`} >
          {props.status}
        </span>
      </p>
    )
  }

  const PopOver = () => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setAssignManager(true)
            }}
          >
            Assign Manager
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setTerminate(true)
            }}
          >
            Terminate
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setComplete(true)
            }}
          >
            Complete Internship
          </a>
        ),
      },
    ];
    return (
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{ width: 180 }}
      >
        <More />
      </Dropdown>
    );
  };

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No",
    },
    {
      dataIndex: "posted_by",
      key: "posted_by",
      title: "Posted By",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "department",
      key: "department",
      title: "Department",
    },
    {
      dataIndex: "joining_date",
      key: "joining_date",
      title: "Joining Date",
    },
    {
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      title: "Date of Birth",
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

  const newTableData = getAllInters.map((item: any, index: any) => {
    const joiningDate = dayjs(item.joiningDate).format('DD/MM/YYYY');
    const dob = dayjs(item.userDetail?.DOB).format('DD/MM/YYYY');
    return (
      {
        no: getAllInters.length < 10 ? `0${index + 1}` : `${index + 1}`,
        posted_by:
          <Avatar src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} />,
        name: <p>{item.userDetail?.firstName} {item.userDetail?.lastName}</p>,
        department: item?.internship?.department?.name,
        joining_date: joiningDate,
        date_of_birth: dob,
        status: <ButtonStatus status={item.internStatus} />,
        actions: <PopOver />
      }
    )
  })

  const updateManager = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      manager: event
    }))
  }

  const updateStatus = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      status: event
    }))
  }

  const updateDepartment = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      department: event
    }))
  }

  const updateUniversity = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      university: event
    }))
  }

  const updateDateOfJoining = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      dateOfJoining: event
    }))
  }

  const handleApplyFilter = () => {
    getAllInternsData(state.status);
    setShowDrawer(false)
  }

  const handleResetFilter = () => {
    setState((prevState) => ({
      ...prevState,
      manager: undefined,
      status: undefined,
      university: undefined,
      department: undefined,
      dateOfJoining: undefined
    }))
  }

  return (
    <>
      <PageHeader title="Interns" bordered={true} />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar
            handleChange={changeHandler}
            name="search"
            placeholder="Search by name"
          />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col flex-row gap-4 justify-end">
          <FiltersButton label="Filters"
            onClick={() => { setShowDrawer(true) }} />
          <Drawer
            closable
            open={showDrawer}
            onClose={() => {
              setShowDrawer(false);
            }}
            title="Filters"
          >
            <>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label>Manager</label>
                  <Select
                    placeholder="Select"
                    value={state.manager}
                    onChange={(event: any) => { updateManager(event) }}
                    options={managerList}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Status</label>
                  <Select
                    placeholder="Select"
                    value={state.status}
                    onChange={(event: any) => { updateStatus(event) }}
                    options={statusList}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Department</label>
                  <Select
                    placeholder="Select"
                    value={state.department}
                    onChange={(event: any) => { updateDepartment(event) }}
                    options={departmentsList}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>University</label>
                  <Select
                    placeholder="Select"
                    value={state.university}
                    onChange={(event: any) => { updateUniversity(event) }}
                    options={universityList}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Joining Date</label>
                  <DropDown
                    name="status"
                    options={[
                      "Power source",
                      "Dev spot",
                      "Abacus",
                      "Orcalo Holdings",
                      "Coding Hub",
                      "All"
                    ]}
                    setValue={(event: any) => { updateDateOfJoining(event) }}
                    value={state.dateOfJoining}
                  />
                </div>
                <div className="flex flex-row gap-3 justify-end">
                  <Button
                    type="default"
                    size="middle"
                    className="button-default-tertiary"
                    onClick={handleResetFilter}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    size="middle"
                    className="button-tertiary"
                    onClick={handleApplyFilter}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </>
          </Drawer>
          <div className="flex justify-between gap-4">
            <ToggleButton
              isToggle={listandgrid}
              onTogglerClick={() => { setListandgrid(!listandgrid) }}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className='w-[88px]'
            />
            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(event, csvAllColum, newTableData, "Company Admin Interns")
              }}
            />
          </div>
        </Col>
        <Col xs={24}>
          <p className="font-semibold pb-4">Total Interns:
            {newTableData.length < 10 ? `0${newTableData.length}` : newTableData.length}
          </p>
          {isLoading ?
            listandgrid ? <BoxWrapper>
              <GlobalTable columns={columns} tableData={newTableData} />
            </BoxWrapper> :
              <div className="flex flex-row flex-wrap max-sm:flex-col">
                {
                  newTableData?.map((item: any,) => {
                    return (
                      <InternsCard
                        pupover={<PopOver />}
                        status={item.status}
                        name={item.name}
                        posted_by={item.posted_by}
                        title={item.title}
                        department={item.department}
                        joining_date={item.joining_date}
                        date_of_birth={item.date_of_birth}
                      />
                    )
                  })
                }
              </div>

            : <Spin tip="Processing...." />}
        </Col>
      </Row>

      <PopUpModal
        open={assignManager}
        width={600}
        close={() => { setAssignManager(false) }}
        title="Assign Manager"
        children={
          <div className="flex flex-col gap-2">
            <p>Manager</p>
            <DropDown
              name="Select"
              options={[
                "Maria Sanoid",
                "Jenate Samson",
                "Alen Juliet",
              ]}
              setValue={() => { updateManager(event) }}
              showDatePickerOnVal="custom"
              startIcon=""
              value={state.manager}
            />
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="middle"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => setAssignManager(false)}
            >
              Cancel
            </Button>
            <Button
              type="default"
              size="middle"
              className="button-tertiary max-sm:w-full"
            >
              Assign
            </Button>
          </div>
        }
      />
      <PopUpModal
        open={terminate}
        width={500}
        close={() => { setTerminate(false) }}
        children={
          <div>
            <div className="flex flex-col gap-5">
              <div className='flex flex-row items-center gap-3'>
                <div><AlertIcon /></div>
                <div><h2>Alert</h2></div>
              </div>
              <p>Are you sure you want to terminate this intern?</p>
              <div className="flex flex-col gap-2">
                <p className="text-md text-teriary-color">Reason</p>
                <TextArea
                  rows={5}
                  placeholder="Write your reason"
                  disable={false}
                />
              </div>
            </div>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="small"
              className="button-default-error max-sm:w-full"
              onClick={() => setTerminate(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-error max-sm:w-full"
            >
              Terminate
            </Button>
          </div>
        }
      />
      <PopUpModal
        open={complete}
        width={500}
        close={() => { setComplete(false) }}
        children={
          <div className="flex flex-col gap-5">
            <div className='flex flex-row items-center gap-3'>
              <div><SuccessIcon /></div>
              <div><h2>Success</h2></div>
            </div>
            <p>Are you sure you want to mark the internship as complete for this intern?</p>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="small"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => setComplete(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-tertiary max-sm:w-full"
              onClick={() => { alert("hello") }}
            >
              Complete
            </Button>
          </div>
        }
      />
    </>
  );
};

export default InternsCompanyAdmin;
