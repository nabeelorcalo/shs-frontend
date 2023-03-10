import { useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import EmojiRating from '../EmojiRating'
import { Emoji1st, Emoji2nd, Emoji3rd, Emoji4th } from '../../assets/images'

const desc = [
  {
    title: 'Unsatisfactory',
    comp: <Emoji1st />
  },
  {
    title: 'Still Learning',
    comp: <Emoji2nd />
  },
  {
    title: 'Meeting Expectations',
    comp: <Emoji3rd />
  },
  {
    title: 'Exceeding Expectations',
    comp: <Emoji4th />
  },
];

const EmojiEvaluation = ({ title }: any) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => { setShow(!show) }}>Emoji evaluation form</Button>
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
            <div className="flex gap-3">
              {
                desc.map((item, idx) => {
                  return (
                    <p className="flex gap-2 text-sm items-center">{item.comp}<span>{item.title}</span></p>
                  )
                })
              }
            </div>
            <div className="my-8">
              <div className="flex gap-3 font-bold">
                <p>Learning Objectives</p>
                <p>74%</p>

              </div>
              <div className="flex justify-between flex-wrap py-3">
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
              <div className="flex justify-between flex-wrap py-3">
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
              <div className="flex justify-between flex-wrap py-3">
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

export default EmojiEvaluation