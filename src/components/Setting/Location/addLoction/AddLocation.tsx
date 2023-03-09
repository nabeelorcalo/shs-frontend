import React, { useState } from "react";
import { Typography, Row, Col, Divider, Form, Button } from "antd";
import { SettingHorizontalLine } from "../../../../assets/images";
import BoxWrapper from "../../../BoxWrapper/BoxWrapper";
import { Input } from "../../../Input/input";
import { SearchBar } from "../../../SearchBar/SearchBar";
import { RecipeCard } from "../../../RecipeCard";

const { Title, Paragraph } = Typography;

const AddLocation: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({
    locationName: "",
    postCode: "",
    address: "",
    street: "",
    town: "",
    country: "",
    phoneNumber: "",
    email: "",
    uploadImage: "",
    addInterns: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };

  console.log("formValues", formValues);
  return (
    <div>
      <BoxWrapper>
       
        <div className="flex ">
          <Title level={3}>Add Location </Title>
          <span className="mx-2">
            <SettingHorizontalLine />
          </span>
          <Title className="mt-0.5" level={4}>
            Setting
          </Title>
          <span className="mx-2 mt-2">/</span>
          <Title className="mt-0.5" level={4}>
            Location
          </Title>
        </div>
      </BoxWrapper>
      <Divider className="mb-0 " />
      <BoxWrapper>
        <Form layout="vertical">
          <Row className="mt-5">
            <Col className="gutter-row px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Setting
              </Title>
              <Paragraph>
                Enter office details for different locations
              </Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                // label="Username"
                name="locationName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  className="input"
                  handleChange={handleChange}
                  id="locationName"
                  label="Location Name"
                  name="locationName"
                  placeholder="Enter Title"
                  size="small"
                  type="text"
                  value={formValues.locationName}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row className="mt-5">
            <Col className="gutter-row px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Address
              </Title>
              <Paragraph>Enter address details for office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                label="Post C"
                name="postCode"
                rules={[{ message: "Please input your username!" }]}
              >
                <SearchBar size="large" handleChange={handleChange} />
              </Form.Item>
              <Row>
                <Col></Col>
              </Row>
            </Col>
          </Row>
          <Divider />
        </Form>
        <RecipeCard
          arraydata={[
            {
              title: "Sticky Orange Chicken",
              description:
                "This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! ",

              ratingValue: 4,
            },
            {
              title: "Sticky Orange Chicken",
              description:
                "This dish is a real crowd-pleaser. The sweet citrus glaze makes the chicken sticky and delicious—and it’s easy to make! ",

              ratingValue: 4,
            },
          ]}
        />
      </BoxWrapper>
    </div>
  );
};

export default AddLocation;
