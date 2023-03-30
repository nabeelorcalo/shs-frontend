import { useState } from "react";
import { Select, Button, Col, Modal, Row } from "antd";
import {
  ArchiveFilledIcon,
  ArchiveIcon,
  EyeActionIcon,
} from "../../../../assets/images";
import { Input, TextArea } from "../../../../components";
import SelectComp from "../../../../components/Select/Select";
import Comments from "../Comments";
import "./style.scss";
const Options = Select;
const LogIssueModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchive, setIsArchive] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={showModal}>
        <EyeActionIcon />
      </div>
      <Modal
        title={
          <Row>
            <Col>
              <Row align="middle" className="gap-3">
                <div
                  className="cursor-pointer"
                  onClick={() => setIsArchive(!isArchive)}
                >
                  {isArchive ? <ArchiveFilledIcon /> : <ArchiveIcon />}
                </div>
                <p className="font-semibold text-[20px] leading-[28px] capitalize">
                  Attendance Log Issue
                </p>
              </Row>
            </Col>
            <Col></Col>
          </Row>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={1059}
      >
        <Row gutter={[20, 20]}>
          <Col xs={24} xxl={16}>
            <Row
              gutter={[30, 20]}
              style={{ maxHeight: 550, overflowY: "scroll" }}
              className="attendance-log-content"
            >
              <Col xs={24} xxl={12}>
                <Input
                  className="input"
                  disabled
                  handleChange={() => {}}
                  id=""
                  label="User"
                  name="user"
                  placeholder="placeholder"
                  size="large"
                  type="text"
                  value=""
                />
              </Col>
              <Col xs={24} xxl={12}>
                <Input
                  className="input"
                  disabled
                  handleChange={() => {}}
                  id=""
                  label="User Role"
                  name="userRole"
                  placeholder="placeholder"
                  size="large"
                  type="text"
                  value=""
                />
              </Col>
              <Col xs={24}>
                <SelectComp
                  className=""
                  label="Issue Type"
                  onChange={() => {}}
                  placeholder="Select"
                  popupClassName=""
                  value=""
                >
                  <Options value={"1"}>dfdf</Options>
                </SelectComp>
              </Col>
              <Col xs={24}>
                <SelectComp
                  className=""
                  label="Priority"
                  onChange={() => {}}
                  placeholder="Select"
                  popupClassName=""
                  value=""
                >
                  {["heigh", "medium", "low"]?.map((item) => (
                    <Options className="capitalize" value={item}>
                      {item}
                    </Options>
                  ))}
                </SelectComp>
              </Col>
              <Col xs={24}>
                <SelectComp
                  className=""
                  label="Assign"
                  onChange={() => {}}
                  placeholder="Select"
                  popupClassName=""
                  value=""
                >
                  <Options value={"1"}>dfdf</Options>
                </SelectComp>
              </Col>
              <Col xs={24}>
                <Row gutter={16}>
                  <Col xs={24} xxl={8}>
                    <Input
                      className="input"
                      disabled
                      handleChange={() => {}}
                      id=""
                      label="Log Time"
                      name="hours"
                      placeholder="Hours"
                      size="large"
                      type="text"
                      value=""
                    />
                  </Col>
                  <Col xs={24} xxl={8}>
                    <Input
                      className="input"
                      disabled
                      handleChange={() => {}}
                      id=""
                      label="User"
                      name="minutes"
                      placeholder="Minutes"
                      size="large"
                      type="text"
                      value=""
                    />
                  </Col>
                  <Col xs={24} xxl={8}>
                    <Input
                      className="input"
                      disabled
                      handleChange={() => {}}
                      id=""
                      label="User"
                      name="seconds"
                      placeholder="Seconds"
                      size="large"
                      type="text"
                      value=""
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={24}>
                <Row gutter={16}>
                  <Col xs={24} xxl={12}>
                    <Input
                      className="input"
                      disabled
                      handleChange={() => {}}
                      id=""
                      label="Date"
                      name="hours"
                      placeholder="placeholder"
                      size="large"
                      type="text"
                      value=""
                    />
                  </Col>
                  <Col xs={24} xxl={12}>
                    <Input
                      className="input"
                      disabled
                      handleChange={() => {}}
                      id=""
                      label="Date"
                      name="minutes"
                      placeholder="placeholder"
                      size="large"
                      type="text"
                      value=""
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={24}>
                <TextArea
                  rows={5}
                  placeholder="Describe your problem"
                  maxLength={"100%"}
                  disabled
                />
              </Col>
              <Col xs={24}>
                <label>Attachment (Optional)</label>
                <Row gutter={[20, 20]} className="pt-3">
                  {["", "", ""]?.map((img) => (
                    <Col xs={24} xxl={12}>
                      <img
                        className="w-full"
                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
                        alt="sdf"
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <Col xs={24} className="pt-8">
              <Row justify="end" gutter={20}>
                <Col>
                  <Button>cancel</Button>
                </Col>
                <Col>
                  <Button className="teriary-bg-color text-white capitalize font-semibold	text-base">
                    save
                  </Button>
                </Col>
              </Row>
            </Col>
          </Col>
          <Col xs={24} xxl={8}>
            <Comments />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default LogIssueModal;
