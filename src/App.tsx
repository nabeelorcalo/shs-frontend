import { Button, Col, Row, Space } from 'antd'
import { useState } from 'react';
import DateAndTimePicker from './components/DateAndTimePicker/DateAndTimePicker'
import Model from './components/ModalBox/model'
import { InputComp } from './components/Input/input';


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-10">
      <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
        Open Modal
      </Button>
      <Model title='Set a Goal' open={isModalOpen} setOpen={() => setIsModalOpen(!isModalOpen)} okText='Add'>
        <InputComp size='middle' label='Goal Name' />
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <DateAndTimePicker label='Start Date' size='large' />
          </Col>
          <Col lg={12}>
            <DateAndTimePicker label='End Date' size='large' />
          </Col>
        </Row>
      </Model>
    </div>
  )
}

export default App
