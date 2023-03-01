import { Space, Typography } from 'antd'
import { Button } from './components'
import Table from './components/Alert/Noman/Table'
const App = () => {
  return (
    <div className="p-10">
      <Table/>


      <Button type='dashed' label='new' />
      <Button type='primary' label='stuff' />
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
    </div>
  )
}

export default App
