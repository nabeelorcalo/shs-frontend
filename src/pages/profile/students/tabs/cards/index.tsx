import { Button, Divider, Modal, Switch, Typography } from 'antd';
import {  Col, Form, Input, Row } from 'antd'
import React from 'react'
import '../Tabs.scss';
import upload from '../../../../../assets/images/profile/student/upload.svg';
import { cardArr } from './cardMock';
import {useState} from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { CommonDatePicker } from '../../../../../components';

const CardTabs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='card-tabs'> 
         
    <div className='flex justify-end md:justify-center"'>
        <Button className='upload-button flex items-center justify-between' onClick={() => {
          setIsOpen(true);
        }}><img src={upload} alt="" /> Add Card</Button>
      </div>
      {cardArr.map((item, index) => {
              return (
                  <>
               
                     <div className='animate'  >
                          <div className='flex justify-between'>
                      <div className='flex items-center'>
                        
                        <img src={item.img} alt="" />
                        <div className='ml-2'>

                              <Typography>{item.name}</Typography>
                          <Typography>Exp. date: {item.expDate}</Typography>
                        </div>
                              </div>
                        
                          
                     
                          <div className='flex justify-end'>
                          <div style={{background:"#FFFFFF", borderRadius:"8px", height:"48px", width:"48px"}}>
                                          <img src={upload} alt="" style={{display:"flex", justifyContent:"center", alignItems:"center",margin:"auto",paddingTop:"15px"}} />
                                      </div>
                              
                      </div>
                      </div>
             
         </div>
             <Divider/>
          
             
              </>)
      })}
          <Modal
        open={isOpen}
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
              color: "#4a9d77",
              padding: "0px 20px",
            }}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            style={{
              backgroundColor: "#4a9d77",
              border: "1px solid #4a9d77",
              color: "#fff",
              padding: "0px 20px",
            }}
          >
            Submit
          </Button>,
        ]}
        title="Add Card"
      >
         <Form
              layout='vertical'
    name="basic"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
          >
              <Row>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Form.Item 
      label="Card Number"
      name="cardNumber"
      rules={[{ required: true, message: 'Please input your Cars Number!' }]}
    >
                          <Input className='input-style'  />
    </Form.Item>
                  </Col>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                 
                       <Form.Item
      label="Card Holder"
      name="dob"
      rules={[{ required: true, message: 'Enter Name!' }]}
    >
      <Input className='input-style'  />
    </Form.Item>
   
                  </Col>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                 
                       <Form.Item
      label="Expiration Date"
      name="companyname"
      rules={[{ required: true, message: 'Please input your Company Name!' }]}
    >
       <CommonDatePicker/>
    </Form.Item>
   
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Switch />
            </Col>
              </Row>
    

    

   
   
          </Form>
      </Modal>
</div>
  )
}

export default CardTabs