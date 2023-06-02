import { Button, Upload, Col, Form, Row, Typography } from "antd";
import { BackButton, UploadUserProfile } from "../../../../assets/images";
import "./verifications.scss"
import useCustomHook from "../../actionHandler";
import { useState } from "react";
const Photograph = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [profilePhoto, setProfilePhoto] = useState<any>([]);
  
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    setProfilePhoto(e?.fileList)
    return e?.fileList;
  };

  const action = useCustomHook();
  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("photo", profilePhoto[0].originFileObj);
    action.verifcationStudentData(formData, { skip: false, step: 6 })
    setCurrentStep(7);
  }
  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex ">
                <div>
                  <BackButton onClick={() => { setCurrentStep(5) }} />
                </div>
                <div className="mx-auto">
                  <Typography className="main-heading-verify">Photograph</Typography>
                </div>
              </div>
              <Typography
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#4E4B66",
                  textAlign: "center",
                }}
              >
                Upload your profile picture
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form
                layout='vertical'
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="photo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  className="flex justify-center mt-10"
                >
                  <Upload name="photo"  listType="picture" beforeUpload={()=> false}>
                    <UploadUserProfile />
                  </Upload>
                </Form.Item>
                <div className="text-center my-5">
                <p className="font-semibold text-2xl text-primary-color">
                  A photo of you
                </p>
                <Typography className="steps-description">
                  Take a minute to upload a profile photo.
                </Typography>
              </div>
              <Row gutter={[10, 10]}>
                <Col xs={24} md={24} lg={12} xl={8}>
                  <Button className="btn-cancel btn-cancel-verification"
                    onClick={() => { setCurrentStep(7) }}
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

export default Photograph;
