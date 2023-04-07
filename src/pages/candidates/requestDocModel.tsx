import React, { useState } from 'react';
import { Modal } from 'antd';
import { DropDown } from '../../components';
import "./style.scss"
import { CloseCircleIcon } from '../../assets/images';
import { CheckBox } from '../../components/Checkbox';

const RequestDocModel = (props: any) => {
  const { open, setOpen, handleReject, } = props;
  const [value, setValue] = useState('');

  return (
    <div className='Modal'>
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Request Document"
        open={open}
        onCancel={() => setOpen(false)} footer={''} >

        <div className='title'><p>Document Type</p></div>
        <DropDown value={value} setValue={setValue} options={['Template 01', 'Template 02', 'Template 03']} name='Select' />
        <div className='title'><p>Description</p></div>
        <textarea className='input' placeholder='Describe your problem' />
        <div className="checkbox flex gap-3 mt-2 items-center">
          <CheckBox />
          <p>Send email to candidate </p>
        </div>
        <div className='flex mt-3 justify-end gap-4'>
          <button onClick={() => setOpen(false)} className='reqCancelBtn'>Cancel</button>
          <button onClick={handleReject} className='reqSubmitBtn'>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default RequestDocModel;