import { Space } from 'antd'
import { Button } from './components'

function App() {

  return (
    <div className="p-10">
      <Space>
        <Button type='dashed' label='new' />
        <Button type='primary' label='stuff' />
      </Space>
    </div>
  )
}

export default App
