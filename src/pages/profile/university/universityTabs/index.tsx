import { useEffect, useState } from "react";
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
import { BoxWrapper, DropDown } from "../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import "./styles.scss";
import "react-phone-input-2/lib/style.css";
import useCustomHook from "../../actionHandler";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, universityState } from "../../../../store";
import useCountriesCustomHook from "../../../../helpers/countriesList";
import CountryCodeSelect from "../../../../components/CountryCodeSelect";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { newCountryListState } from "../../../../store/CountryList";
import usePhoneNumberHook from "../../../../helpers/phoneNumber";
import { PhoneInput } from 'react-international-phone';

const { TextArea } = Input;

const UniversityProfileForm = (props: any) => {
  const navigate = useNavigate();
  const action = useCustomHook();
  const [phone, setPhone] = useState('');
  const { PhoneValidator, countryFlagCode, extractCountryCode, extractPhoneNumber } = usePhoneNumberHook();
  const { userUniversity } = useRecoilValue(currentUserState);
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const countries = useRecoilValue(newCountryListState);
  const [form] = Form.useForm();
  const flag = countryFlagCode();
  const selectCountry = allCountriesList?.map((item: any, index: number) => {
    return (
      {
        key: index,
        value: item?.name?.common,
        label: item?.name?.common,
      }
    )
  })

  const onFinish = (values: any) => {
    const formData = new FormData();
    const phoneCode :any = extractCountryCode(phone);
    const phoneNumber :any = extractPhoneNumber(phone);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phoneCode',phoneCode);
    formData.append('phoneNumber',(phoneNumber).toString());
    formData.append('postCode', (values.postCode).toString());
    formData.append('address', (values.address).toString());
    formData.append('city', (values.city).toString());
    formData.append('country', (values.country).toString());
    formData.append('aboutUni', values.aboutUni);
    action.updateUniversity(formData,
    );
  };

  useEffect(() => {
    if (userUniversity) {
      form.setFieldsValue({
        name: userUniversity?.university?.name,
        email: userUniversity?.university?.email,
        phoneCode: userUniversity?.university?.phoneCode,
        phoneNumber: userUniversity?.university?.phoneCode + userUniversity?.university?.phoneNumber ,
        postCode: userUniversity?.university?.postCode,
        address: userUniversity?.university?.address,
        city: userUniversity?.university?.city,
        country: userUniversity?.university?.country,
        aboutUni: userUniversity?.university?.aboutUni,
      })
    }
  }, [form])

  return (
    <BoxWrapper >
      <div className="uni-profile-form">
        <div className="profile-style">
          <Form
            layout="vertical"
            name="univerisyForm"
            initialValues={{ remember: true }}
            validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
            onFinish={onFinish}
            form={form}
            autoComplete="off"
          >
            <div className="p-4">
              <Typography
                className="main-label font-semibold text-xl text-primary-title-color mb-3">
                Basic Information
              </Typography>
              <Row gutter={[15, 15]}>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="University Name"
                    name="name"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input
                      placeholder="University of Lincoln"
                      className="input-style"
                    />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: false }, { type: "email" }]}
                  >
                    <Input placeholder="Enter email" className="input-style" />
                  </Form.Item>
                </Col>
                <Col xxl={8} xl={8} lg={12} md={24} xs={24}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    className={phone ? 'phone-input' : 'phone-input-error'}
                    rules={[
                      {
                        validator: (_, value) => PhoneValidator(phone, value)
                      }
                    ]}
                  >
                    <PhoneInput
                      value={phone}
                      className="w-auto"
                      defaultCountry={`${flag[userUniversity?.university?.phoneCode]}`}
                      // placeholder="+92 312-9966188"
                      disableDialCodePrefill
                      onChange={(phone: string, country: any) => { setPhone(phone) }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Typography className=" font-semibold text-xl text-primary-title-color mb-3">Address</Typography>
              <Row gutter={[15, 15]}>
                <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                  <Form.Item
                    label="Post Code"
                    name="postCode"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input className="input-style" />
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
                    label="City"
                    name="city"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <Input placeholder="Enter city" className="input-style" />
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
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Typography className="font-semibold text-xl text-primary-title-color mb-3">
                About University
              </Typography>
              <Row>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item
                    label="Description"
                    name="aboutUni"
                    rules={[{ required: false }, { type: "string" }]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Write something about the university..."
                      maxLength={200}
                      className="input-style"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex items-center justify-center md:justify-end pt-3">
                <Space>
                  <Button
                    className="btn-cancle"
                    onClick={() => {
                      navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`);
                  }}
                  >
                    Cancel
                  </Button>
                  <Button className="btn-save" htmlType="submit">
                    Save
                  </Button>
                </Space>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </BoxWrapper>

  );
};

export default UniversityProfileForm;
