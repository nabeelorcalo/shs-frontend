import { useEffect, useState } from "react";
import { Row, Col, Button, Dropdown, Space, Avatar, Spin } from "antd";
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
import InterCards from "./InternCards/interCards";
import UploadDocument from "../../../components/UploadDocument";
import DocTable from "./DocsTable/docTable";
import { CheckBox } from "../../../components/Checkbox";
import useCustomHook from "../actionHandler";
import { getUserAvatar } from "../../../helpers";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const InternDocument = () => {
  const { getInternList, getInternDocumentList, internDocumentCreate } =
    useCustomHook();
  const [selectData, setSelectData] = useState("Intern Documents");
  const [files, setFiles] = useState<any>([]);
  const [share, setShare] = useState(false);
  const [documentToggle, setDocumentToggle] = useState(false);
  const [uploadModel, setUploadModel] = useState(false);
  const [state, setState] = useState({ searchVal: "", dateRange: "" });
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [internList, setInternList] = useState<any>([]);
  const [selectedIntern, setSelectedIntern] = useState<any>();
  const [documentsData, setDocumentsData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getInternList();
      setSelectedIntern(data[0]);
      setInternList(data);
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

  const getInternDocuments = async ({ studentId }: any) => {
    try {
      setLoading(true);
      const { data } = await getInternDocumentList({
        studentId,
        docType: "INTERN",
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
    getInternDocuments({ studentId: intern.userDetail.id });
  };

  const onCheckBoxChange = (e: CheckboxChangeEvent) => {
    setShare(e.target.checked);
    console.log(`checked = ${e.target.checked}`);
  };

  const handleUpload = async () => {
    const payload: any = {
      name: "OTHER",
      media: files.files[0],
      shared: share,
      studentId: selectedIntern.userDetail.id,
    };
    console.log("TEST", payload);

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
      console.log("THIS", response.data);
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
          onClick={() => setSelectData("Intern Documents")}
        >
          Intern Documents
        </p>
      ),
      key: "0",
      value: "Intern Documents",
    },
    {
      label: (
        <p onClick={() => setSelectData("Shared Documents")}>
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
          {selectData}
        </p>
      </div>
      <Row gutter={[20, 20]} className="justify-between">
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar
            handleChange={(e: any) => setState({ ...state, searchVal: e })}
            value={state.searchVal}
          />
        </Col>
        <Col
          xl={18}
          lg={15}
          md={24}
          sm={24}
          xs={24}
          className="flex flex-wrap max-md:flex-col max-sm:flex-col justify-end gap-4"
        >
          {selectedIntern ? (
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
                            {getInternName(user, true)}
                          </Avatar>
                          {/* <img src={user.userImg} /> */}
                          <p>{getInternName(user)}</p>
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
                      selectData === "Shared Documents"
                        ? Frame
                        : getUserAvatar(selectedIntern.userDetail)
                    }
                  >
                    {getInternName(selectedIntern, true)}
                  </Avatar>
                  <div>
                    {selectData === "Shared Documents" ? (
                      <p className="text-success-placeholder-color">
                        Uploader (All)
                      </p>
                    ) : (
                      <p>
                        {selectedIntern ? getInternName(selectedIntern) : "N/A"}
                      </p>
                    )}
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

          {selectData === "Shared Documents" && (
            <DropDown
              setValue={(val: string) => setState({ ...state, dateRange: val })}
              value={state.dateRange}
              options={[
                "All",
                "this week",
                "last week",
                "this month",
                "last month",
                "date range",
              ]}
              name={"time range"}
              requireRangePicker
              showDatePickerOnVal={"date range"}
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
            <DocTable docs={documentsData} />
          ) : (
            <InterCards docs={documentsData} />
          )}
        </div>
      </Spin>
      <PopUpModal
        open={uploadModel}
        close={() => setUploadModel(!uploadModel)}
        title={"Upload Documents"}
        footer={[
          <Button
            className="teriary-color font-semibold text-base intern-cancel-btn"
            onClick={() => setUploadModel(false)}
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
        {selectData === "Intern Documents" ? (
          <div className="flex mt-5">
            <CheckBox onChange={onCheckBoxChange} />
            <p className="mx-3 text-teriary-color text-base">
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

function getInternName(payload: any, initials: boolean = false) {
  const { firstName, lastName } = payload.userDetail;
  if (initials) return firstName.split("")[0] + lastName.split("")[0];
  return firstName + " " + lastName;
}
