import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import {
  GlobalTable,
  PageHeader,
  BoxWrapper,
  InternsCard,
  ToggleButton,
  DropDown,
  FiltersButton,
  Drawer,
  NoDataFound,
  Loader,
  Notifications,
  SignatureAndUploadModal,
} from "../../../components";
import {
  CardViewIcon,
  More,
  TableViewIcon,
  GlassMagnifier,
} from "../../../assets/images";
import {
  Dropdown,
  Avatar,
  Button,
  MenuProps,
  Row,
  Col,
  Input,
  Form,
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
import "../style.scss";

const { CHAT } = ROUTES_CONSTANTS;

const InternsCompanyAdmin = () => {
  const navigate = useNavigate();
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);
  const [form] = Form.useForm();
  const [files, setFiles] = useState([]);
  const csvAllColum = [
    "No",
    "Posted By",
    "Name",
    "Department",
    "Joining Date",
    "Date of Birth",
    "Status",
  ];
  const [assignManager, setAssignManager] = useState({
    isToggle: false,
    id: undefined,
    assignedManager: undefined,
  });
  const [terminate, setTerminate] = useState({
    isToggle: false,
    id: undefined,
  });
  const [complete, setComplete] = useState<any>(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [listandgrid, setListandgrid] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [certificateModal, setCertificateModal] = useState<any>(false);
  const [internCertificate, setInternCertificate] = useState<any>({});
  const [previewModal, setPreviewModal] = useState(false);
  const [previewFooter, setPreviewFooter] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const [certificateDetails, setCertificateDetails] = useState<any>({
    name: "",
    description: "",
    signature: undefined,
  });
  const [state, setState] = useState<any>({
    manager: undefined,
    status: undefined,
    department: undefined,
    university: undefined,
    timeFrame: null,
    dateRange: true,
    termReason: "",
    internDetails: "",
  });

  const statusList = [
    { value: "Employed", label: "Employed" },
    { value: "Completed", label: "Completed" },
    { value: "Terminated", label: "Terminated" },
  ];

  const timeFrameOptions = [
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "Date Range",
  ];

  const {
    getAllInternsData,
    getAllInters,
    downloadPdfOrCsv,
    isLoading,
    getAllDepartmentData,
    departmentsData,
    getAllManagersData,
    getAllManagers,
    getAllUniuversitiesData,
    getAllUniversities,
    updateCandidatesRecords,
    debouncedSearch,
    postSignature,
    signature,
    getProfile
  }: any = useInternsCustomHook();

  useEffect(() => {
    getAllDepartmentData();
    getAllManagersData();
    getAllUniuversitiesData();
  }, []);

  useEffect(() => {
    getAllInternsData(state, searchValue);
  }, [searchValue]);

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
              });
            }}
          >
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
            }}
          >
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
      title: "Actions",
    },
  ];

  const handleCancel = () => {
    setCertificateModal(false);
    setInternCertificate({});
    form.resetFields();
  };

  const newTableData: any = getAllInters?.map((item: any, index: any) => {
    const joiningDate = dayjs(item?.joiningDate).format("DD/MM/YYYY");
    const dob = dayjs(item?.userDetail?.DOB).format("DD/MM/YYYY");
    return {
      no: getAllInters?.length < 10 ? `0${index + 1}` : `${index + 1}`,
      posted_by: (
        <Avatar
          size={50}
          src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}
        >
          {item?.userDetail?.firstName?.charAt(0)}
          {item?.userDetail?.lastName?.charAt(0)}
        </Avatar>
      ),
      name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
      department: item?.internship?.department?.name,
      joining_date: joiningDate,
      date_of_birth: dob,
      status: <ButtonStatus status={item?.internStatus} />,
      actions:
        item?.internStatus !== "completed" ? <PopOver data={item} /> : "N/A",
    };
  });

  // filtered data
  const filteredManagersData = getAllManagers?.map(
    (item: any, index: number) => {
      return {
        key: index,
        value: item?.id,
        label: `${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`,
        avatar: `${constants.MEDIA_URL}/${item?.profileImage?.mediaId}.${item?.profileImage?.metaData?.extension}`,
      };
    }
  );
  filteredManagersData?.unshift({ key: "all", value: "All", label: "All" });

  const filteredStatusData = statusList?.map((item: any, index: any) => {
    return {
      key: index,
      value: item?.value,
      label: item?.label,
    };
  });
  filteredStatusData?.unshift({ key: "all", value: "All", label: "All" });

  const filteredDeaprtmentsData = departmentsData?.map(
    (item: any, index: any) => {
      return {
        key: index,
        value: `${item?.id}`,
        label: `${item?.name}`,
      };
    }
  );
  filteredDeaprtmentsData?.unshift({ key: "all", value: "All", label: "All" });

  const filteredUniversitiesData = getAllUniversities?.map(
    (item: any, index: any) => {
      return {
        key: index,
        value: item?.university?.id,
        label: item?.university?.name,
      };
    }
  );
  filteredUniversitiesData?.unshift({ key: "all", value: "All", label: "All" });

  const handleTimeFrameValue = (val: any) => {
    let item = timeFrameOptions?.some((item) => item === val);
    setState({ ...state, timeFrame: val, dateRange: item });
  };

  const handleApplyFilter = () => {
    // date pickers function
    if (state?.dateRange) {
      getAllInternsData(state, searchValue, state?.timeFrame);
    } else {
      const [startDate, endDate] = state?.timeFrame?.split(",");
      getAllInternsData(state, searchValue, "DATE_RANGE", startDate, endDate);
    }
    setShowDrawer(false);
  };

  const handleResetFilter = () => {
    getAllInternsData();
    setState((prevState: any) => ({
      ...prevState,
      manager: undefined,
      status: undefined,
      university: undefined,
      department: undefined,
      timeFrame: undefined,
      dateRange: true,
    }));
  };

  // handle search interns
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  // intren certificate submition
  const handleCertificateSubmition = (values: any, name: any) => {
    setCertificateDetails({
      ...certificateDetails,
      name,
      description: values?.description,
    });
    // if (action === 'preview') setPreviewModal(true)
    // else setSignatureModal(true)
  };
  // const signatureType = typeof certificateDetails.signature;

  const handleProfile = (item: any) => {
    getProfile(item?.userId)
  }

  return (
    <>
      <PageHeader title="Interns" bordered={true} />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className="search-bar"
            placeholder="Search by name"
            onChange={debouncedResults}
            prefix={<GlassMagnifier />}
          />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col flex-row gap-4 justify-end">
          <FiltersButton
            label="Filters"
            onClick={() => {
              setShowDrawer(true);
            }}
          />
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
                      manager: event,
                    });
                  }}
                  options={filteredManagersData}
                  hasSearch={false}
                />
                <UserSelector
                  label="Status"
                  placeholder="Select"
                  value={state.status}
                  onChange={(event: any) => {
                    setState((prevState: any) => ({
                      ...prevState,
                      status: event,
                    }));
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
                      department: event,
                    }));
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
                      university: event,
                    }));
                  }}
                  options={filteredUniversitiesData}
                />

                <div className="flex flex-col gap-2">
                  <p>Time Frame</p>
                  <DropDown
                    name="Select"
                    options={timeFrameOptions}
                    showDatePickerOnVal={"Date Range"}
                    requireRangePicker
                    placement="bottom"
                    value={state.timeFrame}
                    setValue={(e: any) => handleTimeFrameValue(e)}
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
                  newTableData,
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
            {getAllInters?.length < 10
              ? `0${getAllInters?.length}`
              : getAllInters?.length}
          </p>
          {isLoading ? (
            listandgrid ? (
              <BoxWrapper>
                <GlobalTable columns={columns} tableData={newTableData} />
              </BoxWrapper>
            ) : getAllInters?.length === 0 ? (
              <NoDataFound />
            ) : (
              <div className="flex flex-wrap gap-5">
                {getAllInters?.map((item: any, index: any) => {
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
                        navigate(`${CHAT}/${item?.id}`);
                      }}
                      title={item?.title}
                      department={item?.internship?.department?.name}
                      joining_date={dayjs(item?.userDetail?.updatedAt)?.format(
                        "YYYY-MM-DD"
                      )}
                      date_of_birth={dayjs(item?.userDetail?.DOB)?.format(
                        "DD/MM/YYYY"
                      )}
                      handleProfile={() => handleProfile(item)}
                    />
                  );
                })}
              </div>
            )
          ) : (
            <Loader />
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
          name={certificateDetails?.name}
          type="completion"
          // textSignature={certificateDetails?.signature?.includes('/') ? true : false}
          desc={certificateDetails?.description}
          // signature={certificateDetails?.signature?.includes('/') ?
          //   <img src={certificateDetails?.signature} alt="signature" /> :
          //   <p>{certificateDetails?.signature}</p>
          // }
          signature={
            signature?.includes("/") ? (
              <img src={signature} alt="signature" />
            ) : (
              <p>{signature}</p>
            )
          }
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
          closeFunc={() => setSignatureModal(false)}
          okBtntxt="Sign"
          files={files}
          setFiles={setFiles}
          footer={
            <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
              <Button
                type="default"
                size="middle"
                className="button-default-tertiary max-sm:w-full rounded-lg"
                onClick={() => {
                  setCertificateDetails({
                    name: "",
                    signature: undefined,
                    description: "",
                  });
                  setSignatureModal(false);
                  // setInternCertificate({})
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="middle"
                className="button-tertiary max-sm:w-full rounded-lg"
                onClick={() => {
                  // setCertificateDetails({ ...certificateDetails, signature: "" });
                  postSignature(certificateDetails.signature);
                  setPreviewModal(true);
                  setPreviewFooter(true);
                }}
              >
                Sign
              </Button>
            </div>
          }
        />
      )}
    </>
  );
};

export default InternsCompanyAdmin;
