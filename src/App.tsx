import { Button, Col, Row } from 'antd'
import { useState } from 'react';
import Model from './components/ModalBox/model'
import "./App.scss"
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import HiringPipeline from './components/HiringPIpeline/hiringPipeline';
import Widgets, { array } from './components/DocumentsWidgets/widgets';
import GoalModal from './components/ModalBox/GoalModal/GoalModal';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <Button type="primary" onClick={() => setOpen(!open)}>
        Open Modal
      </Button>

      <GoalModal open={open} setOpen={() => setOpen(!open)}/>
      <HiringPipeline />
      <Widgets data={array} />
    </div>
  )
}

export default App
