import { Col, Modal, Row, Slider, Switch } from "antd";
import "./settingModal.scss";

const SettingModal = (props: any) => {
  const { modal2Open, setModal2Open } = props;
  return (
    <Modal
      className="setting-modal"
      centered
      open={modal2Open}
      footer={null}
      closable={false}
    >
      <div className="modal-header flex justify-between pb-8">
        <div className="modal-title">Settings</div>
        <div
          onClick={() => setModal2Open(false)}
          className="modal-close flex justify-center items-center cursor-pointer"
        >
          x
        </div>
      </div>
      <div className="sub-title-modal mb-8">Security</div>
      <Row className="flex justify-between items-center">
        <Col>
          <div className="modal-p">
            Automatically lock application after
            <span
              style={{
                color: "#E95060",
                fontSize: "16px",
                fontWeight: "500",
                paddingLeft: "5px",
              }}
            >
              15 minutes
            </span>
          </div>
        </Col>
        <Col className="flex items-center justify-between ">
          <p style={{ color: "#6E7191" }} className="pr-2">
            On
          </p>
          <Switch />
        </Col>
      </Row>
      <div className="modal-body mt-8">
        <div className="flex justify-between">
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
        </div>
        <Slider tooltip={{ formatter: null }} />
        <div className="flex justify-between mb-8 mt-6">
          <p>1 min</p>
          <p>5 min</p>
          <p>30 min</p>
          <p>1hr</p>
          <p>1 day</p>
        </div>
      </div>
      <div className="modal-reset-pass">Reset Password</div>
    </Modal>
  );
};

export default SettingModal;
