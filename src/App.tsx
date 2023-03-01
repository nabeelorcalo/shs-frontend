import { Button, Col, Row,Typography} from 'antd'
import { useState } from 'react';
import DateAndTimePicker from './components/DateAndTimePicker/DateAndTimePicker'
import Model from './components/ModalBox/model'
import { InputComp } from './components/Input/input';
import  "./App.scss"
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

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
          <Checkbox className='checkbox' onChange={onChange}>Mark as main goal</Checkbox>
        </Row>
      </Model>
      {/* <Button type='dashed' label='new' />
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
      </Typography.Title> */}
    </div>
  )
}

export default App
