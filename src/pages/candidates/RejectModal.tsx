import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { DropDown } from '../../components';
import "./style.scss"
import { CloseCircleIcon } from '../../assets/images';

const RejectModal = (props: any) => {
  const { open, setOpen, handleReject, } = props;
  const [value, setValue] = useState('');

  return (
    <div className='Modal'>
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Reject"
        open={open}
        onCancel={() => setOpen(false)} footer={''} >

        <div className='title'><p>Template (optional)</p></div>
        <DropDown value={value} setValue={setValue} options={['Template 01', 'Template 02', 'Template 03']} name='Select' />
        <div className='title'><p>Subject</p></div>
        <Input placeholder='Enter subject' />
        <div className='title'><p>Reason</p></div>
        <textarea className='input' placeholder='Write your reason' />
        <div className='flex mt-3 justify-end gap-4'>
          <button onClick={() => setOpen(false)} className='cancel'>Cancel</button>
          <button onClick={handleReject} className='reject'>Reject</button>
        </div>
      </Modal>
    </div>
  );
};

export default RejectModal;