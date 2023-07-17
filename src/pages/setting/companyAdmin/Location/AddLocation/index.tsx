import React, { useEffect, useState } from "react";
import {
  Typography, Row, Col, Divider, Form,
  Radio, RadioChangeEvent, Button, Space, Input, Avatar
} from "antd";
import { GlassMagnifier } from "../../../../../assets/images";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, BoxWrapper, SettingCommonModal } from "../../../../../components";
import constants, { ROUTES_CONSTANTS } from "../../../../../config/constants";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useCustomHook from "../actionHandler";
import 'react-phone-input-2/lib/style.css';
const { Paragraph } = Typography;
import "./style.scss";
import useCountriesCustomHook from "../../../../../helpers/countriesList";
import UserSelector from "../../../../../components/UserSelector";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../../../../../store";
import { newCountryListState } from "../../../../../store/CountryList";
import CountryCodeSelect from "../../../../../components/CountryCodeSelect";
import UploadDocument from "../../../../../components/UploadDocument";

const AddLocation: React.FC = () => {
  const currentUser = useRecoilState(currentUserState);
  const { postSettingLocation, editSettingLocation, internsData, getAllInterns } = useCustomHook();
  const countries = useRecoilValue(newCountryListState);

  const filteredInternsData = internsData?.map((item: any) => {
    return (
      {
        id: item?.userDetail?.id,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        image: `${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`
      }
    )
  })
  const navigate = useNavigate()
  const { state } = useLocation()
  const [files, setFiles] = useState<any>(null)
  const [states, setState] = useState<any>(
    {
      country: "",
      phoneCode: "",
      interns: filteredInternsData ?? [],
      openModal: false,
      internValue: state?.interns?.length === filteredInternsData?.length ? 1 : (state?.interns ? 2 : 1),
    });
  const { getCountriesList } = useCountriesCustomHook();
  const [form] = Form.useForm();
  const deselectArray: any = [];

  useEffect(() => {
    getCountriesList();
    getAllInterns(currentUser[0]?.company?.id)
  }, [states.openModal])

  const breadcrumbArray = [
    { name: "Add Location" },
    { name: "Settings", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LOCATION}` },
    { name: "Location", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LOCATION}` },
  ];

  const onFinish = (values: any) => {
    const { address, email, locationName, phoneNumber, postCode, street, country, town } = values;
    let locationValues = {
      interns: states.interns,
      country: country,
      phoneCode: states.phoneCode,
      uploadImage: files?.files[0]?.name,
      address,
      email,
      locationName,
      phoneNumber,
      postCode,
      street,
      town
    };
    if (state?.id) {
      editSettingLocation(state?.id, locationValues)
    }
    else {
      postSettingLocation(locationValues);
    }
    navigate(`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LOCATION}`)
  }

  const initialValues = {
    interns: state?.interns,
    country: state?.country,
    phoneCode: state?.phoneCode,
    address: state?.address,
    email: state?.email,
    locationName: state?.name,
    phoneNumber: state?.phoneNumber,
    postCode: state?.postCode,
    street: state?.street,
    image: state?.image,
    town: state?.town
  }

  const onChange = (e: RadioChangeEvent) => {
    const radioValue = e.target.value
    if (e.target.value === 2) {
      setState({
        ...states, openModal: true, internValue: radioValue
      })
    }
    else if (e.target.value === 1) {
      setState({ ...states, internValue: radioValue, interns: filteredInternsData })
    }
  };

  return (
    <div className="add-location">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <BoxWrapper className="my-5">
        <Form layout="vertical"
          form={form}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={onFinish}
          initialValues={initialValues}
        >
          {/*------------------------ Office----------------------------- */}
          <Row >
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Office
              </span>
              <Paragraph>
                Enter office details for different locations
              </Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="locationName"
                required={false}
                label="Location Name"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="Enter Title" className="input-style" />
              </Form.Item>
            </Col>
          </Row>
          <Divider className="mt-1" />
          {/*------------------------ Address----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row " xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Address
              </span>
              <Paragraph>Enter address details for office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="postCode"
                required={false}
                label="Post Code"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Search" className="input-style"
                  prefix={<GlassMagnifier />}
                />
              </Form.Item>
              <div className="md:flex gap-2">
                <Form.Item
                  name="address"
                  className="w-full"
                  required={false}
                  label="Address"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="Enter address line" className="input-style" />
                </Form.Item>

                <Form.Item
                  name="street"
                  className="w-full "
                  required={false}
                  label="Street"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="Enter street or location" className="input-style" />
                </Form.Item>
              </div>
              <div className="md:flex gap-2">
                <Form.Item
                  name="town"
                  className="w-full"
                  required={false}
                  label="Town"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="Enter town" className="input-style" />
                </Form.Item>
                <div className="w-full">
                  <Form.Item
                    label="Country"
                    required={false}
                    name="country"
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <UserSelector
                      options={countries}
                      placeholder="Select Country"
                      hasSearch={true}
                    />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
          <Divider className="mt-1" />
          {/*------------------------ Contact----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Contact
              </span>
              <Paragraph>
                Enter contact information of office location
              </Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <span className="label">
                Phone Number (optional)<span className="text-[red]"></span>
              </span>
              <div className="flex">
                <div className="w-[30%]" >
                  <Form.Item
                    required={false}
                    name="phoneCode">
                    <CountryCodeSelect />
                  </Form.Item>
                </div>
                <Form.Item
                  name="phoneNumber"
                  required={false}
                  className="w-full pl-2"
                // rules={[{ required: true }, { type: "string" }]}
                >
                  <Input placeholder="xxxx xxxxxx" className="input-style" />
                </Form.Item>
              </div>
              <Form.Item name="email"
                label={<span>Email <span className="text-teriary-color">(optional)</span></span>}
              >
                <Input placeholder="Enter email" className="input-style" />
              </Form.Item>
            </Col>
          </Row>
          <Divider className="mt-1" />
          {/*------------------------ Upload Picture----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Upload Image
              </span>
              <Paragraph>Upload picture for your office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item name="uploadImage">
                <div className="dragger">
                  <UploadDocument files={files} setFiles={setFiles} />
                </div>
              </Form.Item>
            </Col>
          </Row>

          {/*------------------------ Add Interns----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Add Interns
              </span>
              <Paragraph>Select interns for this office location</Paragraph>
            </Col>
            <Col className="gutter-row  " xs={24} md={12} xxl={8} >
              <Form.Item name="interns">
                <div className=" flex items-center">
                  <Radio.Group onChange={onChange} value={states.internValue}>
                    <Radio value={1}>All Interns</Radio>
                    <Radio value={2}>Select Interns</Radio>
                  </Radio.Group>
                  <span>
                    <Avatar.Group
                      maxCount={4}
                      size="small"
                      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}>
                      {(states?.interns ?? states.interns)?.map((item: any) => {
                        return (
                          <Avatar src={item.image} >{item.name}</Avatar>
                        )
                      })}
                    </Avatar.Group>
                  </span>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Space className="flex justify-end">
            <Button danger size="middle" type="primary"
              onClick={() => {
                form.resetFields();
                navigate(`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LOCATION}`)
              }}>
              Cancel
            </Button>

            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
              htmlType="submit"
            >
              Add
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
      <SettingCommonModal
        selectArray={filteredInternsData}
        deselectArray={deselectArray}
        openModal={states.openModal}
        setOpenModal={setState}
        state={states}
      />
    </div>
  );
};

export default AddLocation;
