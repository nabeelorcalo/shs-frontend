import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import AssesmentDragAndDrop from '../AssesmentDragAndDrop';
import DrawSignature from '../DrawSignature';
import TypeSignature from '../TypeSignature';

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
      children: <AssesmentDragAndDrop />,
    },
  ];

const AssesmentModal = ({ title }: any) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => { setShow(!show) }}>Assesment Upload, Sign</Button>
      <div>
        <Modal
          title={title}
          open={show}
          onCancel={() => { setShow(!show) }}
          width={600}
          maskClosable={false}
          closeIcon={<CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px' }} />}
          footer={[
            <Button onClick={() => { setShow(!show) }} key="Cancel" style={{ border: '1px solid #4a9d77', color: '#4a9d77', padding: '0px 20px' }}>
              Cancel
            </Button>,
            <Button onClick={() => { setShow(!show) }} key="submit" style={{ backgroundColor: '#4a9d77', color: '#fff', border: '1px solid #4a9d77', padding: '0px 20px' }}>
              Upload
            </Button>,
          ]}
        >
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Modal>
      </div>
    </>
  )
}

export default AssesmentModal