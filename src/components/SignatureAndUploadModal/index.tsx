import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DragAndDropUpload from '../DragAndDropUpload';
import DrawSignature from '../DrawSignature';
import TypeSignature from '../TypeSignature';
import { PopUpModal } from '../Model';

const onChange = (key: string) => {
  console.log(key);
};
const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Draw`,
    children: <DrawSignature />,
  },
  {
    key: '2',
    label: `Type`,
    children: <TypeSignature />,
  },
  {
    key: '3',
    label: `Upload`,
    children: <DragAndDropUpload />,
  },
];
const SignatureAndUploadModal = (props: any) => {
  const { state, setState, width, okBtntxt, cancelBtntxt, title, okBtnFunc } = props
  return (
    <>
      <Button onClick={() => { setState(!state) }}>Signature & upload</Button>
      <div>
        <PopUpModal
          title={title}
          state={state}
          setState={setState}
          width={width}
          okBtntxt={okBtntxt}
          cancelBtntxt={cancelBtntxt}
          okBtnFunc={okBtnFunc}
        >
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </PopUpModal>
      </div>
    </>
  )
}

export default SignatureAndUploadModal