import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import EmojiRating from '../EmojiRating'



const LeaveRequest = ({ title }: any) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => { setShow(!show) }}>Leave request form</Button>
      <div>
        <Modal
          title={title}
          open={show}
          onCancel={() => { setShow(!show) }}
          width={720}
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
          <div className="mt-8 mx-3">
            <div className="my-8">
              <div className="flex gap-3 font-bold">
                <p>Learning Objectives</p>
                <p>74%</p>
              </div>
              <div className="flex justify-between flex-wrap">
                <EmojiRating title="Works to full potential" />
                <EmojiRating title="Quaiity of work" />
                <EmojiRating title="Work consistency" />
                <EmojiRating title="Independency in work" />
                <EmojiRating title="Business skills" />
                <EmojiRating title="Technical skills" />
              </div>
            </div>
            <div className="my-8">
              <div className="flex gap-3 font-bold">
                <p>Disciplin</p>
                <p>61%</p>
              </div>
              <div className="flex justify-between flex-wrap">
                <EmojiRating title="Punctuality" />
                <EmojiRating title="Attendance" />
                <EmojiRating title="Coworker relationship" />
                <EmojiRating title="Team work" />
              </div>
            </div>
            <div className="my-8">
              <div className="flex gap-3 font-bold">
                <p>Personal</p>
                <p>91%</p>
              </div>
              <div className="flex justify-between flex-wrap">
                <EmojiRating title="Creativity" />
                <EmojiRating title="Honesty" />
                <EmojiRating title="Integrity" />
                <EmojiRating title="Communication skills" />
                <EmojiRating title="Task Initiatives" />
              </div>
            </div>
            <div className="my-8">
              <p className="font-bold">Comments</p>
              <p className="text-sm">
                He is dedicated to his work and has the potential to improve further. More experience with communication skills and confidence will groom further.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default LeaveRequest