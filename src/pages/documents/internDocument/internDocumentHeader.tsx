import { useEffect, useState } from "react";
import { Row, Col, Button, Dropdown, Space, Avatar, Spin, Empty } from "antd";
import {
  ArrowDownDark,
  CardViewIcon,
  TableViewIcon,
  UploadIconBtn,
  Frame,
  Folder,
  ArrowDoenIcon,
} from "../../../assets/images";
import "./Styles.scss";
import {
  DropDown,
  Loader,
  Notifications,
  PopUpModal,
  SearchBar,
  ToggleButton,
} from "../../../components";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { SelectData } from "./internHeader";
import UserImage from "../../../assets/images/documents/Image.svg";
import UploadDocument from "../../../components/UploadDocument";
import DocTable from "./DocsTable/docTable";
import { CheckBox } from "../../../components/Checkbox";
import useCustomHook from "../actionHandler";
import { getDateRange, getUserAvatar } from "../../../helpers";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { currentUserState } from "../../../store";
import { useRecoilValue } from "recoil";
import InternCards from "./InternCards/internCards";

const rangeList = ["This Week", "Last Week", "This Month", "Last Month"];

const InternDocument = () => {
  const {
    getInternList,
    getInternDocumentList,
    internDocumentCreate,
    getManagersList,
  } = useCustomHook();
  const user: any = useRecoilValue(currentUserState);
  const [selectData, setSelectData] = useState("INTERN");
  const [files, setFiles] = useState<any>([]);
  const [share, setShare] = useState(false);
  const [documentToggle, setDocumentToggle] = useState(false);
  const [uploadModel, setUploadModel] = useState(false);
  const [range, setRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [internList, setInternList] = useState<any>([]);
  const [noInterns, setNoInterns] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<any>();
  const [search, setSearch] = useState<any>("");
  const [managerList, setManagerList] = useState<any>([
    {
      id: -1,
      companyManager: {
        firstName: "Uploader",
        lastName: "(All)",
      },
    },
  ]);
  const [selectedManager, setSelectedManager] = useState<any>();
  const [documentsData, setDocumentsData] = useState<any>([]);

  const docsData = Object.values(documentsData);

  const [searchParam] = useState(["firstName", "lastName"]);
  const [q, setQ] = useState("");

  const handleSearch = (items: any) => {
    return items.filter((item: any) => {
      return searchParam.some((newItem) => {
        return (
          item["uploadedBy"][newItem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  useEffect(() => {
    (async () => {
      const { data } = await getInternList();
      if (data.length == 0) {
        setNoInterns(true);
        Notifications({
          title: "Success",
          description: `No Active Interns!`,
        });
        return;
      }
      setSelectedIntern(data[0]);
      setInternList(data);
      handleInternSelect(data[0]);
    })();
  }, []);

  const handleDropped = (event: any) => {
    event.preventDefault();
    if (files[0] === "application/pdf" || files[0] === "image/jpeg") {
      setFiles(Array.from(event.dataTransfer.files));
    } else {
      alert("sdfgnjdsgnfsj");
    }
  };

  const getDocuments = async (payload: any) => {
    const { userId, managerId, docType } = payload;
    try {
      setLoading(true);
      setSelectData(docType);
      if (docType == "SHARED") {
        if (managerList.length == 1) {
          const { data } = await getManagersList();
          setSelectedManager({
            id: -1,
            companyManager: {
              firstName: "Uploader",
              lastName: "(All)",
            },
          });

          if (user.role == "COMPANY_MANAGER") {
            setManagerList((prev: any) => [
              ...prev,
              {
                id: user?.company?.adminId,
                companyManager: {
                  ...user?.company?.admin,
                },
              },
              ...data,
            ]);
          } else {
            setManagerList((prev: any) => [
              ...prev,
              {
                id: user.id,
                companyManager: {
                  ...user,
                },
              },
              ...data,
            ]);
          }
        }
      }

      delete payload.managerId;
      const { data } = await getInternDocumentList({
        ...payload,
        userId,
        uploadedById: managerId != -1 ? managerId : null,
        docType: docType.trim(),
      });
      setLoading(false);
      setDocumentsData(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleInternSelect = (intern: any) => {
    setSelectedIntern(intern);
    getDocuments({ userId: intern.userDetail.id, docType: "INTERN" });
  };

  const handleManagerSelect = (manager: any) => {
    setSelectedManager(manager);
    getDocuments({
      managerId: manager.companyManager.id,
      docType: "SHARED",
      companyId: user.company.id,
    });
  };

  const onCheckBoxChange = (e: CheckboxChangeEvent) => {
    setShare(e.target.checked);
  };

  const handleRangeChange = (range: any) => {
    console.log(range);
    let startEndRange: any;
    if (rangeList.includes(range)) {
      startEndRange = getDateRange(range);
    } else {
      startEndRange =
        range.split(",")[0].trim() + "," + range.split(",")[1].trim();
    }

    getDocuments({
      managerId: selectedManager.companyManager.id,
      docType: "SHARED",
      startDate: startEndRange.split(",")[0],
      endDate: startEndRange.split(",")[1],
    });
    console.log(startEndRange);
    setRange(range);
  };

  const handleUpload = async () => {
    let payload: any = {
      name: "OTHER",
      media: files?.files[0],
      shared: share,
    };
    setFiles([]);

    if (selectData == "INTERN") {
      payload = {
        ...payload,
        userId: selectedIntern.userDetail.id,
      };
    } else {
      payload = { ...payload, companyId: user.company.id };
    }

    const formPayload = new FormData();
    Object.keys(payload).map((a) => {
      formPayload.append(a, payload[a]);
    });

    try {
      setUploadLoading(true);
      const response = await internDocumentCreate(formPayload);

      if (response.statusCode != 201) throw new Error("Failed to upload");

      setUploadLoading(false);
      setUploadModel(false);
      setFiles([]);
      setShare(false);

      if (selectData == "INTERN") {
        response.data.user = {
          firstName: selectedIntern.userDetail.firstName,
          lastName: selectedIntern.userDetail.lastName,
        };
      } else {
        response.data.uploadedBy = {
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }
      setDocumentsData((prev: any) => [...prev, response.data]);

      console.log("THIS", documentsData);
      Notifications({
        title: "Success",
        description: `Document Uploaded!`,
      });
    } catch (error) {
      setUploadLoading(false);
      console.log(error);
      Notifications({
        title: "Error",
        description: `Failed to upload document`,
        type: "error",
      });
      return;
    }
  };

  const items: any = [
    {
      label: (
        <p
          className="text-base font-medium"
          onClick={() => {
            if (selectData != "INTERN") {
              getDocuments({
                userId: selectedIntern.userDetail.id,
                docType: "INTERN",
              });
            }
          }}
        >
          Intern Documents
        </p>
      ),
      key: "0",
      value: "Intern Documents",
    },
    {
      label: (
        <p
          onClick={() => {
            if (selectData != "SHARED") {
              getDocuments({ docType: "SHARED", companyId: user.company.id });
            }
          }}
        >
          Shared Documents
        </p>
      ),
      key: "1",
      value: "Shared Documents",
    },
  ];
  return (
    <div className="intern-header-wrapper">
      <div className="flex my-5">
        <Dropdown
          className="px-3 cursor-pointer"
          menu={{ items }}
          trigger={["click"]}
        >
          <Space className="outline-color">
            <img src={Folder} alt="icon" />
            <img src={ArrowDoenIcon} alt="icon" className="pl-3 pr-2" />
          </Space>
        </Dropdown>
        <p className="ml-[30px] capitalize mt-1 text-secondary-color text-base font-medium">
          {selectData == "INTERN" ? "Intern Documents" : "Shared Documents"}
        </p>
      </div>
      <Row gutter={[20, 20]} className="justify-between">
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={(e: any) => setQ(e)} />
        </Col>
        <Col
          xl={18}
          lg={15}
          md={24}
          sm={24}
          xs={24}
          className="flex flex-wrap max-md:flex-col max-sm:flex-col justify-end gap-4"
        >
          {selectData == "INTERN" ? (
            <>
              {selectedIntern || noInterns ? (
                <>
                  {noInterns ? (
                    <DropDownNew
                      className="justify-between text-input-bg-color rounded-md document-dropdown lg:w-[250px]"
                      items={[]}
                    >
                      <div className="flex items-center gap-3 px-10">
                        Interns N/A
                      </div>
                    </DropDownNew>
                  ) : (
                    <DropDownNew
                      className="justify-between text-input-bg-color rounded-md pl-[9px] pr-[23px] document-dropdown lg:w-[250px]"
                      items={[
                        {
                          label: (
                            <div>
                              {internList.map((user: any, i: any) => (
                                <div
                                  onClick={() => handleInternSelect(user)}
                                  key={i}
                                  className=" user-input border flex items-center gap-3 mb-3"
                                >
                                  <Avatar
                                    size="small"
                                    src={getUserAvatar(user?.userDetail)}
                                  >
                                    {getUserFullName(user, true)}
                                  </Avatar>
                                  {/* <img src={user.userImg} /> */}
                                  <p>{getUserFullName(user)}</p>
                                </div>
                              ))}
                            </div>
                          ),
                          key: "users",
                        },
                      ]}
                    >
                      <div className="flex items-center gap-3">
                        <div className="user flex items-center gap-3">
                          <Avatar
                            size="small"
                            src={getUserAvatar(selectedIntern.userDetail)}
                          >
                            {getUserFullName(selectedIntern, true)}
                          </Avatar>
                          <div>
                            <p>
                              {selectedIntern
                                ? getUserFullName(selectedIntern)
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                        <ArrowDownDark />
                      </div>
                    </DropDownNew>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3 ">
                  <div className="user flex items-center gap-3">
                    <Button loading>Loading...</Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {selectedManager ? (
                <DropDownNew
                  className="justify-between text-input-bg-color rounded-md pl-[9px] pr-[23px] document-dropdown lg:w-[250px]"
                  items={[
                    {
                      label: (
                        <div>
                          {managerList.map((user: any, i: any) => (
                            <div
                              onClick={() => {
                                setSelectedManager(user);
                                handleManagerSelect(user);
                              }}
                              key={i}
                              className=" user-input border flex items-center gap-3 mb-3"
                            >
                              <Avatar
                                size="small"
                                src={
                                  user.id == -1
                                    ? Frame
                                    : getUserAvatar(user?.companyManager)
                                }
                              >
                                {getUserFullName(
                                  { userDetail: user.companyManager },
                                  true
                                )}
                              </Avatar>
                              {/* <img src={user.userImg} /> */}
                              <p>
                                {getUserFullName({
                                  userDetail: user.companyManager,
                                })}
                              </p>
                            </div>
                          ))}
                        </div>
                      ),
                      key: "users",
                    },
                  ]}
                >
                  <div className="flex items-center gap-3 ">
                    <div className="user flex items-center gap-3">
                      <Avatar
                        size="small"
                        src={
                          selectedManager.id === -1
                            ? Frame
                            : getUserAvatar(selectedManager.companyManager)
                        }
                      >
                        {getUserFullName(
                          { userDetail: selectedManager.companyManager },
                          true
                        )}
                      </Avatar>
                      <div>
                        <p>
                          {selectedManager
                            ? getUserFullName({
                              userDetail: selectedManager.companyManager,
                            })
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <ArrowDownDark />
                  </div>
                </DropDownNew>
              ) : (
                <div className="flex items-center gap-3 ">
                  <div className="user flex items-center gap-3">
                    <Button loading>Loading...</Button>
                  </div>
                </div>
              )}
            </>
          )}

          {selectData === "SHARED" && (
            <DropDown
              setValue={handleRangeChange}
              value={range}
              options={[...rangeList, "Date Range"]}
              name={"Time Frame"}
              requireRangePicker
              showDatePickerOnVal={"Date Range"}
            />
          )}
          <Button
            className="green-graph-tooltip-bg flex justify-center  lg:w-[143px]"
            onClick={() => setUploadModel(true)}
          >
            <img src={UploadIconBtn} alt="" />
            <span className="white-color font-semibold text-base mx-3">
              Upload
            </span>
          </Button>

          <ToggleButton
            isToggle={documentToggle}
            onTogglerClick={() => setDocumentToggle(!documentToggle)}
            FirstIcon={CardViewIcon}
            LastIcon={TableViewIcon}
            className="w-[88px]"
          />
        </Col>
      </Row>
      <Spin spinning={loading} indicator={<Loader />}>
        <div className="mt-12">
          {documentToggle ? (
            <DocTable
              docs={handleSearch(docsData)}
              setDocumentsData={setDocumentsData}
              user={user}
            />
          ) : (
            <InternCards
              docs={handleSearch(docsData)}
              setDocumentsData={setDocumentsData}
              user={user}
            />
          )}
        </div>
      </Spin>
      <PopUpModal
        open={uploadModel}
        close={() => { setUploadModel(!uploadModel); setFiles([]) }}
        title={"Upload Documents"}
        footer={[
          <Button
            className="teriary-color font-semibold text-base intern-cancel-btn"
            onClick={() => {
              setFiles([]);
              setShare(false);
              setUploadModel(false);
            }}
          >
            Cancel
          </Button>,
          <Button
            className="teriary-bg-color font-semibold text-base upload-button white-color intern-upload-button"
            loading={uploadLoading}
            onClick={handleUpload}
          >
            Upload
          </Button>,
        ]}
      >
        <UploadDocument
          setFiles={setFiles}
          handleDropped={handleDropped}
          files={files}
        />
        <p>{files[0] === ""}</p>
        {selectData === "INTERN" ? (
          <div className="flex mt-5">
            <CheckBox onChange={onCheckBoxChange} />

            <p className="mx-3 text-teriary-color text-base" style={{ color: share ? "#14142A" : "#6E7191" }}>
              Share with intern
            </p>
          </div>
        ) : (
          ""
        )}
      </PopUpModal>
    </div>
  );
};

export default InternDocument;

function getUserFullName(payload: any, initials: boolean = false) {
  const { firstName, lastName } = payload.userDetail;
  if (initials) return firstName?.split("")[0] + lastName?.split("")[0];
  return firstName + " " + lastName;
}
