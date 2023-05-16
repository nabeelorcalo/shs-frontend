import React, { useState } from "react";
import "../../style.scss";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
} from "antd";
import { DropDown } from "../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { DocumentsIcon, HiringIcon, Info, InterView, InterviewIcon, PersnolIcon } from "../../../../assets/images";
import DrawerDocuments from "../../../candidates/drawerDocuments";
import HiringProcess from "../../../candidates/hiringProcess";
import PersonalInformationTabs from "./personalInformation/PersonalInformationTabs";
import GenralInformationTab from "./generalInformation/genralInformationTab";
import DocumentsTab from "./documents/DocumentsTab";

const { TextArea } = Input;

const { Search } = Input;

const options = [
  {
    value: "+91",
    label: "+91",
  },
  {
    value: "+92",
    label: "+92",
  },
];

const UniversityProfileForm = (props: any) => {

  const { selectedCandidate } = props;

  const items: any = [
    {
      key: "1",
      label: (
        <div className="flex gap-2">
          <PersnolIcon />
          <p>Personal Information</p>
        </div>
      ),
      children: <PersonalInformationTabs />,
    },
    {
      key: "2",
      label: (
        <div className="flex gap-2">
          <Info />
          <p>Hiring Process</p>
        </div>
      ),
      children: <GenralInformationTab selectedCandidate={selectedCandidate} />,
    },
    {
      key: "3",

      label: (
        <div className="flex gap-2">
          <DocumentsIcon />
          <p>Documents</p>
        </div>
      ),
      children: <DocumentsTab />,
    },
    
  ];
  // const [value, setValue] = useState("");
  // const [searchValue, setSearchValue] = useState("");
  // const onFinish = (values: any) => {
  //   console.log("Success:", values);
  // };
  return (
    // <div className="univeristy-profile-form">
    //   <div className="profile-style">
    //     <Form
    //       layout="vertical"
    //       name="univerisyForm"
    //       initialValues={{ remember: true }}
    //       validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
    //       onFinish={onFinish}
    //       autoComplete="off"
    //     >
    //       <div className="p-4">
    //         <Typography className="main-label">Basic Information</Typography>
    //         <Row gutter={[15, 15]}>
    //           <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
    //             <Form.Item
    //               label="University Name"
    //               name="univeristyName"
    //               rules={[{ required: true }, { type: "string" }]}
    //             >
    //               <Input
    //                 placeholder="University of Lincoln"
    //                 className="input-style"
    //               />
    //             </Form.Item>
    //           </Col>
    //           <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
    //             <Form.Item
    //               label="Email"
    //               name="email"
    //               rules={[{ required: true }, { type: "email" }]}
    //             >
    //               <Input placeholder="Enter email" className="input-style" />
    //             </Form.Item>
    //           </Col>
    //           <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
    //             <Form.Item
    //               label="Phone Number"
    //               name="phoneNumber"
    //               rules={[{ required: true }, { type: "string" }]}
    //             >
    //               <Space.Compact>
    //                 <Select
    //                   defaultValue="+91"
    //                   options={options}
    //                   style={{ width: "25%" }}
    //                   className="input-style"
    //                 />
    //                 <Input
    //                   defaultValue="xxxxx-xxxxxx"
    //                   style={{ width: "75%" }}
    //                   className="input-style"
    //                 />
    //               </Space.Compact>
    //             </Form.Item>
    //           </Col>
    //         </Row>
    //         <Divider />
    //         <Typography className="main-label">Address</Typography>
    //         <Row gutter={[15, 15]}>
    //           <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
    //             <Form.Item
    //               label="Post Code"
    //               name="postCode"
    //               rules={[{ required: true }, { type: "string" }]}
    //             >
    //               <DropDown
    //                 name="Post Code"
    //                 value={value}
    //                 options={["search", "item 1"]}
    //                 setValue={setValue}
    //                 requireSearchBar
    //                 searchValue={searchValue}
    //                 setSearchValue={setSearchValue}
    //               />
    //             </Form.Item>
    //           </Col>
    //           <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
    //             <Form.Item
    //               label="Address"
    //               name="address"
    //               rules={[{ required: true }, { type: "string" }]}
    //             >
    //               <Input placeholder="Enter address" className="input-style" />
    //             </Form.Item>
    //           </Col>
    //           <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
    //             <Form.Item
    //               label="City"
    //               name="city"
    //               rules={[{ required: true }, { type: "string" }]}
    //             >
    //               <Input placeholder="Enter city" className="input-style" />
    //             </Form.Item>
    //           </Col>
    //           <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
    //             <Form.Item
    //               label="Country"
    //               name="country"
    //               rules={[{ required: true }, { type: "string" }]}
    //             >
    //               <DropDown
    //                 name="Select"
    //                 value={value}
    //                 options={["item 1", "item 2", "item 3"]}
    //                 setValue={setValue}
    //               />
    //             </Form.Item>
    //           </Col>
    //         </Row>
    //         <Divider />
    //         <Typography className="main-label">About University</Typography>
    //         <Row>
    //           <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
    //             <Form.Item
    //               label="Description"
    //               name="description"
    //               rules={[{ required: true }, { type: "string" }]}
    //             >
    //               <TextArea
    //                 rows={4}
    //                 placeholder="Write something about the university..."
    //                 maxLength={6}
    //                 className="input-style"
    //               />
    //             </Form.Item>
    //           </Col>
    //         </Row>
    //         <div className="flex items-center justify-center md:justify-end pt-3">
    //           <Space>
    //             <Button className="btn-cancle">Cancel</Button>
    //             <Button className="btn-save" htmlType="submit">
    //               Save
    //             </Button>
    //           </Space>
    //         </div>
    //       </div>
    //     </Form>
    //   </div>
    // </div>
    <>
      <Tabs className="" defaultActiveKey="1" items={items} onChange={() => { }} />

    </>
  );
};

export default UniversityProfileForm;
