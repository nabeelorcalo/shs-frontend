import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';


export const PopUpModal: React.FC = ({ title, width, state, setState, cancelBtntxt, okBtntxt, children }: any) => {
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

