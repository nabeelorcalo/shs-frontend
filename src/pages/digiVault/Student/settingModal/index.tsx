import { useEffect } from "react";
import { SliderMarks } from "antd/es/slider";
import { SettingIcon } from "../../../../assets/images";
import { Button, Col, Modal, Row, Slider, Switch } from "antd";
import useCustomHook from "../../actionHandler";
import "./style.scss";

const SettingModal = (props: any) => {
  const { settingModal, setSettingModal, setIsModal } = props;
  const { getDigiVaultDashboard, studentVault }: any = useCustomHook();

  useEffect(() => {
    getDigiVaultDashboard(null)
  }, [])

  const resetHandler = () => {
    setIsModal(true);
    setSettingModal((prevState: any) => ({
      ...prevState,
      isToggle: false
    }))
  }

  const marks: SliderMarks = {
    0: <strong>1 min</strong>,
    25: <strong>5 min</strong>,
    50: <strong>30 min</strong>,
    75: <strong>1 hr</strong>,
    100: <strong>1 day</strong>
  };
  const sliderHandler = (value: number) => {
    setSettingModal((prevState: any) => ({
      ...prevState,
      lockTime: value
    }))
  };

  return (
    <>
      <Button onClick={() => setSettingModal((prevState: any) => ({ ...prevState, isToggle: true }))} className="setting-btn">
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
        onCancel={() => setSettingModal((prevState: any) => ({ ...prevState, isToggle: false }))}
      >
        <div className="modal-header flex justify-between pb-8">
          <div className="modal-title">Settings</div>
          <div
            onClick={() => setSettingModal((prevState: any) => ({ ...prevState, isToggle: false }))}
            className="modal-close flex justify-center items-center cursor-pointer"
          >x</div>
        </div>

        <div className="sub-title-modal mb-8">Security</div>
        <Row className="flex justify-between items-center">
          <Col>
            <div className="modal-p">
              Automatically lock application after
              <span className="secondary-color pl-2 font-medium text-base">
                {settingModal.lockTime} minutes
              </span>
            </div>
          </Col>

          <Col className="flex items-center justify-between text-teriary-color">
            <p className="pr-2">On</p>
            <Switch
              defaultChecked={studentVault?.lockResponse ? studentVault.lockResponse['isLock'] : false}
              onChange={(checked: any) => setSettingModal((prevState: any) => ({ ...prevState, isLock: checked }))} />
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
          <Slider
            tooltip={{ formatter: null }}
            marks={marks}
            min={0}
            max={1447}
            onChange={(e: any) => sliderHandler(e)}
            defaultValue={studentVault?.lockResponse ? studentVault.lockResponse['autoLockAfter'] : '0'}
          />
        </div>
        <div className="modal-reset-pass mt-14" onClick={resetHandler}>Reset Password</div>
      </Modal>
    </>
  );
};

export default SettingModal;
