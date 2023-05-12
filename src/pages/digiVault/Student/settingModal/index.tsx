import { SettingIcon } from "../../../../assets/images";
import "./style.scss";
import { Button, Col, Modal, Row, Slider, Switch } from "antd";

const SettingModal = (props: any) => {
  const { settingModal, setSettingModal, setIsModal } = props;
  const resetHandler = () => {
    setIsModal(true);
    setSettingModal({ isToggle: false, isLock: false })
  }
  return (
    <>
      <Button onClick={() => setSettingModal({ isToggle: true, isLock: false })} className="setting-btn">
        <span className="setting-btn-text font-normal text-sm">
          Settings
        </span>
        <img src={SettingIcon} alt="settIcon" width={24} height={24} />
      </Button>
      <Modal
        className="setting-modal"
        centered
        open={settingModal.isToggle}
        footer={null}
        closable={false}
      >
        <div className="modal-header flex justify-between pb-8">
          <div className="modal-title">Settings</div>
          <div
            onClick={() => setSettingModal({ isToggle: false, isLock: true })}
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
              <span className="secondary-color pl-2 font-medium text-base">
                15 minutes
              </span>
            </div>
          </Col>

          <Col className="flex items-center justify-between text-teriary-color">
            <p className="pr-2">On</p>
            <Switch onChange={(checked: any) => setSettingModal({ isToggle: true, isLock: checked })} />
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
        <div className="modal-reset-pass" onClick={resetHandler}>Reset Password</div>
      </Modal>
    </>
  );
};

export default SettingModal;
