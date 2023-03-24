import React, { useState } from 'react'
import '../../../styles.scss';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import { BackButton, SHSLogo } from '../../../../../assets/images';
import { CommonDatePicker, DropDown } from '../../../../../components';

const OwnerVerification = (props:any) => {
    const { currentStep, setCurrentStep } = props;
    const [value, setValue] = useState<string>();
    const [searchValue, setSearchValue] = useState("");
    return (
        <div className='about-buisness'>
            <Row className='about-buisness-style'>
                <Col xxl={8} xl={8} lg={14} md={18} sm={24} xs={24}>
                    <div className="logo-wrapper">
                        <SHSLogo />
                    </div>
                    <div className='form-inner-wrapper'>
                        <div className="main-title-wrapper">
                            <Typography className="steps">Step 3 of 3</Typography>
                            <div className="flex items-center mt-3 mb-3">
                                <div>
                                    <BackButton
                                    />
                                </div>
                                <div className="mx-auto">
                                    <Typography.Title level={3}>
                                        Owner Verification
                                    </Typography.Title>
                                </div>
                            </div>
                        </div>
                        <div className='secondary-form-wrapper'>
                            <Form.Item
                                label='Name'>
                                <Input placeholder='Enter name'
                                    className='text-input-bg-color' />
                            </Form.Item>
                            <Form.Item
                                label='Role'>
                                <Input placeholder='Enter role'
                                    className='text-input-bg-color' />
                            </Form.Item>
                            <Form.Item
                                label='Correspondence Address'>
                                <Input placeholder='Enter address'
                                    className='text-input-bg-color' />
                            </Form.Item>
                            <Form.Item
                                label='Date of Birth'>
                                <CommonDatePicker />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    onClick={() => {
                                        console.log('hello')
                                        setCurrentStep(1);
                                      }}
                                >
                                    Next
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default OwnerVerification