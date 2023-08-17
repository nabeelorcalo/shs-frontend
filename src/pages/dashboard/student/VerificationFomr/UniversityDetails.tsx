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
import { BackButton, DocumentUpload, InfoCircle } from "../../../../assets/images";
import useCustomHook from "../../actionHandler";
import { useRecoilState } from "recoil";
import { universitySystemAdminState } from "../../../../store";
import { CaretDownOutlined } from '@ant-design/icons';
const { Option } = Select;

const courses = [
  {
    values: "3DInteractionDesigninVirtualReality",
    label: "3D Interaction Design in Virtual Reality"
  },
  {
    values: "AccountingandFinance",
    label: "Accounting and Finance"
  },
  {
    values: "AppliedPublicHistory",
    label: "Applied Public History"
  },
  {
    values: "DependentonWorkPermit",
    label: "Dependent on Work Permit"
  },
  {
    values: "ArtHistoryCuratorship&RenaissanceCulture",
    label: "Art History, Curatorship & Renaissance Culture"
  },
  {
    values: "BankingandFinance&RenaissanceCulture",
    label: "Banking and Finance"
  },
  {
    values: "BrandManagement",
    label: "Brand Management"
  },

]

const UniversityDetails = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [data, setData] = useState<SelectProps["options"]>([]);
  const universitySubAdmin = useRecoilState<any>(universitySystemAdminState);
  const [universityApproval, setUniversityApproval] = useState([])
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const [value, setValue] = useState<string>();
  const [searchValue, setSearchValue] = useState("");
  const action = useCustomHook();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    const { universityName, course, universityMail, graduationYear } = values;
    const formData = new FormData();
    formData.append("universityName", universityName);
    formData.append("lastName", course);
    formData.append("country", universityMail);
    formData.append("documentType", graduationYear);
    formData.append("document", universityApproval[0]);
    action.verifcationStudentData(formData, { skip: dynSkip, step: currentStep })
    setCurrentStep(currentStep+1);
  }

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex">
                <div>
                  <BackButton onClick={() => { setCurrentStep(currentStep - 1) }} />
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
                initialValues={{ remember: !dynSkip }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="University"
                  name="universityName"
                  rules={[{ type: "string" }, { required: false }]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                   <Select placeholder='Select'>
                {universitySubAdmin[0]?.map((item: any) => (
                  <Option value={item?.university?.name}>{item?.university?.name }</Option>
                ))}
              </Select>
                </Form.Item>
                <Form.Item
                  name="course"
                  label="Course"
                  rules={[{ required: !dynSkip }, { type: "string" }]}
                >
                  <Select
                    onChange={handleChange}
                    size="middle"
                    suffixIcon={<CaretDownOutlined />}
                  >
                    {courses?.map((option: any) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="University Email"
                  name="universityMail"
                  rules={[{ type: "email" }, { required: !dynSkip }]}
                >
                  <Input placeholder="University Email" className="input-style" />
                </Form.Item>
                <Form.Item
                  name="graduationYear"
                  label="Graduation Year"
                  rules={[{ type: "string" }, { required: !dynSkip }]}
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
                  className="mb-[20px]"
                  rules={[{ required: !dynSkip }, { type: "string" }]}
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
                      onClick={() => {
                        setDynSkip(true);
                      }}
                      htmlType="submit"
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
