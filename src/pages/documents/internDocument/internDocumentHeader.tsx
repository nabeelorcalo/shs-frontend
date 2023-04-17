import { useState } from "react";
import { Row, Col, Button } from "antd";
import {
  ArrowDownDark,
  CardViewIcon,
  TableViewIcon,
  UploadIconBtn,
} from "../../../assets/images";
import "./Styles.scss";
import {
  DropDown,
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

const InternDocument = (props: any) => {
  const [selectData, setSelectData] = useState("");
  const [documentToggle, setDocumentToggle] = useState(false);
  const [uploadModel, setUploadModel] = useState(false);

  console.log(selectData, "cnkjv");

  return (
    <>
      <div className="flex ">
        <select
          className="select-icon"
          onChange={(e: any) => setSelectData(e.target.value)}
        >
          <option value="internDocument">Intern Documents</option>
          <option value="sharedDocument">Shared Documents</option>
        </select>
        <p className="ml-3 mt-1 text-primary-color text-base font-medium">
          {selectData === "sharedDocument" ? (
            <p>Shared Document</p>
          ) : (
            <p>Inten Document</p>
          )}
        </p>
      </div>

      <Row gutter={[20, 20]} className="my-7" justify="space-between">
        <Col lg={6}>
          <SearchBar handleChange={() => {}} />
        </Col>

        <Col lg={selectData === "sharedDocument" ? 13 : 9}>
          <div className="flex gap-3">
            <DropDownNew
              className="text-input-bg-color rounded-md px-[9px]"
              items={[
                {
                  label: (
                    <div>
                      {SelectData.map((user: any) => (
                        <div className=" user-input border flex items-center gap-3 mb-3">
                          <img src={user.userImg} />
                          <p>{user.userName}</p>
                        </div>
                      ))}
                    </div>
                  ),
                  key: "users",
                },
              ]}
            >
              <div className="flex items-center justify-between gap-3 w-full ">
                <div className="user flex items-center gap-3">
                  <img src={UserImage} alt="icon" />
                  <p>Maria Sonoid</p>
                </div>
                <ArrowDownDark />
              </div>
            </DropDownNew>

            {selectData === "sharedDocument" && (
              <Col lg={9}>
                <DropDown
                  setValue={(e: string) => {}}
                  options={[
                    "this week",
                    "last week",
                    "this month",
                    "last month",
                    "date range",
                  ]}
                  requireDatePicker
                  showDatePickerOnVal={"date range"}
                />
              </Col>
            )}

            <Button
              className="green-graph-tooltip-bg flex justify-between"
              onClick={() => setUploadModel(true)}
            >
              <img src={UploadIconBtn} alt="" />
              <span className="white-color font-semibold text-base">
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
          </div>
        </Col>
      </Row>
      {documentToggle ? <InterCards /> : <DocTable />}
      <PopUpModal
        open={uploadModel}
        close={() => setUploadModel(!uploadModel)}
        title={"Upload Documents"}
        footer={[
          <Button
            className="teriary-color tertiory-btn"
            onClick={() => setUploadModel(false)}
          >
            Cancel
          </Button>,
          <Button
            className="teriary-bg-color color-white white-color upload-button"
            onClick={() => setUploadModel(false)}
          >
            Upload
          </Button>,
        ]}
      >
        <UploadDocument />
      </PopUpModal>
    </>
  );
};

export default InternDocument;
