import { useEffect, useState } from "react";
import {
  GlobalTable, PageHeader, BoxWrapper, InternsCard,
  ToggleButton, DropDown, FiltersButton, Drawer, PopUpModal, NoDataFound
} from "../../../components";
import { TextArea } from "../../../components";
import {
  AlertIcon, CardViewIcon, More, SuccessIcon,
  TableViewIcon, UserAvatar, ArrowDownDark, GlassMagnifier
} from "../../../assets/images"
import { Dropdown, Avatar, Button, MenuProps, Row, Col, Spin, Select, Space, Input } from 'antd';
import useCustomHook from "./actionHandler";
import dayjs from "dayjs";
import SelectComp from "../../../components/Select/Select";
import '../style.scss'

const InternsCompanyAdmin = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [assignManager, setAssignManager] = useState(false)
  const [terminate, setTerminate] = useState(false)
  const [complete, setComplete] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [searchValue, setSearchValue] = useState('');
  const [state, setState] = useState({
    manager: undefined,
    status: undefined,
    department: undefined,
    university: undefined,
    dateOfJoining: undefined
  })

  const statusList = [
    { value: 'Employed', label: 'Employed' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Terminated', label: 'Terminated' },
    { value: 'All', label: 'All' },
  ]

  const { getAllInternsData, getAllInters,
    downloadPdfOrCsv, isLoading,
    getAllDepartmentData, departmentsData,
    getAllManagersData, getAllManagers,
    getAllUniuversitiesData, getAllUniversities,
    updateCandidatesRecords,
    debouncedSearch }: any = useCustomHook()

  useEffect(() => {
    getAllDepartmentData();
    getAllManagersData();
    getAllUniuversitiesData();
  }, [])

  useEffect(() => {
    getAllInternsData(state, searchValue);
  }, [searchValue])

  const ButtonStatus = (props: any) => {
    const btnStyle: any = {
      "completed": "primary-bg-color",
      "employed": "text-success-bg-color",
      "terminated": "secondary-bg-color",
    }
    return (
      <p>
        <span className={`px-2 py-1 rounded-lg white-color capitalize ${btnStyle[props.status]}`} >
          {props.status}
        </span>
      </p>
    )
  }

  const PopOver = (props: any) => {
    const { data } = props;
    console.log('popover Data', data);

    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => { setAssignManager(true); }}>
            Assign Manager
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => { setTerminate(true) }} >
            Terminate
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => { setComplete(true) }} >
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

  const newTableData: any = getAllInters?.map((item: any, index: any) => {
    const joiningDate = dayjs(item?.joiningDate).format('DD/MM/YYYY');
    const dob = dayjs(item?.userDetail?.DOB).format('DD/MM/YYYY');
    return (
      {
        no: getAllInters?.length < 10 ? `0${index + 1}` : `${index + 1}`,
        posted_by: <Avatar size={50} src={item?.avatar}>
          {item?.userDetail?.firstName?.charAt(0)}{item?.userDetail?.lastName?.charAt(0)}
        </Avatar>,
        name: <p>{item?.userDetail?.firstName} {item?.userDetail?.lastName}</p>,
        department: item?.internship?.department?.name,
        joining_date: joiningDate,
        date_of_birth: dob,
        status: <ButtonStatus status={item?.internStatus} />,
        actions: <PopOver data={item} />
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

  // const updateDateOfJoining = (event: any) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     dateOfJoining: event
  //   }))
  // }

  const handleApplyFilter = () => {
    getAllInternsData(state);
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
  const { Option } = Select;


  const handleSearch = (value: any) => {
    console.log('Search:', value);
  }

  // handle search interns 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  return (
    <>
      <PageHeader title="Interns" bordered={true} />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className='search-bar'
            placeholder="Search"
            onChange={debouncedResults}
            prefix={<GlassMagnifier />}
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
                    suffixIcon={<ArrowDownDark />}
                    // showSearch
                    style={{ width: '100%' }}
                    placeholder="Select"
                    value={state.manager}
                    onChange={(event: any) => {
                      updateManager(event);
                    }}
                    // optionFilterProp="children"
                    // onSearch={handleSearch}
                    // filterOption={(input: any, option: any) =>
                    //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    dropdownRender={(menu) => (
                      <div>
                        <div style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>
                          <Input
                            placeholder="Search"
                            onPressEnter={(e: any) => handleSearch(e.target.value)}
                          />
                        </div>
                        {menu}
                      </div>
                    )}
                  >
                    {getAllManagers.map((item: any) => {
                      return <Option value={item?.id}>
                        <Space>
                          <img src={UserAvatar} alt="avatar" />
                          {`${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`}
                        </Space>
                      </Option>
                    })}
                  </Select>
                </div>
                <SelectComp
                  label="Status"
                  placeholder='Select'
                  value={state.status}
                  onChange={(event: any) => { updateStatus(event) }}
                  options={statusList}
                />
                <SelectComp
                  label="Department"
                  placeholder='Select'
                  value={state.department}
                  onChange={(event: any) => { updateDepartment(event) }}
                  options={departmentsData?.map((item: any) => {
                    return { value: item?.id, label: item?.name }
                  })}
                />
                <SelectComp
                  label="University"
                  placeholder='Select'
                  value={state.university}
                  onChange={(event: any) => { updateUniversity(event) }}
                  options={getAllUniversities?.map((item: any) => {
                    return { value: item?.university?.id, label: item?.university?.name }
                  })}
                />
                <div className="flex flex-col gap-2">
                  <label>Joining Date</label>
                  <DropDown
                    name="Select"
                    options={["This Week", "Last Week", "This Month", "Last Month", "Date Range"]}
                    showDatePickerOnVal={"Date Range"}
                    // value={timeFrame}
                    // setValue={handleTimeFrameFilter}
                    requireRangePicker
                  />
                  {/* <label>Joining Date</label>
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
                  /> */}
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
                downloadPdfOrCsv(event, columns, newTableData, "Company Admin Interns")
              }}
            />
          </div>
        </Col>
        <Col xs={24}>
          <p className="font-semibold pb-4">Total Interns:
            {newTableData?.length < 10 ? `0${newTableData?.length}` : newTableData?.length}
          </p>
          {isLoading ?
            listandgrid ?
              <BoxWrapper>
                <GlobalTable columns={columns} tableData={newTableData} />
              </BoxWrapper> :
              newTableData?.length === 0 ? <NoDataFound />
                : <div className="flex flex-wrap gap-4">
                  {
                    getAllInters?.map((item: any,) => {
                      console.log('abdullah data', item);

                      return (
                        <InternsCard
                          pupover={<PopOver data={item} />}
                          status={item?.stage}
                          name={`${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`}
                          posted_by={item?.posted_by}
                          title={item?.title}
                          department={item?.department}
                          joining_date={item?.userDetail?.updatedAt}
                          date_of_birth={item?.userDetail?.DOB}
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
            <label>Manager</label>
            <Select
              suffixIcon={<ArrowDownDark />}
              style={{ width: '100%' }}
              placeholder="Select"
              value={state.manager}
              onChange={(event: any) => {
                updateManager(event);
              }}
              // optionFilterProp="children"
              // onSearch={handleSearch}
              // filterOption={(input: any, option: any) =>
              //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }
              dropdownRender={(menu) => (
                <div>
                  <div style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>
                    <Input
                      placeholder="Search"
                      onPressEnter={(e: any) => handleSearch(e.target.value)}
                    />
                  </div>
                  {menu}
                </div>
              )}
            >
              {getAllManagers.map((item: any) => {
                return <Option value={item?.id}>
                  <Space>
                    <img src={UserAvatar} alt="avatar" />
                    {`${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`}
                  </Space>
                </Option>
              })}
            </Select>
          </div>
          // <div className="flex flex-col gap-2">
          //   <SelectComp
          //     label="Manager"
          //     placeholder='Select'
          //     value={state.status}
          //     onChange={(event: any) => { updateStatus(event) }}
          //     options={getAllManagers?.map((item: any) => {
          //       return {
          //         value: item?.id,
          //         label: `${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`
          //       }
          //     })}
          //   />
          // </div>
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
              onClick={(id: any) => {
                updateCandidatesRecords(id);
              }}
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
