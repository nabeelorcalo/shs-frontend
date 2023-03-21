import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal, Input,DatePicker } from 'antd'
const { TextArea } = Input;


const EditGoalTask = ({ title }: any) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <Button onClick={() => { setShow(!show) }}>Edit Goal Task</Button>
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
                    <div className="my-8">
                        <p>Task Name</p>
                        <Input.TextArea rows={4} placeholder="Select a step to start with tommorow" maxLength={6} />

                    </div>
                    <div className="my-8">
                        <p>Notes</p>
                        <TextArea rows={4} placeholder="Enter Folder Name" maxLength={6} />

                    </div>
                    <div className="my-8">
                        <p>When to Take This Step</p>
                        <DatePicker style={{width:'100%'}} onChange={() => { }} />
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default EditGoalTask