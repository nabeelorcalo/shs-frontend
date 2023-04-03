import React, { useState } from 'react'
import { DropDown, PageHeader } from '../../../components'
import { Row, Col, Typography, Button, Divider, Modal, Form, Input } from 'antd';
import '../style.scss';
import { bankInfo } from './withdrawalMock';
import { Edit } from '../../../assets/images';
import { CloseCircleFilled } from '@ant-design/icons';


const balance = '2000.00';

const LinkAccount = () => {
    const [addNew, setAddNew] = useState(false)
    const [value, setValue] = useState("");

    return (
        <div className='link-account'>
            <PageHeader title='Withdrawals' bordered={true} />
            <Row>
                <Col xxl={12} xl={12} lg={12} md={24} xs={24}>
                    <Typography
                        className='text-[#14142A] 
              text-xl font-semibold
              mt-4 mb-5'>
                        Current Balance : ${balance}
                    </Typography>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={24} xs={24} className='flex justify-end mb-2'>
                    <Button onClick={() => { setAddNew(true); }} className='teriary-light-bg-color white-color text-base font-semibold'>Add New</Button>
                </Col>
            </Row>
            <Row>
                <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
                    <div className='card-style'>
                        <Row>
                            <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
                                <Typography className='primary-color text-lg font-medium ml-3 mt-2'>Banks</Typography>
                            </Col>
                        </Row>
                        <Divider />

                        {bankInfo.map((item, index) => {
                            return (
                                <>
                                    <div className='details'>
                                        <div className='flex items-center gap-x-3'>
                                            <img src={item.img} alt="" />
                                            <div className='grid'>
                                                <Typography>{item.bankName}</Typography>
                                                <Typography>{item.account}</Typography>
                                            </div>
                                        </div>
                                        <div>
                                            <Edit onClick={() => {
                                                setAddNew(true)
                                            }}
                                            className='cursor-pointer'/>
                                        </div>
                                    </div>
                                </>
                            )
                        })}


                    </div>
                </Col>
            </Row>
            <Modal
                open={addNew}
                closeIcon={
                    <CloseCircleFilled className="text-[#A3AED0] text-xl" />
                }
                footer={[
                    <Button
                        key="Cancel"
                        className="teriary-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5"
                        onClick={() => {
                            setAddNew(false);
                        }}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        className="teriary-bg-color border-1 border-solid border-[#4a9d77] white-color pt-0 pb-0 pr-5 pl-5"
                        onClick={() => {
                            setAddNew(false);
                            
                        }}
                    >
                        Link Account
                    </Button>,
                ]}
            >
                <div>
                    <Form
                        layout='vertical'>
                        <Row gutter={[15,10]}>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item
                                    label='Choose Your Bank'
                                    name='bankName'>
                                    <DropDown
                                        name="Select Your Bank"
                                        value={value}
                                        options={["Natwest Group", "Hbl", "item 3"]}
                                        setValue={setValue}
                                    />
                                </Form.Item>

                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item  label='Account Number'
                                    name='accountNumber'>

                                <Input placeholder='Enter account Number' className='bg-[#e6f4f9]' />
                                </Form.Item>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Form.Item  label='Account Name'
                                    name='accountName'>

                                <Input placeholder='Enter account Name' className='bg-[#e6f4f9]' />
                                </Form.Item>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item  label='Routing Number'
                                    name='routingNumber'>

                                <Input placeholder='Enter Routing Number' className='bg-[#e6f4f9]'/>
                                </Form.Item>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item  label='Sort Code'
                                    name='sortCode'>

                                <Input placeholder='Enter sort code' className='bg-[#e6f4f9]'/>
                                </Form.Item>
                            </Col>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <Form.Item
                                    label='Account Type'
                                    name='accountType'>
                                    <DropDown
                                        name="Account Type"
                                        value={value}
                                        options={["Natwest Group", "Hbl", "item 3"]}
                                        setValue={setValue}
                                    />
                                </Form.Item>

                            </Col>
                        </Row>

                    </Form>
                </div>


            </Modal>
        </div>
    )
}

export default LinkAccount