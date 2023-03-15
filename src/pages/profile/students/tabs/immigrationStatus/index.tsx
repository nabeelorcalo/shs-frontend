import { Button, Col, Form, Input, Modal, Radio, RadioChangeEvent, Row, Space, Typography } from 'antd'
import React, { useState } from 'react'
import tick from '../../../../../assets/images/profile/student/Tick.svg'
import cross from '../../../../../assets/images/profile/student/close-circle.svg'
import '../Tabs.scss';
import { PopUpModal } from '../../../../../components';
import { CloseCircleFilled } from '@ant-design/icons';
import ImmigrationStatusForm from './ImmigrationStatusForm';
const ImmigrationStatus = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);


    const showModal = () => {
        setIsOpen(true)
    }
    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };

  return (
      <div className='immigration-status'>
          <div>
              
              <Typography className='title'>Check a Job applicant’s right to work</Typography>
          </div>
              
          <Row gutter={20}>
              <Col xxl={6} xl={6} lg={6} md={8} sm={12} xs={24}>
                  <div className='status-card'>
                      <center onClick={showModal}>
                          <div  > 
                              
                          <img src={tick} alt="" />
                          </div>
                          <Typography>Have share code!</Typography>
                      </center>
              </div>
              </Col>
              <Col xxl={6} xl={6} lg={6} md={8} sm={12} xs={24}>
                  <div className='status-card'>
                      <center onClick={() => {
                          setIsOpen1(true
                          )
                      }}>
                          <img src={cross} alt="" />
                          <Typography>Have share code!</Typography>
                      </center>
              </div>
              </Col>
          </Row>
          
          <Modal
              open={isOpen}
  closeIcon={<CloseCircleFilled style={{color: '#A3AED0', fontSize: '20px'}} />}
  footer={[
    <Button key="Cancel" style={{border: '1px solid #4a9d77', color: '#4a9d77', padding: '0px 20px'}} 
    onClick={() => setIsOpen(false)}>Cancel</Button>,
    <Button key="submit"  style={{backgroundColor: '#4a9d77', border: '1px solid #4a9d77', color: '#fff', padding: '0px 20px'}}>Submit</Button>
  ]}
  title="What is the share code?"
  width={720}
          >
       <ImmigrationStatusForm/>
          </Modal>
          
          <Modal
              open={isOpen1}
  closeIcon={<CloseCircleFilled style={{color: '#A3AED0', fontSize: '20px'}} />}
  footer={[
    <Button key="Cancel" style={{border: '1px solid #4a9d77', color: '#4a9d77', padding: '0px 20px'}} 
    onClick={() => setIsOpen1(false)}>Cancel</Button>,
    <Button key="submit"  style={{backgroundColor: '#4a9d77', border: '1px solid #4a9d77', color: '#fff', padding: '0px 20px'}}>Submit</Button>
  ]}
  title="Tell us about Immigration Status"
  width={720}
          >
      <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>I have a Uk Visa and immigration account</Radio>
        <Radio value={2}>I have a status uner Eu settelment schem</Radio>
        <Radio value={3}>I have biometric residence card or permit</Radio>
        <Radio value={4}>
          More...
          {value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>
      </Space>
    </Radio.Group>
</Modal>
      </div>
  )
}

export default ImmigrationStatus