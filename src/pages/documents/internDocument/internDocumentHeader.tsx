import React from "react";
import { Input, Select, Row, Col, Button } from "antd";
import { ArrowDownDark, UploadIconBtn } from "../../../assets/images";
import "./Styles.scss";
import { SearchBar } from "../../../components";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { SelectData } from "./internHeader";
import UserImage from "../../../assets/images/documents/Image.svg";
import InterCards from "./InternCards/interCards";

const InternDocument = () => {
  return (
    <>
      <div className="flex ">
        <select className="select-icon">
          <option value="" disabled></option>
          <option value="1">Intern Documents</option>
          <option value="2">Shared Documents</option>
        </select>
        <p className="ml-3 mt-1 text-primary-color text-base font-medium">
          Intern Documents
        </p>
      </div>

      <Row gutter={[20, 20]} className="my-7" justify="space-between">
        <Col lg={6}>
          <SearchBar handleChange={() => {}} />
        </Col>
        <Col lg={8}>
          <div className="flex gap-5">
            <DropDownNew
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
              <div className="flex items-center justify-between gap-3 w-full">
                <div className="user flex items-center gap-3">
                  <img src={UserImage} alt="icon" />
                  <p>Maria Sonoid</p>
                </div>
                <ArrowDownDark />
              </div>
            </DropDownNew>
            <Button className="green-graph-tooltip-bg flex justify-between">
              <img src={UploadIconBtn} alt="" />
              <span className="white-color font-semibold text-base">
                Upload
              </span>
            </Button>
          </div>
        </Col>
      </Row>
      <InterCards />
    </>
  );
};

export default InternDocument;
