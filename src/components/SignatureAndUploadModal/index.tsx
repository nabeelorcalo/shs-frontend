import { useState } from 'react'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DragAndDropUpload from '../DragAndDropUpload';
import DrawSignature from '../DrawSignature';
import TypeSignature from '../TypeSignature';
import { PopUpModal } from '../Model';

const onChange = (key: string) => {
  console.log(key);
};

export const SignatureAndUploadModal = (props: any) => {
  const { state, closeFunc, width, okBtntxt, cancelBtntxt, title,
    okBtnFunc, footer, certificateDetails, setCertificateDetails } = props
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span className='text-secondary-color font-normal'>Draw</span>,
      children: <DrawSignature certificateDetails={certificateDetails} setCertificateDetails={setCertificateDetails} />,
    },
    {
      key: '2',
      label: <span className='text-secondary-color font-normal'>Type</span>,
      children: <TypeSignature certificateDetails={certificateDetails} setCertificateDetails={setCertificateDetails} />,
    },
    {
      key: '3',
      label: <span className='text-secondary-color font-normal'>Upload</span>,
      children: <DragAndDropUpload certificateDetails={certificateDetails} setCertificateDetails={setCertificateDetails} />,
    },
  ];
  return (<PopUpModal title={<span className='text-primary-color text-xl font-medium'>{title}</span>}
    open={state} close={closeFunc}
    wrapClassName='signature-modal'
    width={width}
    okBtntxt={okBtntxt}
    cancelBtntxt={cancelBtntxt}
    okBtnFunc={okBtnFunc}
    footer={footer}>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </PopUpModal>)
}

export default SignatureAndUploadModal