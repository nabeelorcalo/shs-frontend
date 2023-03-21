import React, { useState } from 'react'
import { Button, Col, Divider, Row } from 'antd'
import { BoxWrapper } from '../../components/BoxWrapper/BoxWrapper'
import { Input } from 'antd'
<<<<<<< HEAD
import { DropDown ,PageHeader} from '../../components'
=======
import { DropDown, PageHeader } from '../../components'
>>>>>>> dev
import { CheckBox } from '../../components/Checkbox'
const { TextArea } = Input;
const NewInternships = () => {
    const [showState, setshowState] = useState(false)
    const [alertState, setAlertState] = useState(false)
    return (
        <>
            <PageHeader title="New Internship" />
            <Divider />
            <BoxWrapper>
                <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Internship Details</h4>
                <p>This information will be displayed publicly so be careful what you share</p>
                <Divider />
                <Row>
                    <Col span={8}>
                        <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Description</h4>
                        <p>Describe the details of internship that will be reflected on internship portal</p>
                    </Col>
                    <Col span={8} className="flex flex-col gap-4">
                        <div className='flex flex-col'>
                            <p>Title <span className='text-[#D83A52]'>*</span></p>
                            <Input
                                className="input"
                                handleChange={() => { }}
                                id=""
                                label="Title"
                                name="name"
                                required
                                placeholder="placeholder"
                                size="large"
                                type="text"
                                value="value"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p>Department <span className='text-[#D83A52]'>*</span></p>
                            <Input
                                className="input"
                                handleChange={() => { }}
                                id=""
                                label="Title"
                                name="name"
                                required
                                placeholder="placeholder"
                                size="large"
                                type="text"
                                value="value"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p>Discription <span className='text-[#D83A52]'>*</span></p>
                            <TextArea
                                rows={6}
                                placeholder="maxLength is 6"
                                maxLength={8}
                            />
                        </div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Responsibilities and Requirements</h4>
                        <p>Briefly define the responsibilities and requirements of the internship</p>
                    </Col>
                    <Col span={8}>
                        <div className='flex flex-col gap-4"'>
                            <div className='flex flex-col gap-2'>
                                <p>Responsibilities <span className='text-[#D83A52]'>*</span></p>
                                <TextArea
                                    rows={6}
                                    placeholder="maxLength is 6"
                                    maxLength={8}
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p>Requirements <span className='text-[#D83A52]'>*</span></p>
                                <TextArea
                                    rows={6}
                                    placeholder="maxLength is 6"
                                    maxLength={8}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>col-8</Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>General</h4>
                        <p>Provide the details of internship</p>
                    </Col>
                    <Col span={8}>
                        <p>Type of work <span className='text-[#D83A52]'>*</span></p>
                        <div className='flex flex-row gap-24 my-5'>
                            <CheckBox
                                label="Part Time"
                                onChange={() => { }}
                            />
                            <CheckBox
                                label="Full Time"
                                onChange={() => { }}
                            />
                        </div>
                        <div className='flex flex-row gap-24 my-5'>
                            <CheckBox
                                label="Unpaid"
                                onChange={() => { }}
                            />
                            <CheckBox
                                label="Paid"
                                onChange={() => { }}
                            />
                        </div>
                        <div className='flex flex-row gap-24 my-5'>
                            <CheckBox
                                label="Virtual"
                                onChange={() => { }}
                            />
                            <CheckBox
                                label="Onsite"
                                onChange={() => { }}
                            />
                            <CheckBox
                                label="Hybrid"
                                onChange={() => { }}
                            />
                        </div>
                    </Col>
                    <Col span={8}>col-8</Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Additional Information</h4>
                        <p>Enter the additional information related to internship</p>
                    </Col>
                    <Col span={8}>
                        <div className='flex flex-col gap-3'>
                            <p>Total positions <span className='text-[#D83A52]'>*</span></p>
                            <div className='flex flex-col gap-5'>
                                <Input
                                    className="input"
                                    handleChange={() => { }}
                                    id=""
                                    label="Title"
                                    name="name"
                                    required
                                    placeholder="placeholder"
                                    size="large"
                                    type="text"
                                    value="value"
                                />
                            </div>
                            <p>Total positions <span className='text-[#D83A52]'>*</span></p>
                            <div className='flex flex-col gap-5'>
                                <Input
                                    className="input"
                                    handleChange={() => { }}
                                    id=""
                                    label="Title"
                                    name="name"
                                    required
                                    placeholder="placeholder"
                                    size="large"
                                    type="text"
                                    value="value"
                                />
                            </div>
                            <p>Total positions <span className='text-[#D83A52]'>*</span></p>
                            <div className='flex flex-col gap-5'>
                                <Input
                                    className="input"
                                    handleChange={() => { }}
                                    id=""
                                    label="Title"
                                    name="name"
                                    required
                                    placeholder="placeholder"
                                    size="large"
                                    type="text"
                                    value="value"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Row className="flex my-3 flex-row gap-5 justify-end">
                    <Button
                        type="link"
                        size="middle"
                        className="flex bg-[#fff] text-[#4A9D77]"
                        onClick={() => { }}
                    >
                        Save Draft
                    </Button>
                    <Button
                        size="middle"
                        className="flex bg-[#fff] text-[#4A9D77]"
                        onClick={() => { }}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="middle"
                        className="flex bg-[#4A9D77] text-[#fff]"
                        onClick={() => { }}
                    >
                        Submit
                    </Button>
                </Row>
            </BoxWrapper>
        </>
    )
}

export default NewInternships