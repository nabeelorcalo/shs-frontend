import React from 'react';
import { Button, Modal } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

export const PopUpModal: React.FC = (props: any) => {
  const { title, width, state, setState, cancelBtntxt, okBtntxt, children, okBtnFunc } = props
  return (
    <>
      <Modal
        centered
        title={title}
        open={state}
        onCancel={() => { setState(!state) }}
        width={width}
        maskClosable={true}
        closeIcon={<CloseCircleFilled className="text-[#A3AED0] text-[20px]" />}
        footer={[
          <Button
            onClick={() => { setState(!state) }}
            key="Cancel"
            className=""
            style={{
              border: '1px solid #4a9d77',
              color: '#4a9d77',
              padding: '0px 20px'
            }}
          >
            {cancelBtntxt}
          </Button>,
          <Button
            onClick={() => { okBtnFunc() }}
            key="submit"
            style={{
              backgroundColor: '#4a9d77',
              color: '#fff',
              border: '1px solid #4a9d77',
              padding: '0px 20px'
            }}
          >
            {okBtntxt}
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

