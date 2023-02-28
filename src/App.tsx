import { Button, Space } from 'antd'
import { useState } from 'react';
import DateAndTimePicker from './components/DateAndTimePicker/DateAndTimePicker'
import Model from './components/ModalBox/model'
import { Input } from 'antd';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const App: React.FC = () => <Input placeholder="Enter Goal Name" />;

  return (
    <div className="p-10">
      <Button type="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
        Open Modal
      </Button>
      <Model title='Set a Goal' open={isModalOpen} setOpen={() => setIsModalOpen(!isModalOpen)}>
      <App />
      </Model>
      {/* <DateAndTimePicker /> */}
    </div>
  )
}

export default App
