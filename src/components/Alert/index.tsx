import React, { useState } from "react";
import { Button, Modal } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { AlertIcon } from "../../assets/images";
import { SuccessIcon } from "../../assets/images";
import { WarningIcon } from "../../assets/images";

export const Alert: React.FC = ({ title, type, width, state, setState, icon, cancelBtntxt, okBtntxt, children }: any) => {

    const alertColor = type === "error" ? "#D83A52" : type === "success" ? "#4A9D77" : type === "warning" ? "#FFC15D" : "black"
    return (
        <>
            <Modal
                centered
                title={title}
                open={state}
                onCancel={() => { setState(!state) }}
                width={width}
                maskClosable={true}
                closeIcon={<CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px' }} />}
                footer={[
                    <Button onClick={() => { setState(!state) }} key="Cancel" style={{ border: `1px solid ${alertColor}`, color: alertColor, padding: '0px 20px' }}>
                        {cancelBtntxt}
                    </Button>,
                    <Button onClick={() => { setState(!state) }} key="submit" style={{ backgroundColor: alertColor, color: '#fff', border: `1px solid ${alertColor}`, padding: '0px 20px' }}>
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
            </>)
  
 
};
