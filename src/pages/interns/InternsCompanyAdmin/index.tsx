import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import dayjs from "dayjs";
import {
  GlobalTable, PageHeader, BoxWrapper, InternsCard, ToggleButton, DropDown, FiltersButton, Drawer,
  NoDataFound, Notifications, SignatureAndUploadModal, SearchBar, ButtonThemeSecondary, ButtonThemePrimary
} from "../../../components";
import {
  CardViewIcon, More, TableViewIcon
} from "../../../assets/images";
import {
  Dropdown, Avatar, Button, MenuProps, Row, Col, Form, TablePaginationConfig
} from "antd";
import useInternsCustomHook from "./actionHandler";
import UserSelector from "../../../components/UserSelector";
import PreviewModal from "../../certificate/certificateModal/PreviewModal";
import { ExternalChatUser } from "../../../store/chat";
import CertificateModal from "./InternsModals/certificateModal";
import CompleteModal from "./InternsModals/completeModal";
import AssignManager from "./InternsModals/assignManager";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import TerminateIntern from "./InternsModals/terminateIntern";
import { useNavigate } from "react-router-dom";
import { CompletionCertificateImg, CompletionCertificateImg2 } from '../../../assets/images';
import { certificateDetailsState, evaluatedUserDataState, internPaginationState, internsFilterState } from "../../../store";
import { useSetRecoilState } from "recoil";
import '../style.scss'

const { CHAT } = ROUTES_CONSTANTS;

