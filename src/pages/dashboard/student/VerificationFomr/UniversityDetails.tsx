import { useState } from "react";
import {
  Button,
  DatePicker,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import type { SelectProps } from "antd";
import { DragAndDropUpload, DropDown } from "../../../../components";
import { BackButton, DocumentUpload } from "../../../../assets/images";
// import "../../../styles.scss";


const { Option } = Select;

const UniversityDetails = (props: any) => {

  const { currentStep, setCurrentStep } = props;
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex">
                <div>
                  <BackButton onClick={() => { setCurrentStep(2) }} />
                </div>
                <div className="mx-auto">
                  <Typography className="main-heading-verify">
                    Univerisity Details
                  </Typography>
                </div>
              </div>
              <Typography className="steps-description">
                Tell us about your university
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form.Item
                label="University"
                name="UniversityDocument"
                rules={[
                  {
                    required: true,
                    message: "Please University Valid Document!",
                  },
                ]}
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <DropDown
                  name="Search  University"
                  value={value}
                  options={["search", "item 1"]}
                  setValue={setValue}
                  requireSearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Form.Item>
              <Form.Item
                name="Course"
                label="Course"
                rules={[{ required: true, message: "Please select Course!" }]}
              >
                <DropDown
                  name="Enter Course Name"
                  value={value}
                  options={["search", "item 1"]}
                  setValue={setValue}
                  requireSearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Form.Item>
              <Form.Item
                label="University Email"
                name="University Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your University Email!",
                  },
                ]}
                style={{ width: "100%" }}
              >
                <Input placeholder="University Email" className="input-style" />
              </Form.Item>
              <Form.Item
                name="Graduation Year"
                label="Graduation Year"
                rules={[
                  {
                    required: true,
                    message: "Please select Graduation Year!",
                  },
                ]}
              >
                <DropDown
                  name="Select"
                  value={value}
                  options={["search", "item 1"]}
                  setValue={setValue}
                  requireSearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Form.Item>
              <Form.Item label="Internship Start Date">
                <DatePicker />
              </Form.Item>
              <Form.Item label="Internship End Date">
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Univeristy Approval"
                name="uploadDocument"
                rules={[
                  {
                    required: true,
                    message: "Please Upload Valid Document!",
                  },
                ]}
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <div className="dragger">
                  <DragAndDropUpload />
                </div>
              </Form.Item>
              <Row gutter={[10, 10]}>
                <Col xs={24} md={24} lg={12} xl={8}>
                  <Button className="btn-cancel btn-cancel-verification"
                    onClick={() => { setCurrentStep(4) }}
                  >
                    Skip
                  </Button>
                </Col>
                <Col xs={24} md={24} lg={12} xl={16}>
                  <Form.Item>
                    <Button
                      onClick={() => { setCurrentStep(4) }}
                      type="primary"
                      className="login-form-button">
                      Next
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UniversityDetails;
