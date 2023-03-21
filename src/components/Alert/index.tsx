import React from "react";
import { Button, Modal } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { AlertIcon } from "../../assets/images";
import { SuccessIcon } from "../../assets/images";
import { WarningIcon } from "../../assets/images";
import "./style.scss"
import { STATUS_CONSTANTS } from "../../config/constants";

const { ERROR, SUCCESS, WARNING } = STATUS_CONSTANTS
interface Props {
    title?: string;
    type?: string;
    width?: any;
    state?: any;
    setState?: any;
    icon?: any;
    cancelBtntxt?: string;
    okBtntxt?: string;
    okBtnFunc?:any
    children?: any,
    open?: any,
}

export const Alert: React.FC = (props: Props) => {
    const { title, type, width, state, setState, icon, cancelBtntxt, okBtntxt, okBtnFunc, children = '' } = props
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
                        className="text-[#A3AED0] text-[20px]"
                    />}
                footer={[
                    <Button
                        onClick={() => { setState(!state) }}
                        key="Cancel"
                        className={
                            type === ERROR ? "border-[#D83A52] text-[#D83A52]"
                                :
                                type === SUCCESS ? "border-[#4A9D77] text-[#4A9D77]"
                                    :
                                    type === WARNING ? "border-[#FFC15D] text-[#FFC15D]"
                                        :
                                        "border-[#4A9D77] text-[#4A9D77]"
                        }
                    >
                        {cancelBtntxt}
                    </Button>,
                    <Button
                        onClick={() => { okBtnFunc(type) }}
                        key="submit"
                        className={
                            type === ERROR ? "bg-[#D83A52] text-[#fff]"
                                :
                                type === SUCCESS ? "bg-[#4A9D77] text-[#fff]"
                                    :
                                    type === WARNING ? "bg-[#FFC15D] text-[#fff]"
                                        :
                                        "bg-[#4A9D77] text-[#4A9D77]"
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
