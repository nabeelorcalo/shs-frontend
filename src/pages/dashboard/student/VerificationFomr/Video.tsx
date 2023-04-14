import { Button, Upload, Col, Form, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { BackButton, Round } from "../../../../assets/images";

const Video = (props: any) => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = props;
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          <div className="form-wrapper">
            <div className="main-title-wrapper">
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={1}>Video</Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
                Create your video interview to get hired
              </Typography>
            </div>
            <div>
              <Typography className="video-description text-center my-5">
                Create an introductory video by answering the following
                questions in 30 to 60 seconds
              </Typography>
              <ul>
                <li className="list-style">Tell us about yourself</li>
                <li className="list-style">
                  Why have you applied for this internship?
                </li>
                <li className="list-style">
                  Why do you want to work in this industry?
                </li>
              </ul>
            </div>

            <div className="sign-up-form-wrapper">
              <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                className="flex justify-center mt-10"
              >
 
                <Upload name="logo" action="/upload.do" listType="picture">
                  <div className="main-box-video">
                    <div className="secondary-box-div">
                      <div className="inner-box-video">
                       <Round/>
                      </div>
                    </div>
                  </div>
                </Upload>
              </Form.Item>
              <Row gutter={[10,10]}>
                <Col xs={24} md={24} lg={12} xl={8}>
                  <Button className="btn-cancel btn-cancel-verification"  >
                    Skip
                  </Button>
                </Col>
                <Col xs={24} md={24} lg={12} xl={16}>
                  <Form.Item>
                    <Button
                      onClick={() => {
                        navigate('/')
                      }}
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
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

export default Video;
