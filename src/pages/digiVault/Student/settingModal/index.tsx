import { useState } from "react";
import { SettingIcon } from "../../../../assets/images";
import { Button, Col, Modal, Row, Slider, Switch } from "antd";
import useCustomHook from "../../actionHandler";
import "./style.scss";
import ResetPasswordModal from "../newPasswordModal/resetPasswordModal";

const SettingModal = (props: any) => {
  const { settingModal, setSettingModal } = props;
  const [resetModal, setResetModal] = useState<any>(false)
  const { postDigivaultPassword }: any = useCustomHook();

  const marks = {
    1: <strong>1 min</strong>,
    305: <strong>5 min</strong>,
    730: <strong>30 min</strong>,
    1060: <strong>1 hr</strong>,
    1440: <strong>1 day</strong>
  };

  const resetHandler = () => {
    setSettingModal((prevState: any) => ({
      ...prevState,
      isToggle: false
    }))
    setResetModal(true)
  }

  const sliderHandler = (value: number) => {
    setSettingModal((prevState: any) => ({
      ...prevState,
      lockTime: value
    }))
  };

  const handleSettingModal = () => {
    const values = {
      isLock: settingModal.isLock,
      lockTime: String(settingModal?.lockTime === 1440 ? '1440' : String(settingModal?.lockTime).slice(-2))
    }
    setSettingModal((prevState: any) => ({ ...prevState, isToggle: false }))
    postDigivaultPassword(values)
  }

  const defualtTime: any = (time: any) => {
    switch (time) {
      case '1': return 1
      case '05': return 305;
      case '30': return 730;
      case '60': return 1060
      case '1440': return 1440
    }
  }

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
        onCancel={handleSettingModal}
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
                {settingModal?.lockTime ?
                  settingModal?.lockTime === 1440 ?
                    '1440'
                    :
                    String(settingModal?.lockTime).slice(-2)
                  :
                  settingModal?.lockTime} minutes
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
            defaultValue={defualtTime(settingModal.lockTime)}
            marks={marks}
            onChange={(e: any) => sliderHandler(e)}
          />
        </div>
        <div className="modal-reset-pass mt-14" onClick={resetHandler}>Reset Password</div>
      </Modal>
      <ResetPasswordModal
        isModal={resetModal}
        setIsModal={setResetModal}
      />
    </>
  );
};

export default SettingModal;
