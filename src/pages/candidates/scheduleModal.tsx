import React, { useState } from 'react';
import { Modal, TimePicker } from 'antd';
import "./style.scss"
import { ArrowDownDark, CloseCircleIcon, UserAvatar } from '../../assets/images';
import { CommonDatePicker,  SearchBar } from '../../components';
import DropDownNew from '../../components/Dropdown/DropDownNew';
import { CheckBox } from '../../components/Checkbox';

const RequestDocModel = (props: any) => {

  const { open, setOpen, handleReject, } = props;
  const [user, setUser] = useState({ userName: 'Select' });
  const [isOpenDate, setIsOpenDate] = useState(false);
  const [dateTimeVal, setDateTimeVal] = useState('');

  const userData = [
    {
      userImg: UserAvatar,
      userName: 'john doe'
    },
    {
      userImg: UserAvatar,
      userName: 'mina marino'
    },
    {
      userImg: UserAvatar,
      userName: 'clark'
    },
    {
      userImg: UserAvatar,
      userName: 'sarah joe'
    },
  ]
  return (
    <div className='Modal'>
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Schedule Interview"
        open={open}
        onCancel={() => setOpen(false)} footer={''} >

        <div className='title'><p>Date</p></div>
        <div className='dateAndTime'>

          <CommonDatePicker open={isOpenDate}
            name={'Date Picker'}
            setOpen={setIsOpenDate}
            setValue={setDateTimeVal}
          />
        </div>

        <div className='asignee-wrapper mt-7'>
          <div className="heading mb-2">
            <p>Attendees</p>
          </div>
          <DropDownNew
            items={[
              { label: <SearchBar handleChange={() => { }} />, key: 'search' },
              {
                label: <div>{userData.map((users: any) => (
                  <div className="flex items-center gap-3 mb-[20px]"
                    onClick={() => setUser(users)}
                  >
                    <img src={users.userImg}
                      className='h-[24px] w-[24px] rounded-full object-cover'
                    />
                    <p>{users.userName}</p>
                  </div>))}
                </div>,
                key: 'users'
              }]}>

            <div className="drop-down-with-imgs flex items-center gap-3">
              <div className="flex items-center gap-3 mr-[40px]">
                <p>{user.userName}</p>
              </div>
              <ArrowDownDark />
            </div>
          </DropDownNew>

          <div className="time-pick-wrapper flex flex-wrap justify-between mt-5">
            <div className="time-from">
              <div className="heading mt-2 mb-3">Time From</div>
              <TimePicker className='time-p' />
            </div>
            <div className="time-to">
              <div className="heading mt-2 mb-3">Time To</div>
              <TimePicker className='time-p' />
            </div>
          </div>


          <div className="location-wrapper">
            <p className='heading mt-7 '>Location</p>
            <div className="location flex mt-3 items-center gap-8">
              <div className="Virtual flex gap-2 justify-center items-center">
                <CheckBox />
                <p>Virtual</p>
              </div>
              <div className="Virtual flex gap-2 justify-center items-center">
                <CheckBox />
                <p>On Site</p>
              </div>
            </div>
          </div>
          <div className='title'><p>Description</p></div>
          <textarea className='input' placeholder='Describe your problem' />


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