const InternsCompanyAdmin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);
  const setEvaluatedUserData = useSetRecoilState(evaluatedUserDataState);
  const csvAllColum = ["No", "Name", "Department", "Joining Date", "Date of Birth", "Status"];
  const [assignManager, setAssignManager] = useState({
    isToggle: false,
    id: undefined,
    data: null,
    assignedManager: undefined,
  });
  const [terminate, setTerminate] = useState({
    isToggle: false,
    id: undefined,
  });
  const [complete, setComplete] = useState<any>(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [listandgrid, setListandgrid] = useState(false);
  const [certificateModal, setCertificateModal] = useState<any>(false);
  const [internCertificate, setInternCertificate] = useState<any>({});
  const [previewModal, setPreviewModal] = useState(false);
  const [previewFooter, setPreviewFooter] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const [certificateDetails, setCertificateDetails] = useRecoilState(certificateDetailsState);
  const [state, setState] = useState<any>({
    dateRange: true,
    termReason: "",
    internDetails: "",
  });

  // Table pagination states 
  const [tableParams, setTableParams]: any = useRecoilState(internPaginationState);
  const [filter, setFilter] = useRecoilState(internsFilterState);
  const resetList = useResetRecoilState(internsFilterState);
  const resetTableParams = useResetRecoilState(internPaginationState);
  const [loading, setLoading] = useState(true);

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value && value !== ""));
  };


  const statusList = [
    { value: "employed", label: "Employed" },
    { value: "completed", label: "Completed" },
    { value: "terminated", label: "Terminated" },
  ];

  const timeFrameOptions = ['All', 'This week', 'Last week', 'This month', 'Last month', 'Date range']


  const {
    getAllInternsData,
    allInternsData,
    downloadPdfOrCsv,
    getAllDepartmentData,
    departmentsData,
    getAllManagersData,
    getAllManagers,
    getAllUniuversitiesData,
    getAllUniversities,
    updateCandidatesRecords,
    postSignature,
    getProfile,
    handleUploadFile,
    handleClear,
    setFile
  }: any = useInternsCustomHook();

  useEffect(() => {
    getAllDepartmentData();
    getAllManagersData();
    getAllUniuversitiesData();
  }, []);

  useEffect(() => {
    let args = removeEmptyValues(filter);
    args.page = listandgrid ? args.page : 1;
    args.limit = listandgrid ? 10 : 1000;
    getAllInternsData(args, setLoading);
  }, [filter.search, filter.page, listandgrid]);

  // to reset page 
  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);


  const getAllInterns = allInternsData?.data

  const ButtonStatus = (props: any) => {
    const btnStyle: any = {
      completed: "primary-bg-color",
      employed: "text-success-bg-color",
      terminated: "secondary-bg-color",
    };
    return (
      <p>
        <span
          className={`px-2 py-1 rounded-lg white-color capitalize ${btnStyle[props.status]
            }`}
        >
          {props.status}
        </span>
      </p>
    );
  };

  const PopOver = (props: any) => {
    const { data } = props;
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setAssignManager({
                ...assignManager,
                isToggle: true,
                id: data?.id,
                data: data
              })
            }}>
            Assign Manager
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              navigate(
                `/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/${data?.userId}`,
                { state: { from: "fromInterns", data } }
              );
              setEvaluatedUserData({
                name: `${data?.userDetail?.firstName} ${data?.userDetail?.lastName}`,
                avatar: `${constants.MEDIA_URL}/${data?.userDetail?.profileImage?.mediaId}.${data?.userDetail?.profileImage?.metaData.extension}`,
                role: data?.userDetail?.role,
                date: dayjs(data?.userDetail?.updatedAt).format("MMMM D, YYYY")
              })
            }} >
            Evaluate
          </a>
        ),
      },
      {
        key: "4",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setTerminate({ ...terminate, isToggle: true, id: data?.id });
            }}
          >
            Terminate
          </a>
        ),
      },
      {
        key: "5",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setComplete(true);
              setInternCertificate(data);
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
        trigger={["click"]}
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
      title: <div className="text-center">Actions</div>,
    },
  ];

  const handleCancel = () => {
    setCertificateModal(false);
    setInternCertificate({});
    form.resetFields();
  };

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const newTableData: any = getAllInterns?.map((item: any, index: any) => {
    const joiningDate = dayjs(item?.joiningDate).format("DD/MM/YYYY");
    const dob = dayjs(item?.userDetail?.DOB).format("DD/MM/YYYY");
    return {
      no: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
      posted_by: (
        <Avatar
          size={50}
          src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}>
          {item?.userDetail?.firstName?.charAt(0)}
          {item?.userDetail?.lastName?.charAt(0)}
        </Avatar>
      ),
      name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
      department: item?.internship?.department?.name,
      joining_date: joiningDate,
      date_of_birth: dob === 'Invalid Date' ? "N/A" : dob,
      status: <ButtonStatus status={item?.internStatus} />,
      actions:
        item?.internStatus !== "completed" &&
          item?.internStatus !== "terminated" ? <PopOver data={item} /> : "N/A",
    };
  });

  const downloadCSVFile = getAllInterns?.map(
    (item: any, index: number) => {
      const joiningDate = dayjs(item?.joiningDate).format("DD/MM/YYYY");
      const dob = dayjs(item?.userDetail?.DOB).format("DD/MM/YYYY");
      return {
        no: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        department: item?.internship?.department?.name,
        joining_date: joiningDate,
        date_of_birth: dob === 'Invalid Date' ? "N/A" : dob,
        status: item?.internStatus,
      };
    }
  );

  // filtered data
  const filteredManagersData = getAllManagers?.map(
    (item: any, index: number) => {
      return {
        key: index,
        value: item?.id,
        label: `${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`,
        avatar: `${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`,
      };
    }
  );
  filteredManagersData?.unshift({ key: "all", value: "ALL", label: "All" });

  const filteredStatusData = statusList?.map((item: any, index: any) => {
    return {
      key: index,
      value: item?.value,
      label: item?.label,
    };
  });
  filteredStatusData?.unshift({ key: "all", value: "ALL", label: "All" });

  const filteredDeaprtmentsData = departmentsData?.map(
    (item: any, index: any) => {
      return {
        key: index,
        value: `${item?.id}`,
        label: `${item?.name}`,
      };
    }
  );
  filteredDeaprtmentsData?.unshift({ key: "all", value: "ALL", label: "All" });

  const seenUniversityIds = new Set();
  const filteredUniversitiesData = [{ key: "all", value: "ALL", label: "All" }];

  getAllUniversities?.forEach((item: any, index: any) => {
    const universityId = item?.university?.id;

    if (!seenUniversityIds.has(universityId)) {
      seenUniversityIds.add(universityId);
      filteredUniversitiesData.push({
        key: index,
        value: universityId,
        label: item?.university?.name,
      });
    }
  });

  const handleTimeFrameValue = (val: any) => {
    let item = timeFrameOptions?.some((item) => item === val);
    setFilter({ ...filter, filterType: val?.toUpperCase()?.replace(" ", "_"), currentDate: dayjs().format('YYYY-MM-DD').toString() });
    setState({ ...state, dateRange: item })
  };

  const handleApplyFilter = () => {
    // date pickers function
    let args = removeEmptyValues(filter);
    if (state?.dateRange) {
      getAllInternsData(args, setLoading, filter.filterType);
    } else {
      const [startDate, endDate] = filter?.filterType?.split(",");
      getAllInternsData(args, setLoading, "DATE_RANGE", startDate.replace("_", ""), endDate);
    }
    setShowDrawer(false);
  };

  const handleResetFilter = () => {
    let args = removeEmptyValues(filter);
    args.internStatus = undefined;
    args.assignedManager = undefined;
    args.userUniversityId = undefined;
    args.departmentId = undefined;
    args.filterType = undefined
    getAllInternsData(args, setLoading);
    setFilter((prevState: any) => ({
      ...prevState,
      assignedManager: undefined,
      internStatus: undefined,
      userUniversityId: undefined,
      departmentId: undefined,
      filterType: undefined,
    }));
    setState({ ...state, dateRange: true })

  };

  // intren certificate submition
  const handleCertificateSubmition = (action: string, name: any) => {
    setCertificateDetails({
      ...certificateDetails,
      name,
    });
    if (action === 'preview') setPreviewModal(true)
    else { setSignatureModal(true); setCertificateModal(false) }
  };

  const handleProfile = (item: any) => {
    getProfile(item?.userId)
  }

  const templateObj: any = {
    'COMPLETION_CERTIFICATE_TEMPLATE_ONE': CompletionCertificateImg,
    'COMPLETION_CERTIFICATE_TEMPLATE_TWO': CompletionCertificateImg2,
  }

  const clearAll = () => {
    setCertificateDetails({
      templateId: '',
      certificateId: '',
      attachmentId: '',
      internEmail: '',
      internId: '',
      name: undefined,
      type: '',
      signatureType: '',
      imgSignature: '',
      fontFamily: 'roboto',
      txtSignature: '',
      file: null,
      fileURL: null,
      desc: '',
      certificateDesign: ''
    });
  }

  const handleCloseUploadAndSignatureModal = () => {
    setSignatureModal(!signatureModal);
    clearAll();
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  return (
    <>
      <PageHeader title="Interns" bordered={true} />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <SearchBar
            className="search-bar"
            placeholder="Search by name"
            handleChange={(e: any) => setFilter({ ...filter, search: e })}
          />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col flex-row gap-4 justify-end">
          <FiltersButton
            label="Filters"
            onClick={() => { setShowDrawer(true) }} />
          <Drawer
            closable
            open={showDrawer}
            onClose={() => {
              setShowDrawer(false);
            }}
            title="Filters"
            className='intern-drawer'>
            <>
              <div className="flex flex-col gap-4">
                <UserSelector
                  label="Manager"
                  placeholder="Select"
                  value={filter.assignedManager}
                  onChange={(event: any) => {
                    setFilter({
                      ...filter,
                      assignedManager: event,
                    });
                  }}
                  options={filteredManagersData}
                  hasSearch={false}
                />
                <UserSelector
                  label="Status"
                  placeholder="Select"
                  value={filter.internStatus}
                  onChange={(event: any) => {
                    setFilter((prevState: any) => ({
                      ...prevState,
                      internStatus: event,
                    }));
                  }}
                  options={filteredStatusData}
                />
                <UserSelector
                  label="Department"
                  placeholder="Select"
                  value={filter.departmentId}
                  onChange={(event: any) => {
                    setFilter((prevState: any) => ({
                      ...prevState,
                      departmentId: event,
                    }));
                  }}
                  options={filteredDeaprtmentsData}
                />
                <UserSelector
                  label="University"
                  placeholder="Select"
                  value={filter.userUniversityId}
                  onChange={(event: any) => {
                    setFilter((prevState: any) => ({
                      ...prevState,
                      userUniversityId: event,
                    }));
                  }}
                  options={filteredUniversitiesData}
                />

                <div className="flex flex-col gap-2">
                  <p>Time Frame</p>
                  <DropDown
                    name="Select"
                    options={timeFrameOptions}
                    showDatePickerOnVal={"Date range"}
                    requireRangePicker
                    placement="bottom"
                    value={filter.filterType?.toLowerCase()?.replace("_", ' ')}
                    setValue={(e: any) => handleTimeFrameValue(e)}
                  />
                </div>
                <div className="flex flex-row gap-3 justify-end">
                  <ButtonThemeSecondary
                    onClick={handleResetFilter}>
                    Reset
                  </ButtonThemeSecondary>
                  <ButtonThemePrimary
                    onClick={handleApplyFilter}>
                    Apply
                  </ButtonThemePrimary>
                </div>
              </div>
            </>
          </Drawer>
          <div className="flex justify-between gap-4">
            <ToggleButton
              isToggle={listandgrid}
              onTogglerClick={() => {
                setListandgrid(!listandgrid);
              }}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className="w-[88px]"
            />
            <DropDown
              options={["PDF", "Excel"]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(
                  event,
                  csvAllColum,
                  downloadCSVFile,
                  "Company Admin Interns"
                );
                Notifications({
                  title: "Success",
                  description: "Intern list downloaded",
                  type: "success",
                });
              }}
            />
          </div>
        </Col>
        <Col xs={24}>
          <p className="font-semibold pb-4">
            Total Interns:
            {getAllInterns?.length < 10
              ? `0${getAllInterns?.length}`
              : getAllInterns?.length}
          </p>
          {
            listandgrid ? (
              <BoxWrapper>
                <GlobalTable
                  columns={columns}
                  tableData={newTableData}
                  loading={loading}
                  pagination={tableParams?.pagination}
                  handleTableChange={handleTableChange}
                  pagesObj={allInternsData?.pagination}
                />
              </BoxWrapper>
            ) : getAllInterns?.length === 0 ? (
              <NoDataFound />
            ) : (
              <div className="flex flex-wrap gap-5">
                {getAllInterns?.map((item: any, index: any) => {
                  return (
                    <InternsCard
                      key={index}
                      item={item}
                      id={item?.id}
                      pupover={
                        item?.internStatus !== "completed" &&
                        item?.internStatus !== "terminated" && (
                          <PopOver data={item} />
                        )
                      }
                      status={<ButtonStatus status={item?.internStatus} />}
                      name={`${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`}
                      posted_by={
                        <Avatar
                          size={64}
                          src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}
                        >
                          {item?.userDetail?.firstName?.charAt(0)}
                          {item?.userDetail?.lastName?.charAt(0)}
                        </Avatar>
                      }
                      navigateToChat={() => {
                        setChatUser(item?.userDetail);
                        navigate(`${CHAT}/${item?.userId}`);
                      }}
                      title={item?.title}
                      department={item?.internship?.department?.name}
                      joining_date={dayjs(item?.joiningDate)?.format(
                        "DD/MM/YYYY"
                      )}
                      date_of_birth={dayjs(item?.userDetail?.DOB)?.format(
                        "DD/MM/YYYY"
                      )}
                      handleProfile={() => handleProfile(item)}
                    />
                  );
                })}
              </div>
            )}
        </Col>
      </Row>

      {assignManager.isToggle && (
        <AssignManager
          assignManager={assignManager}
          setAssignManager={setAssignManager}
          filteredManagersData={filteredManagersData}
          updateCandidatesRecords={updateCandidatesRecords}
        />
      )}

      {terminate.isToggle && (
        <TerminateIntern
          terminate={terminate}
          setTerminate={setTerminate}
          state={state}
          setState={setState}
          updateCandidatesRecords={updateCandidatesRecords}
        />
      )}

      {complete && (
        <CompleteModal
          complete={complete}
          setComplete={setComplete}
          setCertificateModal={setCertificateModal}
          setInternCertificate={setInternCertificate}
        />
      )}

      {previewModal && (
        <PreviewModal
          open={previewModal}
          setOpen={setPreviewModal}
          certificateImg={templateObj[certificateDetails?.certificateDesign]}
          footer={
            previewFooter ? (
              <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
                <Button
                  type="default"
                  size="middle"
                  className="button-default-tertiary max-sm:w-full rounded-lg"
                  onClick={() => {
                    setPreviewModal(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  size="middle"
                  className="button-tertiary max-sm:w-full rounded-lg"
                  onClick={() => {
                    setSignatureModal(false);
                    setPreviewModal(false);
                    updateCandidatesRecords(
                      internCertificate?.id,
                      null,
                      null,
                      "completed"
                    );
                    setCertificateModal(false);
                    setComplete(false);
                  }}
                >
                  Issue
                </Button>
              </div>
            ) : (
              ""
            )
          }
        />
      )}

      {certificateModal && (
        <CertificateModal
          certificateModal={certificateModal}
          handleCancel={handleCancel}
          form={form}
          handleCertificateSubmition={handleCertificateSubmition}
          complete={complete}
          setPreviewModal={setPreviewModal}
          setCertificateDetails={setCertificateDetails}
          certificateDetails={certificateDetails}
          setCertificateModal={setCertificateModal}
          internCertificate={internCertificate}
          setInternCertificate={setInternCertificate}
          setSignatureModal={setSignatureModal}
        />
      )}

      {signatureModal && (
        <SignatureAndUploadModal
          certificateDetails={certificateDetails}
          setCertificateDetails={setCertificateDetails}
          state={signatureModal}
          setFiles={setFile}
          handleUploadFile={handleUploadFile}
          HandleCleare={handleClear}
          closeFunc={handleCloseUploadAndSignatureModal}
          okBtntxt="Sign"
          footer={
            <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
              <ButtonThemeSecondary
                onClick={handleCloseUploadAndSignatureModal}>
                Cancel
              </ButtonThemeSecondary>
              <ButtonThemePrimary
                onClick={() => {
                  // setCertificateDetails({ ...certificateDetails, signature: "" });
                  postSignature(certificateDetails.imgSignature);
                  setPreviewModal(true);
                  setPreviewFooter(true);
                }}
              >
                Sign
              </ButtonThemePrimary>
            </div>
          }
        />
      )}
    </>
  );
};

export default InternsCompanyAdmin;
