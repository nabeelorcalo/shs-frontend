import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal, Input, DatePicker, Checkbox  } from 'antd'
import UploadDocument from '../UploadDocument';

const { TextArea } = Input;

const SetaGoal = ({ title }: any) => {
    const [show, setShow] = useState(false)

    return (
        <>
            <Button onClick={() => { setShow(!show) }}>Set a Goal</Button>
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
                            ADD
                        </Button>,
                    ]}
                >

                    <div className="flex flex-col gap-3 my-8">
                        <p>Goal Name</p>
                        <Input.TextArea rows={4} placeholder="Enter Goal Name" maxLength={6} />

                    </div>
                    <div className="my-2 flex flex-row gap-3">
                        <div className=" flex flex-col gap-2  w-1/2">
                            <p>Start Date</p>
                            <DatePicker onChange={() => { }} />
                        </div>
                        <div className=" flex flex-col gap-2  w-1/2">
                            <p>End Date</p>
                            <DatePicker onChange={() => { }} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2  my-6">
                    <Checkbox onChange={()=>{}}>Mark as Main Goal</Checkbox>
                    </div>

                </Modal>
            </div>
        </>
    )
}

export default SetaGoal