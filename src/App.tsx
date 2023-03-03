import { Button, Col, Row } from 'antd'
import { useState } from 'react';
import Model from './components/ModalBox/model'
import "./App.scss"
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import HiringPipeline from './components/HiringPIpeline/hiringPipeline';
import Widgets, { array } from './components/DocumentsWidgets/widgets';


const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

const [isModalOpen, setIsModalOpen] = useState(false);
const [openPicker, setOpenPicker] = useState(false);
const [openPicker2, setOpenPicker2] = useState(false);

function App() {

  return (
    <div className="p-10">
      <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
        Open Modal
      </Button>
      <Model title='Set a Goal' open={isModalOpen} setOpen={() => setIsModalOpen(!isModalOpen)} okText='Add'>
        <Row gutter={20}>
          <Col span={24} className='mt-[25px]'>
            {/* <Input className='mt-[25px]' label='Goal Name' handleChange={(e: any) => console.log(e.target.value)} /> */}
          </Col>
          {/* <Col span={12} className='mt-[25px]'>
            <CommonDatePicker
              label='Start Date'
              open={openPicker}
              placement={'bottomLeft'}
              setOpen={setOpenPicker}
              setValue={(val: string) => console.log(val)}
            />
          </Col>
          <Col span={12} className='mt-[25px]'>
            <CommonDatePicker
              label='End Date'
              open={openPicker2}
              placement={'bottomRight'}
              setOpen={setOpenPicker2}
              setValue={(val: string) => console.log(val)}
            />

          </Col> */}
        </Row>
        <Checkbox className='checkbox mt-[25px]' onChange={onChange}><span style={{ color: '#6E7191' }}>Mark as main goal</span></Checkbox>
      </Model>
      {/* <Button type='dashed' label='new' />
      <Button type='primary' label='stuff' />
      <br />
      <Typography.Title level={1}>
        I'm h1
      </Typography.Title>


        <div className="p-10">
          <Button type='dashed' label='new' />
          <Button type='primary' label='stuff' />
          <br />
          <Typography.Title level={1}>
            I'm h1
          </Typography.Title>

          <br />

      <Typography.Title level={3}>
        I'm h3
      </Typography.Title> */}
      <HiringPipeline />
      <Widgets data={array} />
    </div>
  )
}

export default App
