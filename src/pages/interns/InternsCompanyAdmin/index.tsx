import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  GlobalTable, PageHeader, BoxWrapper, InternsCard,
  ToggleButton, DropDown, FiltersButton, Drawer, PopUpModal, NoDataFound,
  Loader, Notifications, SignatureAndUploadModal
} from "../../../components";
import { TextArea } from "../../../components";
import {
  AlertIcon, CardViewIcon, More, SuccessIcon,
  TableViewIcon, GlassMagnifier, UserAvatar, IconCloseModal
} from "../../../assets/images"
import { Dropdown, Avatar, Button, MenuProps, Row, Col, Input, Modal, Form } from 'antd';
import useCustomHook from "./actionHandler";
import UserSelector from "../../../components/UserSelector";
import PreviewModal from "../../certificate/certificateModal/PreviewModal";
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../config/validationMessages';
import '../style.scss'
import { ExternalChatUser } from "../../../store/chat";
import { useRecoilState } from "recoil";


const InternsCompanyAdmin = () => {
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);
  const [form] = Form.useForm();
  const [files, setFiles] = useState([])
  const csvAllColum = ["No", "Posted By", "Name", "Department",
    "Joining Date", "Date of Birth", 'Status'];
  const [assignManager, setAssignManager] = useState(
    { isToggle: false, id: undefined, assignedManager: undefined });
  const [terminate, setTerminate] = useState({ isToggle: false, id: undefined });
  const [complete, setComplete] = useState({ isToggle: false, id: undefined });
  const [showDrawer, setShowDrawer] = useState(false);
  const [listandgrid, setListandgrid] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [certificateModal, setCertificateModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [previewFooter, setPreviewFooter] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState({ name: '', description: '', signature: '' })
  const [state, setState] = useState<any>({
    manager: undefined,
    status: undefined,
    department: undefined,
    university: undefined,
    timeFrame: null,
    dateRange:true,
    termReason: '',
    internDetails: ''
  });

  const statusList = [
    { value: 'Employed', label: 'Employed' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Terminated', label: 'Terminated' },
  ]

  const timeFrameOptions = ["This Week", "Last Week", "This Month", "Last Month", "Date Range"];

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

  console.log('data', getAllInters);

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
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setAssignManager({ ...assignManager, isToggle: true, id: data?.id })
            }}>
            Assign Manager
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => { setTerminate({ ...terminate, isToggle: true, id: data?.id }) }} >
            Terminate
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => { setComplete({ ...complete, isToggle: true, id: data?.id }) }} >
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
        <More className="cursor-pointer" />
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

  const handleCancel = () => {
    setCertificateModal(false);
  };

  const newTableData: any = getAllInters?.map((item: any, index: any) => {
    const joiningDate = dayjs(item?.joiningDate).format('DD/MM/YYYY');
    const dob = dayjs(item?.userDetail?.DOB).format('DD/MM/YYYY');
    return (
      {
        no: getAllInters?.length < 10 ? `0${index + 1}` : `${index + 1}`,
        posted_by: <Avatar size={50} src={item?.avatar}>
          {item?.userDetail?.firstName?.charAt(0)}{item?.userDetail?.lastName?.charAt(0)}
        </Avatar>,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        department: item?.internship?.department?.name,
        joining_date: joiningDate,
        date_of_birth: dob,
        status: <ButtonStatus status={item?.internStatus} />,
        actions: item?.internStatus !== 'completed' ? <PopOver data={item} /> : "N/A"
      }
    )
  })

  // filtered data 
  const filteredManagersData = getAllManagers?.map((item: any, index: number) => {
    return (
      {
        key: index,
        value: item?.id,
        label: `${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`,
        avatar: item?.companyManager?.firstName
      }
    )
  });
  filteredManagersData.unshift({ key: 'all', value: 'All', label: 'All' })

  const filteredStatusData = statusList?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.value,
        label: item?.label,
      }
    )
  })
  filteredStatusData.unshift({ key: 'all', value: 'All', label: 'All' })

  const filteredInternsData = getAllInters?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        label: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        avatar: item?.userDetail?.firstName
      }
    )
  })
  const filteredDeaprtmentsData = departmentsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: `${item?.id}`,
        label: `${item?.name}`,
      }
    )
  })
  filteredDeaprtmentsData.unshift({ key: 'all', value: 'All', label: 'All' })

  const filteredUniversitiesData = getAllUniversities?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: `${item?.university?.id}`,
        label: `${item?.university?.name}`,
      }
    )
  })
  filteredUniversitiesData.unshift({ key: 'all', value: 'All', label: 'All' })

  const handleTimeFrameValue = (val: any) => {
    let item = timeFrameOptions?.some(item => item === val)
    setState({ ...state, timeFrame: val, dateRange: item });
  }


  const handleApplyFilter = () => {
    // date pickers function 
    if (state?.dateRange) {
      getAllInternsData(state, searchValue, state?.timeFrame);
    }
    else {
      const [startDate, endDate] = state?.timeFrame?.split(",")
      getAllInternsData(state, searchValue, "DATE_RANGE", startDate, endDate);
    }
    setShowDrawer(false)
    // getApplicationsData()
  }
  // const handleApplyFilter = () => {
  //   getAllInternsData(state);
  //   setShowDrawer(false)
  // }

  const handleResetFilter = () => {
    getAllInternsData();
    setState((prevState: any) => ({
      ...prevState,
      manager: undefined,
      status: undefined,
      university: undefined,
      department: undefined,
      timeFrame: undefined,
      dateRange: true
    }))
  }

  // handle search interns 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  // intren certificate submition 
  const handleCertificateSubmition = (values: any) => {
    setCertificateDetails({
      ...certificateDetails,
      name: values?.internName,
      description: values?.description
    })
    // if (action === 'preview') setPreviewModal(true)
    // else setSignatureModal(true)
  }
  console.log(certificateDetails);

  return (
    <>
      <PageHeader title="Interns" bordered={true} />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className='search-bar'
            placeholder="Search by name"
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
              <div className="flex flex-col gap-4">
                <UserSelector
                  label="Manager"
                  placeholder="Select"
                  value={state.manager}
                  onChange={(event: any) => {
                    setState({
                      ...state,
                      manager: event
                    })
                  }}
                  options={filteredManagersData}
                  hasSearch={false}
                  handleSearch={(e: any) => console.log(e)}
                />
                <UserSelector
                  label="Status"
                  placeholder="Select"
                  value={state.status}
                  onChange={(event: any) => {
                    setState((prevState: any) => ({
                      ...prevState,
                      status: event
                    }))
                  }}
                  options={filteredStatusData}
                />
                <UserSelector
                  label="Department"
                  placeholder="Select"
                  value={state.department}
                  onChange={(event: any) => {
                    setState((prevState: any) => ({
                      ...prevState,
                      department: event
                    }))
                  }}
                  options={filteredDeaprtmentsData}
                />
                <UserSelector
                  label="University"
                  placeholder="Select"
                  value={state.university}
                  onChange={(event: any) => {
                    setState((prevState: any) => ({
                      ...prevState,
                      university: event
                    }))
                  }}
                  options={filteredUniversitiesData}
                />
                <div className="flex flex-col gap-2">
                  <p>Time Frame</p>
                  <DropDown
                    name="Select"
                    options={timeFrameOptions}
                    showDatePickerOnVal={'Date Range'}
                    requireRangePicker placement="bottom"
                    value={state.timeFrame}
                    setValue={(e: any) => handleTimeFrameValue(e)}
                  />
                </div>
                {/* <div className="flex flex-col gap-2">
                  <label>Joining Date</label>
                  <DropDown
                    name="Select"
                    options={["This Week", "Last Week", "This Month", "Last Month", "Date Range"]}
                    showDatePickerOnVal={"Date Range"}
                    // value={timeFrame}
                    // setValue={handleTimeFrameFilter}
                    requireRangePicker
                  />
                </div> */}
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
                'PDF',
                'Excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(event, csvAllColum, newTableData, "Company Admin Interns");
                Notifications({ title: "Success", description: "Intern list downloaded", type: "success" })
              }}
            />
          </div>
        </Col>
        <Col xs={24}>
          <p className="font-semibold pb-4">Total Interns:
            {getAllInters?.length < 10 ? `0${getAllInters?.length}` : getAllInters?.length}
          </p>
          {isLoading ?
            listandgrid ?
              <BoxWrapper>
                <GlobalTable columns={columns} tableData={newTableData} />
              </BoxWrapper> :
              getAllInters?.length === 0 ? <NoDataFound />
                : <div className="flex flex-wrap gap-5">
                  {
                    getAllInters?.map((item: any) => {
                      return (
                        <InternsCard
                          item={item}
                          id={item?.id}
                          pupover={item?.internStatus !== 'completed' && item?.internStatus !== 'terminated'  && <PopOver data={item} />}
                          status={<ButtonStatus status={item?.internStatus} />}
                          name={`${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`}
                          posted_by={<Avatar size={64} src={item?.avatar}>
                            {item?.userDetail?.firstName?.charAt(0)}
                            {item?.userDetail?.lastName?.charAt(0)}
                          </Avatar>}
                          navigateToChat={() => {
                            setChatUser(item.userDetail)
                          }}
                          title={item?.title}
                          department={item?.internship?.department?.name}
                          joining_date={dayjs(item?.userDetail?.updatedAt)?.format('DD/MM/YYYY')}
                          date_of_birth={dayjs(item?.userDetail?.DOB)?.format('DD/MM/YYYY')}
                        />
                      )
                    })
                  }
                </div>
            : <Loader />}
        </Col>
      </Row>

      <PopUpModal
        open={assignManager.isToggle}
        width={600}
        close={() => { setAssignManager({ ...assignManager, isToggle: false }) }}
        title="Assign Manager"
        children={
          <div className="flex flex-col gap-2">
            <UserSelector
              label="Manager"
              placeholder="Select"
              value={assignManager.assignedManager}
              onChange={(event: any) => {
                setAssignManager({
                  ...assignManager,
                  assignedManager: event
                })
              }}
              options={filteredManagersData}
              hasSearch={true}
              searchPlaceHolder="Search by name"
            />
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="middle"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => setAssignManager({ ...assignManager, isToggle: false, assignedManager: undefined })}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                updateCandidatesRecords(assignManager.id, assignManager.assignedManager);
                setAssignManager({ ...assignManager, isToggle: false })
              }}
              type="default"
              size="middle"
              className="button-tertiary max-sm:w-full"
            >
              Assign
            </Button>
          </div >
        }
      />
      {terminate.isToggle && < PopUpModal
        open={terminate.isToggle}
        width={500}
        close={() => { setTerminate({ ...terminate, isToggle: false }) }}
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
                  value={state.termReason}
                  rows={5}
                  placeholder="Write your reason"
                  onChange={(event: any) => {
                    setState({
                      ...state,
                      termReason: event.target.value
                    })
                  }}
                />
              </div>
            </div>
          </div >
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col" >
            <Button
              type="default"
              size="small"
              className="button-default-error max-sm:w-full"
              onClick={() => { setTerminate({ ...terminate, isToggle: false }) }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-error max-sm:w-full"
              onClick={() => {
                updateCandidatesRecords(terminate.id, null, state.termReason);
                setTerminate({ ...terminate, isToggle: false })
              }}
            >
              Terminate
            </Button>
          </div >
        }
      />}
      {complete.isToggle && <PopUpModal
        open={complete.isToggle}
        width={500}
        close={() => { setComplete({ ...complete, isToggle: false }) }}
        children={
          <div className="flex flex-col gap-5" >
            <div className='flex flex-row items-center gap-3'>
              <div><SuccessIcon /></div>
              <div><h2>Success</h2></div>
            </div>
            <p>Are you sure you want to mark the internship as complete for this intern?</p>
          </div >
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col" >
            <Button
              type="default"
              size="small"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => { setComplete({ ...complete, isToggle: false }) }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-tertiary max-sm:w-full"
              onClick={() => {
                setComplete({ ...complete, isToggle: false })
                setCertificateModal(true)
                // setPreviewModal(true)
                // updateCandidatesRecords(complete.id, null, null, 'completed')
                // setComplete({ ...complete, isToggle: false })
              }}
            >
              Complete
            </Button>
          </div >
        }
      />}

      {previewModal &&
        <PreviewModal
          open={previewModal}
          setOpen={setPreviewModal}
          name={certificateDetails?.name}
          type="completion"
          textSignature={certificateDetails?.signature?.includes('/') ? true : false}
          desc={certificateDetails?.description}
          signature={certificateDetails?.signature?.includes('/') ?
            <img src={certificateDetails?.signature} alt="signature" /> :
            <p>{certificateDetails?.signature}</p>
          }
          footer={previewFooter ? <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col" >
            <Button
              type="default"
              size="small"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => { setPreviewModal(false) }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-tertiary max-sm:w-full"
              onClick={() => {
                setSignatureModal(false);
                setPreviewModal(false);
                updateCandidatesRecords(complete.id, null, null, 'completed');
                // setComplete({ ...complete, isToggle: false })
              }}
            >
              Complete
            </Button>
          </div > : ''}
        />
      }

      {certificateModal &&
        <Modal
          title="Issue Certificate"
          open={certificateModal}
          centered
          width={700}
          footer={false}
          closeIcon={<IconCloseModal />}
          onCancel={handleCancel}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={(values) => handleCertificateSubmition(values)}
            validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          >
            <Form.Item label="Intern" name='internName' rules={[{ required: true }, { type: 'string' }]}>
              <UserSelector
                placeholder="Select"
                value={state.internDetails}
                hasSearch={true}
                searchPlaceHolder="Search"
                options={filteredInternsData}
                onChange={(event: any) => {
                  setState({
                    ...state,
                    internDetails: event
                  })
                }}
              />
            </Form.Item>
            <Form.Item label="Print on Certificate" name='description' rules={[{ required: true }, { type: 'string' }]} >
              <TextArea placeholder="Enter certificate description" />
            </Form.Item>
            <div className="flex flex-row max-sm:flex-col  justify-end gap-3" >
              <Button
                htmlType="submit"
                type="default"
                size="small"
                className="white-bg-color teriary-color font-medium max-sm:w-full"
                onClick={() => setPreviewModal(true)}
              >
                Preview
              </Button>
              <Button
                type="default"
                size="small"
                className="button-default-tertiary max-sm:w-full"
                onClick={() => {
                  form.resetFields();
                  setCertificateDetails({ ...certificateDetails, name: '', description: '' });
                  setCertificateModal(false)
                }}>
                Cancel
              </Button>
              <Button
                htmlType="submit"
                size="small"
                className="button-tertiary max-sm:w-full"
                onClick={() => {
                  setSignatureModal(true)
                }}
              >
                Continue
              </Button>
            </div >
          </Form>
        </Modal>
      }

      {signatureModal &&
        <SignatureAndUploadModal
          certificateDetails={certificateDetails}
          setCertificateDetails={setCertificateDetails}
          state={signatureModal}
          closeFunc={() => setSignatureModal(false)}
          okBtntxt='Sign'
          files={files}
          setFiles={setFiles}
          footer={<div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col" >
            <Button
              type="default"
              size="small"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => {
                setCertificateDetails({ name: "", signature: "", description: "" });
                setSignatureModal(false)
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-tertiary max-sm:w-full"
              onClick={() => {
                setCertificateDetails({ ...certificateDetails, signature: "" });
                setPreviewModal(true);
                setPreviewFooter(true)
              }}
            >
              Sign
            </Button>
          </div >}
        />
      }

    </>
  );
};

export default InternsCompanyAdmin;
