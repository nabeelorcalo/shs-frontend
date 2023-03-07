import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal, Input } from 'antd'



const CreateFolderModal = ({ title }: any) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => { setShow(!show) }}>Create New Folder Modal</Button>
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
              Create
            </Button>,
          ]}
        >
          <div className="my-8">
              <p>Create New Folder</p>
              <Input rows={4} placeholder="Enter Folder Name" maxLength={6} />

            </div>
        </Modal>
      </div>
    </>
  )
}

export default CreateFolderModal