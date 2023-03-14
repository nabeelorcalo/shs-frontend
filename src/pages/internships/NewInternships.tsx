import React, { useState } from 'react'
import PageHeader from '../../components/PageHeader'
import { Button, Col, Divider, Row } from 'antd'
import { BoxWrapper } from '../../components/BoxWrapper/BoxWrapper'
import { Input } from '../../components'
import { DropDown } from '../../components'

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
                            <Input placeholder='Enter Title' />
                        </div>
                        <div className='flex flex-col'>
                            <p>Department <span className='text-[#D83A52]'>*</span></p>
                            <DropDown placeholder='Enter Title' />
                        </div>

                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Responsibilities and Requirements</h4>
                        <p>Briefly define the responsibilities and requirements of the internship</p>
                    </Col>
                    <Col span={8}>Briefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internship</Col>
                    <Col span={8}>col-8</Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>General</h4>
                        <p>Provide the details of internship</p>
                    </Col>
                    <Col span={8}>Briefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internshipBriefly define the responsibilities and requirements of the internship</Col>
                    <Col span={8}>col-8</Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}>
                        <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Additional Information</h4>
                        <p>Enter the additional information related to internship</p>
                    </Col>
                    <Col span={8}></Col>
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
                        Submit
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