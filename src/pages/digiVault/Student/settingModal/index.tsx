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
    getDigiVaultDashboard()
  }, [])

  const resetHandler = () => {
    setIsModal(true);
    setSettingModal((prevState: any) => ({
      ...prevState,
      isToggle: false
    }))
  }
  const marks = {
    1: <strong>1 min</strong>,
    305: <strong>5 min</strong>,
    730: <strong>30 min</strong>,
    1060: <strong>1 hr</strong>,
    1440: <strong>1 day</strong>
  };
  const sliderHandler = (value: number) => {
    setSettingModal((prevState: any) => ({
      ...prevState,
      lockTime: value
    }))
  };
  console.log(settingModal.lockTime);

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
        width={647}
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
                {settingModal?.lockTime ? settingModal?.lockTime === 1440 ? '1440' : String(settingModal?.lockTime).slice(-2) : 5} minutes
              </span>
            </div>
          </Col>

          <Col className="flex items-center justify-between text-teriary-color">
            <p className="pr-2">On</p>
            <Switch
              defaultChecked={settingModal?.isLock}
              checked={settingModal.isLock}
              onChange={(checked: any) => setSettingModal((prevState: any) => ({ ...prevState, isLock: checked }))}
            />
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
            min={0}
            max={1440}
            step={null}
            defaultValue={305}
            marks={marks}
            onChange={(e: any) => sliderHandler(e)}
          />
        </div>
        <div className="modal-reset-pass mt-14" onClick={resetHandler}>Reset Password</div>
      </Modal>
    </>
  );
};

export default SettingModal;
