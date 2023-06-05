import { useEffect, useState } from "react";
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
import useCustomHook from "../../actionHandler";
import { useRecoilState } from "recoil";
import { universitySystemAdminState } from "../../../../store";
// import "../../../styles.scss";
const { Option } = Select;

const UniversityDetails = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [universityApproval, setUniversityApproval] = useState([])
  const [value, setValue] = useState<string>();
  const [searchValue, setSearchValue] = useState("");
  const action = useCustomHook();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    const { universityName, course, universityMail, graduationYear } = values;
    const formData = new FormData();
    formData.append("universityName", 'universityName');
    formData.append("lastName", course);
    formData.append("country", universityMail);
    formData.append("documentType", graduationYear);
    formData.append("document", universityApproval[0]);
    action.verifcationStudentData(formData, { skip: false, step: 3 })
    setCurrentStep(4);
  }

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
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="University"
                  name="universityName"
                  rules={[
                    {
                      required: false,
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
                  name="course"
                  label="Course"
                  rules={[{ required: true, message: "Please select Course!" }]}
                >
                  <Select
                    onChange={handleChange}
                    options={[
                      { value: '3DInteractionDesigninVirtualReality', label: '3D Interaction Design in Virtual Reality' },
                      { value: 'AccountingandFinance', label: 'Accounting and Finance' },
                      { value: 'AppliedPublicHistory', label: 'Applied Public History' },
                      { value: 'DependentonWorkPermit', label: 'Dependent on Work Permit' },
                      { value: 'ArtHistoryCuratorship&RenaissanceCulture', label: 'Art History, Curatorship & Renaissance Culture' },
                      { value: 'BankingandFinance', label: 'Banking and Finance' },
                      { value: 'BrandManagement', label: 'Brand Management' },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="University Email"
                  name="universityMail"
                  rules={[
                    {
                      required: false,
                      message: "Please input your University Email!",
                    },
                  ]}
                  style={{ width: "100%" }}
                >
                  <Input placeholder="University Email" className="input-style" />
                </Form.Item>
                <Form.Item
                  name="graduationYear"
                  label="Graduation Year"
                  rules={[
                    {
                      required: true,
                      message: "Please select Graduation Year!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Graduation Year" className="input-style" />
                </Form.Item>
                <Form.Item label="Internship Start Date">
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Internship End Date">
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="Univeristy Approval"
                  name="uniApproval"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload Valid Document!",
                    },
                  ]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <div className="dragger">
                    <DragAndDropUpload
                      files={universityApproval}
                      setFiles={setUniversityApproval}
                    />
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
                        htmlType="submit"
                        type="primary"
                        className="login-form-button"
                      >
                        Next
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UniversityDetails;
