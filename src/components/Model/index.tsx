import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

interface IPOPUPMODAL {
  title:string
  width:number
  state:boolean
  setState:React.Dispatch<React.SetStateAction<boolean>>
  cancelBtntxt:string
  okBtntxt:string
  children:any


}


export const PopUpModal = ({ title, width, state, setState, cancelBtntxt, okBtntxt, children }: IPOPUPMODAL) => {
  // const [open, setOpen] = useState(showHide);

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
          <Button onClick={() => { setState(!state) }} key="Cancel" style={{ border: '1px solid #4a9d77', color: '#4a9d77', padding: '0px 20px' }}>
            {cancelBtntxt}
          </Button>,
          <Button onClick={() => { setState(!state) }} key="submit" style={{ backgroundColor: '#4a9d77', color: '#fff', border: '1px solid #4a9d77', padding: '0px 20px' }}>
            {okBtntxt}
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

