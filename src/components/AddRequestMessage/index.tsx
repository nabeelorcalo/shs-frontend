import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal, Input } from 'antd'
import UploadDocument from '../UploadDocument';

const { TextArea } = Input;

const AddRequestMessage = ({ title }: any) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <Button onClick={() => { setShow(!show) }}>Add Request Message</Button>
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
                    <div className="flex flex-col gap-2  my-6">
                        <p>Request Message</p>
                        <TextArea rows={6} placeholder="Type a message" maxLength={8} />
                    </div>

                </Modal>
            </div>
        </>
    )
}

export default AddRequestMessage