import { CloseCircleFilled } from '@ant-design/icons'
import { Modal, Typography } from 'antd'
import { useState } from 'react'
import { Button } from './components'
import { EmojiEvaluation } from './components'

function App() {
  const [openModal, setOpenModal] = useState(false)
  console.log(openModal)
  return (
    <div className="p-10">
      <Button type='dashed' label='new' />
      <Button type='primary' label='stuff' />
      <br />
      <Typography.Title level={1}>
        I'm h1
      </Typography.Title>

      <br />

      <Typography.Title level={2}>
        I'm h2
      </Typography.Title>

      <br />

      <Typography.Title level={3}>
        I'm h3
      </Typography.Title>
      <EmojiEvaluation state={openModal} />
    </div>
  )
}

export default App
