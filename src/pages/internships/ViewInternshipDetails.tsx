import React from 'react'
import {
    PageHeader,
    BoxWrapper
} from '../../components'
import { Space } from 'antd'
import { RejectedApplicantIcon, HiredIcon, TotalApplicantIcon, DownloadDocumentIcon } from '../../assets/images'

const ViewInternshipDetails = () => {
    return (
        <>
            <PageHeader
                actions
                bordered
                title="UI/UX Designer"
            >
                <Space wrap>
                    <div className='p-2  border-solid border-2 bg-[#E6F4F9] border-[#E6F4F9] rounded-lg hover:border-2 hover:border-[#e2e2e2]'>
                        <DownloadDocumentIcon />
                    </div>
                </Space>
            </PageHeader>
            <BoxWrapper>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-row justify-between  flex-wrap'>
                        <div>
                            <h3>UI/UX Designer</h3>
                            <p>Design</p>
                        </div>
                        <div className='flex flex-row gap-5 flex-wrap'>
                            <div className='flex flex-row gap-2'>
                                <TotalApplicantIcon />
                                <p>Total Applicants: <span>03</span></p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <HiredIcon />
                                <p>Hired: <span>15</span></p>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <RejectedApplicantIcon />
                                <p>Rejected: <span>15</span></p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>Discription</h4>
                        <p>We are looking for a talented individual to build user experiences through intuitive, user-centered design. You will be responsible for conceptualizing and delivering new feature designs and producing the required assets necessary for the implementation of those designs. Besides the new feature work, you will also work to improve existing products. You will need hands-on experience going through the design ideation process, from inception to the final product along with a graphic design skillset to produce the final assets.</p>
                    </div>
                    <div>
                        <h4>Responsibilities</h4>
                        <p>Act as a strategic thought partner to the product, design and development teams.</p>
                        <p>Lead the design of useful, usable, and desirable products and solution</p>
                        <p>Own the end-to-end process for user research, wireframing, prototyping, testing, mockups, final design and implementation.</p>
                        <p>Design complex navigation flows. Turn functional requirements into simple user journeys.</p>
                        <p>Establish and promote UX/UI design guidelines, best practices and standards based on user behavior.</p>
                        <p>Works within the product team, reporting directly to the product owner</p>
                    </div>
                    <div >
                        <h4>Requirments</h4>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p>Strong written and oral communication skills</p>
                                <p>Ability to collaborate well on a team</p>
                                <p>Can deliver solutions independently</p>
                                <p>Able to see the big picture</p>
                            </div>
                            <div className='flex flex-row gap-6'>
                                <div className='flex flex-col gap-3'>
                                    <p>Internship Type: <span>Paid</span></p>
                                    <p>Nature of work: <span>On Site</span></p>
                                    <p>Total Positions: <span>10</span></p>
                                    <p>Expected Closing Date: <span>22/11/2022</span></p>
                                    <p>Internship Duration: <span>6 Months</span></p>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <p>Frequency: <span>$ 200/ month</span></p>
                                    <p>Location: <span>United Kingdom</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BoxWrapper>
        </>
    )
}

export default ViewInternshipDetails;
