import { useState } from "react";
import { Row, Col, Button, Dropdown, Space } from "antd";
import {
  ArrowDownDark,
  CardViewIcon,
  TableViewIcon,
  UploadIconBtn,
  Frame,
  Folder,
  ArrowDoenIcon
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
import { CheckBox } from "../../../components/Checkbox";

const InternDocument = () => {
  const [selectData, setSelectData] = useState("Intern Documents");
  const [documentToggle, setDocumentToggle] = useState(false);
  const [uploadModel, setUploadModel] = useState(false);
  const [state, setState] = useState({ searchVal: '', dateRange: '' })
  const items: any = [
    {
      label: <p className="text-base font-medium" onClick={() => setSelectData('Intern Documents')}>Intern Documents</p>,
      key: '0',
      value: "Intern Documents"
    },
    {
      label: <p onClick={() => setSelectData('Shared Documents')}>Shared Documents</p>,
      key: '1',
      value: "Shared Documents"
    },
  ];
  return (
    <div className="intern-header-wrapper">
      <div className="flex my-5">
        <Dropdown className="px-3 cursor-pointer" menu={{ items }} trigger={['click']}>
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
          <SearchBar handleChange={(e: any) => setState({ ...state, searchVal: e })} value={state.searchVal} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex flex-wrap max-md:flex-col max-sm:flex-col justify-end gap-4">
          <DropDownNew
            className="justify-between text-input-bg-color rounded-md pl-[9px] pr-[23px] document-dropdown lg:w-[250px]"
            items={[
              {
                label: (
                  <div>
                    {SelectData.map((user: any, i: any) => (
                      <div
                        key={i}
                        className=" user-input border flex items-center gap-3 mb-3"
                      >
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
            <div className="flex items-center gap-3 ">
              <div className="user flex items-center gap-3">
                <img
                  src={selectData === "Shared Documents" ? Frame : UserImage}
                  alt="icon"
                />
                <div>
                  {selectData === "Shared Documents" ? (
                    <p className="text-success-placeholder-color">
                      Uploader (All)
                    </p>
                  ) : (
                    <p>Maria Sanoid</p>
                  )}
                </div>
              </div>
              <ArrowDownDark />
            </div>
          </DropDownNew>

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
            <span className="white-color font-semibold text-base mx-3">Upload</span>
          </Button>

          <ToggleButton
            isToggle={documentToggle}
            onTogglerClick={() => setDocumentToggle(!documentToggle)}
            FirstIcon={CardViewIcon}
            LastIcon={TableViewIcon}
            className="w-[88px]"
          />
        </Col>
        <Col xs={24}>{documentToggle ? <DocTable /> : <InterCards />}</Col>
      </Row>

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
            className="teriary-bg-color font-semibold text-base upload-button white-color"
            onClick={() => setUploadModel(false)}
          >
            Upload
          </Button>,
        ]}
      >
        <UploadDocument />
        {selectData === "Intern Documents" ?
          <div className="flex mt-5">
            <CheckBox />
            <p className="mx-3 text-teriary-color text-base">Share with intern</p>
          </div>
          : ""
        }
      </PopUpModal>
    </div>
  );
};

export default InternDocument;
