import React, { useState } from 'react'
import '../../../styles.scss';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import { BackButton, SHSLogo } from '../../../../../assets/images';
import { DropDown } from '../../../../../components';

const RegisteredCompany = (props:any) => {
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
                            <Typography className="steps">Step 2 of 3</Typography>
                            <div className="flex items-center mt-3 mb-3">
                                <div>
                                    <BackButton
                                    />
                                </div>
                                <div className="mx-auto">
                                    <Typography.Title level={3}>
                                        Registered Company Address
                                    </Typography.Title>
                                </div>
                            </div>
                        </div>
                        <div className='secondary-form-wrapper'>
                            <Form.Item
                                label="Post Code"
                                name="UniversityDocument"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please University Valid Document!",
                                    },
                                ]}
                                style={{ width: "100%", marginBottom: "20px" }}
                            >
                                <DropDown
                                    name="Search"
                                    value={value}
                                    options={["search", "item 1"]}
                                    setValue={setValue}
                                    requireSearchBar
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                />
                            </Form.Item>
                            <Row gutter={10}>

                                <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                                    <Form.Item
                                        label='Address'>
                                        <Input placeholder='Enter address' className='text-input-bg-color' />
                                    </Form.Item>
                                </Col>
                                <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                                    <Form.Item
                                        label='Street'>
                                        <Input placeholder='Enter street' className='text-input-bg-color' />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={10}>
                                <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                                    <Form.Item
                                        label="Country of Incorporation"
                                        name="UniversityDocument"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please University Valid Document!",
                                            },
                                        ]}
                                        style={{ width: "100%", marginBottom: "20px" }}
                                    >
                                        <DropDown
                                            name="Select"
                                            value={value}
                                            options={["item 1"]}
                                            setValue={setValue}
                                            requireSearchBar
                                        //   searchValue={searchValue}
                                        //   setSearchValue={setSearchValue}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                                    <Form.Item
                                        label='Town'>
                                        <Input placeholder='Enter Town' className='text-input-bg-color' />
                                    </Form.Item>

                                </Col>
                            </Row>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                               
                                    onClick={() => {
                                        console.log('hello')
                                        setCurrentStep(3);
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

export default RegisteredCompany