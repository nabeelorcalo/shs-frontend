import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import UploadDocument from '../UploadDocument';



const MyProfileDocUpload = ({ title }: any) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => { setShow(!show) }}>Upload Doc my profile</Button>
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
              Submit
            </Button>,
          ]}
        >
          <UploadDocument />
        </Modal>
      </div>
    </>
  )
}

export default MyProfileDocUpload