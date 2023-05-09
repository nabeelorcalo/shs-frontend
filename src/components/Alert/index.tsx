import React from "react";
import { Button, Modal } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { AlertIcon, SuccessIcon, WarningIcon } from "../../assets/images";
import "./style.scss"
import '../../scss/global-color/Global-colors.scss'
import { STATUS_CONSTANTS } from "../../config/constants";

const { ERROR, SUCCESS, WARNING } = STATUS_CONSTANTS
interface Props {
  title?: string;
  type?: any;
  width?: any;
  state?: any;
  setState?: any;
  icon?: any;
  cancelBtntxt?: string;
  okBtntxt?: string;
  okBtnFunc?: any
  children?: any,
  open?: any,
  footer?: any,
}

export const Alert: any = (props: Props) => {
  const { title, type, width, state, setState, icon, cancelBtntxt, okBtntxt, okBtnFunc, children, footer } = props;
  const okBtnHandler = () => {
    okBtnFunc(type);
    setState(!state)
  }
  return (
    <>
      <Modal
        centered
        title={title}
        open={state}
        onCancel={() => { setState(!state) }}
        width={width}
        maskClosable={true}
        closeIcon={
          <CloseCircleFilled
            className="text-primary-disabled-color text-[20px]"
          />}
        footer={footer ? footer : [
          <Button
            onClick={() => { setState(!state) }}
            key="Cancel"
            className={
              type === ERROR ? "button-default-error"
                :
                type === SUCCESS ? "button-default-tertiary"
                  :
                  type === WARNING ? "button-default-warning"
                    :
                    "white-bg-color teriary-color"
            }
          >
            {cancelBtntxt}
          </Button>,
          <Button
            onClick={okBtnHandler}
            key="submit"
            className={
              type === ERROR ? "button-error"
                :
                type === SUCCESS ? "button-tertiary"
                  :
                  type === WARNING ? "button-warning"
                    :
                    "teriary-bg-color white-color"
            }
          >
            {okBtntxt}
          </Button>,
        ]}
      >
        <div className='h-[10rem] flex flex-col justify-center gap-3'>
          <div className='flex flex-row items-center gap-3'>
            <div>{type === "error" ? <AlertIcon /> : type === "success" ? <SuccessIcon /> : type === "warning" ? <WarningIcon /> : null}</div>
            <div>{type === "error" ? <h2>Alert</h2> : type === "success" ? <h2>Success</h2> : type === "warning" ? <h2>Warning</h2> : null}</div>
          </div>
          {children}
        </div>
      </Modal>
    </>
  )
};