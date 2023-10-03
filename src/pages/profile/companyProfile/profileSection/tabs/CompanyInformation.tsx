import React, { useState } from 'react'
import UserSelector from '../../../../../components/UserSelector'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../../config/validationMessages';
import { PlusOutlined, PlusCircleFilled, DeleteFilled, CaretDownOutlined } from '@ant-design/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { newCountryListState, postalCodeState } from '../../../../../store/CountryList';
import CountryCodeSelect from '../../../../../components/CountryCodeSelect';
import { ButtonThemePrimary, ButtonThemeSecondary, CommonDatePicker } from '../../../../../components';
import '../../../style.scss';
const { Option } = Select;
import { currentUserState } from '../../../../../store';
import CustomAutoComplete from '../../../../../components/CustomAutoComplete';
import useCustomHook from '../../../actionHandler';
import { useNavigate } from 'react-router-dom';
import postalCode from '../../../../../helpers/postalCodeRegex';

const businessTypeOptions: any[] = [
  {
    label: "Private Limited",
    value: "Private Limited",
  },
  {
    label: "Public Limited",
    value: "Public Limited",
  },
  {
    label: "Limited Liability Partnership",
    value: "Limited Liability Partnership",
  },
  {
    label: "Limited Partnership",
    value: "Limited Partnership",
  },
  {
    label: "Partnership",
    value: "Partnership",
  },
  {
    label: "Sole Trader / Individual",
    value: "Sole Trader / Individual",
  },
];

const businessSectorOptions: any[] = [
  {
    label: "Crypto / Blockchain",
    value: "Crypto / Blockchain",
  },
  {
    label: "Information Technology",
    value: "Information Technology",
  },
  {
    label: "Marketing",
    value: "Marketing",
  },
  {
    label: "Education",
    value: "Education",
  },
  {
    label: "Real estate",
    value: "Real estate",
  },
  {
    label: "Health and Fitness",
    value: "Health and Fitness",
  },
];

const companyInformation = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { makeRegex } = postalCode();
  const { getCompanyList, updateCompanyProfile } = useCustomHook();
  const [country, setCountry] = useState('');
  const [userState, setUserState] = useRecoilState(currentUserState)
  const postalCodes = useRecoilValue<any>(postalCodeState);
  const countries = useRecoilValue(newCountryListState);
  const { company, aboutUs } = useRecoilValue(currentUserState)

  form.setFieldsValue({
    businessType: company.businessType,
    businessName: company.businessName,
    ownerName: company.ownerName,
    ownerRole: company.ownerRole,
    ownerAddress: company.ownerAddress,
    registrationNumber: company.registrationNumber,
    businessSector: company.businessSector,
    country: company.country,
    website: company.website,
    postCode: company.postCode,
    address: company.address,
    street: company.street,
    town: company.town,
    aboutUs: aboutUs,
  });

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleCompSelect = (item: any) => {
    console.log(item, 'item from list');
    form.setFieldValue("businessName", item?.title);
  }

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("businessType", values.businessType);
    formData.append("businessName", values.businessName);
    formData.append("registrationNumber", values.registrationNumber);
    formData.append("businessSector", values.businessSector);
    formData.append("country", values.country);
    formData.append("website", values.website);
    formData.append("ownerName", values.ownerName);
    formData.append("ownerRole", values.ownerRole);
    formData.append("ownerAddress", values.ownerAddress);
    formData.append("postCode", values.postCode);
    formData.append("address", values.address);
    formData.append("street", values.street);
    formData.append("town", values.town);
    formData.append("aboutUs", values.aboutUs);
    updateCompanyProfile(formData)
    setUserState({ ...userState, company: { ...userState?.company, ...values }, aboutUs: values?.aboutUs })
  }

  return (
    <div className="general-information">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: false }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <div>
          <Typography className="title">Buisness Information</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Business Type"
              name="businessType"
            >
              <Select
                placeholder="Select Business type"
                size="middle"
                suffixIcon={<CaretDownOutlined />}
              >
                {businessTypeOptions.map((option: any) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Business Name"
              name="businessName"
              className="mb-[20px]"
            >
              <CustomAutoComplete
                isCompany={true}
                fetchData={getCompanyList}
                selectItem={handleCompSelect}
                defaultSearchValue={form.getFieldValue('businessName')}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Company Registration Number"
              name="registrationNumber"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter registration number" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Business Sector"
              name="businessSector"
            >
              <Select
                placeholder="Select business sector"
                size="middle"
                suffixIcon={<CaretDownOutlined />}
              >
                {businessSectorOptions.map((option: any) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select
                showSearch
                options={countries}
                placeholder={"Select Country"}
                onChange={(val: any) => setCountry(val)}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Website(Optional)"
              name="website"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter link" className="input-style" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">Owner Detail</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="ownerName"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder='Enter first name' className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Role"
              name="ownerRole"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder='Enter role' className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Correspondance Address"
              name="ownerAddress"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder='Enter first name' className="input-style" />
            </Form.Item>
          </Col>
          <Divider />
        </Row>
        <div>
          <Typography className="title">Company Address</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Post Code"
              name="postCode"
              rules={[
                {
                  validator: (_, value) => {
                    let regex: any = makeRegex(country);
                    regex = new RegExp(regex)
                    
                    if (value === '') {
                      return Promise.reject('Required Field');
                    }
                    if (regex.test(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Invalid postal code');
                    }
                  }
                }
              ]}
            >
              <Input placeholder="Enter Post code" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter address" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter street" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Town"
              name="town"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter town" className="input-style" />
            </Form.Item>
          </Col>
          <Divider />
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="About Us"
              name="aboutUs"
              rules={[{ required: false }, { type: "string" }]}
            >
              <TextArea
                rows={4}
                placeholder="Write about yourself"
                maxLength={200}
                className="input-style"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <ButtonThemeSecondary
               onClick={() => 
                navigate('/')
              }
              >
                Cancel
              </ButtonThemeSecondary>
              <ButtonThemePrimary
                htmlType="submit"
              >
                Save
              </ButtonThemePrimary>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default companyInformation