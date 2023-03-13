import React, { useState } from 'react';
import { Button, FloatButton, Input, Modal } from 'antd';
import { DropDown } from '../../components';
import "./style.scss"
import { CloseCircleIcon } from '../../assets/images';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Reject
      </Button>
      <div className='Modal'>
        <Modal
      closeIcon={<img src={CloseCircleIcon} />}

        
        
        title="Reject" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={''} >
          <div className='title'><p>Template (optional)</p></div>
          <DropDown value={value} setValue={setValue} options={['Template 01', 'Template 02', 'Template 03']} name='Select' />
          <div className='title'><p>Subject</p></div>
          <Input placeholder='Enter subject' />
          <div className='title'><p>Reason</p></div>
          <textarea className='input' placeholder='Write your reason' />
          <div className='flex mt-3 justify-end gap-4'>
        <button className='cancel'>Cancel</button>
        <button className='reject'>Reject</button>
        </div>
        </Modal>
      </div>
    </>
  );
};

export default App;