import React, { useState } from 'react'
import {Typography , Button}from 'antd'
import { PageHeader, PopUpModal } from '../../../components'
import { BlowWistle } from '../../../assets/images';
import BlowWhistleForm from './blowWhistleForm';
import './style.scss'

const { Text } = Typography;
const index = () => {
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  return (
    <div className='intern-grievance'>
    <div> 
      <PageHeader title="Grievances" actions
        bordered/>
      </div>
      <div className='flex items-center h-[75vh]'>
        <div className='mx-auto'>
        <div className="flex flex-col">
        <Text className="text-2xl title text-center"> Solve Your workplace problems by blowing a whistle. </Text>
        <div className='flex justify-center items-center my-4'><Button
            size="middle"
            onClick={() => {
              setShowBlowWhistleModal(!showBlowWhistleModal);
            }}
            className="flex gap-2 blow-whistle-button white-color teriary-bg-color"
          >
            <BlowWistle /> Blow a Whistle
          </Button></div>
          </div>
      </div>
      </div>
      <PopUpModal
        open={showBlowWhistleModal}
        title="Blow a Whistle"
        width={600}
        close={() => setShowBlowWhistleModal(false)}
        footer=""
      >
        <BlowWhistleForm setState={setShowBlowWhistleModal} />
      </PopUpModal>
      </div>
  )
}

export default index