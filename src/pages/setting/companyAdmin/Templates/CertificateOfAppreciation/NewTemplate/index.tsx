import React, { useState } from "react";
import {
  Divider,
  Button,
  Form,
  Row,
  Col,
  Space,
  Input,
  Typography,
} from "antd";
import ReactQuill, { Quill } from "react-quill";
import "quill/dist/quill.snow.css";
import { textEditorData } from "../../../../../../components/Setting/Common/TextEditsdata";
import {
  CertificateTickCircle,
  TemplateCertificateLarger,
  TemplateCertificateSmall,
} from "../../../../../../assets/images";
import { EyeFilled } from "@ant-design/icons/lib/icons";
import { Breadcrumb, PopUpModal,BoxWrapper } from "../../../../../../components";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography;
import "./style.scss";

const NewTemplateCertificationOfAppreciation = () => {
  const navigate = useNavigate();
  const breadcrumbArray = [
    { name: "New Template"},
    { name: "Setting"  },
    { name: "Template" , onClickNavigateTo:"/settings/template" },
    { name: "Certificate of Appreciation" , onClickNavigateTo:"/settings/template/certificate-of-appreciation" },
  ];
  const [value, setValue] = useState();
  const [borderColorfirst, setBorderColorfirst] = useState<any>({
    color: "white",
    toggle: false,
  });
  const [borderColorSecond, setBorderColorSecond] = useState<any>({
    color: "white",
    toggle: false,
  });
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [textEditorValue, setTextEditorValue] = useState();
  const onChangeHandler = (e: any) => {
    setTextEditorValue(e)
  }
  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const formData = {
      subject: values.subject,
      templateName: values.templateName,
      description: textEditorValue
    }
  };
  
  const FirstBorderHandler = () => {
    setBorderColorfirst({ color: "#3DC575", toggle: !borderColorfirst.toggle });
  };
  const SecondBorderHandler = () => {
    setBorderColorSecond({
      color: "#3DC575",
      toggle: !borderColorSecond.toggle,
    });
  };
  const NoBorderHandler = () => {
    setBorderColorfirst({ color: "#FFFFFF" });
  };
  const NoBorderHandler1 = () => {
    setBorderColorSecond({ color: "#FFFFFF" });
  };

  return (
    <div className="certificate-of-appreciation-new-template">
     <Breadcrumb breadCrumbData={breadcrumbArray} className="breadcrumb" />
      <Divider />
      <BoxWrapper>
        <Form layout="vertical" form={form}>
          {/*------------------------ Template----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Template
              </Title>
              <Paragraph>Enter template details</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                required={false}
                name="templateName"
                label="Template Name"
                rules={[{ required: true, message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
              <Form.Item
                required={false}
                name="subject"
                label="Subject"
                rules={[{ required: true, message: "Please Enter your username!" }]}  >
                <Input placeholder="Enter subject" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description (optional)"
              >
                <div className="text-input-bg-color rounded-lg text-editor my-2 ">
                  <ReactQuill theme="snow" value={textEditorValue} onChange={onChangeHandler} modules={textEditorData} />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          {/*------------------------ Select Design----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} xl={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Select Design
              </Title>
              <Paragraph>Select the design of the certificate</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={24} xl={12}>
              <Row gutter={[16, 16]}>
                <Col className="gutter relative" xs={24} xl={12}>
                  <BoxWrapper>
                  <div
                    style={{ border: `2px solid ${borderColorfirst.color}` }}
                    className="cursor-pointer certificate-card "
                  >
                    {borderColorfirst.toggle && (
                      <CertificateTickCircle className="absolute certificate-tick-circle" />
                    )}

                    <div className="card-image-box ">
                      <span className="flex justify-center p-5 image">
                        <TemplateCertificateSmall className=" background-img" />
                      </span>
                      <div
                        className="middle"
                        onClick={() => {
                          setShowEditModal(!showEditModal);
                        }}
                      >
                        <EyeFilled className="text" />
                      </div>
                    </div>
                    <Divider />
                    <p
                      className="text-center"
                      onClick={
                        borderColorfirst.toggle
                          ? NoBorderHandler
                          : FirstBorderHandler
                      }
                    >
                      Template 1
                    </p>
                  </div>
                  </BoxWrapper>
                </Col>
                <Col className="gutter relative" xs={24} xl={12}>
                <BoxWrapper>
                  <div
                    style={{ border: `2px solid ${borderColorSecond.color}` }}
                    className="cursor-pointer certificate-card "
                  >
                    {borderColorSecond.toggle && (
                      <CertificateTickCircle className="absolute certificate-tick-circle" />
                    )}
                    <div className="card-image-box ">
                      <span className="flex justify-center p-5 image">
                        <TemplateCertificateSmall className=" background-img" />
                      </span>
                      <div
                        className="middle"
                        onClick={() => {
                          setShowEditModal(!showEditModal);
                        }}
                      >
                        <EyeFilled className="text" />
                      </div>
                    </div>
                    <Divider />
                    <p
                      className="text-center"
                      onClick={
                        borderColorSecond.toggle
                          ? NoBorderHandler1
                          : SecondBorderHandler
                      }
                    >
                      Template 2
                    </p>
                  </div>
                  </BoxWrapper>
                </Col>
              </Row>
            </Col>
          </Row>
          <Space className="flex justify-end pt-5">
            <Button danger size="middle" type="primary" 
             onClick={()=>navigate("/settings/template/certificate-of-appreciation")}>
              Cencal
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
      <PopUpModal
        open={showEditModal}
        title="Preview"
        width={900}
        close={() => setShowEditModal(false)}
      >
        <TemplateCertificateLarger />
      </PopUpModal>
    </div>
  );
};

export default NewTemplateCertificationOfAppreciation;
